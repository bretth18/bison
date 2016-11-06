'use strict';

import ActionTypes from '../Constants/ActionTypes';


export function addComment(commentData) {
  return {
    type: ActionTypes.addComment,
    commentData: commentData
  };
}

export function removeComment(commentId) {
  return {
    type: ActionTypes.removeComment,
    commentId: commentId
  };
}
