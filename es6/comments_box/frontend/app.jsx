import React from 'react';
import {render} from 'react-dom';
import CommentBox from './comment-box';

var mountNode = document.getElementById('mount-node');

render(
  <CommentBox url='/api/comments' pollInterval={ 2000 } />,
  mountNode
);
