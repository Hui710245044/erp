<template>
    <el-row>
        <page-dialog title="新增供应商" @open="open" v-model="addDialog"  width="650px" left="30%" size="full" :close-on-click-modal="false">
            <el-form :model="addForm" :refs="addForm" :rules="rules" ref="addForm" label-width="120px">
                <el-row>
                    <label class="box-label">基本资料</label>
                    <el-col :span="22">
                        <el-form-item label="名称：" prop="company_name">
                            <el-autocomplete
                                v-model="addForm.company_name"
                                :fetch-suggestions="querySearch"
                                @keyup.native="keyupKeyword"
                                @select="selectKeyword"
                                placeholder="请输入/选择内容..."
                            ></el-autocomplete>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="代码：">
                            <el-input v-model="addForm.code"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="等级：">
                            <el-select class="inline"
                                       ref="level"
                                       clearable
                                       v-mouse-side.mousewheel="()=>{$refs.level.visible=false}"
                                       v-model="addForm.level"
                                       placeholder="请选择供应商等级...">
                                <el-option :key="item.value" v-for="item in levelList" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="供应商类型：" prop="type">
                            <el-select class="inline"
                                       ref="type"
                                       v-mouse-side.mousewheel="()=>{$refs.type.visible=false}"
                                       v-model="addForm.type"
                                       placeholder="请选择供应商类型...">
                                <el-option :key="item.value" v-for="item in typeList" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="发票类型：" prop="invoice">
                            <el-select class="inline"
                                       v-model="addForm.invoice"
                                       ref="invoice"
                                       v-mouse-side.mousewheel="()=>{$refs.invoice.visible=false}"
                                       placeholder="请选择发票类型...">
                                <el-option :key="item.label" v-for="item in invoiceList" :label="item.name" :value="item.label"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="法人代表：">
                            <el-input v-model="addForm.legal"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="系统名称：" prop="system_name">
                            <el-input v-model="addForm.system_name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="营业执照名称：" prop="business_license">
                            <el-input v-model="addForm.business_license"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="营业执照附件：">
                            <image-upload :show-thumb="true" :thumbnail-mode="true" label="上传附件"  class="inline" :multiple="false" ref="images" :init="addForm.file"></image-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="供应商链接：">
                            <el-input v-model="addForm.link" placeholder="请添加供应商链接"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="采购员：">
                            <purchaser class="inline s-width-default"
                                       v-model="addForm.purchaser_id"></purchaser>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="介绍：">
                           <el-input type="textarea" v-model="addForm.introduce"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <label class="box-label">财务结算</label>
                    <el-col :span="22">
                        <el-form-item label="交易类型：" prop="transaction_type">
                            <el-select class="inline"
                                       ref="transaction"
                                       clearable
                                       v-mouse-side.mousewheel="()=>{$refs.transaction.visible=false}"
                                       v-model="addForm.transaction_type"
                                       placeholder="请选择结算方式...">
                                <el-option :key="item.label" v-for="item in transactionTypeList" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="结算方式：" prop="balance_type">
                            <el-select class="inline"
                                       v-model="addForm.balance_type"
                                       ref="balance"
                                       v-mouse-side.mousewheel="()=>{$refs.balance.visible=false}"
                                       placeholder="请选择结算方式...">
                                <el-option :key="item.label" v-for="item in balanceList" :label="item.name" :value="item.label"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="结算方式备注：">
                            <el-input type="textarea" v-model="addForm.balance_remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="支付方式：">
                            <el-select class="inline"
                                       v-model="addForm.pay_type"
                                       ref="paytype"
                                       clearable
                                       v-mouse-side.mousewheel="()=>{$refs.paytype.visible=false}"
                                       placeholder="请选择支付方式..."
                                       @change="select_pay_type">
                                <el-option :key="item.label" v-for="item in payList" :label="item.name" :value="item.label"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div v-if="addForm.pay_type === 2||addForm.pay_type === 5">
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="开户行：" prop="bank">
                                <el-input v-model="addForm.bank"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="账号：" prop="bank_account">
                                <el-input v-model="addForm.bank_account"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="开户名：" prop="account_name">
                                <el-input v-model="addForm.account_name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <div v-if="addForm.pay_type === 3">
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="PayPal帐号：" prop="paypal">
                                <el-input v-model="addForm.paypal"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <div v-if="addForm.pay_type === 4">
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="支付宝：">
                                <el-input v-model="addForm.alipay"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <el-row>
                    <label class="box-label">联系方式</label>
                    <el-col :span="11">
                        <el-form-item label="联系人：" prop="contacts">
                            <el-input v-model="addForm.contacts"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="职务：">
                            <el-input v-model="addForm.contacts_job"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="联系电话1：" prop="mobile">
                            <el-input v-model="addForm.mobile"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="11">
                        <el-form-item label="联系人2：">
                            <el-input v-model="addForm.contacts2"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="职务：">
                            <el-input v-model="addForm.contacts2_job"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="联系电话2：" prop="mobile2">
                            <el-input v-model="addForm.mobile2"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="固定电话：" prop="tel">
                            <el-input v-model="addForm.tel"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="Email：" prop="email">
                            <el-input v-model="addForm.email"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="QQ号："  prop="qq">
                            <el-input v-model="addForm.qq"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="阿里旺旺：">
                            <el-input v-model="addForm.ww"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="微信：">
                            <el-input v-model="addForm.weixin"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="邮编：" prop="zipcode">
                            <el-input type="number"  v-model="addForm.zipcode"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="地址：">
                            <el-col :span="5">
                                <el-select class="inline"
                                           v-model="addForm.province_id"
                                           @change="select_province"
                                           ref="province"
                                           :clearable="true"
                                           v-mouse-side.mousewheel="()=>{$refs.province.visible = false}"
                                           placeholder="请选择省">
                                    <el-option :key="item.value" v-for="item in provinceList" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="3">
                                <label>省/市/州</label>
                            </el-col>
                            <el-col :span="6">
                                <el-select class="inline"
                                           v-model="addForm.city_id"
                                           ref="city"
                                           :clearable="true"
                                           v-mouse-side.mousewheel="()=>{$refs.city.visible = false}"
                                           @change="select_city"
                                           placeholder="请选择市">
                                    <el-option :key="item.value" v-for="item in cityOption" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="4">
                                <label>地区/市/县</label>
                            </el-col>
                            <el-col :span="6">
                                <el-select class="inline"
                                           v-model="addForm.area_id"
                                           ref="area"
                                           :clearable="true"
                                           v-mouse-side.mousewheel="()=>{$refs.area.visible = false}"
                                           @change="select_area"
                                           placeholder="请选择区">
                                    <el-option v-for="item in areaOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="详细地址：">
                            <el-input v-model="addForm.address" placeholder="请填写详细地址"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="备注：">
                            <el-input type="textarea" v-model="addForm.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer">
                <el-button type="primary" size="mini" @click.native="save">确定</el-button>
                <el-button  size="mini" @click.native="cancel">取消</el-button>
            </div>
        </page-dialog>
    </el-row>
</template>
<style>
    .pri-error{
        color:#ff4949;
        font-size:1rem;
        line-height:1;
        padding-top:0;
        z-index:10;
        position:absolute;
        top:100%;
        left:0;
    }
</style>
<script>
    import pageDialog from '../../../../components/page-dialog.vue';
    import {api_supplier_Level,api_supplier_transaction,api_get_supplier,api_supplier_payment,api_supplier_area,api_get_invoice,api_get_balance,api_supplier_type} from '../../../../api/assert-sup';
    import {telPhone,phone,email,qq,integer,url}from '../../../../define/validator_reg'
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
            let checkQQ = (rule,value,callback)=>{
                if(value){
                    return !qq.test(value) ? callback(new Error("QQ格式输入有误，请重新输入！")):callback();
                }else{
                    callback();
                }
            }
            let checkNumber = (rule,value,callback)=>{
                if(value){
                    return !integer.test(value) ? callback(new Error("邮编格式非法，请重新输入！")):callback();
                }else{
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
            return{
                restaurants:[],
                addDialog:false,
                dialogSize:"full",
                levelList:[],
                typeList:[],
                invoiceList:[],
                payList:[],
                district:{},
                provinceList:[],
                cityList:[],
                areaList:[],
                annex:[],
                transactionTypeList:[],
                page:1,
                pageSize:20,
                rules:{
                    company_name:[
                        {required:"true",message:"名称不能为空",trigger:"blur,change"}
                    ],
                    type:[
                        {required:"true",message:"供应商类型不能为空",trigger:"blur,change",type:"number"}
                    ],
                    invoice:[
                        {required:"true",message:"发票类型不能为空",trigger:"blur,change",type:"number"}
                    ],
                    system_name:[
                        {required:"true",message:"系统名称不能为空",trigger:"blur,change"}
                    ],
                    business_license:[
                        {required:"true",message:"营业执照名称不能为空",trigger:"blur,change"}
                    ],
                    balance_type:[
                        {required:"true",message:"结算方式不能为空",trigger:"blur,change",type:"number"}
                    ],
                    bank:[
                        {required:"true",message:"开户行不能为空",trigger:"blur,change"}
                    ],
                    bank_account:[
                        {required:"true",message:"帐号不能为空",trigger:"blur,change"}
                    ],
                    account_name:[
                        {required:"true",message:"开户名不能为空",trigger:"blur,change"}
                    ],
                    paypal:[
                        {required:"true",message:"PayPal帐号不能为空",trigger:"blur,change"}
                    ],
                    contacts:[
                        {required:"true",message:"联系人不能为空",trigger:"blur,change"}
                    ],
                    tel:[
                        {validator:checkFax,trigger:"blur,change"}
                    ],
                    mobile:[
                        {validator:checkPhone,trigger:'blur,change'}
                    ],
                    mobile2:[
                        {validator:checkPhone   ,trigger:'blur,change'}
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
                keyupChange:''
            }
        },
        mounted(){
            this.addDialog = this.value;
        },
        created(){
            this.suggestions(this.addForm.company_name);
            this.get_supplier_type();
            this.supplier_transaction();
        },
        watch:{
            addDialog(val){
                this.$emit("input",val);
            },
            value(val){
                this.addDialog = val;
            },
            cityOption(val){},
            areaOption(val){},
            "addForm.company_name"(val){
                this.suggestions(val);
            }
        },
        computed:{
            cityOption(){
                let city = [];
                this.cityList.length>0&&(
                     this.cityList.map(row=>{
                        if(row.pid===this.addForm.province_id){
                            city.push({label:row.label,value:row.value});
                        }
                    })
                );
                return city;
            },
            areaOption(){
              let area =[];
              this.areaList.length>0&&(
                  this.areaList.map(row=>{
                      if(row.pid===this.addForm.city_id){
                          area.push({label:row.label,value:row.value});
                      }
                  })
              );
                return area;
            }
        },
        methods:{
            open(){
                this.provinceList = [];
                this.cityList = [];
                this.areaList = [];
                this.init();
            },
            keyupKeyword(e){
                this.keyupChange = e.target.value;
            },
            selectKeyword(data){
                this.keyupChange = data.value;
            },
            //过滤数据
            querySearch(queryString, cb) {
                let restaurants = this.restaurants;
                let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
                };
            },
            suggestions(val){
                this.$http(api_get_supplier,{page:this.page,pageSize:this.pageSize,content:val}).then(res=>{
                    this.restaurants = res.data.map(row=>{
                        return {value:row.company_name,id:row.id}
                    });
                });
            },
            handleSelect(){},
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
                    this.payList = res;
                }).catch(code=>{
                    console.log(code);
                })
                /*发票类型*/
                this.$http(api_get_invoice).then(res=>{
                    this.$nextTick(()=>{
                        this.addForm.invoice = this.invoiceList[0].label;
                    })
                    this.invoiceList = res;
                }).catch(code=>{
                    console.log(code);
                })
                /*获取省市县*/
                this.$http(api_supplier_area).then(res=>{
                    this.district = res;
                    let city ="";
                    let area ="";
                    for(let i in this.district){
                        this.provinceList.push({label:this.district[i].name,value:this.district[i].id,pid:this.district[i].pid});
                        this.district[i]._child&&(city=this.district[i]._child);
                        for(let c in city){
                            this.cityList.push({label:city[c].name,value:city[c].id,pid:city[c].pid});
                            city[c]._child&&(area = city[c]._child);
                            for(let a in area){
                                this.areaList.push({label:area[a].name,value:area[a].id,pid:area[a].pid});
                            }
                        }
                    }
                }).catch(code=>{
                    console.log(code);
                })
            },
//          ---------------------------------  选择支付方式
            select_pay_type(val){},
//            ---------------------------------  选择省
            select_province(val){
                this.$emit("select-province",val);
            },
//            ---------------------------------  选择市
            select_city(val){
                this.$emit("select-city",val)
            },
//            ---------------------------------  选择县
            select_area(val){
                console.log(val);
            },
//            -------------------------------  保存
            save(){
                this.addForm.company_name = this.keyupChange;
                this.$refs.addForm.validate((bool) => {
                    if(bool) {
                        if(!this.addForm.mobile&&!this.addForm.mobile2&&!this.addForm.tel&&!this.addForm.fax_no&&!this.addForm.email&&!this.addForm.qq&&!this.addForm.ww){
                            this.$message({type:"warning",message:`请至少填写一种联系方式后再提交！`});
                        }else{
                            if(!this.numError&&!this.faxError&&!this.emailError&&!this.qqError){
                                this.addForm.file = this.$refs.images.images;
                                this.$emit("save");
                            }
                        }
                    }
                })
            },
//            -------------------------------  取消
            cancel(){
                this.addDialog = false;
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
        },
        props:{
            addForm:{
                required:true,
                type:Object
            },
            value:{},
            balanceList:{
                required:true,
                type:Array
            }
        },
        components:{
            pageDialog,
            imageUpload:require("../../../customer-service/smt/inbox/image-upload.vue").default,
            purchaser: require('../../../../api-components/purchaser.vue').default,
        }
    }

</script>
