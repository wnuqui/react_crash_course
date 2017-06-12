import React from 'react';
import Comment from './comment';

export default class CommentList extends React.Component {
  render() {
    var commentNodes = this.props.data.map(comment => {
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
}
