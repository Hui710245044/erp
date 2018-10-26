<template>
    <page-dialog v-model="dialog" size="large" :close-on-click-modal="false" :title="title" >
        <el-table
                :data="spuForm"
                border
                style="width: 100%">
            < <el-table-column
                prop="spu"
                label="SPU"
                >
        </el-table-column>
            <el-table-column prop="goodsName" label="产品名称" >

            </el-table-column>
            <el-table-column
                    prop="times"
                    label="次数"
                    >
            </el-table-column>
            <el-table-column
                    prop="quantity"
                    label="sku累加">
            </el-table-column>
        </el-table>
        <div slot="footer">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="spuPage"
                    :page-sizes="[10, 50, 100]"
                    :page-size="spuPageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="spuCount">
            </el-pagination>
        </div>
    </page-dialog>
</template>

<script>
    export default {
        data() {
            return {
                dialog: this.value
            }
        },
        components:{ pageDialog:require('@/components/page-dialog.vue').default,},
        props:{
            value:{},
            title:{},
            spuForm:{},
            spuPage:{},
            spuPageSize:{},
            spuCount:{}
        },
        methods: {
            handleCurrentChange(val){
                this.$emit('current-change',val);
            },
            handleSizeChange(val){
                this.$emit('size-change',val);
            },
        },
        watch:{
            dialog(val){
                this.$emit('input',val)
            },
            value(val){
                this.dialog=val;
                if(val){
                    console.log(this.spuForm,'spuForm');
                }
            }
        }
    }
</script>

<style scoped>

</style>