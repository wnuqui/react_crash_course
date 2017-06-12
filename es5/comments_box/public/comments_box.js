//
// PROBLEM NO. 5
//
// Implement simple Comment Box using endpoints written in any language.
//

var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,

      success: function(data) {
        this.setState({ data: data });
      }.bind(this),

      error: function(xhr, status, error) {
        console.error(this.props.url, status, error.toString());
      }.bind(this)
    });
  },

  // This is placed here so it can be shared to other components via `props`
  handleCommentSubmit: function(comment) {
    comment.id = Date.now();

    var comments = this.state.data;

    var data = comments.concat([comment]);

    this.setState({ data: data }); // optimistic commenting!

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,

      success: function(data) {
        this.setState({ data: data });
      }.bind(this),

      error: function(xhr, status, error) {
        this.setState({ data: comments });
        console.error(this.props.url, status, error.toString());
      }.bind(this)
    });
  },

  getInitialState: function() {
    return { data: [] };
  },

  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={ this.state.data } />
        <CommentForm onCommentSubmit={ this.handleCommentSubmit } />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      // nested content is not for display in dom
      // because it will be used by `marked` via this.props.children of component
      return (
        <Comment author={ comment.author } key={ comment.id } >
          { comment.text }
        </Comment>
      );
    });

    return (
      <div className="commentList">
        { commentNodes }
      </div>
    );
  }
});

var Comment = React.createClass({
  rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), { sanitize: true });
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          { this.props.author }
        </h2>
        <span dangerouslySetInnerHTML={ this.rawMarkup() } />
      </div>
    );
  }
});

var CommentForm = React.createClass({
  getInitialState: function() {
    return { author: '', text: '' };
  },

  handleAuthorChange: function(e) {
    this.setState({ author: e.target.value });
  },

  handleTextChange: function(e) {
    this.setState({ text: e.target.value });
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var author = this.state.author.trim();
    var text = this.state.text.trim();

    if(!text || !author) {
      return;
    }

    this.props.onCommentSubmit({ author: author, text: text });
    this.setState({ author: '', text: '' })
  },

  render: function() {
    return (
      <form className="commentForm" onSubmit={ this.handleSubmit } >
        <input
          type='text'
          placeholder='Your Name'
          value={ this.state.author }
          onChange={ this.handleAuthorChange }
        />
        <input
          type='text'
          placeholder='Say something ...'
          value={ this.state.text }
          onChange={ this.handleTextChange }
        />
        <input type='submit' value="Post" />
      </form>
    );
  }
});

var mountNode = document.getElementById('mount-node');

ReactDOM.render(
  <CommentBox url='/api/comments' pollInterval={ 2000 } />,
  mountNode
);
