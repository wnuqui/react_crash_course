import React from 'react';

export default class CommentForm extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        author: props.author,
        text: props.text
      };

      this.handleAuthorChange = this.handleAuthorChange.bind(this);

      this.handleTextChange = this.handleTextChange.bind(this);

      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    var author = this.state.author.trim();
    var text = this.state.text.trim();

    if(!text || !author) {
      return;
    }

    this.props.onCommentSubmit({ author: author, text: text });
    this.setState({ author: '', text: '' })
  }

  render() {
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
}

CommentForm.propTypes = {
  author: React.PropTypes.string,
  text: React.PropTypes.string
};

CommentForm.defaultProps = { author: '', text: '' };
