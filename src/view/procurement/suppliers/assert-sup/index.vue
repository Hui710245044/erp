<template>
    <page class="p-assert-sup">
        <!--<el-row>-->
        <search-card @search="search" @enter="search" :params="params" :clears="clears">
            <div>
                <label-buttons label="状态：" title="请选择状态" :buttons="statusList" @select="select_status"></label-buttons>
            </div>
            <label class="inline" title="请选择结算方式">结算方式：</label>
            <el-select class="inline s-width-default" v-sf.balance_type v-model="params.balance_type">
                <el-option
                        v-for="item in balanceList"
                        :key="item.label"
                        :label="item.name"
                        :value="item.label">
                </el-option>
            </el-select>
            <el-select class="inline ml-lg s-width-small" v-sf.snType v-model="params.snType">
                <el-option v-for="item in searchList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-input class="inline mr-sm width-super" v-sf.snText :placeholder="`请输入${changeLabel}...`" v-model="params.snText"></el-input>
        </search-card>
        <permission tag="ElButton"
                    :route="apis.url_add_supplier"
                    class="inline mt-sm ml-sm mb-sm"
                    type="primary" size="mini"
                    @click.native="add" title="新增供应商">添加</permission>
        <trends-select class="inline ml-sm mr-sm btn-margin-top"
                       v-if="curStatus>-1"
                       :selects="handleList"
                       type="primary"
                       @trigger="select_handle"></trends-select>
        <permission tag="trendsSelect"
                    class="inline ml-xs mr-xs"
                    type="primary"
                    :route="apis.url_export_supplier"
                    :selects="partAllOptions"
                    @trigger="export_excel"></permission>
        <add
            v-model="addDialog"
            :add-form="addForm"
            @save="save"
            :balance-list="balanceList"
            @select-province="select_province"
            @select-city="select_city"
        ></add>
        <el-table
            class="scroll-bar"
            :data="table.dataList"
            border
            :highlight-current-row="true"
            v-loading="isLoading"
            element-loading-text="玩命加载中..."
            v-resize="{height:41}"
            @selection-change="selection_change"
        >
            <div slot="empty" class="no-data-reminder">
                <i></i>
                {{emptyText}}
            </div>
            <el-table-column type="selection" width="35px"></el-table-column>
            <!--<el-table-column type="selection" width="35px" v-if="curStatus!==-1"></el-table-column>-->
            <el-table-column label="序号" type="index" width="40px"></el-table-column>
            <el-table-column label="名称" inline-template row-key="company_name">
                <div>
                    <ui-tip :content="row.company_name" :width="98"></ui-tip>
                </div>
            </el-table-column>
            <el-table-column label="联系人" inline-template width="80px">
                <div>
                    <ui-tip :content="row.contacts" :width="78"></ui-tip>
                </div>
            </el-table-column>
            <el-table-column label="联系电话" inline-template width="100px">
                <div>
                    <ui-tip :content="row.mobile" :width="98"></ui-tip>
                </div>
            </el-table-column>
            <el-table-column label="EMAIL" inline-template width="120px">
                <div>
                    <ui-tip :content="row.email" :width="98"></ui-tip>
                </div>
            </el-table-column>
            <el-table-column label="地址" inline-template>
                <div>
                    <ui-tip :content="row.address" :width="98"></ui-tip>
                </div>
            </el-table-column>
            <el-table-column label="介绍" inline-template>
                <div>
                    <ui-tip :content="row.introduce" :width="98"></ui-tip>
                </div>
            </el-table-column>
            <el-table-column label="来源" inline-template width="60px">
                <div>
                    <ui-tip :content="row.source" :width="58"></ui-tip>
                </div>
            </el-table-column>
            <el-table-column label="状态" inline-template align="center" width="65px">
                <div>{{row.status | filterStatus}}</div>
            </el-table-column>
            <el-table-column label="创建时间" inline-template align="center" width="86px">
                <times :time="row.create_time"></times>
            </el-table-column>
            <el-table-column label="修改时间" inline-template align="center" width="86px">
                <times :time ="row.update_time"></times>
            </el-table-column>
            <el-table-column label="操作" inline-template>
                <div>
                    <!--<span class="operate"  v-permission.look="'procurementSupplierAssert'" @click="look_over(row)">查看</span>-->
                    <permission tag="span" :route="apis.url_look_supplier" class="operate" @click="look_over(row)">查看</permission>
                    |
                    <!--<span class="operate"  v-permission.edit="'procurementSupplierAssert'" @click="edit(row)">编辑</span>-->
                    <permission tag="span" :route="apis.url_edit_supplier" class="operate" @click="edit(row)">编辑</permission>
                    |
                    <!--<span class="operate" v-permission.del="'procurementSupplierAssert'"  @click="cur_delete(row)">删除</span>-->
                    <permission tag="span" :route="apis.url_delete_supplier" class="operate" @click="cur_delete(row)">删除</permission>
                </div>
            </el-table-column>
        </el-table>
        <edit-lookover
            v-model="dialog"
            :isLook="isLook"
            :look-edit-form="lookEditForm"
            @update="update"
            :title="editLookTitle"
            @select-province="select_province_"
            @select-city="select_city_"
        ></edit-lookover>
        <el-pagination
            class="page-fixed"
            @size-change="size_change"
            @current-change="current_change"
            :current-page="table.page"
            :page-sizes="[20,50,100,200,500]"
            :page-size="table.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="table.totalSize">
        </el-pagination>
        <!--</el-row>-->
    </page>
</template>
<style lang="stylus">
    .p-assert-sup{
        .el-dropdown .el-button-group {
            display: inline-block;
            position: relative;
            top: 1px;
        }
    }
    .box-label {
        box-sizing: border-box;
        width: 100%;
        color: #5e6d82;
        font-size: 1.25rem;
        padding: 0 21px 10px;
        display: inline-block;
        border-bottom: 2px solid #dee5ee;
        margin-bottom: 20px;
    }
    .el-card{
        overflow: visible;
    }
    .btn-margin-top{
        margin-top: 1px;
        margin-left: 5px;
        margin-right: 6px;
    }
</style>
<script>
    import labelButtons from '../../../../components/label-buttons.vue';
    import add from './add.vue';
    import editLookover from './edit-lookover.vue';
    import {downloadFile} from '../../../../lib/http';
    import {
        api_supplier,api_export_supplier,api_add_supplier,api_delete_supplier,api_look_supplier,api_get_balance,api_edit_supplier,api_update_supplier,api_change_states,
        url_add_supplier,
        url_look_supplier,
        url_edit_supplier,
        url_delete_supplier,
        url_export_supplier
    } from '../../../../api/assert-sup';
    export default{
        permission:{
            url_add_supplier,
            url_look_supplier,
            url_edit_supplier,
            url_delete_supplier,
            url_export_supplier
        },
        page:{
            devinfo:{
                frontEnd:'王月如;黎宏珍',
                backEnd:'谭斌',
                createTime:'2017-1-9',
                updateTime:'2017-9-26'
            },
            beforeClose(){
                return true;
            }
        },
        refresh(){
            this.init();
        },
        data(){
            return{
                firstLoading: true,
                supplier_id:"",
                url_supplier:config.apiHost+'supplier-offer/supplier',
                isLoading:true,
                addDialog:false,
                dialog:false,
                curStatus:-1,
                selectId:[],
                title:"",
                statusList:[
                    {name:"全部",status:-1},
                    {name:"待审核",status:0},
                    {name:"已审核",status:1},
                    {name:"停用",status:2},
                ],
                balanceList:[],
                handleList:[],
                searchList:[
                    {label:"名称",value:"company_name"},
                    {label:"联系人",value:"contacts"},
                    {label:"联系电话",value:"tel"},
                    {label:"EMAIL",value:"email"},
                    {label:"地址",value:"address"},
                ],
                params:{
                    balance_type:"",
                	snType:"company_name",
                    snText:"",
                },
                clears:{
                	snType:"company_name",
                },
                table:{
                    page:0,
                    pageSize:50,
                    totalSize:0,
                    dataList:[]
                },
                addForm:{
                    company_name:"",
                    code:"",
                    level:"",
                    type:0,
                    invoice:'',
                    legal:"",
                    system_name:"",
                    business_license:"",
                    introduce:"",
                    balance_type:"",
                    balance_remark:"",
                    pay_type:"",
                    bank:"",
                    bank_account:"",
                    account_name:"",
                    paypal:"",
                    alipay:"",
                    contacts:"",
                    tel:"",
                    mobile:"",
                    mobile2:"",
                    email:"",
                    qq:"",
                    ww:"",
                    weixin:"",
                    zipcode:"",
                    province_id:"",
                    city_id:"",
                    area_id:"",
                    address:"",
                    file:[],
                    link:"",
                    remark:"",
                    contacts_job:"",
                    contacts2:"",
                    contacts2_job:"",
                    purchaser_id:'',
                    transaction_type:"",
                },
                lookEditForm:{},
                isLook:true,
                editLookTitle:"",
                fileCode:"",
                partAllOptions:[
                    {name:"部分导出",value:2,action:function(){
                            if(this.selectId.length<=0)return this.$message({type:"warning",message:"请先选择需要导出的数据"});
                            let params = {
                                supplier_ids:this.selectId,
                                export_type:2,
                            };
                            Object.assign(params,this.init_params);
                            this.order_export(params);
                        }},
                    {name:"全部导出",value:1,action:function(){
                            let params = this.init_params();
                            this.order_export(params);
                        }},
                ],
            }
        },
        created(){
            this.get_balance();
        },
        filters:{
            filterTime(val){
                if(val) return datef('YYYY-MM-dd HH:mm:ss',val);
            },
            filterStatus(val){
                switch(val){
                    case 0:
                        return "待审核";
                        break;
                    case 1:
                        return "已审核";
                        break;
                    case 2:
                        return "停用";
                        break;
                }
            }
        },
        watch:{
            curStatus(val){
                if(val===0){
                    this.handleList=[
                        {label:"审核通过",value:1},
                        {label:"停用",value:2},
                    ]
                }else if(val===1){
                    this.handleList=[
                        {label:"停用",value:2},
                    ]
                }else if(val===2){
                    this.handleList=[
                        {label:"审核通过",value:1},
                    ]
                }
            }
        },
        computed:{
            changeLabel(){
            	let find = this.searchList.find(res=>{
            		return res.value === this.params.snType;
                });
            	if(!!find){
            		return find.label;
                }
            },
            emptyText() {
                return  this.firstLoading?'等待请求数据中...':'暂无数据'
            }
        },
        methods:{
            order_export(params){
                return this.$http(api_export_supplier,params).then(res=>{
                    if(res.status === 1){
                        let params = {
                            page:this.table.page,
                            pageSize:this.table.pageSize,
                            file_code:res.file_code
                        };
//                        let url= config.apiHost+'update/downExportFile';
                        let url= config.apiHost+'downloadFile/downExportFile';
                        downloadFile({
                            url:url,
                            get:params,
                            fileName:res.file_name,
                            suffix:'.xls',
                        })
                    }else{
                        this.$message({type:'error',message:res.message || res});
                    }
                    return Promise.resolve();
                }).catch(code=>{
                    this.$message({type:"error",message:code.message||code});
                })
                return Promise.resolve()
            },
            export_excel(val){
                val.action.call(this,val);
            },
            init_params(){
                let paramsData = {};
                paramsData = {
                    supplier_ids: "",
                    export_type:1,
                    snType:this.params.snType,
                    balance_type:this.params.balance_type,
//                    status:this.curStatus,  全部导出的时候不需要这个字段
                    snText:this.params.snText.trim()
                };
                return paramsData
            },
            init_status_btn(){
                let curBtn = this.statusList;
                this.statusList = [];
                this.$nextTick(()=>{
                    this.statusList = curBtn;
                });
            },
            init(){
                this.isLoading = true;
                let params ={
                    page:this.table.page,
                    pageSize:this.table.pageSize,
                    snType:this.params.snType,
                    balance_type:this.params.balance_type
                };
                this.curStatus>-1&&(params.status = this.curStatus);
                this.params.snText&&(params.snText = this.params.snText.trim());
                this.$http(api_supplier,params).then(res=>{
                    this.table.dataList = res.data;
                    this.table.totalSize = res.count;
                    setTimeout(() => {
                        this.isLoading = false;
                        this.firstLoading = false
                    }, 1000);
                }).catch(code=>{
                    console.log(code);
                    this.isLoading = false;
                });
            },
//            ---------------------------------   table多选
            selection_change(val){
                this.selectId = val.map(row=>{
                    return row.id;
                })
            },
            /*结算方式*/
            get_balance(){
                this.$http(api_get_balance).then(res=>{
                    this.balanceList = [{name:"全部",label:""},...res];
                }).catch(code=>{
                    console.log(code);
                })
            },
            fix_params({page,pageSize,keyword}){
                return {
                    page:page,
                    pageSize:pageSize,
                    content:keyword

                };
            },
            select_handle(val){
                if(this.selectId.length<=0){
                    this.$message({type:"warning",message:`请选择审批项后，再进行相应操作`});
                }else{
                    this.$confirm(`您将更改所选供应商状态，确认此操作吗？`,"提示",{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        let params ={
                            id:this.selectId
                        }
                        val.value>-1&&(params.status = val.value);
                        this.api_change_states(params);
                    }).catch(()=>{
                        this.$message({type:"info",message:`已取消操作`})
                    });
                }
            },
//            ---------------------------------   保存API
            add_supplier(data){
                if(data.file&&data.file.length===0){
                    this.$delete(data,"file");
                }
                this.$http(api_add_supplier,data).then(res=>{
                    this.$message({
                        type:"success",
                        message:res.message
                    });
                    let param = res.data;
                    this.$set(param,'mobile',data.mobile);
                    this.$set(param,'source','采购');
                    this.$set(param,'status',0);
                    this.table.dataList.unshift(param);
                    this.table.totalSize += 1;
                    this.addDialog = false;
                }).catch(code=>{
                    this.$message({
                        type:"error",
                        message:code.message || code
                    })
                })
            },
//            ---------------------------------   删除Api
            delete_supplier(id){
                this.$http(api_delete_supplier,id).then(res=>{
                    this.$message({
                        type:"success",
                        message:res.message || res
                    });
                    let index = this.table.dataList.indexOfFun(id,function (old, id) {
                        return old.id === id;
                    });
                    this.table.dataList.splice(index, 1);
                    this.$set(this.table,'totalSize',this.table.totalSize-1)
                }).catch(code=>{
                    this.$message({
                        type:"error",
                        message:code.message || code
                    })
                })
            },
//            ---------------------------------  查看Api
            look_supplier(id){
                this.$http(api_look_supplier,id).then(res=>{
                    this.lookEditForm = res;
                    this.$nextTick(()=>{
                        this.lookEditForm.city_id = res.city_id;
                        this.lookEditForm.area_id = res.area_id;
                    })
                }).catch(code=>{
                    console.log(code);
                });
            },
//            ---------------------------------  编辑Api
            edit_supplier(id){
                this.$http(api_edit_supplier,id).then(res=>{
                    !res.level&&this.$set(res,"level","");
                    !res.balance_type&&this.$set(res,"balance_type","");
                    !res.pay_type&&this.$set(res,"pay_type","");
                    !res.province_id&&this.$set(res,"province_id","");
                    !res.city_id&&this.$set(res,"city_id","");
                    !res.area_id&&this.$set(res,"area_id","");
                    this.lookEditForm = res;
                    let Object = {city_id:res.city_id,area_id:res.area_id};
                    this.$nextTick(()=>{
                        this.lookEditForm.city_id = Object.city_id;
                        this.$nextTick(()=>{
                            this.lookEditForm.area_id = Object.area_id;
                        })
                    })
                }).catch(code=>{
                    console.log(code);
                });
            },
//            ---------------------------------   更新Api
            update_supplier(id,data){
                this.$http(api_update_supplier,id,data).then(res=>{
                    this.$message({type:"success",message:res.message || res});
                    this.dialog = false;
                }).catch(code=>{
                    this.$message({type:"error",message:code.message || code});
                });
            },
//            ---------------------------------  启用停用Api
            api_change_status(data,row){
                this.$http(api_change_status,data).then(res=>{
                    this.$message({
                        type:"success",
                        message:res.message || res
                    });
                    row.status=!row.status;
                }).catch(code=>{
                    this.$message({
                        type:"error",
                        message:code.message || code
                    })
                })
            },
//            ---------------------------------  审核供应商Api
            api_change_states(data){
                this.$http(api_change_states,data).then(res=>{
                    this.$message({
                        type:"success",
                        message:res.message || res
                    });
                    data.id.forEach(item=>{
                        let index = this.table.dataList.indexOfFun(res=>res.id===item);
                        this.table.dataList.splice(index,1);
                    })
                }).catch(code=>{
                    this.$message({
                        type:"error",
                        message:code.message || code
                    })
                })
            },
//            ---------------------------------   分页
            size_change(size){
                this.table.pageSize = size;
                this.init();
            },
            current_change(page){
                this.table.page = page;
                this.init();
            },
//            ---------------------------------   搜索不同的状态
            select_status(val){
                this.curStatus = this.statusList[val].status;
                this.init();
            },
//            ---------------------------------   搜索
            search(){
                this.init();
            },
//            ---------------------------------   清空搜索
            clear_search(){
                this.snType = "company_name";
                this.snText = "";
                this.balance_type = '';
                this.init();
            },
//            ---------------------------------   添加
            add(){
                this.addForm={
                    company_name:"",
                    code:"",
                    level:"",
                    type:0,
                    invoice:'',
                    legal:"",
                    system_name:"",
                    business_license:"",
                    introduce:"",
                    balance_type:"",
                    balance_remark:"",
                    pay_type:"",
                    bank:"",
                    bank_account:"",
                    account_name:"",
                    paypal:"",
                    alipay:"",
                    contacts:"",
                    tel:"",
                    mobile:"",
                    mobile2:"",
                    email:"",
                    qq:"",
                    ww:"",
                    weixin:"",
                    zipcode:"",
                    province_id:"",
                    city_id:"",
                    area_id:"",
                    address:"",
                    file:[],
                    link:"",
                    remark:"",
                    contacts_job:"",
                    contacts2:"",
                    contacts2_job:"",
                    transaction_type:"",
                };
                this.addDialog = true;
            },
            /*选择省*/
            select_province(){
                this.addForm.city_id= "";
                this.addForm.area_id = "";
            },
            /*选择市*/
            select_city(){
                this.addForm.area_id = "";
            },
            select_province_(){
                this.lookEditForm.city_id = "",
                    this.lookEditForm.area_id = "";
            },
            select_city_(){
                this.lookEditForm.area_id = "";
            },
            /*保存*/
            save(){
                this.add_supplier(this.addForm);
            },
//            ---------------------------------   查看
            look_over(row){
                this.dialog = true;
                this.isLook = true;
                this.editLookTitle = `查看供应商：${row.company_name} 信息`;
                this.look_supplier(row.id);
            },
//            ---------------------------------   编辑
            edit(row){
                this.dialog = true;
                this.isLook = false;
                this.editLookTitle = `编辑供应商：${row.company_name} 信息`;
                this.edit_supplier(row.id)
            },
            update(id,remark2){
                let cloneRemark = this.lookEditForm.remark;
                this.lookEditForm.remark = remark2?remark2:"";
                let updateData = window.clone(this.lookEditForm);
                if(updateData.file.length===0){
                    this.$delete(updateData,"file");
                }else{
                    this.$delete(updateData,"business_file");
                }
                let update_time = datef('YYYY-MM-dd HH:mm:ss',new Date()/1000);
                this.$set(updateData, 'update_time', update_time);
                return this.$http(api_update_supplier,id,updateData).then(res=>{
                    this.$message({type:"success",message:res.message || res});
                    this.dialog = false;
                    this.table.dataList.forEach(res=>{
                    	if(res.id === id){
                            Object.assign(res,updateData);
                        }
                    });
                    return Promise.resolve();
                }).catch(code=>{
                    this.$message({type:"error",message:code.message || code});
                    this.lookEditForm.remark = cloneRemark;
                }).finally(()=>{
                    setTimeout(()=>{
                        this.$reqKey('update_look_edit_form',false);
                    },200);
                });
            },
//            ---------------------------------   删除
            cur_delete(row){
                this.$confirm(`您将删除 ${row.company_name} 供货商，确认此操作吗？`,"提示",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    this.delete_supplier(row.id);
                }).catch(()=>{
                    this.$message({type:"info",message:`已取消删除`});
                });
            }
        },
        components:{
            labelButtons,
            add,
            editLookover,
            trendsSelect:require('../../../../components/trends-select.vue').default,
            scroll:require('../../../../components/scroll.vue').default,
            uiTip: require('../../../../components/ui-tip.vue').default,
            searchCard:require('../../../../components/search-card.vue').default,
        }
    }
</script>
