const fs = require("fs");

module.exports = function uploadSize(uploadName) {
  const stats = fs.statSync(
    `./uploads/${uploadName}`
  );
  return stats.size
}; 
