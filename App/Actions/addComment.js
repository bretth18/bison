'use strict';

import ActionTypes from '../Constants/ActionTypes';


export function addComent(commentData) {
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
