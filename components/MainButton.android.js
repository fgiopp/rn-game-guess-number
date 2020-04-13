import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Colors from '../constants/Colors';



const MainButton = props => {

    return (
        <View style={styles.ButtonContainer}>
            <TouchableNativeFeedback activeOpacity={0.6} onPress={props.onPressCustomButton}>
                <View style={styles.button}>
                    <Text style={{ ...styles.buttonText, ...props.style }}>
                        {props.children}
                    </Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    ButtonContainer: {
        borderRadius: 25,
        overflow: 'hidden'
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25
    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18
    }
});

export default MainButton;