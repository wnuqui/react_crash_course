//
// PROBLEM NO. 3
//
// Create simple Todo application using `props` and `state`.
//
var TodoList = React.createClass({
  render: function() {
    // another JSX here
    var createItem = function(item) {
      return (
        <li key={ item.id }>
          { item.text }
        </li>
      );
    };

    return <ul>{ this.props.items.map(createItem) }</ul>;
  }
});

var TodoApp = React.createClass({
  getInitialState: function() {
    return { items: [], text: '' };
  },

  // custom function
  onChange: function(e) {
    this.setState({ text: e.target.value });
  },

  // custom function
  handleSubmit: function(e) {
    e.preventDefault();

    var item = { id: Date.now(), text: this.state.text };
    var nextItems = this.state.items.concat([item]);
    var nextText = '';

    this.setState({ items: nextItems, text: nextText });
  },

  render: function() {
    // Always return an element and not list!
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={ this.state.items } />
        <form onSubmit={ this.handleSubmit } >
          <input onChange={ this.onChange } value={ this.state.text } />
          <button>Add #{ this.state.items.length + 1 } </button>
        </form>
      </div>
    );
  }
});

var mountNode = document.getElementById('mount-node');

ReactDOM.render(
  <TodoApp />,
  mountNode
);
