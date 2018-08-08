//
//ViewUploadCredentials.js
//
//enter credentials and initiate upload


'use strict';

var React = require('react-native');
var Button = require('./Button');
var TextInputRegular = require('./input/TextInputRegular');

import Store from 'react-native-store';

const DB = {
    'credentials': Store.model('credentials')
}

var {
    StyleSheet,
    View,
    TouchableHighlight,
    Text,
    ScrollView,
    LinkingIOS,
    ProgressViewIOS,
    AlertIOS,
    Component
} = React;


var styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 65,
        flexDirection: 'column',
        alignItems: 'stretch',
        backgroundColor: '#222222'
    },
    bodyContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
    },
    rowContainer: {
        paddingHorizontal: 30,
        paddingTop: 20,
        paddingBottom: 10
    },
    mainText: {
        fontSize: 24,
        textAlign: 'center',
        color: '#dddddd'
    },
    separator: {
        height: 1,
        backgroundColor: '#222222'
    },
    summary: {
        fontSize: 20,
        textAlign: 'center',
        color: '#e65c5c',
        paddingHorizontal: 10,
        paddingBottom: 5
    }
});




class ViewUploadCredentials extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
            email: this.props.email,
            isBadCredentials: false
        };
    }

    _verifyUser() {
        var name = this.state.name;
        var email = this.state.email;
        var regex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");

        //confirm that name and email aren't null or formatted incorrectly
        if(!name || !email || !regex.test(email)) {
            this.setState({ isBadCredentials: true });
            return false;
        }

        var credentials = {
            name: this.state.name,
            email: this.state.email
        };

        this.props.completeCredentials(credentials);
    }


    render() {
        var errorMessage = this.state.isBadCredentials ? 'Name and valid email required' : ' ';

        return (
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <Text style={styles.mainText}>Enter Credentials</Text>
                </View>
                <View style={styles.bodyContainer}>
                    <Text style={styles.summary}>{errorMessage}</Text>
                    <TextInputRegular
                        defaultValue={this.props.name}
                        placeholder='Name'
                        onChangeText={(text) => this.setState({ name: text })} />
                    <View style={styles.separator} />
                    <TextInputRegular
                        defaultValue={this.props.email}
                        placeholder='Email'
                        keyboardType='email-address'
                        onChangeText={(text) => this.setState({ email: text })}
                        autoCapitalize='none' />
                    <View style={styles.separator} />
                </View>
                <View>
                    <Button view='high' text='Upload' onPress={() => this._verifyUser()} />
                </View>
            </View>
        );
    }
}


module.exports = ViewUploadCredentials;
