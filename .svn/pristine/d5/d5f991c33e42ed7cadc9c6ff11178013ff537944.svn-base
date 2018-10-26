<template>
    <page-dialog :title="title" v-model="show" size="small" @open="open" @cloce="cloce" :close-on-cilck-modal="false">
        <el-form :model="form"
                 label-width="190px"
                 :rules="rules">
            <el-form-item label="添加时间：">
                <span>{{form.create_time|fdatetime}}</span>
            </el-form-item>
            <el-form-item label="平台：" prop="channel_id">
                <el-select v-model="form.channel_id"  class="width-super" >
                    <el-option v-for="item in channelList"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="站点：" prop="channel_site">
                <el-select
                           class="width-super"
                           filterable clearable
                           v-model="form.channel_site">
                    <el-option v-for="item in siteOptions"
                               :label="item.label"
                               :value="item.value"
                               :key="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="解析类型：">
                <el-select v-model="typeName"  class="width-super" >
                    <el-option v-for="item in typeList"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="网站地址：" prop="website_url">
                <el-col :span="14">
                    <el-input v-model="form.website_url"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="用户属性名：" prop="username_attribute_name">
                <el-col :span="14">
                    <el-input v-model="form.username_attribute_name" ></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="用户属性值：" prop="username_attribute_value">
                <el-col :span="14">
                    <el-input v-model="form.username_attribute_value" ></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="密码属性名：" prop="password_attribute_name">
                <el-col :span="14">
                    <el-input v-model="form.password_attribute_name" ></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="密码属性值：" prop="password_attribute_value" >
                <el-col :span="14">
                    <el-input v-model="form.password_attribute_value" ></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="提交属性名：" prop="submit_attribute_name">
                <el-col :span="14">
                    <el-input v-model="form.submit_attribute_name" ></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="提交属性值：" prop="submit_attribute_value">
                <el-col :span="14">
                    <el-input v-model="form.submit_attribute_value" ></el-input>
                </el-col>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button size="mini" type="primary" @click="sure">确定</el-button>
            <el-button size="mini" @click.native="cloce">关   闭</el-button>
        </div>
    </page-dialog>
</template>
<style lang="stylus">

</style>
<script>
    import {api_get_channel,api_account_list,api_automatic_save,api_automatic_update} from '../../../api/platform-automatic-login'
    export default{
        refresh(){
            this.siteOptions=[{label:"",value:""}];
        },
        data(){
            return{
                typeName:0,
                channelList:[],
                siteOptions:[{label:"",value:""}],
                show:this.value,
                typeList:[
                    {label:'正常解析',value:0},
                    {label:'JQ解析',value:1},
                    {label:'Xpath解析',value:2}
                ],
                rules:{
                    channel_id:[
                        {required: true, message: '平台为必填项', trigger: 'change',type:'number'}
                    ],
                    channel_site:[
                        {required: true, message: '站点为必填项', trigger: 'change' }
                    ],
                    website_url:[
                        {required:true,message:'网站地址为必填',trigger:'change'}
                    ],
                    username_attribute_name:[
                        {required:true,message:'用户属性名为必填',trigger:'change'}
                    ],
                    username_attribute_value:[
                        {required:true,message:'用户属性值为必填',trigger:'change'}
                    ],
                    password_attribute_name:[
                        {required:true,message:'密码属性值为必填',trigger:'change'}
                    ],
                    password_attribute_value:[
                        {required:true,message:'密码属性值为必填',trigger:'change'}
                    ],
                    submit_attribute_name:[
                        {required:true,message:'提交属性值为必填',trigger:'change'}
                    ],
                    submit_attribute_value:[
                        {required:true,message:'提交属性值为必填',trigger:'change'}
                    ],
                },
            }
        },
        methods:{
            sure(){
                let data = window.clone(this.form);
                data.type = this.typeName;
                delete data.id;
                this.$http(api_automatic_update,this.form.id,data).then(res=>{
                    this.$emit('search');
                    setTimeout(()=>{
                        this.show = false;
                    },1500);
                    this.$message(({message:res.message||message,type:'success',duration:1500}))
                })
            },
            open(){
                this.channel_remote();
            },
            cloce(){
                this.show=false
            },
            channel_remote(){
                this.$http(api_get_channel,{}).then(res=>{
                    this.channelList = res;
                }).catch(code=>{
                    this.$message({message:code.message, type:'error'});
                });
            },
            get_site(channel_id){
                if(!channel_id)return this.siteOptions = [{label:"",value:""}];
                this.$http(api_account_list,{channel_id:channel_id}).then(res=>{
                    if(res.site.length<=0){
                        this.siteOptions = [{label:"",value:""}]
                    }else{
                        res = res.site;
                        this.siteOptions = [{label:"全部",value:""},...res];
                    }
                }).catch(code=>{
                    console.log(code);
                })
            },
        },
        filters:{
            fdatetime(val) {
                return datef("YYYY-MM-dd HH:mm:ss", val)
            }
        },
        watch:{
            show(val){
                this.$emit('input', val);
            },
            value(val){
                this.show = val;
            },
            "form.channel_id"(val) {
                this.form.channel_site = '';
                this.siteOptions = [{label: "", value: ""}];
                this.get_site(val);
            },
        },
        props:{
            value:{
                required:true,
                type:Boolean
            },
            title:{
                type:String
            },
            form:{}
        },
        components:{
            pageDialog:require('@/components/page-dialog.vue').default,
            selectRemote:require('@/components/select-remote.vue').default,
        }
    }
</script>
