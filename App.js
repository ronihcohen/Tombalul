import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from "react-native";

const wrong = require("./assets/sounds/wrong.m4a");
const correct = require("./assets/sounds/correct.m4a");
const hebrew = require("./hebrew.json");
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

async function playSound(file) {
  const soundObject = new Expo.Audio.Sound();
  try {
    await soundObject.loadAsync(file);
    await soundObject.playAsync();
  } catch (error) {
    console.warn("Can't play sound ", error);
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correctAnswer: null,
      level: 0,
      wrongAnswers: [],
      answers: require("./answers.js").default,
      currentOptions: null
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
        correctAnswer: null,
        currentOptions: null
      });
      setTimeout(() => playSound(this.state.answers[nextLevel].sound), 500);
    }, 2500);
  }

  shuffle(a) {
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
  }

  getOptions = function(currentAnswer) {
    let options = [currentAnswer];
    let answers = [...this.state.answers];
    this.shuffle(answers).forEach(answer => {
      if (options.length < 3 && answer !== currentAnswer) {
        options.push(answer);
      }
    });
    return this.shuffle(options);
  };

  render() {
    let currentAnswer = this.state.answers[this.state.level];
    let options = this.state.currentOptions || this.getOptions(currentAnswer);
    return (
      <View style={styles.container}>
        <View style={styles.imagesContainer}>
          {options.map(item => {
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
                    this.setState({
                      wrongAnswers: wrongAnswers,
                      currentOptions: options
                    });
                  }
                }}
              >
                <Image source={item.image} style={styles.image} />
              </TouchableHighlight>
            ) : null;
          })}
        </View>
        <Text style={styles.title}>
          {hebrew[this.state.answers[this.state.level].title]}
        </Text>
      </View>
    );
  }
}
