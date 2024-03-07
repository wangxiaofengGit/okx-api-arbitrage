const fs = require('fs');
const util = require('util');
const path = require('path');

// The console agent writes the logs
const logFile = fs.createWriteStream( path.resolve(__dirname,'../log.txt'),{flags:'a'});
console.log = function(){
  logFile.write(util.format.apply(null,arguments)+'\n');
  process.stdout.write(util.format.apply(null,arguments)+'\n');
}
