import {http} from '../lib/http-plus';

//今日看盘接口
export const url_report_today = "get|warehouse/report/today";
export const api_report_today = function (data) {
    return http(url_report_today, data, {
        contentType: 'application/x-www-form-urlencoded',
        timeout: INFINITE
    });
};
