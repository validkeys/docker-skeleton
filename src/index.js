var Hapi    = require('hapi');
var server  = new Hapi.Server();
var Waterline = require('waterline');

var orm = new Waterline();
var mongoAdapter = require('sails-mongo');
// var postgresAdapter = require('sails-postgresql');
var ormConfig = {
  adapters: {
    // postgresql: {
    //   database: "presslyprod",
    //   host:     "localhost",
    //   port:     5432
    // }
    mongo: {
      database: "pressly-mongo",
      host:     process.env.MONGO_PORT_27017_TCP_ADDR || '127.0.0.1',
      port:     process.env.MONGO_PORT_27017_TCP_PORT || '127.0.0.1',
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

// var User = Waterline.Collection.extend({
//   schema: true,
//   tableName: "accounts",
//   adapter: 'postgresql',
//   attributes: {
//     username: { type: "string" }
//   }
// });

var MongoModel = Waterline.Collection.extend({
  schema:     false,
  tableName:  "users",
  adapter:    "mongo",
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
// orm.loadCollection(User);


server.connection({
  port: 3000
});

server.route([
  {
     method: "GET",
     path:   "/",
     handler: function(req, reply) {
        var myToken = redisClient.get("amiworking", function(err, res) {
          // reply({ myToken: res, yes: "hello!"});
          MongoModel.find()
            .then(function (mongoRes) {
              reply({ myToken: res, yes: "hello!", users: mongoRes });
            });
        });
     }
  }
]);

// orm.initialize(ormConfig, function(err, models) {
//   if (err){ throw err; }
// });

server.start(function() {
  console.log("Server running at " + server.info.uri);

  setTimeout(function() {
    queue.create('say', { txt: "Hello from Kue!" }).save();
  }, 5000);
});