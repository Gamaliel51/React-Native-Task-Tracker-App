/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';

const  HeadingText = () => {
    return (
        <View style={styles.headingtextview}>
            <Text style={styles.headingtext}>TASKS TODO</Text>
        </View>
    )
}

export default HeadingText;