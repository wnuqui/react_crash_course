import React from 'react';
import $ from 'jquery';
import CommentList from './comment-list';
import CommentForm from './comment-form';
import reactMixin from 'react-mixin';
import Mixin from './mixin';

export default class CommentBox extends React.Component {
  static isEmptyComment(comment) {
    console.log('~~~~ empty: ' + !comment.text.trim().length);
  }

  constructor(props) {
      super(props);

      this.state = {
        data: props.data
      };

      this.setComments = this.setComments.bind(this);

      this.handleCommentSubmit = this.handleCommentSubmit.bind(this);

      this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);

      this.componentDidMount = this.componentDidMount.bind(this);
  }

  loadCommentsFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,

      success: this.setComments,

      error: function(xhr, status, error) {
        console.error(status, error.toString());
      }
    });
  }

  setComments(data) {
    this.setState({ data: data });
  }

  // This is placed here so it can be shared to other components via `props`
  handleCommentSubmit(comment) {
    CommentBox.isEmptyComment(comment);

    comment.id = Date.now();

    var comments = this.state.data;

    var data = comments.concat([comment]);

    this.setComments(data); // optimistic commenting!

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,

      success: this.setComments,

      error: function(xhr, status, error) {
        this.setComments(comments);
        console.error(status, error.toString());
      }
    });
  }

  componentDidMount() {
    this.log('~~~~ component did mount!')
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }

  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={ this.state.data } />
        <CommentForm onCommentSubmit={ this.handleCommentSubmit } />
      </div>
    );
  }
}

CommentBox.propTypes = { data: React.PropTypes.array };
CommentBox.defaultProps = { data: [] };

reactMixin.onClass(CommentBox, Mixin);
