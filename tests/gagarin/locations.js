describe('You can also use browser in your tests', function () {
  var server = meteor();
  var client = browser(server);

  it('should just work', function () {
    return client.execute(function () {
      // some code to execute
    }).then(function () {
      return server.execute(function () {
        // some code to execute on server
      });
    });
  });
});