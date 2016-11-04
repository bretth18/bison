'use strict';

/* still figuring out architecture...

*/
import ActionTypes from '../Constants/ActionTypes';

// need to figure out scores
const initialState = {
  yakCommentList: [],
  yakScore: 0
};

export function yakViewReducer(state = initialState, action) {

  let yakComment;

  console.log(action);
  switch(action.type) {

    case ActionTypes.addComment:
    yakComment = state.yakCommentList.concat([action.yakCommentData]);

      return {
        ...state,
        yakComment: yakComment
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
