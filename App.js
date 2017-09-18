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

const wrong = require("./assets/sounds/wrong.m4a");
const correct = require("./assets/sounds/correct.m4a");

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
  },
  {
    title: "Monkey",
    sound: require("./assets/sounds/monkey.m4a")
  },
  {
    title: "Elephant",
    sound: require("./assets/sounds/elephant.m4a")
  },
  {
    title: "Rabbit",
    sound: require("./assets/sounds/rabbit.m4a")
  },
  {
    title: "Horse",
    sound: require("./assets/sounds/horse.m4a")
  },
  {
    title: "Mouse",
    sound: require("./assets/sounds/mouse.m4a")
  },
  {
    title: "Lion",
    sound: require("./assets/sounds/lion.m4a")
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
    opacity: 0
  }
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correctAnswer: null,
      level: 0,
      wrongAnswers: [],
      list: [
        {
          images: require("./assets/images/bird.jpg"),
          title: "Bird"
        },
        {
          images: require("./assets/images/horse.jpg"),
          title: "Horse"
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
          images: require("./assets/images/mouse.jpg"),
          title: "Mouse"
        },
        {
          images: require("./assets/images/bird.jpg"),
          title: "Bird"
        },
        {
          images: require("./assets/images/monkey.jpg"),
          title: "Monkey"
        },
        {
          images: require("./assets/images/lion.jpg"),
          title: "Lion"
        },
        {
          images: require("./assets/images/mouse.jpg"),
          title: "Mouse"
        },
        {
          images: require("./assets/images/bird.jpg"),
          title: "Bird"
        },
        {
          images: require("./assets/images/monkey.jpg"),
          title: "Monkey"
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
          images: require("./assets/images/elephant.jpg"),
          title: "Elephant"
        },
        {
          images: require("./assets/images/monkey.jpg"),
          title: "Monkey"
        },
        {
          images: require("./assets/images/rabbit.jpg"),
          title: "Rabbit"
        },
        {
          images: require("./assets/images/bird.jpg"),
          title: "Bird"
        },
        {
          images: require("./assets/images/horse.jpg"),
          title: "Horse"
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
          images: require("./assets/images/mouse.jpg"),
          title: "Mouse"
        },
        {
          images: require("./assets/images/bird.jpg"),
          title: "Bird"
        },
        {
          images: require("./assets/images/bird.jpg"),
          title: "Bird"
        },
        {
          images: require("./assets/images/monkey.jpg"),
          title: "Monkey"
        },
        {
          images: require("./assets/images/lion.jpg"),
          title: "Lion"
        }
      ]
    };
  }
  componentDidMount() {
    setTimeout(() => playSound(answers[this.state.level].sound), 100);
  }
  render() {
    const levelStart = this.state.level * 3;
    return (
      <View style={styles.container}>
        <View style={styles.imagesContainer}>
          {this.state.list
            .filter(
              (item, index) => index >= levelStart && index < levelStart + 3
            )
            .map(item => {
              return !this.state.correctAnswer ||
              this.state.correctAnswer === item.title ? (
                <TouchableHighlight
                  key={item.title}
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
                    if (this.state.correctAnswer) {
                      return;
                    }
                    if (item.title === answers[this.state.level].title) {
                      playSound(correct);
                      setTimeout(
                        () => playSound(answers[this.state.level].sound),
                        700
                      );
                      this.setState({ correctAnswer: item.title });

                      setTimeout(() => {
                        let nextLevel = this.state.level + 1;
                        if (!answers[nextLevel]) {
                          nextLevel = 0;
                        }
                        this.setState({
                          level: nextLevel,
                          wrongAnswers: [],
                          correctAnswer: null
                        });
                        setTimeout(
                          () => playSound(answers[nextLevel].sound),
                          500
                        );
                      }, 2500);
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
              ) : null;
            })}
        </View>
        <Text style={styles.title}> {answers[this.state.level].title} </Text>
      </View>
    );
  }
}
