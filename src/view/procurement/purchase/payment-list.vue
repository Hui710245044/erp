<template>
    <div class="p-payment-list">
        <page-dialog v-model="paymentVisable" size="large" title="申请付款" :close-on-click-modal="false">
            <el-table :data="filterData" border style="width: 100%" height="400">
                <el-table-column prop="purchase_order_code" label="采购单号" width="150"></el-table-column>
                <el-table-column label="运费" width="100" inline-template>
                    <div>
                        <span>{{row.currency_code}}</span>&nbsp;
                        <span>{{row.shipping_cost}}</span>
                    </div>
                </el-table-column>
                <el-table-column label="应付款(货款+运费-优惠金额)" width="200" inline-template>
                    <div>
                        <span>{{row.currency_code}}</span>&nbsp;
                        <el-input class="inline" v-model="row.payable_amount" readonly="readonly"></el-input>
                    </div>
                </el-table-column>
                <el-table-column label="已支付" width="120" inline-template>
                    <div>
                        <span>{{row.currency_code}}</span>&nbsp;
                        <span>{{row.payment_amount}}</span>
                    </div>
                </el-table-column>
                <el-table-column label="已申请付款待处理金额" width="150" inline-template>
                    <div>
                        <span>{{row.currency_code}}</span>&nbsp;
                        <span>{{row.process_payment_amount}}</span>
                    </div>
                </el-table-column>
                <el-table-column label="付款操作" inline-template align="left">
                    <div>
                        <div style="margin-top: 3px;">
                            <span>本次申请金额：</span>
                            <span>{{row.currency_code}}</span>&nbsp;
                            <ui-limit-number v-model="row.apply_amount"
                                             style="width:80px"
                                             :limit="3"
                                             class="inline"
                                             :min="0"
                                             :max="row.sum">
                            </ui-limit-number>
                            <div style="display: block">
                                <span>申请支付最大金额：</span>
                                <span>{{row.currency_code}}</span>&nbsp;
                                <span>{{row.rest_amount|filterAmount}}</span>
                            </div>
                        </div>
                    </div>
                </el-table-column>
            </el-table>
            <el-pagination
                class="fr"
                style="margin: 5px 0 20px 0px;"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page=page
                :page-sizes="[20, 50, 100, 200,500]"
                :page-size=pageSize
                layout="total, sizes, prev, pager, next, jumper"
                :total=payData.total>
            </el-pagination>
            <el-card class="payment-card">
                <div class="fr">
                    <span>本次总申请：CNY</span>
                    <span style="color:red">{{paySum}}</span>
                </div>
            </el-card>
            <div slot="footer" class="dialog-footer">
                <request-button :request="submit" req-key="submit_pay" :mintime="200"
                                :disabled="payData.dataList.length==0">确认申请
                </request-button>
                <el-button size="mini" @click="paymentVisable=false">取消</el-button>
            </div>
        </page-dialog>
    </div>
</template>
<style lang="stylus">
    .p-payment-list {
        .el-table__body-wrapper {
            overflow-x: hidden;
        }
        .payment-card {
            height: 40px;
            width: 100%;
            .el-card__body {
                padding: 11px;
            }
        }
        .addClass {
            color: red;
        }
    }
</style>
<script>
    import pageDialog from "../../../components/page-dialog.vue"
    import {api_pay} from "../../../api/purchase"

    export default {
        page: {
            devinfo: {
                frontEnd: '徐梦娇;黎宏珍',
                backEnd: '杨伟权;谭斌',
                createTime: '2017-3-8',
                updateTime: '2017-8-22'
            }
        },
        data() {
            return {
                paymentVisable: false,
                page: 1,
                pageSize: 50
            }
        },
        methods: {
            submit() {//----确认申请
                let teampObj = {};
                for (let i = 0; i < this.payData.dataList.length; i++) {
                    if (this.payData.dataList[i].apply_amount > this.payData.dataList[i].payable_amount - this.payData.dataList[i].payment_amount - this.payData.dataList[i].process_payment_amount) {
                        this.$reqKey('submit_pay', false)
                        this.$message({type: "error", message: "本次申请支付超额！"});
                        return false;
                    } else if (this.payData.dataList[i].apply_amount === '0') {
                        this.$reqKey('submit_pay', false);
                        this.$message({type: "error", message: "本次申请支付金额必须大于0！"});
                        return false;
                    }
                    teampObj[this.payData.dataList[i].id] = {
                        apply_amount: this.payData.dataList[i].apply_amount,
                        apply_remark: ''
                    }
                }
                let data = {
                    applyPayment: teampObj
                };
                return this.$http(api_pay, data).then(res => {
                    this.$message({
                        type: 'success',
                        message: res.message
                    });
                    this.paymentVisable = false;
                    this.$emit('refresh');
                    return Promise.resolve();
                }).catch(code => {
                    this.$message({type: "error", message: code.message || code})
                }).finally(() => {
                    setTimeout(() => {
                        this.$reqKey('submit_pay', false);
                    }, 200);
                });
            },
            change_amount(row) {
                if (row.apply_amount < 0) {
                    row.apply_amount = 0
                }
                let num = row.rest_amount;
                if (row.apply_amount > num) {
                    row.apply_amount = num;
                } else {
                    row.apply_amount = Number(row.apply_amount).toFixed(3);
                }
            },
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;

            },
            handleCurrentChange(page) {
                this.page = page;
            }
        },
        filters: {
            filterAmount(val) {
                return Number(val).toFixed(3);
            }
        },
        watch: {
            value(val) {
                this.paymentVisable = val
            },
            paymentVisable(val) {
                this.$emit("input", val)
            }
        },
        computed: {
            filterData() {
                let ret = [];
                let index = (this.page - 1) * this.pageSize;
                let j = this.pageSize;
                for (let i = index; i < this.payData.dataList.length && j > 0; i++) {
                    let row = this.payData.dataList[i];
                    ret.push(row);
                    j = j - 1;
                }
                return ret;
                console.log(ret)
            },
            paySum() {
                let sum = 0;
                this.payData.dataList.forEach(data => {
                    sum += (parseFloat(data.apply_amount) || 0);
                })
                return sum.toFixed(3);
            }

        },
        props: {
            value: {},
            payData: {}
        },
        components: {
            pageDialog,
            uiLimitNumber: require('@/components/ui-limit-number').default
        }
    }
</script>
