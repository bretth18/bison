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
  let yakScore;
  switch(action.type) {

    case ActionTypes.addComment:
    commentList = action.commentData;

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
      yakScore =  state.yakScore++;
      return {
        ...state,
        score: yakScore
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
