'use strict';

module.exports = function(server) {
  server.route({
    method: 'GET',
    path: '/api/',
    handler: function(req, res) {
      var message = {
        self: server.info.uri,
        recipes: server.info.uri + '/recipes',
        ingredients: server.info.uri + '/ingredients',
      };

      reply(message)
        .header('Content-Length', message.length)
        .header('Server', 'HandsOnServer')
      ;
    },
  });
};
