<template>
	<div class="content">
		<span class="well block text-center">
            <b>文章管理</b>
        </span>	
        <hr>
        <art-sort-page></art-sort-page>
        <div class="row">
            <div class="col-md-12 col-lg-12">
               <div class="panel panel-default">
                    <div class="panel-heading">
                        最近发表的文章
                        <router-link to="/send_article">
                            <button class="btn btn-default btn-small pull-right">发表文章</button>
                        </router-link>  
                    </div>
                    <div class="panel-body table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>title</th>
                                    <th>author</th>
                                    <th>desc</th>
                                    <th>sort</th>
                                    <th>created_at</th>
                                    <th>operation</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in getArticleList">
                                    <td>{{ item.id }}</td>
                                    <td><small>{{ item.title }}</small></td>
                                    <td><small>{{ item.author }}</small></td>
                                    <td><small>{{ item.description }}</small></td>
                                    <td><small>{{ item.sort_id }}</small></td>
                                    <td><small>{{ item.created_at }}</small></td>
                                    <td>
                                        <Button type="ghost" size="small" shape="circle" icon="android-delete" 
                                            @click="deleteArticle(item)">
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
               </div>
            </div>
        </div>
         <simplert :useRadius="true"
                  :useIcon="true"
                  ref="ArticlePage">
        </simplert>
	</div>	
</template>
<script>
    import Simplert from 'vue2-simplert';
    import ArtSortPage from '../../components/article/artsort.vue';
	export default{
		name:'article',
		data(){
			return {
                
			}
		},
        components:{
            Simplert,ArtSortPage
        },
		created(){
			 this.$store.dispatch('getArticleFromServer',{_this:this});
		},
        computed:{
            getArticleList(){
                return this.$store.getters.getAllArticleFromVuex;
            },
        },
        methods:{
           deleteArticle(item){
                const _this = this;
                let delArticle = ()=>{
                    this.$axios({
                        url:_this.$config.host+'/article/'+item.id,
                        method:'delete',
                     })
                     .then((response)=>{
                        let status = response.data.status;
                        console.log(response);
                        if(status === 1){
                            return msg(_this,'error','Delete Article Fail');
                        }
                        _this.$store.commit('deleteOneItemArticle',{item:item});
                        return msg(_this,'success','Delete Article success');
                     })
                     .catch((error)=>{
                        console.log(error);
                     })
                };

                let obj = {
                    title: '删除？',
                    message: item.name,
                    type: 'info',
                    useConfirmBtn: true,
                    customConfirmBtnText: 'OK',
                    onConfirm:delArticle
                };
                this.$refs.ArticlePage.openSimplert(obj);
           },
        },
	}
function msg(_this,status='error',info)
{
    return status==='error'?
        _this.$Notice.error({title: 'Fuck',desc: info}):
        _this.$Notice.success({title: 'Fuck',desc: info});
}    
</script>
<style scoped>
	.content{
		padding:2px;
	}
	.panel{
		padding: 5px;
		margin: 0;
	}
</style>