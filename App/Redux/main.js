/* store handler */

/* Notes:
   Our store handles our application state.
   -Allows access to state via getState();
   -Allows state to be updated via dispatch(action);
   -Registers listeners via subscribe(listener);
   -Handles unregistering of listeners via the function returned by subscribe(listener).
*/

import { createStore } from 'redux';
import yakRedux from '../Reducers/reducers';


let store = createStore(yakRedux);

// var stateTree = {
//   [
//     // Y Component
//     {
//       items: {/* obj */},
//       alerts: { /* obj */ },
//       position: {/* passed an object containing lat/long */},
//     },
//     // Inside Y Component
//     {
//       item: {}
//     }
//
//   ]
// }
