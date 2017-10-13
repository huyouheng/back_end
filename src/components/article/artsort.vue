<template>
	<div class="row">
            <div class="col-md-12 col-lg-12">
               <div class="panel panel-default">
            		<div class="panel-heading">
            			文章类别
            		</div>
            		<div class="panel-body table-responsive">
            			<table class="table table-bordered">
            				<thead>
            					<tr>
            						<th>id</th>
                                    <th>name</th>
            						<th>description</th>
            						<th>created</th>
            						<th>operation</th>
            					</tr>
            				</thead>
            				<tbody>
            					<tr v-for="item in getSort">
            						<td>{{ item.id }}</td>
                                    <td>{{ item.name }}</td>
            						<td>{{ item.description }}</td>
            						<td>{{ item.created_at }}</td>
            						<td>
            							<Button type="ghost" size="small" shape="circle" icon="android-delete" 
						                    @click="deleteSort(item)">
						                </Button>
            						</td>
            					</tr>
                                <tr>
                                    <td>id</td>
                                    <td>
                                        <Input v-model="StoreSort" size="large"
                                            placeholder="input sort name">
                                        </Input>
                                    </td>
                                    <td>
                                        <Input v-model="StoreDesc" size="large"
                                            placeholder="input sort description">
                                        </Input>
                                    </td>
                                    <td>
                                        <Button type="success" @click="isSelectIcon = true">选择图片</Button> 
                                    </td>
                                    <td>
                                        <Button type="success" @click="submitStoreSort">创建分类</Button> 
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="5" class="text-center" v-if="categoryIcon">
                                        <img width="100" height="100" :src="categoryIcon" alt="">
                                    </td>
                                </tr>
            				</tbody>
            			</table>
            		</div>
               </div>
            </div>
            <Modal
                v-model="isSelectIcon"
                class-name="vertical-center-modal">
                <recent-upload-pic title="最近上传的图片" name="send_article_pic"
                    v-bind:needDelete="false"
                    v-bind:needSelect="true"
                    v-on:returnSelectEvent="hasSelected"></recent-upload-pic>
            </Modal>
            <simplert :useRadius="true"
                  :useIcon="true"
                  ref="ArticleSortPage">
        	</simplert>
        </div>
</template>
<script>
	import Simplert from 'vue2-simplert';
    import RecentUploadPic from '../../components/oss/RecentUploadPic.vue';
	export default{
		name:'artsort',
		data(){
			return {
				StoreSort:'',
                StoreDesc:'',
                StoreIcon:'',
                categoryIcon:'',//专栏的Icon
                isSelectIcon:false,
			}
		},
		components:{
            Simplert,RecentUploadPic
        },
		created(){
			 if(this.getSort.length==0){
                this.$store.dispatch('getSortFromServer',{_this:this}); //向服务器获取分类
             }
		},
		computed:{
            getSort(){
                return this.$store.getters.getAllArtSort;
            },
        },
        methods:{
            submitStoreSort(){
                if(this.StoreSort =='')
                    return msg(this,'error','类名不能为空');
                const _this = this;
                let addSort = ()=>{
                    this.$axios({
                        url:_this.$config.host+_this.$config.category,
                        method:'post',
                        data:{
                            'name':_this.StoreSort,
                            'file_id':_this.StoreIcon,
                            'description':_this.StoreDesc
                        }
                     })
                     .then((response)=>{
                        let status = response.data.status;
                        if(status !== 200 && response.data.code == 1){
                            return msg(_this,'error','Store Sort Fail');
                        }
                        _this.$store.commit('pushOneItemSort',{data:response.data.result});
                        _this.StoreSort='';
                        _this.StoreIcon='';
                        _this.StoreDesc='';
                        return msg(_this,'success','Store Sort success');
                     })
                     .catch((error)=>{
                        console.log(error);
                     })
                };

                let obj = {
                    title: '添加？',
                    message: this.StoreSort,
                    type: 'info',
                    useConfirmBtn: true,
                    customConfirmBtnText: 'OK',
                    onConfirm:addSort
                };
                this.$refs.ArticleSortPage.openSimplert(obj);
            },
            deleteSort(item){
            	const _this = this;
                let delSort = ()=>{
                    this.$axios({
                        url:_this.$config.host+_this.$config.category+'/'+item.id,
                        method:'delete',
                     })
                     .then((response)=>{
                        let code = response.data.code;
                        if(code === 1){
                            return msg(_this,'error','Delete Sort Fail');
                        }
                        _this.$store.commit('deleteOneItemSort',{item:item});
                        return msg(_this,'success','Delete Sort success');
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
                    onConfirm:delSort
                };
                this.$refs.ArticleSortPage.openSimplert(obj);
            },
            hasSelected(url,id){
                this.StoreIcon = id;
                this.categoryIcon = url;
            }
        },

	}
function msg(_this,status='error',info)
{
    return status==='error'?
        _this.$Notice.error({title: 'Fuck',desc: info}):
        _this.$Notice.success({title: 'Fuck',desc: info});
} 	
</script>