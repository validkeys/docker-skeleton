var Hapi    = require('hapi');
var server  = new Hapi.Server();
var Waterline = require('waterline');

// var orm = new Waterline();
// var postgresAdapter = require('sails-postgresql');
// var ormConfig = {
//   adapters: {
//     postgresql: {
//       database: "presslyprod",
//       host:     "localhost",
//       port:     5432
//     }
//   }
// }

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
          reply({ myToken: res, yes: "hello!"});
          // User.find()
          //   .then(function (res) {
          //     reply({ myToken: res, yes: "hello!", users: res });
          //   });
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