<template>
	<div class="content">
		<span class="well block text-center">
            <b>文章编辑</b>
        </span>
        <hr>
        <div class="content-body">
        	<div class="block">
               <label class="control-label">标题</label>
               <input type="text" class="form-control" placeholder="Post title" v-model="articleTitle">
        	</div>
        	<div class="block">
               <label class="control-label">作者</label>
               <input type="text" class="form-control" placeholder="小胡" v-model="articleAuthor">
        	</div>
        	<div class="block">
               <label class="control-label">描述</label>
               <input type="text" class="form-control" placeholder="描述" v-model="articleDesc">
        	</div>
        	<div class="block">
               <label class="control-label">分类</label>
               <Select style="width:200px" v-model="articleSort">
		        <Option v-for="item in getSort" :value="item.id" :key="item.id">{{ item.name }}</Option>
		    </Select>
        	</div>
        	<div class="block" style="height:400px;overflow: auto;">
        		<quill-editor ref="sendArticleTextEditor"
                      v-model="articleContent"
                      :options="editorOption" style="height:400px">
       		 	</quill-editor>
        	</div>
        	<div class="block">
        		<label class="control-label">封面图片 
	        		<button class="btn btn-small btn-default" @click="isSelectIcon = true">
	        			Select
	        		</button>
        		</label>
        		<hr>
        	</div>
        	<div class="block text-center">
        		<img :src="articleIcon" 
        			style="width:100px;height:100px;margin:0 auto;cursor:pointer"
        			@click="isSelectIcon = true">
        	</div>
        	<div class="block">
				<button class="btn btn-success btn-block" @click="sendArticle">发表文章</button>
        	</div>
        </div>
        <Modal
	        title="选择图片"
	        v-model="isSelectIcon"
	        class-name="vertical-center-modal">
	        <img :src="item.url" alt="" v-for="item in getPicList" 
	        	class="selectPicItem" @click="selectThisPic(item.url)"/> 
	    </Modal>
	     <simplert :useRadius="true"
                  :useIcon="true"
                  ref="SendArticlePage">
        </simplert>
    </div>	
</template>
<script>
  import Quill from 'quill'
  import { ImageImport } from './ImageImport.js'
  import { ImageResize } from './ImageResize.js'
  import Simplert from 'vue2-simplert';
  Quill.register('modules/imageImport', ImageImport)
  Quill.register('modules/imageResize', ImageResize)
	export default{
		data(){
			return {
				articleTitle:'',
				articleAuthor:'',
				articleDesc:'',
				articleSort:'',
				articleContent:'',
				articleIcon:'',
				isSelectIcon:false,
				editorOption: {
					theme: 'snow',
					placeholder: '编辑正文...',
					modules: {
						history: {
			              delay: 1000,
			              maxStack: 50,
			              userOnly: false
			            },
			            imageImport: true,
						imageResize: {
			              displaySize: true
			            },
		        	}
				},
			}
		},
		components:{
			Simplert,
		},
		computed:{
			getPicList(){ //得到所有图片
            	return this.$store.getters.getPictureList;
        	},
        	 getSort(){
                return this.$store.getters.getAllArtSort;
            },
		},
		methods:{
			sendArticle(){
				if(this.articleTitle =='')
					return msg(this,'error','标题为空');
				if(this.articleAuthor =='')
					return msg(this,'error','作者为空');
				if(this.articleDesc =='')
					return msg(this,'error','描述为空');
				if(this.articleSort =='')
					return msg(this,'error','分类为空');
				if(this.articleContent =='')
					return msg(this,'error','内容为空');
				if(this.articleIcon =='')
					return msg(this,'error','封面图片为空');
				const _this = this;
				let data = {
						title:this.articleTitle,
						author:this.articleAuthor,
						description:this.articleDesc,
						icon:this.articleIcon,
						sort_id:this.articleSort,
						content:this.articleContent,
					};
				let postArticle = ()=>{
					this.$axios({
					url:_this.$config.host+'/article',
					method:'post',
					data:{
						title:_this.articleTitle,
						author:_this.articleAuthor,
						description:_this.articleDesc,
						icon:_this.articleIcon,
						sort_id:_this.articleSort,
						content:_this.articleContent,
					}
					})
					.then((response)=>{
						let data = response.data;
						if(data.status == 1)
							return msg(_this,'error','Post Article Fail');
						let id = data.result;
						let item = {
							id:id,
							title:_this.articleTitle,
							author:_this.articleAuthor,
							description:_this.articleDesc,
							icon:_this.articleIcon,
							sort_id:_this.articleSort,
							content:_this.articleContent,
						};
						console.log(item);
						_this.$store.commit('pushOneItemArticle',{data:item});
						return msg(_this,'success','Post Article success');
					})
					.catch((error)=>{
						console.log(error);
					});
				};
				 let obj = {
	                title: '发表？',
	                message: this.articleTitle,
	                type: 'info',
	                useConfirmBtn: true,
	                customConfirmBtnText: 'OK',
	                onConfirm:postArticle
                };
                this.$refs.SendArticlePage.openSimplert(obj);
			},
			selectThisPic(url){ //点击图片 进行选择
				this.articleIcon = url;
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
<style  lang="less" scoped>
	.content-body{
		padding: 5px;
	}
	.vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: 0;
        }
    }
    .selectPicItem{
    	width:60px;
    	margin:3px;
    	paddign:1px;
    	border-radius: 1px;
    	cursor: pointer;
    }

</style>
