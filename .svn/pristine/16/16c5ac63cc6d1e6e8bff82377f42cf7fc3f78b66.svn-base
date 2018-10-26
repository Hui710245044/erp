<template>
    <page>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="`下单异常（${totalStatistics.shipping_exception}）`" name="1">
                <place-tab ref="arrive" v-if="activeName === '1'"></place-tab>
            </el-tab-pane>
            <el-tab-pane :label="`集包异常（${totalStatistics.collection_exception}）`" name="2">
                <package-tab ref="wait" v-if="activeName === '2'"></package-tab>
            </el-tab-pane>
        </el-tabs>
    </page>
</template>
<style lang="stylus">

</style>
<script>
    import {api_providers_exception_total} from '../../../api/packages';

    export default {
        data() {
            return {
                activeName: '1',
                totalStatistics: '',
                exportVisable: false,
                ids:[],
                fields: [],
                templates: [],
                export_type: '',
            }
        },
        refresh() {
            this.init();
            this.refresh_tab();
        },
        created() {
            this.init();
        },
        methods: {
            refresh_tab(){
                switch (this.activeName) {
                    case '1':
                        this.$refs.arrive.init();
                        break;
                    case '2':
                        this.$refs.wait.init();
                        break;
                }
            },
            init() {
                this.$http(api_providers_exception_total).then(res => {
                    this.totalStatistics = res;
                }).catch(code => {
                    this.$message({type: 'error', message: code.message || code});
                })
            },
            handleClick() {
                switch (this.activeName) {
                    case '1':
                        break;
                    case '2':
                        break;
                }
            },
        },
        components: {
            placeTab: require('./place-tab/place-tab').default,
            packageTab: require('./package-tab/package-tab').default,
            exportField: require("@/components/export-field").default,
        }
    }
</script>
