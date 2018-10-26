<template>
    <div class="c-search-time">
        <search-card :params="searchData" @search="search" :clears="clears" @enter="search">
            <label-buttons label="平台：" @select="change_status" :buttons="saleStatus" :max='14'></label-buttons>
            <label class="inline">刊登时间：</label>
            <el-date-picker
                    v-model="searchData.start_time"
                    type="date"
                    placeholder="开始时间"
                    class="inline date"
                    v-sf.start_time
                    :picker-options="pickerstart">
            </el-date-picker>
            <label>&nbsp;--&nbsp;</label>
            <el-date-picker
                    v-model="searchData.end_time"
                    type="date"
                    placeholder="结束时间"
                    class="inline date"
                    v-sf.end_time
                    :picker-options="pickerend">
            </el-date-picker>
        </search-card>
    </div>
</template>
<style lang="stylus">

</style>
<script>
    import {api_get_channels} from '../../../api/platform-statistics'
    export default {
        data() {
            return {
                saleStatus:[],
                clears:{},
                pickerstart:{
                    disabledDate:(time)=>{
                        if(this.searchData.end_time){
                            return  time.getTime() > this.searchData.end_time;
                        }else {
                            return false
                        }
                    }
                },
                pickerend:{
                    disabledDate:(time)=>{
                        if(this.searchData.start_time){
                            return  time.getTime() < this.searchData.start_time;
                        }else {
                            return false
                        }
                    }
                },
            }
        },
        mounted(){
            this.init_status();
        },
        methods:{
            search(){
                this.$emit('search');
            },
            init_status(){
                this.$http(api_get_channels).then(res=>{
                    this.saleStatus = res.filter(item=> item.value !== 5&&item.value !== 6&&item.value !== 9&&item.value !== 10&&item.value !== 11&&item.value !== 12&&item.value !== 13&&item.value !== 14);
                }).catch(code => {
                    this.$message({type: 'error', message: code.message || code});
                })
            },
            change_status(index){
                this.$emit('change-status',this.saleStatus[index].value,this.saleStatus[index].label);
            },
        },
        props:{
            searchData:{
                required:true,
                type:Object
            },
        },
        components: {
            labelButtons: require('@/components/label-buttons.vue').default,
            searchCard: require('@/components/search-card.vue').default,
        }
    }
</script>