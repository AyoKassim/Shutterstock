const fs = require("fs");

module.exports = function uploadSize(uploadName) {
  const stats = fs.statSync(
    `./public/${uploadName}`
  );
  return stats.size
};
