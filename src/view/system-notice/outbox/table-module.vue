<template>
    <div class="c-demand-schedules-tableModule">
        <el-table class="mb-sm scroll-bar"
                  border :data="tableData"
                  highlight-current-row
                  v-resize="{height:41}"
                  @selection-change="selection_change"
                  v-loading="loading"
                  element-loading-text="玩命加载中...">
            <div slot="empty" class="no-data-reminder">
                <i></i>
                {{emptyText}}
            </div>
            <el-table-column type="selection" width="30" align="center">
            </el-table-column>
            <el-table-column label="通知类型" min-width="55" inline-template>
                <div class="p-table-list-td-text" :title="filterType(row.type)">{{filterType(row.type)}}</div>
            </el-table-column>
            <el-table-column label="接收者" min-width="55" inline-template>
                <div class="p-table-list-td-text" :title="row.receive_name.join(',')">{{row.receive_name.join(',')}}</div>
            </el-table-column>
            <el-table-column label="标题" min-width="55" inline-template>
                <div class="p-table-list-td-text" :title="row.title">{{row.title}}</div>
            </el-table-column>
            <el-table-column label="发送时间" min-width="55" inline-template>
                <div class="p-table-list-td-text" :title="row.send_time|filterDate">{{row.send_time|filterDate}}</div>
            </el-table-column>
            <el-table-column label="操作" min-width="50">
                <template slot-scope="scope">
                    <permission class="operate"
                                tag="span"
                                type="primary"
                                size="mini"
                                :route="apis.url_get_internal_letters_view_sent_letter"
                                @click="look(scope.row)">查看
                    </permission>
                </template>
            </el-table-column>
        </el-table>
        <look-e-maill v-model="lookVisibility"
                      :type-list="typeList"
                      :look-data="lookData"
                      :look-prev="lookPrev"
                      :look-next="lookNext"
                      :look-title="lookTitle"
                      @look="look"></look-e-maill>
    </div>
</template>
<style lang="stylus">
    .c-demand-schedules-tableModule{
        .p-table-list-td-text{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
</style>
<script>
    import {
        url_get_internal_letters_view_sent_letter,
        api_get_internal_letters_view_sent_letter
    } from '../../../api/system-notice-outbox'
    export default {
        page:{
            devinfo:{
                frontEnd:'覃宏峰',
                backEnd:'邓海波',
                createTime:'2018-8-22',
                updateTime:'2018-8-31'
            }
        },
        data() {
            return {
                lookVisibility:false,
                lookTitle:'',
                lookData:{},
                lookPrev:{},
                lookNext:{}
            }
        },
        permission:{
            url_get_internal_letters_view_sent_letter
        },
        methods:{
            filterType(val){
                return this.typeList.find(row=>row.value===val)?this.typeList.find(row=>row.value===val).label:val
            },
            selection_change(selects){
                this.$emit('selection-change',selects);
            },
            look(row){
                this.$http(api_get_internal_letters_view_sent_letter,{letter_id:row.id}).then(res=>{
                    this.lookData = res.data;
                    let attachment = this.lookData.attachment;
                    if(!!attachment){
                        let file_name = attachment.slice(attachment.lastIndexOf('/')+1);
                        this.$set(this.lookData,'file_name',file_name);
                        this.$set(this.lookData,'imgPath',(/\.(png$|PNG$|jpg$|JPG$|JPEG$)/.test(file_name))?window.config.apiHost+attachment.replace('./',''):'')
                    }
                    this.lookNext = res.next||{};
                    this.lookPrev = res.prev||{};
                    this.lookTitle = '查看站内信';
                    this.lookVisibility = true;
                }).catch(code=>{
                    this.$message({type:'error',message:code.message||code});
                })
            }
        },
        filters:{
            filterDate(val){
                return val?datef('YYYY-MM-dd HH:mm:ss',val):'-- --';
            },
        },
        computed:{
            emptyText() {
                return this.firstLoading?'等待查询数据中...':'暂无数据'
            }
        },
        props:{
            tableData:{
                required:true,
                type: Array,
            },
            loading:{
                required:true,
                type: Boolean,
            },
            firstLoading:{
                required:true,
                type:Boolean
            },
            typeList:{
                required:true,
                type:Array
            }
        },
        components:{
            lookEMaill: require('../look-e-maill').default
        }
    }
</script>
