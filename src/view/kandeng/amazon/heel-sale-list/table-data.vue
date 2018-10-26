<template>
    <div class="c-table-data">
        <el-table
            class="scroll-bar"
            v-resize="{height:41}"
            :data="tableData.lists"
            v-loading="loading"
            element-loading-text="玩命加载中..."
            highlight-current-row>
            <div slot="empty" class="no-data-reminder">
                <i></i>
                {{emptyText}}
            </div>
            <el-table-column label='ID' prop="id"></el-table-column>
            <el-table-column label='SKU' prop="sku"></el-table-column>
            <el-table-column label='平台SKU' prop="publish_sku" width="160"></el-table-column>
            <el-table-column label='ASIN' prop="asin"></el-table-column>
            <el-table-column label='账号简称' prop="account_id"></el-table-column>
            <el-table-column label='价格' prop="price"></el-table-column>
            <el-table-column label='库存' prop="quantity"></el-table-column>
            <el-table-column label='上传状态' prop="status"></el-table-column>
            <el-table-column label='异常描述' prop="error_desc"></el-table-column>
            <el-table-column label='创建人' prop="username"></el-table-column>
            <el-table-column label='创建时间' prop="created_time"></el-table-column>
        </el-table>
        <el-pagination
                class="page-fixed"
                @size-change="size_change"
                @current-change="current_change"
                :current-page="tableData.page"
                :page-sizes="[20, 50, 100, 200,500]"
                :page-size=tableData.pageSize
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.total">
        </el-pagination>
    </div>
</template>
<style lang="stylus">

</style>
<script>

    export default {
        data() {
            return {}
        },
        methods:{
            size_change(size){
                this.$emit('size-change',size);
            },
            current_change(page){
                this.$emit('current-change',page);
            },
        },
        computed:{
            emptyText() {
                return this.firstLoading?'等待查询数据中...':'暂无数据'
            }
        },
        props:{
            tableData:{
                type:Object,
                required:true,
            },
            loading:{
                type:Boolean,
                required:true,
            },
            firstLoading:{
                type:Boolean,
                required:true,
            }
        },
        components: {}
    }
</script>