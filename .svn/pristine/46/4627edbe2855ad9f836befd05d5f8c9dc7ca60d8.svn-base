/**
 * Created by RondaFul on 2017/3/30.
 */
import {http} from '../lib/http-plus';
//获取采购员
export const url_publish_edit_user= "get|user/purchase/staffs";
export const publish_edit_user  = function() {
    return http(Url2(url_publish_edit_user));
};

//获取列表
export const url_finance_list= "get|purchase-apply";
export const api_finance_list  = function(data) {
    return http(Url2(url_finance_list),data);
};
//审核通过
export const url_finance_pay= "post|purchase-apply/batchChangeStatus";
export const api_finance_pay  = function(data) {
    return http(Url2(url_finance_pay),data);
};