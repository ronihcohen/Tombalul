const fs = require("fs");
const sharp = require("sharp");

const ANSWER_FILE = "../../answers.js";

fs.unlink(ANSWER_FILE, err => {
  if (err) console.log("Can't delete answer file.");
});

fs.appendFileSync(ANSWER_FILE, `export default [`);

function addAnswer(name, filename) {
  if (!name) {
    return;
  }
  fs.appendFileSync(
    ANSWER_FILE,
    `
    {
      title: "${name}",
      sound: require("./assets/sounds/${name}.m4a"),
      image: require("./assets/images/${filename}")
    },`,
    err => {
      if (err) throw err;
    }
  );
}

function readFiles(dirname, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function(filename) {
      const filenameArray = filename.split(".");
      const name = filenameArray[0];
      const extension = filenameArray[1];
      if (extension !== "jpg" && extension !== "jpeg") {
        return;
      }
      addAnswer(name, filename);
      fs.readFile(dirname + filename, function(err, content) {
        if (err) {
          console.log(err);
          return;
        }
        console.log(`${name} was added.`);
        sharp(content)
          .resize(300, 300)
          .toFile(filename, (err, info) => {
            if (err) console.log(err);
          });
      });
    });
    fs.appendFileSync(ANSWER_FILE, `];`);
  });
}

readFiles("./original/");
