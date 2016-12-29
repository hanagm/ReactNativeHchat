/**
 * Created by lihejia on 16/12/22.
 */
import React,{Component} from 'react';
import {
    TabBarIOS,
    Text,
    View,
    Image,
    StatusBar,
    NavigatorIOS
}from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';


import Home from '../chat/containers/ChatList';
import Contacts from '../contacts/containers/Contacts';
import Me from '../me/containers/Me';



class  Main extends  Component{
    constructor(props){
        super(props);
        this.state={
            //当前选中的tab
            selectedTab:"chat"
        }
        StatusBar.hidden=true;
    }



    render(){

        return(
            <TabBarIOS
                tintColor="#42d17f"
                translucent={true}
                barTintColor="#eee">
                <Icon.TabBarItemIOS
                    title="Chat"
                    iconName="ios-chatbubbles-outline"
                    selectedIconName="ios-chatbubbles"
                    selected={this.state.selectedTab === 'Chat'}
                    onPress={() => {
                    this.setState({
                      selectedTab: 'Chat',
                    });
          }}>

                    <Home />
                </Icon.TabBarItemIOS>
                <Icon.TabBarItemIOS
                    title="Contacts"
                    iconName="ios-people-outline"
                    selectedIconName="ios-people"
                    selected={this.state.selectedTab === 'Contacts'}
                    onPress={() => {
                    this.setState({
                      selectedTab: 'Contacts',
                    });
          }}>
                    <Contacts />
                </Icon.TabBarItemIOS>
                <Icon.TabBarItemIOS
                    title="Me"
                    iconName="ios-person-outline"
                    selectedIconName="ios-person"
                    selected={this.state.selectedTab === 'Me'}
                    onPress={() => {
            this.setState({
              selectedTab: 'Me',
            });
          }}>
                    <Me />
                </Icon.TabBarItemIOS>
            </TabBarIOS>
        )
    }
}
export  default  Main;

