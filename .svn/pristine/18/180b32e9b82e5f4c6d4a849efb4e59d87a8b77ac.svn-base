<template>
    <li class="c-filter-config">
        {{config.name}}：
        <template v-if="['select','multiple-select'].includes(config.type)">
            <el-radio-group v-if="optionsCount <= 5"
                            :value="value"
                            @input="change">
                <el-radio v-for="option in options"
                          :key="option.value"
                          :label="option.value">
                    {{option.label}}
                </el-radio>
            </el-radio-group>
            <!--<el-select v-else :value="value"-->
                       <!--placeholder="输入可搜索更多..."-->
                       <!--class="inline"-->
                       <!--@input="change"-->
                       <!--multiple-->
                       <!--filterable-->
                       <!--clearable-->
                       <!--:remote="true"-->
                       <!--:remote-method="fetchMethod"-->
            <!--&gt;-->
            <el-select v-else :value="value"
                       style="width:380px;display:inline-block"
                       placeholder="输入可搜索更多..."
                       @input="change"
                       multiple filterable clearable>
                <el-option v-for="option in selectOptions"
                           :label="option.label"
                           :key="option.value"
                           :value="option.value"
                ></el-option>
            </el-select>
        </template>
    </li>
</template>
<style lang="stylus">
    .c-filter-config{
        margin:3px;
        .el-select__tags{
            height: 30px!important;
            width: 350px;
            overflow-y: auto;
            >span{
                white-space: inherit;
            }
        }
    }
</style>
<script>

    export default{
        data(){
            return{
                query:''
            }
        },
        methods:{
            change(val){
                this.$emit('change',this.config.class, val);
            },
            fetchMethod(query){
                console.log(query);
                this.query = query;
            }
        },
        computed:{
            options(){
                switch (this.config.options.constructor.name){
                    case 'Array':
                        return this.config.options;
                    case 'Object':
                        let options = Object.keys(this.config.options).map(label=>{
                            return {
                                label,
                                value:this.config.options[label]
                            }
                        });
                        return options;
                    default:
                        return []
                }
            },
            ridioOptions(){
                const headers = [{label:'关闭过滤器',value:''},{label:'本/自已',value:0}];
                return [...headers, ...this.options];
            },
            selectOptions(){
                let ret = [{label:'关闭过滤器',value:''},{label:'本/自已',value:0}];
                return [...ret, ...this.options];
            },
            optionsCount(){
                return this.options.length;
            }
        },
        watch:{
            'config.value'(val){
                console.log(val)
            },
        },
        props:{
            config:{},
            value:{}
        },
        components:{

        }
    }
</script>