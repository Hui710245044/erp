<template>
    <page class="p-dialog">
        <page-dialog
                title="批量跟卖"
                v-model="dialogShow"
                size="large"
                :close-on-click-modal="false"
                @open="open"
                @close="close">
            <label class="ml-sm mt-sm">指定跟卖账号简称：</label>
            <el-select class="inline s-width-default mr-sm"
                       v-model="account_id"
                       filterable>
                <el-option v-for="(item, index) in accountList"
                           :label="item.account_name"
                           :value="item.account_id"
                           :key="item.account_id"></el-option>
            </el-select>
            <span style="color: red">一行一个（从Excel中复制），格式：SKU ASIN Price Quantity</span>
            <div class="ml-sm mt-sm">
                <label>跟卖数据：</label>
                <el-input type="textarea"
                          :rows="8"
                          v-model="formData">
                </el-input>
                <div class="mt-sm">
                    <label>跟卖结果：</label>
                    <div style="border: 1px solid gray;width: 100%;height: 156px;overflow: scroll">
                        <div v-for="(list, index) in result" :key="index">
                            <span>{{list.sku|textFilter}}  {{list.asin}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" type="primary" :disabled="formData === ''" @click.native="submit">提交跟卖</el-button>
                <el-button size="mini" @click.native="dialogShow = false">取消</el-button>
            </div>
        </page-dialog>
    </page>
</template>

<style scoped lang="stylus">

</style>

<script>
    import {api_get_amazon_account} from '../../../../api/amazon-publish-list';
    import {api_post_heel_sale} from '../../../../api/heel-sale-list'
    export default {
        data(){
            return {
                dialogShow: this.value,
                account_id: '',
                accountList: [],
                formData: '',
                result: []
            }
        },
        created(){
          this.get_account()
        },
        filters:{
            textFilter(val){
                return val === ''?'已跟卖':val
            }
        },
        methods: {
            open(){
                this.formData = '';
                this.result = []
            },
            close(){
                this.$emit('close')
            },
            submit(){
                let arr1 = this.formData.split('\n');
                let arr2 = arr1.map(row => row.replace(/\s+/g, ' ').split(' '));
                let params = arr2.map(row => {
                    return {
                        sku: row[0],
                        account_id: this.account_id,
                        asin: row[1],
                        price: row[2],
                        quantity: row[3]
                    }
                });
                this.$http(api_post_heel_sale,{data:JSON.stringify(params)}).then(res => {
                    this.result = res.data;
                }).catch(code => {
                    this.$message({type: 'error', message: code.message || code})
                })
            },
            get_account(){
                this.$http(api_get_amazon_account).then(res => {
                    this.accountList = res;
                    this.account_id = this.accountList.length>0?this.accountList[0].account_id:'';
                }).catch(code => {
                    this.$message({
                        type:"error",
                        message:code.message || code
                    });
                    this.accountList.splice(0, this.accountList.length+1);
                })
            },
        },
        watch: {
            value(val){
                this.dialogShow = val;
            },
            dialogShow(val){
                this.$emit('input',val);
            }
        },
        props:{
            value:{
                type:Boolean,
                default(){
                    return false;
                }
            },
        },
        components: {
            pageDialog: require('@/components/page-dialog').default,
        }
    }
</script>