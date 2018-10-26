<template>
    <div class="c-test">
        <!--<div id="laaaaaa">loading</div>-->
        <!--<test-slot gg="111" ggg="2222" id="laaaaaa2"></test-slot>-->
        <!--<input type="file" ref="file" @change="change">-->
        <!--<el-button @click.native="xls">xls</el-button>-->
        <img :src="imgs" alt="">
        <p @click="downs">下 载</p>
    </div>
</template>
<style lang="stylus">

</style>
<script>
    import {readWorkbookFromLocalFile} from '@/lib/xlsx';
    export default {
        data() {
            return {
                value: 'ceshi',
                imgs:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535798325813&di=725200257c7a104416f910847f9023b0&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2Fd9479fa6834697c0c39c386a0f69f0a78b685bf9.jpg'
            }
        },
        mounted() {
            this.$http(new Promise((succ => {
                setTimeout(() => succ(), 4000);
            }))).loading('#laaaaaa');
            this.$http(new Promise((succ => {
                setTimeout(() => succ(), 4000);
            }))).loading('#laaaaaa2')
        },
        methods: {
            downs(){
                let alink = document.createElement("a");
                alink.href = this.imgs;
                alink.download = "pic"; //图片名
                alink.click();
            },
            change({target}) {
                console.log(target)
                let fileArr = Array.prototype.slice.call(target.files);
                fileArr.forEach(file => {
                    readWorkbookFromLocalFile(file).then(res => {
                        console.log(res);
                    })
                })
            },
            xls() {
                this.$refs.file.click();
            },
            value_changed(val) {

            },
            query(str) {
                return [111, 2223, 333]
            },
            find(f) {
                console.log(f);
            }
        },
        components: {
            simditor: require('../components/simditor').default,
            testSlot: require('./test-slot').default,
        }
    }
</script>