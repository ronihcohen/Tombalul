const fs = require("fs");
const sharp = require("sharp");

function readFiles(dirname, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function(filename) {
      fs.readFile(dirname + filename, function(err, content) {
        if (err) {
          console.log(err);
          return;
        }
        console.log(filename);
        sharp(content)
          .resize(150, 150)
          .toFile(filename, (err, info) => console.log(err, info));
      });
    });
  });
}

readFiles("./original/");
