import React from 'react';
import {View, StyleSheet} from 'react-native';
import moment from 'moment';

const Time = ({time, onTimeChange}) => {
    return (
       <View>
           <Text
               style={styles.timerText}
               value={time}
             //  onChange={newTime => onTimeChange}
           />
       </View>
    );
};

const styles = StyleSheet.create({
    timerText : {
        fontSize: 14,
        fontWeight: "400",
        color : 'darkgreen',
    },
});

export default  Time;