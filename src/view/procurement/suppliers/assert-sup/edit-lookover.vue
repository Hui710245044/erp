<template>
    <el-row>
        <page-dialog :title="title" v-model="dialog" @open="open"  width="650px"  left="30%" size="full" :close-on-click-modal="false" class="suppliers-edit">
            <el-form :model="lookEditForm" ref="lookEditForm" :rules="rules" label-width="120px">
                <el-row>
                    <label class="box-label">基本资料</label>
                    <el-col :span="22">
                        <el-form-item label="名称：" prop="company_name">
                            <ui-input v-model="lookEditForm.company_name" :edit="!isLook"></ui-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="代码：">
                            <ui-input v-model="lookEditForm.code" :edit="!isLook"></ui-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="等级：">
                            <label-select
                                :edit="!isLook"
                                v-model="lookEditForm.level"
                                :lists="levelList"
                                @change="cc"
                                clearable
                                placeholder="请选择供应商等级..."
                            ></label-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="供应商类型：" prop="type">
                            <el-select class="inline"
                                       v-model="lookEditForm.type"
                                       ref="type"
                                       v-mouse-side.mousewheel="()=>{$refs.type.visible = false}"
                                       v-if="!isLook">
                                <el-option :key="item.value" v-for="item in typeList" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                            <span v-else>{{comTitle}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="发票类型：" prop="invoice">
                            <label-select
                                :edit="!isLook"
                                v-model="lookEditForm.invoice"
                                placeholder="请选择发票类型..."
                                :lists="invoiceList"
                            ></label-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="法人代表：">
                            <ui-input :edit="!isLook" v-model="lookEditForm.legal"></ui-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="系统名称：" prop="system_name">
                            <ui-input :edit="!isLook" v-model="lookEditForm.system_name"></ui-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="营业执照名称：" prop="business_license">
                            <ui-input :edit="!isLook" v-model="lookEditForm.business_license"></ui-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="营业执照附件：">
                            <div class="allli">
                                <img v-if="lookEditForm.business_file" :src="`http://${lookEditForm.business_file}`" height="100%" @click="search_img(lookEditForm.business_file)" width="100%" alt="">
                                <img v-if="file.length>0" :src="file[0].image" height="100%" @click="search_img(file[0].image)" width="100%" alt="">
                                <image-upload @update-file="update_file" :thumbnail-mode="true" class="inline" :multiple="false" ref="images" :init="file"></image-upload>
                                <div class="tool">
                                    <span v-if="!isLook&&(lookEditForm.business_file||file.length>0)" class="btn-img el-icon-delete" @click="remove_img(file[0])"></span>
                                    <span v-if="!isLook" class="btn-img el-icon-edit" @click="edit_img"></span>
                                    <img v-if="lookEditForm.business_file" class="btn-img btn-i-img" @click="download_img" width="20px" height="20px" src="../../../../assets/download.svg" alt="">
                                </div>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="供应商链接：">
                            <ui-input v-model="lookEditForm.link" :edit="!isLook"></ui-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="采购员：">
                            <purchaser class="inline s-width-default"
                                       v-model="lookEditForm.purchaser_id"></purchaser>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="介绍：">
                            <ui-input type="textarea" v-model="lookEditForm.introduce" :edit="!isLook"></ui-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <label class="box-label">财务结算</label>
                    <el-col :span="22">
                        <el-form-item label="交易类型：" prop="transaction_type">
                            <el-select class="inline"
                                       v-if="!isLook"
                                       ref="transaction"
                                       clearable
                                       v-mouse-side.mousewheel="()=>{$refs.transaction.visible = false}"
                                       v-model="lookEditForm.transaction_type"
                                       placeholder="请选择结算方式...">
                                <el-option :key="item.label" v-for="item in transactionTypeList" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                            <span v-else>{{comTransaction}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="结算方式：" prop="balance_type">
                            <label-select
                                :edit="!isLook"
                                placeholder="请选择结算方式"
                                v-model="lookEditForm.balance_type"
                                :lists="balanceList"
                            ></label-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="结算方式备注：">
                            <ui-input type="textarea" v-model="lookEditForm.balance_remark" :edit="!isLook"></ui-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="支付方式：">
                            <label-select
                                :edit="!isLook"
                                :lists="payList"
                                v-model="lookEditForm.pay_type"
                                clearable
                                placeholder="请选择支付方式..."
                                @change="select_pay_type"
                            ></label-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div v-if="lookEditForm.pay_type === 2">
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="开户行：" prop="bank">
                                <ui-input v-model="lookEditForm.bank" :edit="!isLook"></ui-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="账号：" prop="bank_account">
                                <ui-input v-model="lookEditForm.bank_account" :edit="!isLook"></ui-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="开户名：" prop="account_name">
                                <ui-input v-model="lookEditForm.account_name" :edit="!isLook"></ui-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <div v-if="lookEditForm.pay_type === 3">
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="PayPal帐号：" prop="paypal">
                                <ui-input v-model="lookEditForm.paypal" :edit="!isLook"></ui-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <div v-if="lookEditForm.pay_type === 4">
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="支付宝：">
                                <ui-input v-model="lookEditForm.alipay" :edit="!isLook"></ui-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <el-row>
                    <label class="box-label">联系方式</label>
                    <el-col :span="11">
                        <el-form-item label="联系人：" prop="contacts">
                            <ui-input v-model="lookEditForm.contacts" :edit="!isLook"></ui-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="职务：">
                            <ui-input v-model="lookEditForm.contacts_job" :edit="!isLook"></ui-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="联系电话1：" prop="mobile">
                            <ui-input v-model="lookEditForm.mobile" :edit="!isLook"></ui-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="联系人2：">
                            <ui-input v-model="lookEditForm.contacts2" :edit="!isLook"></ui-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="职务：">
                            <ui-input v-model="lookEditForm.contacts2_job" :edit="!isLook"></ui-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="联系电话2：" prop="mobile2">
                            <ui-input v-model="lookEditForm.mobile2" :edit="!isLook"></ui-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="固定电话："  prop="tel">
                            <ui-input v-model="lookEditForm.tel" :edit="!isLook"></ui-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="Email：" prop="email">
                            <ui-input v-model="lookEditForm.email" :edit="!isLook"></ui-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="QQ号："  prop="qq">
                            <ui-input v-model="lookEditForm.qq" :edit="!isLook"></ui-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="阿里旺旺：">
                            <ui-input v-model="lookEditForm.ww" :edit="!isLook"></ui-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="微信：">
                            <ui-input :edit="!isLook" v-model="lookEditForm.weixin"></ui-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="邮编：">
                            <ui-input type="number" v-model="lookEditForm.zipcode" :edit="!isLook"></ui-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="地址：">
                            <el-col :span="5">
                                <label-select
                                    :edit="!isLook"
                                    :clearable="true"
                                    v-model="lookEditForm.province_id"
                                    placeholder="请选择省"
                                    :lists="provinceList"
                                    @change="select_province"
                                ></label-select>
                            </el-col>
                            <el-col :span="3">
                                <label>省/市/州</label>
                            </el-col>
                            <el-col :span="6">
                                <label-select
                                    :edit="!isLook"
                                    :clearable="true"
                                    v-model="lookEditForm.city_id"
                                    placeholder="请选择市"
                                    :lists="cityOption"
                                    @change="select_city"
                                ></label-select>
                            </el-col>
                            <el-col :span="4">
                                <label>地区/市/县</label>
                            </el-col>
                            <el-col :span="6">
                                <label-select
                                    :edit="!isLook"
                                    :clearable="true"
                                    v-model="lookEditForm.area_id"
                                    placeholder="请选择区"
                                    :lists="areaOption"
                                    @change="select_area"
                                ></label-select>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="详细地址：">
                            <ui-input v-model="lookEditForm.address" :edit="!isLook" placeholder="请填写详细地址"></ui-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="备注：">
                            <label :class="[isLook?'pretend':'']" style="word-break:break-all;">{{lookEditForm.remark}}</label>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="!isLook">
                    <el-col :span="22">
                        <el-form-item label="添加备注：">
                            <ui-input type="textarea" v-model="remark2" :edit="!isLook"></ui-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <blowup-image v-model="imgDialog" :img-path="imgPath" :title="`查看大图`"></blowup-image>
            <div slot="footer">
                <el-button v-if="isLook" size="mini" @click.native="close">关闭</el-button>
                <div v-else>
                    <request-button req-key="update_look_edit_form" :mintime="200" :request="update(lookEditForm.id)">确定</request-button>
                    <el-button  size="mini" @click.native="cancel">取消</el-button>
                </div>
            </div>
        </page-dialog>
    </el-row>
</template>
<style lang="stylus">
    .suppliers-edit{
        .allli {
            height: 100px;
            width: 100px;
            display: inline-block;
            position: relative;
            border: 1px solid #CFCFCF;
            transition: all .3s ease;
            margin-top: 15px;
            &:hover {
                transform: scale(1.1);
                box-shadow: 0 0 5px #ccc;
                z-index: 1;
            }
            &:hover .tool {
                height: 30px;
            }
        }
        .tool {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 0;
            background-color: rgba(0, 0, 0, .5);
            text-align: center;
            overflow: hidden;
            transition: all .3s ease;
            .btn-img {
                box-sizing: border-box;
                width: 22px;
                height: 22px;
                display: inline-block;
                color: #fff;
                font-size: 1.3rem;
                cursor: pointer;
                margin: 5px 2px;
                overflow: hidden;
                line-height: 22px;
                &:hover {
                    border-radius: 2px;
                    background-color: rgba(0, 0, 0, .55);
                }
                &:active {
                    background-color: rgba(0, 0, 0, .9);
                }
                > .i {
                    color: #fff;
                }
            }
            .btn-i-img{
                width:20px !important;
                height:20px !important;
                margin-bottom 8px !important;
            }
        }
        .pretend{
            color:#008BCE !important;
            word-break:break-all;
        }
        .box-label{
            width: 100%;
            display: block;
            border-bottom: 1px solid #e0e6ed;
            margin-bottom: 10px;
        }
    }

</style>
<script>
    import pageDialog from '../../../../components/page-dialog.vue';
    import {api_supplier_Level,api_supplier_type,api_supplier_transaction,api_supplier_payment,api_supplier_area,api_get_invoice,api_get_balance} from '../../../../api/assert-sup';
    import {telPhone,phone,email,qq,url,integer}from '../../../../define/validator_reg';
    export default{
        data(){
            let checkPhone = (rule,value,callback)=>{
                if(value){
                    return !telPhone.test(value)&&!phone.test(value)?callback(new Error("号码格式输入有误，请重新输入！")):callback();
                }else{
                    callback();
                }
            };
            let checkFax = (rule,value,callback)=>{
                if(value){
                    return !telPhone.test(value)?callback(new Error("固定电话格式输入有误，请重新输入！")):callback();
                }else{
                    callback();
                }
            };
            let checkEmail = (rule,value,callback)=> {
                if (value) {
                    return !email.test(value) ? callback(new Error("邮箱格式输入有误，请重新输入！")) : callback();
                } else {
                    callback();
                }
            };
            let checkUrl = (rule,value,callback)=>{
                if(value){
                    return !url.test(value) ? callback(new Error("链接输入有误！")):callback();
                }else{
                    callback();
                }
            };
            let checkNumber = (rule,value,callback)=>{
                if(value){
                    return !integer.test(value) ? callback(new Error("邮编格式非法，请重新输入！")):callback();
                }else{
                    callback();
                }
            };
            let checkQQ = (rule,value,callback)=>{
                if(value){
                    return !qq.test(value) ? callback(new Error("QQ格式输入有误，请重新输入！")):callback();
                }else{
                    callback();
                }
            }
            return{
                imgDialog:false,
                imgPath:'',
                dialog:false,
                dialogSize:"full",
                remark2:"",
                levelList:[],
                typeList:[],
                invoiceList:[],
                balanceList:[],
                payList:[],
                district:{},
                provinceList:[],
                cityList:[],
                areaList:[],
                file:[],
                transactionTypeList:[],
                rules:{
                    company_name:[
                        {required:"true",message:"名称不能为空",trigger:"blur,change"}
                    ],
                    type:[
                        {required:"true",message:"供应商类型不能为空",trigger:"blur",type:"number"}
                    ],
                    invoice:[
                        {required:"true",message:"发票类型不能为空",trigger:"blur",type:"number"}
                    ],
                    system_name:[
                        {required:"true",message:"系统名称不能为空",trigger:"blur"}
                    ],
                    business_license:[
                        {required:"true",message:"营业执照名称不能为空",trigger:"blur"}
                    ],
                    balance_type:[
                        {required:"true",message:"结算方式不能为空",trigger:"blur",type:"number"}
                    ],
                    bank:[
                        {required:"true",message:"开户行不能为空",trigger:"blur"}
                    ],
                    bank_account:[
                        {required:"true",message:"帐号不能为空",trigger:"blur"}
                    ],
                    account_name:[
                        {required:"true",message:"开户名不能为空",trigger:"blur"}
                    ],
                    paypal:[
                        {required:"true",message:"PayPal帐号不能为空",trigger:"blur"}
                    ],
                    contacts:[
                        {required:"true",message:"联系人不能为空",trigger:"blur"}
                    ],
                    tel:[
                        {validator:checkFax,trigger:"blur,change"}
                    ],
                    mobile:[
                        {validator:checkPhone,trigger:'blur,change'}
                    ],
                    mobile2:[
                        {validator:checkPhone,trigger:'blur,change'}
                    ],
                    email:[
                        {validator:checkEmail,trigger:'blur,change'}
                    ],
                    qq:[
                        {validator:checkQQ,trigger:'blur'}
                    ],
                    zipcode:[
                        {validator:checkNumber,trigger:'blur,change'}
                    ]
                },
            }
        },
        mounted(){
            this.dialog = this.value;
        },
        watch:{
            dialog(val){
                this.$emit("input",val);
            },
            value(val){
                this.dialog = val;
            },
            'lookEditForm'(val){
                if(val.transaction_type===0){
                    val.transaction_type = '';
                }
            }
        },
        created(){
            this.init();
            this.get_supplier_type();
            this.supplier_transaction();
        },
        computed:{
            comTransaction(){
                if(this.transactionTypeList instanceof Array){
                    let ret = this.transactionTypeList.findRet(row=>{
                        if(row.value===this.lookEditForm.transaction_type){
                            return row.label;
                        }
                    });
                    return ret;
                }
            },
            comTitle(){
                if(this.typeList instanceof Array){
                    let ret = this.typeList.findRet(row=>{
                        if(row.value===this.lookEditForm.type){
                            return row.label;
                        }
                    });
                    return ret;
                }
            },
            cityOption(){
                let city = [];
                this.cityList.length>0&&(
                    this.cityList.map(row=>{
                        if(row.pid===this.lookEditForm.province_id){
                            city.push({label:row.label,value:row.value});
                        }
                    })
                )
                return city;
            },
            areaOption(){
                let area =[];
                this.areaList.length>0&&(
                    this.areaList.map(row=>{
                        if(row.pid===this.lookEditForm.city_id){
                            area.push({label:row.label,value:row.value});
                        }
                    })
                )
                return area;
            },
            fileShow(){
                if(this.file.length>0){
                    return true;
                }else{
                    return false;
                }
            }
        },
        methods:{
            open(){
                this.provinceList = [];
                this.cityList = [];
                this.areaList = [];
                this.init();
                this.remark2="";
                this.file=[];
            },
            cc(val){
                console.log(val);
            },
            init(){
                /*供应商等级*/
                this.$http(api_supplier_Level).then(res=>{
                    if(res){
                        this.levelList = res.map(row=>{
                            return {
                                label:row.name,
                                value:row.label,
                            }
                        });
                    }

                }).catch(code=>{
                    console.log(code);
                });
                /*支付方式*/
                this.$http(api_supplier_payment).then(res=>{
                    if(res){
                        this.payList = res.map(row=>{
                            return {
                                label:row.name,
                                value:row.label,
                            }
                        });
                    }
                }).catch(code=>{
                    console.log(code);
                })
                /*结算方式*/
                this.$http(api_get_balance).then(res=>{
                    this.balanceList = res.map(row=>{
                        return {
                            label:row.name,
                            value:row.label,
                        }
                    });
                }).catch(code=>{
                    console.log(code);
                })
                /*发票类型*/
                this.$http(api_get_invoice).then(res=>{
                    this.invoiceList = res.map(row=>{
                        return {
                            label:row.name,
                            value:row.label
                        }
                        console.log(row.value);
                    });
                }).catch(code=>{
                    console.log(code);
                })
                /*获取省市县*/
                this.$http(api_supplier_area).then(res=>{
                    this.district = res;
                    let city ="";
                    let area ="";
                    for(var i in this.district){
                        this.provinceList.push({label:this.district[i].name,value:this.district[i].id,pid:this.district[i].pid});
                        this.district[i]._child&&(city=this.district[i]._child);
                        for(var c in city){
                            this.cityList.push({label:city[c].name,value:city[c].id,pid:city[c].pid});
                            city[c]._child&&(area = city[c]._child);
                            for(var a in area){
                                this.areaList.push({label:area[a].name,value:area[a].id,pid:area[a].pid});
                            }
                        }
                    }
                }).catch(code=>{
                    console.log(code);
                })
            },
//          ---------------------------------  选择支付方式
            select_pay_type(val){
                console.log(val);
            },
//            ---------------------------------  选择省
            select_province(val){
                this.$emit("select-province",val);
            },
//            ---------------------------------  选择市
            select_city(val){
                this.$emit("select-city",val);
            },
//            ---------------------------------  选择县
            select_area(val){},
//            -------------------------------  保存
            update(id){
               return () =>{
                   return this.$refs.lookEditForm.validate((bool)=>{
                       if(bool){
                           let c = this.lookEditForm;
                           if(!c.mobile&&!c.mobile2&&!c.tel&&!c.fax_no&&!c.email&&!c.qq&&!c.ww) {
                               this.$message({type: "warning", message: `请至少填写一种联系方式后再提交`});
                           }else if(this.lookEditForm.transaction_type===2&&this.lookEditForm.business_file===''&&this.file.length===0){
                               this.$message({type: "warning", message: `线下交易必须上传营业执照！`});
                           }else{
                               if(this.file.length>0){
                                   let size = this.file.map(row=>row.size).reduce((size,imgSize)=>size+=imgSize);
                                   const MEGABYTE = 1048576;
                                   if(size>MEGABYTE){
                                       this.$message({type:'warning',message:'附件过大，请选择1M以内的图片！'});
                                       return
                                   }
                                   this.$set(this.lookEditForm,'file',this.file);
                               }else{
                                   this.$set(this.lookEditForm,'file',this.lookEditForm.business_file);
                               }
                               this.$emit("update",id,this.remark2);
                           }
                       }else{
                           return;
                       }
                   })
               }
            },
//            -------------------------------  取消
            cancel(){
                this.dialog = false;
            },
//            -------------------------------   关闭
            close(){
                this.dialog = false;
            },
//           供应商类型
            get_supplier_type(){
                this.$http(api_supplier_type).then(res=>{
                    this.typeList = res.map(row=>{
                        return {
                            value:row.label,
                            label:row.name
                        }
                    });
                }).catch(code=>{
                    console.log(code);
                })
            },
//          交易类型
            supplier_transaction(){
                this.$http(api_supplier_transaction).then(res=>{
                    this.transactionTypeList = res.map(row=>{
                        return {
                            value:row.label,
                            label:row.name
                        }
                    });
                }).catch(code=>{
                    console.log(code);
                })
            },
            edit_img(){
                this.$refs.images.input_click();
            },
            download_img() {
                let src = `http://${this.lookEditForm.business_file}`;
                let $a = document.createElement('a');
                $a.setAttribute("href", src);
                $a.setAttribute("download", "");
                let evObj = document.createEvent('MouseEvents');
                evObj.initMouseEvent( 'click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null);
                $a.dispatchEvent(evObj);
            },
            remove_img(image){
                if(this.file.length===0){
                    this.lookEditForm.business_file = '';
                }else{
                    this.$refs.images.remove(image);
                }
            },
            //查看大图
            search_img(image){
                if(this.file.length===0){
                    this.imgPath = `http://${image}`.replace("_60x60","_500x500");
                }else{
                    this.imgPath = image;
                }
                this.imgDialog = true;
            },
            update_file(){
                this.lookEditForm.business_file = '';
            }
        },
        props:{
            lookEditForm:{
                required:true,
                type:Object
            },
            value:{},
            isLook:{
                required:true,
                type:Boolean
            },
            title:{
                required:true,
                type:String
            }
        },
        components:{
            pageDialog,
            uiInput:require('../../../../components/ui-input.vue').default,
            labelSelect:require('../../../../components/label-select.vue').default,
            uiSelect:require('../../../../components/ui-select.vue').default,
            requestButton:require('../../../../global-components/request-button.vue').default,
            imageUpload:require("./image-upload.vue").default,
            blowupImage:require("@/components/blowup-image.vue").default,
            purchaser: require('../../../../api-components/purchaser.vue').default,
        }
    }

</script>
