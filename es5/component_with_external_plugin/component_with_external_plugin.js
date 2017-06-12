//
// PROBLEM NO. 4
//
// Create simple React component that accepts markdown input via a textarea
// and returns converted html output.
//
var MarkdownEditor = React.createClass({
  getInitialState: function() {
    return { value: 'Type some *markdown* here!' };
  },

  // Instead of using the usual `e.target.value`, `this.refs` is used.
  handleChange: function() {
    this.setState({ value: this.refs.textarea.value });
  },

  rawMarkup: function() {
    return { __html: marked(this.state.value, {sanitize: true}) };
  },

  render: function() {
    //
    // Few things must be considered here for `marked` js lib to work
    //
    // In `className="content"` "content" can be anything
    // "dangerouslySetInnerHTML" property/attribute is important (must not be mispelled)
    //
    return (
      <div className="MarkdownEditor">
        <h3>Input</h3>
        <textarea
          onChange={ this.handleChange }
          ref="textarea"
          defaultValue={ this.state.value } />
        <h3>Output</h3>
        <div
          className="content"
          dangerouslySetInnerHTML={ this.rawMarkup() }
        />
      </div>
    );
  }
});

var mountNode = document.getElementById('mount-node');

ReactDOM.render(
  <MarkdownEditor />,
  mountNode
);
