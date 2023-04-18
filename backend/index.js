const webapp = require('./server');

const port = 8000;
// start the web server
webapp.listen(port, () => {
  console.log('Server running on port', port);
});
