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

export function voteUp() {
  return dispatch => {
    dispatch({type: ActionTypes.voteUp});
  };
}

export function voteDown() {
  return dispatch => {
    dispatch({type: ActionTypes.voteDown});
  };
}
