import React from "react";
import "./style.css";

export class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Please write a words",
      width: 0,
      height: 0,
      arrContainer: []
    };
    this.container = [];
    this.wordsDown = [];
    this.myWordCLoudDiv = React.createRef();
  }

  handleSubmit(event) {
    this.container = [];
    const arr = this.state.value.split(" ");
    if (arr.length) {
      arr.forEach(val => {
        this.container.push(val);
      });
    }
    this.setState({
      arrContainer: this.container
    });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  generateRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
    let words = this.state.arrContainer.map(function(word) {
      return {
        word: word,
        freq: Math.floor(Math.random() * 50) + 10
      };
    });
    words.sort(function(a, b) {
      return -1 * (a.freq - b.freq);
    });

    return (
      <>
        <form className="margin-top-left">
          <label>
            <textarea
              value={this.state.value}
              onChange={e => this.handleChange(e)}
            />
          </label>
        </form>
        <button
          type="button"
          className="margin-top-left"
          onClick={e => this.handleSubmit(e)}
        >
          Submit
        </button>
        <div
          id="word-cloud"
          className="margin-top-left"
          ref={this.myWordCLoudDiv}
        >
          <div className="word-cloud-container">
            {this.state.arrContainer.length > 0 &&
              this.state.arrContainer.map((val, i) => {
                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      fontSize: `${Math.floor(Math.random() * 50) + 10}px`,
                      lineHeight: 0.8,
                      left: `${Math.floor(Math.random() * 350) + 10}px`,
                      top: `${Math.floor(Math.random() * 300) + 10}px`,
                      color: `${this.generateRandomColor()}`,
                      padding: "20px",
                      margin: "20px"
                    }}
                  >
                    {val}
                  </div>
                );
              })}
          </div>
        </div>
      </>
    );
  }
}
