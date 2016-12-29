/**
 * Created by lihejia on 16/12/26.
 */
import moment from 'moment';

export  default {
    // Short representation of time in the past.
    shortDateFormat(time) {

        if(!time){
            return "";
        }
        let then=moment(time);

        var now = moment();
        if (then.year() == now.year()) {
            if (then.month() == now.month() && then.day() == now.day()) {
                return then.format("HH:mm");
            } else {
                return then.format("MM-DD");
            }
        }
        return then.format("YYYY-MM-DD");
    }
}