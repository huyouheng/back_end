<template>
	 <div class="row">
            <div class="col-md-12 col-lg-12">
               <div class="panel panel-default">
                    <div class="panel-heading">
                        最近发表的文章
                        <router-link to="/send_article">
                            <button class="btn btn-default btn-small pull-right" @click="changeEditArtId">发表文章</button>
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
                                    <td>
                                        <small>
                                            <template v-if="typeof(item.created_at) == 'object'">
                                                {{ item.created_at.date }}
                                            </template>
                                            <template v-else>
                                                {{ item.created_at }}
                                            </template>
                                        </small>
                                    </td>
                                    <td>
                                        <Button type="ghost" size="small" shape="circle" icon="android-delete" 
                                            @click="deleteArticle(item)">
                                        </Button>
                                        <router-link to="send_article">
                                            <Button type="ghost" size="small" shape="circle" icon="edit"
                                            @click="editArticle(item.id)">
                                            </Button>
                                        </router-link>

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="panel-footer">
                    	<Page :total="200" show-elevator :current="curPage" v-on:on-change="pageChange"></Page>
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
	export default {
		data(){
			return {
				curPage:1
			}
		},
		components:{
            Simplert
        },
		
		created(){
            if(this.$store.getters.getAllArticleFromVuex.length == 0){
			     this.$store.dispatch('getArticleFromServer',{_this:this});
            }
		},
        computed:{
            getArticleList(){
                return this.$store.getters.getAllArticleFromVuex;
            },
        },
        methods:{
        	pageChange(page){

        	},
           deleteArticle(item){
                const _this = this;
                let delArticle = ()=>{
                    this.$axios({
                        url:_this.$config.host+_this.$config.article+'/'+item.id,
                        method:'delete',
                     })
                     .then((response)=>{
                        let code = response.data.code;
                        console.log(response);
                        if(code === 1){
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
           editArticle(id){
                this.$store.state.article.editArtId = id;
           },
           changeEditArtId(){
                this.$store.state.article.editArtId=null
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