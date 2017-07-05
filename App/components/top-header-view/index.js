import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import { 
  Text,
  Header,
  Icon,
  Button
} from 'react-native-elements';

import colorScheme from '../../config/colors';

// Class showing the first header. The header should later adjust to other pages. 
export default class TopHeader extends Component {
  render() {
    const {title} = this.props;
//  const {navigation} = this.props; // Testade om det gick att navigera med knapparna...
//  const {navigate} = navigation;

    return(
      <View style={styles.container}>
          <Icon
            name='menu'
            color= {colorScheme.primaryContainerColor}
            size = {50}
            onPress={() => console.log('Menu button was pressed')}
            // onPress={() => navigate('SideBarMenu')}
          /> 
          <Text 
            style= {styles.headerText} 
            h4 
          >
            {title}
          </Text>
          <Icon
            name='add-circle'
            size = {50}
            color= {colorScheme.primaryContainerColor}
            onPress={() => console.log('Adding button was pressed')}
          />

    </View>
    );
  }
}
// 
const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    backgroundColor: colorScheme.primaryColor,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: {
      color: colorScheme.primaryTextColor,
  },
  signText: {
    color: colorScheme.primaryTextColor,
  }
});

