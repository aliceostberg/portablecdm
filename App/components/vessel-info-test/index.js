import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';

import {
  Text,
} from 'react-native-elements';
import TopHeader from '../top-header-view';
import colorScheme from '../../config/colors';

import {
    fetchVesselFromIMO
} from '../../actions';

import ships from '../../assets/ships';

class VesselInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            extraInfo: undefined,
        };
    }

    componentDidMount() {
        this.props.fetchVesselFromIMO(this.props.vessel.imo.split('IMO:')[1]).then(() => {
            // DOUBLE EQUALS!!
            const ship = ships.find(ship => ship.mmsi == this.props.vessel.mmsi.split('MMSI:')[1]);
            this.setState({extraInfo: ship});
        });
    }


  render(){
    const { extraInfo } = this.state;
    const { navigate, state } = this.props.navigation;
    const { selectedPortCall, activeItemKey } = this.props;
    const vessel = this.props.extendedVessel ? this.props.extendedVessel : this.props.vessel;

    return(

      <View style={styles.container}>
        <TopHeader title = 'Vessel Test' firstPage navigation={this.props.navigation} rightIconFunction={this.goToStateList}/>

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




        <View>
        <View style={styles.EditorContainer}>
        <Text style={styles.infoText}>{"Kommentarsfält"}</Text>
          <TextInput style={styles.EditorContainer}
            onChangeText={(text) => this.setState({input: text})}
          />
          <Text>{this.state.input}</Text>
        </View>



        </View>
      </View>
    );
  }
}

/*class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h3",
        null,
        "TODO"
      ),
      React.createElement(TodoList, { items: this.state.items }),
      React.createElement(
        "form",
        { onSubmit: this.handleSubmit },
        React.createElement(
          "label",
          { htmlFor: "new-todo" },
          "What needs to be done?"
        ),
        React.createElement("input", {
          id: "new-todo",
          onChange: this.handleChange,
          value: this.state.text
        }),
        React.createElement(
          "button",
          null,
          "Add #",
          this.state.items.length + 1
        )
      )
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: ''
    }));
  }
}

class TodoList extends React.Component {
  render() {
    return React.createElement(
      "ul",
      null,
      this.props.items.map(item => React.createElement(
        "li",
        { key: item.id },
        item.text
      ))
    );
  }
}
render(React.createElement(TodoApp, null), mountNode);
*/
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

//{height: 40, borderColor: 'gray', borderWidth: 1}


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
    }
}

export default connect(mapStateToProps, {
    fetchVesselFromIMO,
})(VesselInfo);
