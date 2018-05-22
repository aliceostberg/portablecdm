import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  Button,
  AsyncStorage
} from 'react-native';

import {
  Text,
} from 'react-native-elements';
import TopHeader from '../top-header-view';
import colorScheme from '../../config/colors';

import {
    fetchVesselFromIMO,
    changeComment
} from '../../actions';

import ships from '../../assets/ships';

class VesselInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: [props.comment]
        };
        this.state = {
            extraInfo: undefined,

        myKey: null
        };
    }

    componentDidMount() {
        this.props.fetchVesselFromIMO(this.props.vessel.imo.split('IMO:')[1]).then(() => {
            // DOUBLE EQUALS!!
            const ship = ships.find(ship => ship.mmsi == this.props.vessel.mmsi.split('MMSI:')[1]);
            this.setState({extraInfo: ship});
        });
    }

    async postNewComment() {
      console.log("Posting new comment: " + this.state.newComment)
      this.saveKey(this.state.newComment)
      this.setState({newComment: ""});
    }


    async getKey() {
       try {
         const text = this.props.comment;
         this.setState({comment: text});
       } catch (error) {
         console.log("Error retrieving data" + error);
       }
     }



     async saveKey(text) {
       console.log("Adding text" + text)

      this.props.changeComment(text)

     }

     async resetKey() {
       try {
         await AsyncStorage.removeItem('@MySuperStore:key');
         const text = await AsyncStorage.getItem('@MySuperStore:key');
         this.setState({myKey: text});
       } catch (error) {
         console.log("Error resetting data" + error);
       }
     }
  render(){
    const { extraInfo } = this.state;
    const { navigate, state } = this.props.navigation;
    const { selectedPortCall, activeItemKey } = this.props;
    const { comment } = this.props;
    const { temp } = '';
    const vessel = this.props.extendedVessel ? this.props.extendedVessel : this.props.vessel;

    return(

      <View style={styles.container}>
        <TopHeader title = 'Vessel Test' firstPage navigation={this.props.navigation} rightIconFunction={this.goToStateList}/>

        <ScrollView>
        <View style={styles.pictureContainer}>
          <Image
            style={{
            width: Dimensions.get('window').width-20,
            height: Dimensions.get('window').height/4,
            borderRadius: 5,
            }}
            source={{uri:vessel.photoURL }}
            />
        </View>

        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{vessel.name}</Text>
        </View>

        <View style={styles.infoContainer}>
          {!!vessel.vesselType &&
          <Text style={styles.infoText}><Text style={{fontWeight: 'bold'}}>Vessel Type:  </Text>{"Testmiljö"}</Text>
          }
          <Text style={styles.infoText}><Text style={{fontWeight: 'bold'}}>IMO:  </Text>{vessel.imo.replace('urn:mrn:stm:vessel:IMO:', '')}</Text>
          <Text style={styles.infoText}><Text style={{fontWeight: 'bold'}}>MMSI:  </Text>{vessel.mmsi.replace('urn:mrn:stm:vessel:MMSI:', '')}</Text>
          <Text style={styles.infoText}><Text style={{fontWeight: 'bold'}}>Call Sign:  </Text>{vessel.callSign}</Text>

          {!!vessel.flag &&
          <Text style={styles.infoText}><Text style={{fontWeight: 'bold'}}>Flag: </Text>{vessel.flag}</Text>
          }
          {!!vessel.builtYear &&
          <Text style={styles.infoText}><Text style={{fontWeight: 'bold'}}>Built year: </Text>{vessel.builtYear}</Text>
          }
          {(!!extraInfo && !!extraInfo.length) &&
            <Text style={styles.infoText}><Text style={{fontWeight: 'bold'}}>Length: </Text>{extraInfo.length}m</Text>
          }
          {(!!extraInfo && !!extraInfo.beam) &&
            <Text style={styles.infoText}><Text style={{fontWeight: 'bold'}}>Beam: </Text>{extraInfo.beam}m</Text>
          }
          {(!!extraInfo && !!extraInfo.tonnage) &&
            <Text style={styles.infoText}><Text style={{fontWeight: 'bold'}}>Tonnage: </Text>{extraInfo.tonnage}kg</Text>
          }

          {(!!extraInfo && !!extraInfo.phoneNumber) &&
            <Text style={styles.infoText}><Text style={{fontWeight: 'bold'}}>Phone number: </Text>{extraInfo.phoneNumber}</Text>
          }

        </View>





        <View style={styles.EditorContainer}>
        <Text style={styles.infoText}>{"Kommentarsfält"}</Text>

          <TextInput style={styles.EditorContainer}
          ref= "textField"
          placeholder="Skriv din kommentar här"
          onChangeText={(text) => this.setState({newComment: text})}
          value={this.state.newComment}




          />

        </View>
        <Button
                style={styles.formButton}
                onPress={this.postNewComment.bind(this)}
                title="Posta din kommentar"
                color="#2196f3"
                accessibilityLabel="Posta din kommentar"
              />


        <View style={styles.EditorContainer}>
        <Text style={styles.infoText}>{"Tidigare kommentarer"}</Text>
        { comment.map(function(name, index){
            return <Text key={ index } style={styles.comment}> - {name}</Text>;
        }) }
        </View>

        </ScrollView>
      </View>
    );
  }// slut på render
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorScheme.backgroundColor,
  },
  pictureContainer: {
    backgroundColor: colorScheme.backgroundColor,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  comment: {
    marginTop: 10,
  },
  headerContainer: {
    backgroundColor: colorScheme.primaryContainerColor,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  headerText: {
    textAlign: 'center',
    color: colorScheme.quaternaryTextColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: colorScheme.primaryContainerColor,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    flexDirection: 'column',
    borderRadius: 5,
  },
    EditorContainer: {
    backgroundColor: colorScheme.primaryContainerColor,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    flexDirection: 'column',
    borderRadius: 5,



},
  infoText: {
    fontSize: 14,
    color: colorScheme.quaternaryTextColor,
  },
})

function mapStateToProps(state) {
    return {
        selectedPortCall: state.portCalls.selectedPortCall,
        vessel: state.portCalls.vessel,
        extendedVessel: state.vessel.vessel,
        comment: state.settings.comment,

    }
}

export default connect(mapStateToProps, {
    fetchVesselFromIMO,
    changeComment,
})(VesselInfo);
