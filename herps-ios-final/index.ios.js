'use strict';

var React = require('react-native');
var Welcome = require('./components/Welcome');
var ViewUpload = require('./components/ViewUpload');

var {
    StyleSheet,
    Component,
    NavigatorIOS
} = React;

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});



class HerpProjectApp extends Component {
    uploadPressed() {
        this.navigator.push({
            title: "Upload Data",
            component: ViewUpload,
            leftButtonTitle: 'Back',
            onLeftButtonPress: () => this.navigator.pop(),
        });
    }


    render() {

        return (
            <NavigatorIOS
                ref={(r) => this.navigator = r}
                style={styles.container}
                barTintColor='#494c2d'
                tintColor='#ffffff'
                titleTextColor='#ffffff'
                initialRoute={{
                    title: 'Welcome',
                    component: Welcome,
                    rightButtonTitle: 'Upload',
                    onRightButtonPress: () => { this.uploadPressed() },
                }} />
            );

    }
}

React.AppRegistry.registerComponent('HerpProject', function() { return HerpProjectApp; });
