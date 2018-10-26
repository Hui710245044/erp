/**
 * Created by RondaFul on 2017/3/9.
 */
import {http} from '../lib/http-plus';

//获取采购员
export const url_publish_edit_user = "get|user/buyer/staffs";
export const publish_edit_user = function(){
  return http(url_publish_edit_user)
};

//获取供应商
export const url_publish_edit_supplier = "get|supplier";
export const publish_edit_supplier = function(){
  return http(url_publish_edit_supplier)
};

//获取列表
export const url_finance_list = "get|finance-purchase";
export const api_finance_list = function(data){
  return http(url_finance_list,data)
};

//付款
export const url_finance_pay = "post|finance-purchase/batchChangeStatus";
export const api_finance_pay = function(data){
  return http(url_finance_pay,data)
};
//付款s
export const url_cancel_pay = "post|finance-purchase/batchChangeStatus";
export const api_cancel_pay = function(data){
    return http(url_cancel_pay,data)
};
//采购结算导出finance-purchase/export
export const url_finance_purchase_export = "post|finance-purchase/export";
export const api_finance_purchase_export = function(data){
    return http(url_finance_purchase_export,data,{
        contentType:'application/x-www-form-urlencoded',
        timeout:120000
    })
};
//付款申请导出purchase-apply/export
export const url_purchase_apply_export = "post|purchase-apply/export";
export const api_purchase_apply_export = function(data){
    return http(url_purchase_apply_export,data)
};
