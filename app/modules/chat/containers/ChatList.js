/**
 * Created by lihejia on 16/12/22.
 */

import React from 'react';
import {
    Text
} from 'react-native';
import Meteor,{createContainer} from 'react-native-meteor';
import _ from 'underscore';


import HomePage from '../components/HomePage';

const HomeView =createContainer((props)=>{

    const handle= Meteor.subscribe('contacts');
    let ready=handle.ready();

    let contactList=[];


    if(ready){
        contactList=Meteor.collection('contacts').find({}).map((ele)=>{
            let userInfo=_.findWhere(Meteor.collection('userInfo').find({}),{userId:ele.friendId});
            let contact={
                _id:ele._id,
                userInfo
            }
            return contact
        })
    }

    return {
        ...props,
        contactList,
        ready:ready,

    }


},HomePage)

export  default  HomeView;