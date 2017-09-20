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
            						<th>created</th>
            						<th>operation</th>
            					</tr>
            				</thead>
            				<tbody>
            					<tr v-for="item in getSort">
            						<td>{{ item.id }}</td>
            						<td>{{ item.name }}</td>
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
                                        <Button type="success" @click="submitStoreSort">创建分类</Button> 
                                    </td>
                                </tr>
            				</tbody>
            			</table>
            		</div>
               </div>
            </div>
            <simplert :useRadius="true"
                  :useIcon="true"
                  ref="ArticleSortPage">
        	</simplert>
        </div>
</template>
<script>
	import Simplert from 'vue2-simplert';
	export default{
		name:'artsort',
		data(){
			return {
				StoreSort:''
			}
		},
		components:{
            Simplert
        },
		created(){
			 this.$store.dispatch('getSortFromServer',{_this:this}); //向服务器获取分类
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
                        url:_this.$config.host+'/artsort/',
                        method:'post',
                        data:{
                            'name':_this.StoreSort
                        }
                     })
                     .then((response)=>{
                        let status = response.data.status;
                        if(status === 1){
                            return msg(_this,'error','Store Sort Fail');
                        }
                        _this.$store.commit('pushOneItemSort',{data:response.data.result});
                        _this.StoreSort='';
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
                        url:_this.$config.host+'/artsort/'+item.id,
                        method:'delete',
                     })
                     .then((response)=>{
                        let status = response.data.status;
                        if(status === 1){
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
        },

	}
function msg(_this,status='error',info)
{
    return status==='error'?
        _this.$Notice.error({title: 'Fuck',desc: info}):
        _this.$Notice.success({title: 'Fuck',desc: info});
} 	
</script>