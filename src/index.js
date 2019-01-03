import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import logo from "./logo.svg";
import "./App.css";
import { createStore } from "redux";

// set up our store

// takes in (state: { count }, action: { type: string }), returns state: { count }
const reducer = (state = { count: 0 }, action) => {
  // return the new state
  console.log("state", state, "action", action);

  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + action.num };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "DECREMENT_BY_FIVE":
      return { count: state.count - 5 };
    default:
      return state;
  }
};

// actions
// object
// 'type' key
// ...and anything else we need

const incrementAction = { type: "INCREMENT", num: 1 };
const decrementAction = { type: "DECREMENT" };
const incrementByThreeAction = { type: "INCREMENT", num: 3 }
const decrementByFive = { type: "DECREMENT_BY_FIVE" }

const store = createStore(reducer);

class App extends Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Counter />
      </div>
    );
  }
}

class Header extends Component {
  renderDescription = () => {
    const count = store.getState().count;
    const remainder = count % 5;
    const upToNext = 5 - remainder;
    return `The current count is less than ${count + upToNext}`;
  };

  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
        <h3>{this.renderDescription()}</h3>
      </header>
    );
  }
}

class Counter extends Component {
  increment = () => {
    store.dispatch(incrementAction);
  };

  decrement = () => {
    store.dispatch(decrementAction);
  };

  incrementByThree = () => {
    store.dispatch(incrementByThreeAction);
  }

  decrementByFive = () => {
    store.dispatch(decrementByFive);
  }

  render() {
    return (
      <div className="Counter">
        <h1>{store.getState().count}</h1>
        <button onClick={this.decrement}> - </button>
        <button onClick={() => this.increment(1)}> + </button>
        <button onClick={() => this.increment(3)}> + 3 </button>
        <button onClick={this.decrementByFive}> - 5 </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
