<template>
    <page-dialog class="abnormal-mark-handle" v-model="visible" @open="open" @close="close" title="标记为已处理">
        <div class="el-message-box__status el-icon-warning"></div>
        <div class="el-message-box__message" style="margin-left: 50px;">
            <p>您将对勾选项标记为“已处理”状态，确认此操作吗？</p>
            <el-input type="textarea" :autosize="size" class="mt-sm" placeholder="请输入采购单反馈问题"
                      v-model="remark"></el-input>
            <div class="reference-text">
                <span>参考值：</span>
                <div class="table ml-xs" v-for="(title, index) in shortTitles">
                    <span class="operate" @click="add_title(index)">{{title}}</span>
                </div>
            </div>
        </div>
        <div slot="footer">
            <request-button req-key="abnormalHandle" type="primary" size="mini" @click.native="sure">确定
            </request-button>
            <el-button size="mini" @click.native="visible = false">取消</el-button>
        </div>
    </page-dialog>
</template>
<style lang="stylus">
    .abnormal-mark-handle {
        .table {
            display: inline-table;
        }
    }
</style>
<script>
    import {api_edit_parcel_exception} from "@/api/arrival-parcel";

    export default {
        data() {
            return {
                visible: false,
                shortTitles: ['入库', '退货'],
                remark: '',
                size: {
                    minRows: 4
                },
            }
        },
        methods: {
            open() {

            },
            sure() {
                typeof this.remark === "string" && (this.remark = this.remark.trim());
                let params = {
                    ids: this.selectedData.map(row => row.id),
                    process_method: this.remark
                }
                this.$http(api_edit_parcel_exception, params).then(res => {
                    this.$message(res.message || res);
                    this.visible = false;
                }).catch(code => {
                    this.$message({
                        type: 'error',
                        message: code.message || code
                    })
                }).finally(() => {
                    setTimeout(() => {
                        this.$reqKey('abnormalHandle', false);
                    }, 200);
                })

            },
            close() {
                this.remark = '';
            },
            add_title(index) {
                let title = this.shortTitles[index];
                if (this.remark.includes(title)) {
                    return;
                }
                if (this.remark === '') {
                    this.remark += title;
                } else {
                    this.remark += `，${title}`;
                }
            }
        },
        watch: {
            value(val) {
                this.visible = val;
            },
            visible(val) {
                this.$emit('input', val);
            }
        },
        props: {
            value: {},
            selectedData: {},
        },
        components: {
            pageDialog: require('@/components/page-dialog.vue').default,
        }
    }
</script>