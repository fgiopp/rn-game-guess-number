import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    KeyboardAvoidingView,
} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/Colors';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState();
    const [confirmed, setConfirmed] = useState('');
    const [selectedNumber, setSeletedNumber] = useState();
    const [buttonWith, setButtonWith] = useState(Dimensions.get('window').width / 4);
    const [buttonHeight, setButtonHeight] = useState(Dimensions.get('window').height / 4);



    const numberInputHandler = value => { // here value can be whatever name like as inputText
        setEnteredValue(value.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    useEffect(() => {
        const updateLayout = () =>{
            setButtonWith(Dimensions.get('window').width / 4);
        };
        Dimensions.addEventListener('change', updateLayout);
        return () =>{
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid Number', 'Number has to be a number between 1 and 99',
                [{ text: 'OK', style: 'destructive', onPress: resetInputHandler }]);
            return;
        }
        setSeletedNumber(chosenNumber);
        setConfirmed(true);
        setEnteredValue('');
        Keyboard.dismiss();
    }

    let confirmedOutput;
    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer} >
                <BodyText> You Select </BodyText>
                <NumberContainer>
                    {selectedNumber}
                </NumberContainer>
                <MainButton onPressCustomButton={() => props.onStartGame(selectedNumber)}>
                    {"START GAME"}
                </MainButton>
            </Card>
        )
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                    <View style={styles.screen}>
                        <TitleText style={styles.title}> The Game Screen</TitleText>
                        <Card style={styles.inputContainer}>
                            <BodyText> Select a Number </BodyText>
                            <Input style={styles.input}
                                blurOnSubmit autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType='number-pad'
                                maxLength={2}
                                onChangeText={numberInputHandler}
                                value={enteredValue} />
                            <View style={styles.buttonContainer} >
                                <View style={{width: buttonWith}}>
                                    <Button title="Reset" onPress={resetInputHandler} color={Colors.accent} />
                                </View>
                                <View style={{width: buttonWith}}>
                                    <Button title="Confimr" onPress={confirmInputHandler} color={Colors.primary} />
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    button: {
        //width: 100,
        width: Dimensions.get('window').width / 4
    },
    input: {
        width: 50,
        textAlign: 'center',
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen;
