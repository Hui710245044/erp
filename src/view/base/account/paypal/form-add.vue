<template>
    <page-dialog title="添加paypal账号" v-model="dialogVisible" size="small" :close-on-click-modal="false">
        <div>
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="130px">
                <el-row>
                    <el-col :span="20">
                        <el-form-item label="账户名：" prop="account_name">
                            <el-input v-model="addForm.account_name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20">
                        <el-form-item label="API用户名：" prop="api_user_name">
                            <el-input v-model="addForm.api_user_name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20">
                        <el-form-item label="抓取PayPal订单功能：">
                            <el-select v-model="addForm.download_paypal" filterable>
                                <el-option
                                        v-for="res in downloadList"
                                        :label="res.label"
                                        :value="res.value"
                                        :key="res.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20">
                        <el-form-item label="API密码：" prop="api_secret">
                            <el-input v-model="addForm.api_secret" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="API签名：" prop="api_signature">
                            <el-input type="textarea" v-model="addForm.api_signature"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <request-button req-key='submitPaypal' @click="submit">确定</request-button>
            <el-button  size="mini" @click.native="cancel">取消</el-button>
        </span>
    </page-dialog>
</template>
<style lang="stylus">

</style>
<script>
    import {api_add} from '../../../../api/paypal';
    import {chinese} from '../../../../define/validator_reg'
    export default{
        data(){
            let isChinese = (rule,value,callback)=>{
                return chinese.test(value)? callback(new Error("输入内容不能存在中文字符")):callback();
            }
            return{
                dialogVisible:this.value,
                downloadList:[
                    {label:"未启用",value:0},
                    {label:"30分钟",value:30}
                ],
                rules:{
                    account_name:[
                        {required:true,message:"账户名不能为空",trigger:"blur"},
                        {validator:isChinese,trigger:"blur"}
                    ],
                    api_user_name:[
                        {required:true,message:" API用户名不能为空",trigger:"blur"},
                        {validator:isChinese,trigger:"blur"}
                    ],
                    api_secret:[
                        {required:true,message:"API密码不能为空",trigger:"blur"}
                    ],
                    api_signature:[
                        {required:true,message:"API签名不能为空",trigger:"blur"}
                    ]
                }
            }
        },

        watch:{
            dialogVisible(value){
                this.$emit('input',value);
            },
            value(val){
                this.dialogVisible = val;
            }
        },
        methods:{
            submit(){
                this.$refs.addForm.validate((bool)=>{
                    Object.keys(this.addForm).forEach(key=>{
                       if(typeof this.addForm[key] === 'string'){
                           this.addForm[key] = this.addForm[key].trim();
                       }
                    });
                    if(bool){
                        this.$http(api_add,this.addForm).then(succ=>{
                            this.$message({
                                type:'success',
                                message:succ.message||succ
                            });
                            this.$emit('add-result',succ.id,this.addForm);
                            this.dialogVisible = false;
                        }).catch(fail=>{
                            this.$message({
                                type:'error',
                                message:fail.message||fail
                            });
                            this.dialogVisible = true;
                        }).finally(()=>{
                            setTimeout(() => {
                                this.$reqKey('submitPaypal', false);
                            }, 300)
                        })
                    }else{
                        this.$reqKey('submitPaypal', false);
                    }
                })
            },
            cancel(){
                this.dialogVisible = false;
            }
        },
        props:{
            value:{},
            addForm:{
                required:true,
                type:Object
            }
        },
        components:{
            pageDialog:require('../../../../components/page-dialog.vue').default,
            requestButton:require('../../../../global-components/request-button').default
        }
    }
</script>
