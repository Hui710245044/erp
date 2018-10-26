<template>
    <page class="p-index">
        <card-search ref="searchData"
                     :form="cardForm"
                     :clears="clears"
                     @batch-search="batch_search"
                     @search-data="search_data"
                     @search-clear="search_clear"
                     @change-order="change_order"
        ></card-search>
        <div class="mt-sm mb-sm">
            <el-button class="inline ml-sm" size="mini" type="primary" @click.native="showImport=true">导入</el-button>
            <el-button
                type="primary"
                size="mini"
                class="inline ml-sm"
                @click.native="verification">手动核查订单
            </el-button>
            <permission
                class="inline"
                tag="request-button"
                :mintime="200"
                req-key="url_post_ebay_orders_sysc"
                :route="apis.url_post_ebay_orders_sysc"
                :disabled="selectList.length===0"
                @click="orders_sysc">同步平台订单
            </permission>
        </div>
        <data-table
                :dataTable="dataTable"
                @size-change="change_size"
                @page-change="change_page"
                :is-loading="isLoading"
                @sort-click="sort_click"
                :first-loading="firstLoading"
        ></data-table>
        <verification-order v-model="verificationDialog" cur-platform="Ebay"></verification-order>
        <import-excel v-model="showImport" @files-update="init" :export-api="export_transfer_template" :import-api="import_transfer" :select-list="selectList"></import-excel>
    </page>
</template>
<style lang="stylus">
</style>
<script>
    import {
        api_get,
        url_post_ebay_orders_sysc,
        api_post_ebay_orders_sysc,
        api_get_ebay_orders_export_transfer_template,
        api_post_ebay_orders_import_transfer
    } from '../../../../api/ebay-order'
    import cardSearch from'./card-search.vue';
    import dataTable from'./data-table.vue';
    export default{
        page: {},
        permission:{
            url_post_ebay_orders_sysc
        },
        refresh(){
            this.init();
            this.$refs.searchData.get_statusCount(true);
        },
        data(){
            return {
                firstLoading:true,
                export_transfer_template:api_get_ebay_orders_export_transfer_template,
                import_transfer:api_post_ebay_orders_import_transfer,
                verificationDialog:false,
                cardForm: {
                    site: "",
                    is_transfer_money:'',
                    account_id: "",
                    order_status: "",
                    payment_status: -1,
                    shipped_time: -1,
                    snType: 'order_id',
                    snType2: 'order_id',
                    is_batch: '',
                    snText: "",
                    snDate: "created_time",
                    date_b: (Date.now() - (14 * 24 * 60 * 60 * 1000)),
                    date_e: Date.now(),
                },
                clears: {
                    site: "",
                    account_id: "",
                    order_status: "",
                    payment_status: -1,
                    shipped_time: -1,
                    snType: 'order_id',
                    snType2: 'order_id',
                    snText: "",
                    snDate: "created_time",
                    date_b: (Date.now() - (14 * 24 * 60 * 60 * 1000)),
                    date_e: Date.now(),
                },
                dataTable: {
                    totalSize: 0,
                    lists: [],
                    page: 1,
                    pageSize: 50
                },
                orderStatus: 0,
                isLoading: true,
                sort_field: "",
                sort_by: "",
                showImport:false
            }
        },
        methods: {
            orders_sysc(){
                let data = this.selectList.map(row=>{
                    return {
                        account:row.account,
                        order_id:row.order_id
                    }
                });
                this.$http(api_post_ebay_orders_sysc,{data:JSON.stringify(data)}).then(res=>{
                    this.$message({type:'success',message:res.message||res});
                    this.init();
                }).catch(code=>{
                    this.$message({type:'error',message:code.message||code});
                }).finally(()=>{
                    setTimeout(()=>{
                        this.$reqKey('url_post_ebay_orders_sysc',false);
                    },200);
                });
            },
            verification(){
                this.verificationDialog = true;
            },
            batch_search(){
                this.init();
            },
            init_params(){
                let params = {
                    page: this.dataTable.page,
                    pageSize: this.dataTable.pageSize,
                    snType: this.cardForm.snType,
                    snText: '',
                    snDate: this.cardForm.snDate,
                    site: this.cardForm.site,
                    account_id: this.cardForm.account_id,
                    order_status: this.cardForm.order_status,
                    is_transfer_money:this.cardForm.is_transfer_money
                };
                let curString = this.cardForm.snText.replace(new RegExp(' ','gm'),'\n');
                let cur = curString.split('\n').filter(row=>!!row);
                if(cur&&cur.length>1){
                    params.snText = cur.map(row=>{
                        return row.trim();
                    });
                }else if(cur&&cur.length===1){
                    params.snText =  cur[0];
                }

                this.sort_field && (params.sort_field = this.sort_field);
                this.sort_by !== '' && (params.sort_by = this.sort_by);
                this.cardForm.payment_status > -1 && (params.payment_status = this.cardForm.payment_status);
                this.cardForm.shipped_time > -1 && (params.shipped_time = this.cardForm.shipped_time);
                if (!!this.cardForm.date_b) {
                    let date_b = new Date(this.cardForm.date_b);
                    params.date_b = datef("YYYY-MM-dd", date_b / 1000);
                } else {
                    params.date_b = "";
                }
                if (!!this.cardForm.date_e) {
                    let date_e = new Date(this.cardForm.date_e);
                    params.date_e = datef("YYYY-MM-dd", date_e / 1000);
                } else {
                    params.date_e = "";
                }
                return params
            },
            init(){
                let params = this.init_params();
                this.isLoading = true;
                this.$http(api_get, params).then(res => {
                    this.dataTable.totalSize = res.count;
                    let lists = res.data.map((re) => {
                        re.show = false;
                        re.isCheck = false;
                        return re;
                    });
                    this.dataTable.lists = lists;
                    this.isLoading = false;
                    this.firstLoading = false
                }).catch(code => {
                    this.$message({type:'error',message:code.message||code});
                })
            },
            change_order(){
                if(!!this.cardForm.is_batch){
                    this.$refs.searchData.batch_search();
                } else {
                    this.init();
                }
            },
            change_size(size){
                this.dataTable.pageSize = size;
                this.init();
            },
            change_page(page){
                this.dataTable.page = page;
                this.init();
            },
//            表格升降序
            sort_click(val){
                switch (val.label) {
                    case "付款状态":
                        this.sort_field = "payment_time";
                        break;
                    case "支付总额":
                        this.sort_field = "amount_paid";
                        break;
                    case "发货状态":
                        this.sort_field = "shipped_time";
                        break;
                    case "下单时间":
                        this.sort_field = "created_time";
                        break;
                    case "最迟发货时间":
                        this.sort_field = "latest_ship_time";
                        break;
                }
                this.sort_by = val.order === "asc" ? 0 : 1;
                this.init();
            },
            search_data(){
                if(!!this.$refs.searchData.isBatch){
                    this.$refs.searchData.batch_search();
                } else {
                    this.init();
                }
            },
            search_clear(){
                this.cardForm.snType = "order_id";
                this.cardForm.snText = "";
                this.cardForm.snDate = "created_time";
                this.cardForm.date_b = (Date.now() - (14 * 24 * 60 * 60 * 1000));
                this.cardForm.date_e = Date.now();
                this.cardForm.payment_status = -1;
                this.cardForm.shipped_time = -1;
                this.cardForm.site = "";
                this.cardForm.account_id = "";
                this.init();
                this.$refs.searchData.get_statusCount();
            }
        },
        computed:{
            selectList(){
                return this.dataTable.lists.filter(row=>row.isCheck);
            }
        },
        components: {
            cardSearch,
            dataTable,
            verificationOrder:require('../../verification-order.vue').default,
            importExcel: require('./import-excel.vue').default,
        }
    }
</script>
