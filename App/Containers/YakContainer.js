// This is our redux wrapper for the main component.
// it injects the state and dispatch functions via props.
'use strict';

import { View } from 'react-native';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import Yak from '../Components/Yak';
import addNewYak from '../Actions/addYak';
import { watchYakAddedEvent } from '../Actions/yakAdded';
// actions imports

class YakContainer extends Component {
  render() {
    return (
      <Yak {...this.props} />
    );
  }
}
function mapStateToProps(state) {
  return {
    yak: state.yak
  };
}

function mapDispatchToProps(dispatch) {
  //newPostaddedEvent listener goes here
  watchYakAddedEvent(dispatch);
  return {
    // dispatch here
    onAddYak: (yakContent) => dispatch(addNewYak(yakContent))
  };
}

// const appContainer = connect(mapStateToProps,mapDispatchToProps)(Yak);

export default connect(mapStateToProps, mapDispatchToProps)(YakContainer);
