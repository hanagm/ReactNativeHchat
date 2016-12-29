/**
 * Created by lihejia on 16/12/23.
 */
import React, {
    PropTypes,
} from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';


import Icon from 'react-native-vector-icons/Ionicons';

const propTypes = {
    selected: PropTypes.bool,
    title: PropTypes.string,
};

const TabIcon = (props) => {
    let color =props.selected?'#42d17f':'#a9a9a9';


    return (
        <View style={styles.container}>
            <View >
                <Icon name={props.selected?'ios-chatbubbles':'ios-chatbubbles-outline'}
                      style={styles.icon}
                      color = {color} />
            </View>
            <View>
                <Text
                    style={[{ color:color },styles.text]}
                >
                    {props.title}
                </Text>
            </View>


        </View>
    )

};

const styles=StyleSheet.create({
    container:{
        flexDirection:'column',
        alignItems:'center',
    },
    text:{
        fontSize:10,
    },
    icon:{
        fontSize:30,
    }
})

TabIcon.propTypes = propTypes;

export default TabIcon;
