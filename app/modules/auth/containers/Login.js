/**
 * Created by lihejia on 16/12/26.
 */

import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight
} from 'react-native';
import Meteor from 'react-native-meteor';
import {Actions} from 'react-native-router-flux';


import Util from '../../../utils/util';

import _ from 'underscore';

class  LoginView extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            msg:''
        }
    }

    //账号
    usernameHandle(text){
        this.setState({username:text})
    }

    passwordHandle(text){
        this.setState({password:text})
    }

    login(e){
        let username=this.state.username;
        let password=this.state.password;
        if(!_.isEmpty(username)&&!_.isEmpty(password)){
            console.log("eeeee",this.state);
            Meteor.loginWithPassword(username,password,(err)=>{
                if(err){
                    this.setState({msg:err.reason})
                    return;
                }

                console.log(Meteor.loggingIn())
                Actions.main();
            })
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <TextInput  style={styles.input}
                                autoFocus
                                autoCapitalize='none'
                                clearButtonMode="never"
                                placeholder="用户名"

                                onChangeText={(t)=>this.usernameHandle(t)}
                    />
                </View>
                <View>
                    <TextInput  style={styles.input}
                                autoFocus
                                password
                                clearButtonMode="never"
                                autoCapitalize='none'
                                placeholder="密码"
                                onChangeText={(t)=>this.passwordHandle(t)}
                    />
                </View>
                <View>
                    <TouchableHighlight  style={styles.button}
                                         underlayColor='#eee'
                                         onPress={(e)=>this.login(e)}
                    >
                        <Text style={{fontSize:20,justifyContent:'center'}}>
                            登录
                        </Text>
                    </TouchableHighlight>
                </View>
                <Text>{this.state.msg}</Text>
            </View>
        )
    }

}

const styles=StyleSheet.create({
    container:{
        flexDirection:'column',
        backgroundColor: '#42d17f',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    form:{
      flexDirection:'row',
        alignItems:'center'
    },
    text:{
        height:40,
    },
    input:{
        height: 30,
        width:Util.size.width-30,
        borderWidth: 1,
        marginLeft: 5,
        paddingLeft: 5,
        borderColor: '#CCC',
        borderRadius: 4,
        backgroundColor:'#fff'
    },
    button:{
        width:Util.size.width-20,
        height:35,
        backgroundColor:'#fff',
        alignItems:'center',
        marginTop:15,
    }

})



export  default LoginView;

