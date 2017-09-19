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
  image: {
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
      options: require("./options.js").default,
      answers: require("./answers.js").default
    };
  }
  componentDidMount() {
    setTimeout(
      () => playSound(this.state.answers[this.state.level].sound),
      100
    );
  }
  correctAnswerPressed(item) {
    playSound(correct);
    setTimeout(
      () => playSound(this.state.answers[this.state.level].sound),
      700
    );
    this.setState({ correctAnswer: item.title });

    setTimeout(() => {
      let nextLevel = this.state.level + 1;
      if (!this.state.answers[nextLevel]) {
        nextLevel = 0;
      }
      this.setState({
        level: nextLevel,
        wrongAnswers: [],
        correctAnswer: null
      });
      setTimeout(() => playSound(this.state.answers[nextLevel].sound), 500);
    }, 2500);
  }

  render() {
    const levelStart = this.state.level * 3;
    return (
      <View style={styles.container}>
        <View style={styles.imagesContainer}>
          {this.state.options
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
                    if (
                      item.title === this.state.answers[this.state.level].title
                    ) {
                      this.correctAnswerPressed(item);
                    } else {
                      playSound(wrong);
                      let wrongAnswers = this.state.wrongAnswers;
                      wrongAnswers.push(item.title);
                      this.setState({ wrongAnswers: wrongAnswers });
                    }
                  }}
                >
                  <Image source={item.image} style={styles.image} />
                </TouchableHighlight>
              ) : null;
            })}
        </View>
        <Text style={styles.title}>
          {this.state.answers[this.state.level].title}
        </Text>
      </View>
    );
  }
}
