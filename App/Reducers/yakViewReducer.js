'use strict';

/* still figuring out architecture...

*/
import ActionTypes from '../Constants/ActionTypes';

// need to figure out scores
const initialState = {
  commentList: [],
  yakScore: 0
};

export function yakViewReducer(state = initialState, action) {

  let commentList;

  console.log(action);
  switch(action.type) {

    case ActionTypes.addComment:
    commentList = state.commentList.concat([action.commentData]);

      return {
        ...state,
        commentList: commentList
      };

    case ActionTypes.removeComment:
      yakCommentList: state.yakCommentList.slice(0);
      const index = yakCommentList.map(i => i.id).indexOf(action.id);
      yakCommentList.splice(index, 1);

      return {
        ...state,
        yakCommentList: yakCommentList
      };

    case ActionTypes.voteUp:
      yakScore: state.yakScore++;
      return {
        ...state,
        yakScore: yakScore
      };

    case ActionTypes.voteDown:
      yakScore: state.yakScore--;
      return {
        ...state,
        yakScore: yakScore
      };

    default:
      return state;

  }
}
