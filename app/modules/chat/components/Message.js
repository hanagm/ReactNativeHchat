/**
 * Created by lihejia on 16/12/28.
 */


import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    NavigatorIOS,
    Text,
    Image,
    View,
    ListView,
    AlertIOS,
    TextInput,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';

import Meteor from 'react-native-meteor';

import InvertibleScrollView from 'react-native-invertible-scroll-view';

export  default class  MessageView extends  React.Component{

    constructor(props){
        super(props);
    }

    _renderRow(rowData: object, sectionID: number, rowID: number) {
        // render leftMessage
        let userId=Meteor.userId();

        if (rowData.from !== userId){

            return(
                <Message
                    position="left"
                    data={rowData}
                    userInfo={this.props.userInfo}
                />
            )
        }

        // render time
        let now = new Date().getTime()/1000;
        let t = new Date(rowData.time);
        let _t = t.getTime()/1000;

        // if ( now - _t > 150 ) {
        //   return(
        //     <Time time={t.toUTCString()} />
        //   )
        // }

        // render rightMessage
        return(
            <Message
                position="right"
                data={rowData}
                userInfo={this.props.userInfo}
            />
        )
    }
    render(){
        let { dataSource } =this.props;
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        const data= ds.cloneWithRows(dataSource)
        console.log(data);
        return (
            <View style={{flexDirection:'column'}}>
                <ListView
                    ref="listview"
                    onLayout={(event) => {
                      let {x, y, width, height} = event.nativeEvent.layout;

                    }}
                    renderScrollComponent={props => <InvertibleScrollView {...props} />}
                    enableEmptySections={true}
                    automaticallyAdjustContentInsets={false}
                    dataSource={data}
                    renderRow={ this._renderRow.bind(this) }
                />
            </View>
        )
    }
}




 class Message extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

   static propTypes: {
        position: PropTypes.string,
        data: PropTypes.object
    }

    render() {
        let { position,data,userInfo } = this.props;
        console.log(data);
        return(
            <View style={ position === 'left' ? {flexDirection: 'row'} : {flexDirection: 'row-reverse'} }>
                <View style={ messageStyles.avatarContainer }>
                    <Image source={{uri: userInfo.avatar}} style={messageStyles.avatar} />
                </View>
                <View style={ messageStyles.messageWrap }>
                    <View style={position === 'left' ? messageStyles.messageContent : messageStyles.rightMessageContent }>
                        <Text style={ messageStyles.messageText }>
                            { data.content }
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}



let messageStyles = {
    container: {
        flexDirection: 'row-reverse',
    },
    avatarContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        width: 60,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 5
    },
    messageWrap: {
        flex: 1,
        paddingBottom: 10,
        paddingTop: 10
    },
    messageContent: {
        flexWrap: 'wrap',
        alignSelf: 'flex-start',
        backgroundColor: '#eee',
        borderRadius: 3,
        marginRight: 45,
    },
    messageText: {
        borderRadius: 3,
        padding: 12,
    },
    rightMessageContent: {
        flexWrap: 'wrap',
        alignSelf: 'flex-end',
        backgroundColor: 'green',
        borderRadius: 3,
        marginLeft: 45,
    }
}