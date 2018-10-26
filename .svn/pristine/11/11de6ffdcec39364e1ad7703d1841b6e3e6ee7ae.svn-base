<template>
    <el-table
            class="scroll-bar"
            highlight-current-row
            :data="form"
            border
            style="width: 100%">
        <el-table-column
                prop="remark"
                label="信息">
        </el-table-column>
        <el-table-column
                width="100px"
                prop="process"
                label="订单状态">
        </el-table-column>
        <el-table-column
                width="100px"
                prop="operator"
                label="操作员">
        </el-table-column>
        <el-table-column
                width="100px"
                label="日期"
                inline-template>
            <times v-if="row.create_time" :time="row.create_time"></times>
            <span v-else>-- --</span>
        </el-table-column>
    </el-table>
</template>
<style lang="stylus">

</style>
<script>

    export default{
        data(){
            return {}
        },
        methods: {
            ftime(time){
                return datef('YYYY-MM-dd HH:mm:ss', time);
            }
        },
        props: {
            form: {
                required: true,
                type: Array
            }
        },
        components: {}
    }
</script>