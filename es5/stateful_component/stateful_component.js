//
// PROBLEM NO. 2
//
// Create stateful React component that displays elapsing seconds.
// It starts with 0 and elapse by 1 second.
//
var Timer = React.createClass({
  // expected function by React
  getInitialState: function() {
    return { secondsElapsed: 0 };
  },

  // custom function
  tick: function() {
    var newState = { secondsElapsed: this.state.secondsElapsed + 1 };
    this.setState(newState);
  },

  // expected function by React
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },

  // expected function by React
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  // expected function by React
  render: function() {
    return (
      <div>
        Seconds Elapsed: { this.state.secondsElapsed }
      </div>
    );
  }
});

var mountNode = document.getElementById('mount-node');

ReactDOM.render(
  <Timer />,
  mountNode
);
