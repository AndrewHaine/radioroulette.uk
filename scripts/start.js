/**
 * Entry point for our application
 */

require('dotenv').config();

const httpsServer = require('../app/server');

try {
  httpsServer.listen(process.env.APP_PORT, err => {
    if(!!err) {
      console.error('Error starting https server:', err, (err && err.stack));
    } else {
      console.log(`https server started successfully, running on port: ${process.env.APP_PORT}`);
    }
  });
} catch (err) {
  console.error('Error starting https server:', err, (err && err.stack))
}
