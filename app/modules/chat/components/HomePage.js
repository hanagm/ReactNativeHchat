/**
 * Created by lihejia on 16/12/26.
 */

import React,{Component} from 'react';

import {
    Text,
    Image,
    View,
    ListView,
    TouchableHighlight,
} from 'react-native';

import Swipeout from 'react-native-swipeout';
import {Actions} from 'react-native-router-flux';

import styles from '../../styles/index';
import Loading from '../../common/LoadMoreFooter';
import DateUtil from '../../../utils/DateUtil';


const { homePageStyles } = styles;

const HomePage =(props)=>{

    let {contactList,ready} =props;

    if(!ready){
        return <Loading text="loading..." />
    }



    //删除选中
    function deleteRow(sectionId,rowId) {

    }

    //跳转到聊天窗口
   function gotoChat(data,rowId){
        let {userInfo}=data;
        Actions.chatMessage({userInfo});
    }

    //渲染列表
    function renderRow(rowData, sectionID, rowID) {

       if(!rowData){
           return <Loading text="暂无数据" />
       }


      // console.log("render data",rowData.userInfo.nikename,rowData.userInfo.avatar)
        let swipeBtns = [{
            text: 'Delete',
            backgroundColor: 'red',
            underlayColor: 'rgba(0,0,0,0.6)',
            onPress: () => {deleteRow(sectionID, rowID)}
        }];

        return(
            <Swipeout
                right={swipeBtns}
                autoClose={true}
                backgroundColor='transparent'
            >
                <TouchableHighlight
                    underlayColor='#eee'
                    onPress={() => gotoChat(rowData, rowID) }
                >
                    <View style={homePageStyles.rows.row}>
                        <View style={homePageStyles.rows.avatarContainer}>
                            <Image source={{uri: rowData.userInfo.avatar}} style={homePageStyles.rows.avatar} />
                        </View>
                        <View style={{flex: 1}}>
                            <View style={homePageStyles.rows.info}>
                                <Text style={homePageStyles.rows.name}>{ rowData.userInfo.nikename }</Text>
                                <Text style={homePageStyles.rows.date}>{ DateUtil.shortDateFormat(new Date()) }</Text>
                            </View>
                            <Text style={homePageStyles.rows.description} numberOfLines={1}>{ "desc" }</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </Swipeout>
        )
    }



    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

   console.log(contactList)
    dataSource=ds.cloneWithRows(contactList);


    return (
        <ListView
            onLayout={(event) => {
                let {x, y, width, height} = event.nativeEvent.layout;
                console.log(x,y,width,height);
              }}
            enableEmptySections={true}
            dataSource={dataSource}
            //onEndReached={this.loadMore.bind(this)}
            onEndReachedThreshold={20}
            // renderFooter={this._renderFooter.bind(this)}
            renderRow={ renderRow}
        />
    )


    return (
        <ListView
            onLayout={(event) => {
                let {x, y, width, height} = event.nativeEvent.layout;
              }}
            enableEmptySections={true}
            dataSource={dataSource}
            //onEndReached={this.loadMore.bind(this)}
            onEndReachedThreshold={20}
           // renderFooter={this._renderFooter.bind(this)}
            renderRow={ renderRow}
        />
    )
}

export  default  HomePage;