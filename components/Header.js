import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import TitleText from '../components/TitleText';

const Header = props => {
    return (
        <View style={{...styles.headerBase, ...Platform.select({ios: styles.headerIOS, android: styles.headerAndroid})}}>
            <TitleText style={styles.headerTitle}>{props.title}</TitleText>
        </View>
    );
};

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        //backgroundColor: Platform.OS === 'android' ? Colors.primary: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        //borderBottomColor: Platform.OS === 'ios' ? '#ccc': 'white',
        //borderBottomWidth: Platform.OS == 'ios' ? 1: 0
    },
    headerIOS:{
        backgroundColor: 'white',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    headerAndroid:{
        backgroundColor: Colors.primary
    },
    headerTitle: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'open-sans-bold',
        color: Platform.OS === 'ios' ? Colors.primary: 'white'
    }
});

export default Header;
