/**
 * Created by lihejia on 16/12/27.
 */

import React from 'react';
import {
    Text,
    View
} from 'react-native';
import Meteor,{ createContainer } from 'react-native-meteor';


import Message from '../components/Message';
import MessageSend from '../components/MessageSend';

const MessageView =(props)=> {

    let {messages,userInfo}=props;

    console.log("messages",messages);

    const messageProps={
        userInfo,
        dataSource:messages
    }


    const inputProps={
        onPress:function (data) {
            let MesColl=Meteor.collection('messages');
            let insert = {
                //发送内容
                content: data,
                status:-1, //设置发送中
                from:Meteor.userId(),
                //发送至
                to: userInfo.userId
            }
            MesColl.insert(insert);
        }
    }

    return (
        <View style={{flex: 1,marginBottom: 0, marginTop: 1}}>

            <Message {...messageProps }/>

            <MessageSend {...inputProps } />
        </View>
    )
}



const MeteorContainer=createContainer((props)=>{
    let userId=Meteor.userId();
    let userInfo=props.userInfo;

    let messages=[];
    let ready=Meteor.subscribe('messages',userInfo.userId).ready();

    if(userId&&ready){
        const MesColl=Meteor.collection('messages');

        messages =MesColl.find()
    }

    return {
        ...props,
        messages,
        ready
    }

},MessageView)



export  default  MeteorContainer;