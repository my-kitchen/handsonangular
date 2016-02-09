'use strict';

var Hapi = require('hapi');
var Inert = require('inert');
var Path = require('path');
var fs = require('fs');
var path = require('path');

var server = new Hapi.Server();

server.connection({
  port: 3000,
});

require('./server/summary')(server);

server.register(Inert, function () {});

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: Path.join(__dirname, 'dist'),
      redirectToSlash: true,
      index: true,
    },
  },
});

server.start(function () {
  console.log('Server running at:', server.info.uri);
});

