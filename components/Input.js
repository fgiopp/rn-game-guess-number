import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = props =>{
    return (
        // {...props} forward the props to the component (in this example to TextInput)
        <TextInput {...props} style={{...styles.input, ...props.style}}>
            
        </TextInput>
    )
};

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical: 10
    }
});

export default Input;
