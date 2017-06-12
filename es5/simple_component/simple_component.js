//
// PROBLEM NO. 1
//
// Create simple React component that accepts name and
// output "Hello [name]!" wrapped in div element.
//
var HelloMessage = React.createClass({
  render: function() {
    return <div>Hello { this.props.name }!</div>;
  }
});

var mountNode = document.getElementById('mount-node');

ReactDOM.render(
  <HelloMessage name="John"/>,
  mountNode
);
