/**
 * Created by lihejia on 16/12/22.
 */


import React,{PropTypes,Component} from 'react';

import {
    StyleSheet,
    NavigatorIOS
}from 'react-native'
import {
    Router,
    Scene,
} from 'react-native-router-flux';

import Meteor from 'react-native-meteor';

import connect from './connect';


import Chat from './modules/chat/containers/ChatList';
import Contacts from './modules/contacts/containers/Contacts';
import Meme from './modules/me/containers/Me';
import Login from './modules/auth/containers/Login';
import ChatMessage from './modules/chat/containers/MessageView';


import TabIcon from './modules/common/TabIcon';

// define this based on the styles/dimensions you use
const getSceneStyle = ( props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
    };
    if (computedProps.isActive) {
        style.marginTop = computedProps.hideNavBar ? 0 : 64;
        style.marginBottom = computedProps.hideTabBar ? 0 : 50;
    }
    return style;
};





class  App extends  Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        //链接Meteor服务器
        connect();

        console.log("connect")
    }

    onRightButtonPress(){
            this.refs.nav.push({
            title: 'push view',
            component: "",
        });
    }

    chatMessageTitle(data){
        if(data.userInfo){
            return data.userInfo.nikename;
        }
        return "";
    }

    render(){

        //判断当前用户是否已登录,来确定默认首页
        console.log(Meteor.loggingIn(),Meteor.user())
        let loginInitial=false;
        let mainInitial=true;
       /* if(!Meteor.user()){
            loginInitial=true;
        }else{
            mainInitial=true;
        }*/

        return(
            <Router getSceneStyle={getSceneStyle}>
                    <Scene key="root">
                        <Scene key="login"
                               hideNavBar
                               hideTabBar
                               initial={loginInitial}
                               title="login"
                               component={Login}
                        />

                         <Scene key="main"
                                tabs
                                direction="vertical"
                                initial={mainInitial}
                                tabBarStyle={styles.tabBarStyle}
                                tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
                         >
                             <Scene key="home"
                                    navigationBarStyle={styles.navigationBar}
                                    titleStyle={styles.title}
                                    titleWrapperStyle={styles.titleView}
                                    icon={TabIcon}
                                    title="联系人"
                                    component={Chat }/>
                             <Scene key="contact"
                                    navigationBarStyle={styles.navigationBar}
                                    titleStyle={styles.title}
                                    title="通讯录"
                                    icon={TabIcon}
                                    component={Contacts}/>
                             <Scene key="me"
                                    navigationBarStyle={styles.navigationBar}
                                    titleStyle={styles.title}
                                    title="我的"
                                    icon={TabIcon}
                                    component={Meme}/>

                         </Scene>

                        <Scene key="chatMessage"
                               navigationBarStyle={styles.navigationBar}
                               titleStyle={styles.title}
                               titleWrapperStyle={styles.titleView}
                               getTitle={(navState)=>this.chatMessageTitle(navState)}
                               component={ChatMessage}

                        />
                    </Scene>

            </Router>
        )
    }
}


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarStyle: {
        backgroundColor: '#eee',

    },
    titleView:{
      height:50,
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#ddd',
    },
    navigationBar:{
        backgroundColor: '#42d17f',
    },
    title:{
        fontSize:16,
        color:'#fff'
    }
});

export  default  App;

