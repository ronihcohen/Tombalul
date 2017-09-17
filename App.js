import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from "react-native";

async function playSound(file) {
  const soundObject = new Expo.Audio.Sound();
  try {
    await soundObject.loadAsync(file);
    await soundObject.playAsync();
  } catch (error) {
    console.warn("Can't play sound ", error);
  }
}

const correct = require("./assets/sounds/correct.m4a");
const wrong = require("./assets/sounds/wrong.m4a");

const answers = [
  {
    title: "Dog",
    sound: require("./assets/sounds/dog.m4a")
  },
  {
    title: "Cat",
    sound: require("./assets/sounds/cat.m4a")
  },
  {
    title: "Bird",
    sound: require("./assets/sounds/bird.m4a")
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  imagesContainer: {
    flexDirection: "row",
    margin: 20
  },
  images: {
    width: 200,
    height: 200,
    margin: 10
  },
  title: {
    fontSize: 35,
    fontWeight: "bold"
  },
  hiddenimages: {
    opacity: 0.5
  }
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 0,
      wrongAnswers: [],
      list: [
        {
          images: require("./assets/images/bird.jpg"),
          title: "Bird"
        },
        {
          images: require("./assets/images/cat.jpg"),
          title: "Cat"
        },
        {
          images: require("./assets/images/dog.jpg"),
          title: "Dog"
        },
        {
          images: require("./assets/images/bird.jpg"),
          title: "Bird"
        },
        {
          images: require("./assets/images/cat.jpg"),
          title: "Cat"
        },
        {
          images: require("./assets/images/dog.jpg"),
          title: "Dog"
        },
        {
          images: require("./assets/images/bird.jpg"),
          title: "Bird"
        },
        {
          images: require("./assets/images/cat.jpg"),
          title: "Cat"
        },
        {
          images: require("./assets/images/dog.jpg"),
          title: "Dog"
        }
      ]
    };
  }
  componentDidMount() {
    setTimeout(() => playSound(answers[this.state.level].sound), 100);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imagesContainer}>
          {this.state.list
            .filter(
              (item, index) =>
                index >= this.state.level && index < this.state.level + 3
            )
            .map(item => (
              <TouchableHighlight
                style={
                  this.state.wrongAnswers.find(
                    title => title === item.title
                  ) ? (
                    styles.hiddenimages
                  ) : (
                    styles.TouchableHighlight
                  )
                }
                onPress={() => {
                  if (item.title === answers[this.state.level].title) {
                    let nextLevel = this.state.level + 1;
                    if (!answers[nextLevel]) {
                      nextLevel = 0;
                    }
                    this.setState({ level: nextLevel, wrongAnswers: [] });
                    playSound(answers[nextLevel].sound);
                  } else {
                    playSound(wrong);
                    let wrongAnswers = this.state.wrongAnswers;
                    wrongAnswers.push(item.title);
                    this.setState({ wrongAnswers: wrongAnswers });
                  }
                }}
              >
                <Image source={item.images} style={styles.images} />
              </TouchableHighlight>
            ))}
        </View>
        <Text style={styles.title}> {answers[this.state.level].title} </Text>
      </View>
    );
  }
}
