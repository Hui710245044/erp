<template>
    <div class="c-search-time">
        <search-card :params="searchData" @search="search" :clears="clears" @enter="search">
            <label class="inline">上架时间：</label>
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
            <label-item label="开发员：" class="ml-sm">
                <el-input v-model="searchData.developer"
                          placeholder="请输入开发员..."
                          class="inline width-super mr-sm"
                          v-sf.name></el-input>
            </label-item>
            <label-item label="SPU：" class="ml-sm">
                <order-input v-model="searchData.spu"
                    class="inline width-super mr-sm"
                    @keydown='key_down'
                    v-sf.connd_value
                    placeholder="可批量搜索，Shift+回车换行..."></order-input>
            </label-item>
        </search-card>
    </div>
</template>
<style lang="stylus" scoped>
    .c-search-time{
        .el-card{
            overflow: inherit;
        }
    }
</style>
<script>
    export default {
        data() {
            return {
                clears:{},
                pickerstart:{
                    disabledDate:(time)=>{
                        if(this.searchData.end_time){
                            return  time.getTime() > this.searchData.end_time;
                        }else {
                            return false
                        }
                    },
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
                countryList:[
                    {label:'全部',value:0},
                    {label:'哈哈',value:1},
                ],
            }
        },
        methods:{
            key_down(){
                this.search();
            },
            search(){
                this.$emit('search');
            },
        },
        props:{
            searchData:{
                required:true,
                type:Object
            },
        },
        components: {
            orderInput:require("@/components/order-input.vue").default,
            labelItem:require('@/components/label-item.vue').default,
            searchCard: require('@/components/search-card.vue').default,
        }
    }
</script>