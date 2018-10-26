<template>
    <page class="p-index">
        <search-card @search="search" @enter='search' :params="searchData" :clears="clears">
            <label-buttons label="状态："
                           :buttons="userStatus"
                           @select="changeSelect">
            </label-buttons>
            <label>筛选条件：</label>
            <el-select v-model="searchData.snType" class="inline s-width-default" v-sf.snType>
                <el-option v-for="item in accountList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
            </el-select>
            <el-input v-model="searchData.snText"
                      placeholder="请输入PayPal账户..."
                      class="inline width-super"
                      v-sf.snText></el-input>
            <el-select class="inline ml-sm s-width-small" v-model="searchData.snDate" v-sf.snDate>
                <el-option v-for="item in timeList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
            </el-select>
            <el-date-picker
                    v-model="searchData.date_b"
                    v-sf.date_b
                    type="date"
                    :picker-options="pickerstart"
                    placeholder="选择开始日期"
                    class="inline date"
            >
            </el-date-picker>
            --
            <el-date-picker
                    v-model="searchData.date_e"
                    v-sf.date_e
                    type="date"
                    :picker-options="pickerend"
                    placeholder="选择结束日期"
                    class="inline date mr-sm"
            >
            </el-date-picker>
        </search-card>
        <el-row class="p-event-button ml-sm mt-xs mb-xs">
            <permission
                    tag="ElButton"
                    :route="apis.url_add"
                    v-for="item in operateButtons"
                    :key="item.id"
                    size="mini"
                    type="primary"
                    @click.naive="activeClick(item.action)">{{item.label}}</permission>
            <permission tag="ElButton"
                        size="mini"
                        type="primary"
                        @click.native="batchSetup"
                        :disabled="selected.length <= 0"
                        :route="apis.url_post_batch_set">批量设置</permission>
        </el-row>
        <form-add :add-form="addForm" v-model="showAddForm" @add-result="add_result"></form-add>
        <form-mdf v-model="showMdfForm" :mdfid="mdfID" @mdf-result="mdf_result"></form-mdf>
        <data-table :tables="tables"
                    @change-size="change_size"
                    @change-page="change_page"
                    @change-status="change_status"
                    @sort-change="sort_change"
                    @modify="modify"
                    @selects="selects"
                    v-loading="isLoading"
                    :first-loading="firstLoading"
                    element-loading-text="玩命加载中..."
        ></data-table>
        <!--批量开启-->
        <edit-batch v-model="settingUp"
                    :batch-title="batchTitle"
                    :batch-data="batchData"
                    @set-clich="setClich"></edit-batch>
    </page>
</template>
<style lang="stylus">
</style>
<script>
    import formAdd from './form-add.vue';
    import formMdf from './form-mdf.vue';
    import dataTable from './data-table.vue';
    import labelButtons from '../../../../components/label-buttons.vue';
    import {api_get, api_change_status,api_paypal_batch_set} from '../../../../api/paypal';
    import {url_add,url_post_batch_set} from '../../../../api/paypal';
    export default{
        permission:{
            url_add,
            url_post_batch_set
        },
        page:{},
        refresh(){
            this.init(this.isInvalid);
        },
        data(){
            return{
                firstLoading:true,
                order_type:'',
                sort:'',
                isInvalid:0,
                showAddForm:false,
                showMdfForm:false,
                mdfID:0,
                isLoading:true,
                addForm:{
                    account_name:'',
                    api_user_name:'',
                    api_secret:'',
                    api_signature:'',
                    download_paypal:0,
                },
                searchData:{
                    snType:"account_name",
                    snText:"",
                    snDate:"create_date",
                    date_b:"",
                    date_e:"",
                },
                clears:{
                    snType:"account_name",
                    snText:"",
                    snDate:"create_date",
                    date_b:"",
                    date_e:"",
                },
                selected:[],
                accountList:[
                    {label:"PayPal账户",value:"account_name"}
                ],
                timeList:[
                    {label:"创建时间",value:"create_date"},
                    {label:"更新时间",value:"update_date"},
                ],
                operateButtons:[
                    {id:1,label:'添加',action:function(){
                        this.showAddForm = true;
                    }}
                ],
                tables:{
                    lists:[],
                    total:0,
                    page:1,
                    pageSize:50
                },
                userStatus:[
                    {name:"全部",status:0},
                    {name:"已启用",status:1},
                    {name:"已停用", status:2}
                ],
                pickerstart:{
                    disabledDate:(time)=>{
                        if(this.searchData.date_e){
                            return  time.getTime() > this.searchData.date_e.getTime()
                        }else {
                            return false
                        }
                    }
                },
                pickerend:{
                    disabledDate:(time)=>{
                        if(this.searchData.date_b){
                            return time.getTime() < this.searchData.date_b.getTime()
                        }else {
                            return false
                        }

                    }
                },
                settingUp: false,//批量设置弹框开关
                batchTitle: '',//批量设置弹框标题
                batchData:{},//批量设置弹框数据
            }
        },
        created(){
            this.init(this.isInvalid);
        },
        methods:{
            batchSetup(){
                this.settingUp = true;
                this.batchTitle = "批量设置";
                this.batchData = {
                    // is_invalid:1,
                    is_stop:false,
                    is_start:false,
                    download_paypal: ''
                }
            },
            setClich(val){
                if(val.is_stop === false&&val.is_start === false&&val.download_paypal === ''){
                    this.$message({type: 'warning',message: '请至少修改一项数据'});
                    this.$reqKey('downloadAdd',false);
                }else{
                    this.settingUp = false;
                    let params = {};
                    if(val.is_stop === true){
                        this.$set(params,'is_invalid',0)
                    }else if(val.is_start === true){
                        this.$set(params,'is_invalid',1)
                    }
                    for(let key in val){
                        if(key !== 'is_stop'&&key !== 'is_start'&&val[key] !== ''){
                            this.$set(params,key,val[key])
                        }
                    }
                    this.$set(params,'ids',this.selected.join(','));
                    this.$http(api_paypal_batch_set,params).then(res=>{
                        this.init();
                        this.$message({type:'success',message: res.message});
                    }).catch(code => {
                        this.$message({type:'error',message:code.message||code});
                    }).finally(()=>{
                        setTimeout(() => {
                            this.$reqKey('downloadAdd',false);
                        }, 300)
                    })
                }

            },
            sort_change(val){
                if(!val.column||!val.column.label)return;
                switch (val.column.label){
                    case 'PayPal账户':
                        this.order_type='account_name';
                        break;
                    case '用户名':
                        this.order_type='api_user_name';
                        break;
                    default:
                        this.order_type='';
                }
                this.sort = val.order==='descending'?'desc':'asc';
                this.init(this.isInvalid);
            },
            init_status_btn(){
                let curBtn = this.userStatus;
                this.userStatus = [];
                this.$nextTick(()=>{
                    this.userStatus = curBtn;
                });
            },
            changeSelect(select){
                this.isInvalid = this.userStatus[select].status;
                this.init(this.userStatus[select].status);
            },
            search(){
                this.init(this.isInvalid);
            },
            clear_search(){
                this.searchData.snType = "account_name";
                this.searchData.snText = "";
                this.searchData.snDate = "create_date";
                this.searchData.date_b = "";
                this.searchData.date_e  = "";
                this.init(this.isInvalid);
            },
            init(status){
                let params = {
                    page:this.tables.page,
                    pageSize:this.tables.pageSize,
                }
                params.is_invalid = status;
                this.searchData.snType&&(params.snType = this.searchData.snType);
                this.searchData.snText&&(params.snText = this.searchData.snText.trim());
                this.searchData.snDate&&(params.snDate = this.searchData.snDate);
                this.order_type&&this.$set(params,'order_type',this.order_type);
                this.sort&&this.$set(params,'sort',this.sort);
                if(this.searchData.date_b){
                    let d = new Date(this.searchData.date_b);
                    params.date_b=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
                }
                if(this.searchData.date_e){
                    let e = new Date(this.searchData.date_e);
                    params.date_e=e.getFullYear() + '-' + (e.getMonth() + 1) + '-' + e.getDate()
                }
                this.isLoading = true;
                this.tables.lists = [];
                this.$http(api_get,params).then(succ=>{
                    this.tables.lists = succ.data;
                    this.tables.total = succ.count;
                    this.isLoading = false;
                    this.firstLoading = false
                }).catch(fail=>{
                    console.log(fail);
                    this.isLoading = false;
                });
            },
            activeClick(action){
                action.call(this);
                this.addForm = {
                    account_name:'',
                    api_user_name:'',
                    api_secret:'',
                    api_signature:'',
                }
            },
            add_result(id,form){
                let timestamp = Date.parse(new Date());
                timestamp = timestamp / 1000;
                this.$set(form,'created_time',timestamp);
                this.$set(form,'id',parseInt(id));
                this.tables.lists.unshift(form);
                this.tables.total++;
            },
            mdf_result(id,form){
            	let time = Date.parse(new Date());
            	time = time/1000;
                this.tables.lists.forEach(res=>{
                	if(res.id===id){
                        Object.assign(res,form);
                		res.updated_time = time;
                    }
                })
                console.log(form,'form');
            },
            modify(id){
                this.mdfID = id;
                console.log(id,'id');
                this.showMdfForm = true;
            },
            selects(selects){
                this.selected = selects.map(row=>{
                    return row.id
                });
            },
            change_page(page){
                this.tables.page = page;
                this.init(this.isInvalid);
            },
            change_size(size){
                this.tables.pageSize = size;
                let pages = Math.ceil(this.tables.total/size);
                if(pages >= this.tables.page){
                    this.init(this.isInvalid);
                }else{
                    this.change_page(pages)
                }
            },
            change_status(row){
                this.$confirm(`此操作将更改  ${row.account_name}  账号状态, 确定进行此操作?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal:false,
                }).then(() => {
                    this.$http(api_change_status, row.id, row.is_invalid ? 0 : 1).then(res=>{
                        this.$message({
                            type:"success",
                            message:res.message||res
                        });
                        this.$nextTick(()=>{
                            row.is_invalid = !row.is_invalid;
                        })
                        if(!!this.isInvalid){
                            let index = this.tables.lists.indexOfFun(function (old) {
                                return old.id === row.id
                            });
                            this.tables.lists.splice(index, 1);
                            this.$set(this.tables,"total",this.tables.total--);
                        }
                    }).catch(fail=>{
                        this.$message({
                            type:"error",
                            message:fail.message||fail
                        })
                        let data = this.tables.lists.find(data=>{
                            return data.id == id;
                        });
                        this.tables.lists.$remove(data);
                    })
                }).catch(()=>{
                    row.is_invalid = !row.is_invalid;
                    this.$nextTick(()=>{
                        row.is_invalid = !row.is_invalid;
                    })
                    this.$message({
                        type:"info",
                        message:"已取消操作"
                    })
                })
            }
        },
        components:{
            dataTable,formAdd,formMdf,labelButtons,
            searchCard:require('../../../../components/search-card.vue').default,
            editBatch:require('./edit-batch').default
        }
    }
</script>
