// This is our redux wrapper for the YakView component.
// it injects the state and dispatch functions via props.
'use strict';

import { View } from 'react-native';
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import YakView from '../Components/YakView';
import * as YakActions from '../Actions/addYak';
import * as YakViewActions from '../Actions/addComment';

class YakViewContainer extends Component {
  render() {
    return (
      <YakView {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  return {
    commentList: state.yakView.commentList,
    // score: state.yakView.yakScore,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(YakViewActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(YakViewContainer);
