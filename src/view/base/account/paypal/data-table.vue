  <template>
        <el-row class="p-paypal-table">
            <el-table
                    v-resize="{height:41}"
                    class="scroll-bar"
                    :data="lists"
                    @sort-change="sort_change"
                    highlight-current-row
                    @selection-change="handleSelectionChange">
            >
                <div slot="empty" class="no-data-reminder">
                    <i></i>
                    {{emptyText}}
                </div>
                <el-table-column
                    type="selection"
                    width="35"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="ID"
                        width="50"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        inline-template sortable
                        label="PayPal账户">
                    <div>
                        <ui-tip :content="row.account_name" :width="98" v-copy></ui-tip>
                    </div>
                </el-table-column>
                <el-table-column
                        inline-template sortable
                        label="用户名">
                    <div>
                        <ui-tip :content="row.api_user_name" :width="98" v-copy></ui-tip>
                    </div>
                </el-table-column>
                <el-table-column
                        min-width="220px"
                        inline-template
                        label="签名">
                    <div>
                        <ui-tip :content="row.api_signature" :width="98" v-copy></ui-tip>
                    </div>
                </el-table-column>
                <el-table-column inline-template width="80" label="状态" align="center">
                    <div>
                        <permission
                                tag="ElSwitch"
                                :route="apis.url_change_status"
                                :key="row.id"
                                :value="row.is_invalid"
                                on-text="启用"
                                off-text="停用"
                                @change="changStatus(row)"></permission>
                    </div>
                </el-table-column>
                <el-table-column
                        inline-template
                        label="创建时间"
                        align="center"
                >
                    <div>{{row.created_time | filterTime}}</div>
                </el-table-column>
                <el-table-column
                        inline-template
                        label="更新时间"
                        align="center"
                >
                    <div>{{row.updated_time | filterTime}}</div>
                </el-table-column>
                <el-table-column
                        inline-template
                        label="操作"
                        align="center">
                        <div>
                            <permission
                                    tag="span"
                                    :route="apis.url_upd"
                                    class="operate"
                                    v-for="(operate,index) in operates"
                                    :key="index"
                                    @click="dooperate(row.id, operate.action)">{{operate.label}}</permission>
                        </div>
                </el-table-column>
            </el-table>
            <el-pagination
                    class="page-fixed"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="tables.page"
                    :page-sizes="[20,50,100,200,500]"
                    :page-size="tables.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tables.total">
            </el-pagination>
        </el-row>
    </template>
    <style lang="stylus">

    </style>
    <script>
        import {url_change_status,url_upd} from '../../../../api/paypal';
        export default{
            permission:{
                url_change_status,
                url_upd
            },
            data(){
                return{
                    operates:[
                        {label:'修改',action:function(id){
                            this.$emit('modify',id);
                        }},
                    ]
                }
            },
            filters:{
                filterTime(val){
                    return val?datef('YYYY-MM-dd HH:mm:ss',val):"-- --"
                }
            },
            methods:{
                sort_change(val){
                    this.$emit('sort-change',val);
                },
                handleSizeChange(size){
                    this.$emit('change-size',size);
                },
                handleCurrentChange(page){
                    this.$emit('change-page',page)
                },
                dooperate(id, action){
                    action.call(this,id);
                },
                handleSelectionChange(selects){
                    this.$emit('selects', selects);
                },
                changStatus(row){
                    console.log("row",row);
                    this.$emit('change-status',row);
                }
            },
            computed:{
                lists(){
                    return this.tables.lists.map(data=>{
                        data.is_invalid = data.is_invalid ? true : false;
                        return data;
                    })
                },
                emptyText() {
                    return this.firstLoading?'等待请求数据中...':'暂无数据'
                },
            },
            props:{
                tables:{
                    required:true,
                    type:Object
                },
                firstLoading: {
                    type: Boolean,
                    required: true
                }
            },
            components:{
                uiTip:require('../../../../components/ui-tip.vue').default
            }
        }
    </script>
