const mongoose = require('mongoose');

var database = "mongodb://root:abc123@ds034797.mlab.com:34797/hotel-reservation";
var secret = "as432sd5sd4f2s4df2sdf2sd2f4s3df";
var port = process.env.PORT || 3000;

module.exports= {database, secret, port};