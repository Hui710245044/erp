const has=1;
const stay=2;
const abnormal=3;
const fail=4;
import {
    api_edit_listing,
    api_publish_edit,
    api_publish_del,
    api_amazon_defeat,
    url_amazon_defeat,
    url_edit_listing,
    url_publish_del,
    url_publish_edit,
    url_amazon_logs
} from '../../../../api/amazon-publish-list';
export const operateList = [
    {label:"停售",value:"1",api:url_edit_listing,action:function(row){
        console.log('停售');
        if(row.fulfillment_type === 2){
            this.$message({
                type: 'info',
                message: 'FBA订单暂不支持停售'
            });
            return
        }
        let parameter = {
            type:'quantity',
            data:[{
                amazon_listing_id:row.amazon_listing_id,
                account_id:row.account_id,
                new_value:0,
                old_value:row.quantity
            }]
        };
        this.$http(api_edit_listing, parameter).then(res=>{
            this.$message({
                type: 'success',
                message: res.message || res
            })
        }).catch(code=>{
            this.$message({
                type:"error",
                message:code.message || code
            })
        });

    },status:[has]},
    {label:"删除",value:"2",api:url_publish_del,action:function(row){
        console.log('删除');
        let parameter = {
            type:'seller_status',
            data:[{
                amazon_listing_id:row.amazon_listing_id,
                account_id:row.account_id,
                new_value:3,
                old_value:row.seller_status
            }]
        };

        this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.$http(api_edit_listing, parameter).then(res=>{
                this.$message({
                    type: 'success',
                    message: `已删除`
                })
            }).catch(code=>{
                this.$message({
                    type:"error",
                    message:code.message || code
                })
            });
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
        });


    },status:[has]},
    {label:"操作日志",value:"3",api:url_amazon_logs,action:function(row){
        this.logVisible = true;
        this.amazon_listing_id = row.amazon_listing_id;
        console.log('操作日志');
    },status:[has]},
    {label:"编辑描述",value:"4",api:url_edit_listing,action:function(row){
        console.log('编辑详情描述');
        this.id = row.id;
        this.account_id = row.account_id;
        this.amazon_listing_id = row.amazon_listing_id;
        this.contentVisible = true;
    },status:[has]}
];
export const publish_queue_action = [
    {label:"编辑",value:"1",api:url_publish_edit,action:function(row){
        let params = {
            id:row.id,
            spu: row.spu,
            goods_id: row.goods_id,
            account_id: row.account_id,
            site: row.site,
            add: false,
            curPage:'queue',//刊登记录
        };
        this.$open(`/kandeng/amazon/info`, params);
        // this.$http(api_publish_edit, {id: row.id}).then(res=>{
                // account_id: this.searchData.account,
                // site: this.searchData.site,
                // add: true,
                // curPage:'not',//未刊登
            // this.$open(`/kandeng/amazon/info/${goods_id}`, params)
            // this.$open(`/kandeng/amazon/info`, params)
        // })

    },status:[has]},
    {label:"复制",value:"2",api:url_publish_edit,action:function(row){
            let params = {
                id:row.id,
                spu: row.spu,
                goods_id: row.goods_id,
                account_id: row.account_id,
                site: row.site,
                add: false,
                curPage:'copy',//刊登记录
            };
            // this.$open(`/kandeng/amazon/info/${goods_id}`, params)
            this.$open(`/kandeng/amazon/info`, params)
        // this.$http(api_publish_edit, {product_id: row.product_id}).then(res=>{
        //     let item = Object.values(res)[0];
        //     let goods_id = item.goods_id;
        //     let spu = item.spu;
        //     let params = {
        //         spu:spu,
        //         goods_id: goods_id,
        //         item: item,
        //         copy: true,
        //     };
        //

        // })

    },status:[has]},
    {label:"删除",value:"3",api:url_publish_del,action:function(row){
        if(row.publish_status!==0&&row.publish_status!==3)return this.$message({type:"warning",message:'只能删除待上传和上传失败的记录'});
        this.$http(api_publish_del, {id: row.id}).then(res=>{
            this.$message({
                type: 'success',
                message: res.message || res
            });
            let findIndex = this.tableData.findIndex(item=>{
                return item === row;
            });
            if(findIndex !== -1){
                this.tableData.splice(findIndex, 1);
            }
        }).catch(code=>{
            this.$message({
                type:"error",
                message:code.message || code
            })
        })
    },status:[has]},
    {label:"强制失败",value:"4",api:url_amazon_defeat,action:function(row){
        this.$http(api_amazon_defeat,row.id).then(res => {
            this.$message({type:'success',message:res.message});
            this.init();
        }).catch(code => {
            this.$message({type:'error',message:code.message});
        })
    },status:[has]}
];
