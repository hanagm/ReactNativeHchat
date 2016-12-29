/**
 * Created by lihejia on 16/12/22.
 */
import Meteor from 'react-native-meteor';

export default function() {
    const url = 'ws://localhost:3000/websocket';
    Meteor.connect(url);
}
