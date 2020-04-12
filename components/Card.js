import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
    // spread operator pulls all the key value of an object out of an object and add to a new sourrounding object
    return (<View style={{ ...styles.card, ...props.style }}>
                {props.children}
            </View>
    );
};

const styles = StyleSheet.create({
    card: {
        // shadows works only on iOS
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        // elevation works only on Andoroid
        elevation: 5,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
    }
})


export default Card;
