var Hapi    = require('hapi');
var server  = new Hapi.Server();
var Waterline = require('waterline');
var Promise   = require('bluebird');

var orm = new Waterline();
var mongoAdapter = require('sails-mongo');
var postgresAdapter = require('sails-postgresql');
var ormConfig = {
  adapters: {
    mongo:    mongoAdapter,
    postgres: postgresAdapter
  },
  connections: {
    mongo: {
      adapter:  "mongo",
      database: "pressly-mongo",
      host:     process.env.MONGO_PORT_27017_TCP_ADDR || '127.0.0.1',
      port:     process.env.MONGO_PORT_27017_TCP_PORT || 27017,
    },
    postgres: {
      adapter: "postgres",
      database: "dockertest",
      host:     process.env.POSTGRES_PORT_5432_TCP_ADDR || '127.0.0.1',
      port:     process.env.POSTGRES_PORT_5432_TCP_PORT || 5432,
    }
  }
}

var redisPort = process.env.REDIS_PORT_6379_TCP_PORT || 6379;
var redisHost = process.env.REDIS_PORT_6379_TCP_ADDR || '127.0.0.1';

var kue = require('kue'),
    queue = kue.createQueue({
      prefix: 'q',
      redis: {
        port: redisPort,
        host: redisHost
      }
    });

var redis       = require('redis'),
    redisClient = redis.createClient(redisPort, redisHost);

redisClient.on("error", function(err) {
  console.log("REDIS ERROR", err);
});

queue.process('say', function(job, done) {
  var data = job.data;
  console.log("Saying: " + data.txt);
  done();
});

var PostgresModel = Waterline.Collection.extend({
  schema:     true,
  tableName:  "users",
  identity:   "pgusers",
  connection: 'postgres',
  attributes: {
    name: { type: "string" }
  }
});

var MongoModel = Waterline.Collection.extend({
  schema:     false,
  tableName:  "users",
  identity:   "mongousers",
  connection:    "mongo",
  attributes: {
    id:                 { 
      type:       "objectid",
      required:   true,
      index:      true,
      primaryKey: true
    },
    name: { type: "string" }
  }
});

orm.loadCollection(MongoModel);
orm.loadCollection(PostgresModel);


server.connection({
  port: 3000
});

server.route([
  {
     method: "GET",
     path:   "/",
     handler: function(req, reply) {
        redisClient.get("amiworking", function(err, res) {
          Promise.props({
            redis: res,
            mongo: server.app.models.collections.mongousers.find(),
            postgres: server.app.models.collections.pgusers.find()
          }).then(function(data) {
            reply(data);
          });
        });
     }
  }
]);

orm.initialize(ormConfig, function(err, models) {
  if (err){ throw err; }

  server.app.models = models;

  server.start(function() {
    console.log("Server running at " + server.info.uri);

    setTimeout(function() {
      queue.create('say', { txt: "Hello from Kue!" }).save();
    }, 5000);
  });
});