<template>
    <div>
        <el-table :data="tableData.lists" border  class="mb-sm scroll-bar"  v-loading="loading"
                  v-resize="{height:41}"
                  element-loading-text="玩命加载中..."
                  @selection-change="selection_change"
                  style="width: 100%"
        >
            <div slot="empty" class="no-data-reminder">
                <i></i>
                {{emptyText}}
            </div>
            <el-table-column  label="ID" width="85" prop="id">

            </el-table-column>
            <el-table-column  label="平台" prop="channel_name">

            </el-table-column>
            <el-table-column  label="站点" prop="channel_site">

            </el-table-column>
            <el-table-column  label="网站地址" prop="website_url">

            </el-table-column>
            <el-table-column  label="用户名属性名" prop="username_attribute_name">

            </el-table-column>
            <el-table-column  label="用户名属性值" prop="username_attribute_value">

            </el-table-column>
            <el-table-column  label="密码属性名" prop="password_attribute_name">

            </el-table-column>
            <el-table-column  label="密码属性值" prop="password_attribute_value">

            </el-table-column>
            <el-table-column  label="提交属性名" prop="submit_attribute_name">

            </el-table-column>
            <el-table-column  label="提交属性值" prop="submit_attribute_value">

            </el-table-column>
            <el-table-column  label="添加时间">
                <template slot-scope="scope">
                    <span>{{scope.row.create_time|fdatetime}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" inline-template>
                <div>
                    <span class="operate"  @click="edit(row)">编辑</span>
                    &nbsp;|&nbsp;
                    <span class="operate" @click="del(row)">删除</span>
                </div>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        computed: {
            emptyText() {
                return this.firstTime ? '请查询数据' : '暂无数据'
            }
        },
        methods: {
            selection_change(val){

            },
            del(val){
                this.$emit('del',val)
            },
            edit(val){
                this.$emit('edit',val)
            }
        },
        filters:{
            fdatetime(val) {
                return datef("YYYY-MM-dd HH:mm:ss", val)
            }
        },
        props: {
            tableData: {

            },
            loading: {
                type: Boolean,
                default: false
            },
            firstTime: {
                type: Boolean,
                default: true
            }
        },
    }
</script>

<style scoped>

</style>