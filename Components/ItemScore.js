import React, { Text, Component} from 'react-native';

class ItemScore extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Text>{this.score}pts</Text>
    );
  }
}


module.exports = ItemScore;
