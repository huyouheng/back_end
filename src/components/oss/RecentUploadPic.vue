<template>
    <div class="panel">
        <div class="panel-heading">{{ title }}
                <Button type="ghost"
                     icon="ios-cloud-upload-outline"
                    class="pull-right"
                    @click="showUploadModa = true">
                    上传文件
                </Button>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="demo-upload-list" v-for="item in loopAllPic">
                    <template v-if="item.name">
                        <img v-lazy="item.url">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline" @click.native="handleView(item)">
                            </Icon>
                            <Icon type="ios-trash-outline" @click.native="handleRemove(item)">
                            </Icon>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <div class="panel-footer">
            <Page :total="200" show-elevator :current="curPage" v-on:on-change="pageChange"></Page>
        </div>
        <!-- file upload modal -->
        <Modal
            title="文件上传"
            v-model="showUploadModa"
            :closable="false"
            :mask-closable="false"
            :styles="{top: '10%'}"
            @on-ok="isUrlUploadFile"
            :loading="is_url_upload_loading"
            class-name="vertical-center-modal">
            <div>
                <label>Select Bucket</label>
                <Select style="width:100px" v-model="selectUploadBucket">
                    <Option v-for="item in getBucketList" 
                        :value="item.name" 
                        :key="item.name">{{ item.name }}
                    </Option>
                </Select>
                <label>Select Object</label>
                <template v-if="selectUploadBucket">
                    <Select style="width:100px" v-model="selectUploadObject">
                        <Option v-for="item in getObjectList" 
                            :value="item" 
                            :key="item">{{ item }}
                        </Option>
                    </Select>
                </template>
            </div>
            <Upload
                type="drag"
                :on-success="handleSuccess"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :format="['jpg','jpeg','png','gif','css','js','html','mp3','mp4','php']"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleUploadBefore"
                :data="uploadFileNeedData"
                :action="getUploadAddress">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击或将文件拖拽到这里上传</p>
                </div>
            </Upload>
            <label for="url_upload">URL Upload</label>
            <Input type="text" id="url_upload" v-model="is_url_upload_address"></Input>
        </Modal>
        <!-- click look picture -->
         <Modal title="查看图片" v-model="bigPicVisible">
            <small>Bucket: {{ bigPicInfo.bucket }} - Object: {{ bigPicInfo.object }} - Created_Time: {{bigPicInfo.created_at }}</small>
            <img :src="bigPicInfo.url" v-if="bigPicVisible" style="width: 100%">
        </Modal>
        
        <simplert :useRadius="true"
                  :useIcon="true"
                  ref="simplert">
        </simplert>
    </div>
</template>
<style scoped>
    .panel-heading{
        height:50px;
        line-height:30px;
    }
    .demo-upload-list{
        display: inline-block;
        width: 80px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-left: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }    
</style>
<script>
import Simplert from 'vue2-simplert'
export default {
    props:['title','name'],
    name: this.name,
    data () {
        return {
            AllPic:[
                {
                    name:'love',
                    url:'static/images/avatar.jpg'
                },
            ],
            PicCount:20, //图片最大数量
            showUploadModa:false,
            selectUploadBucket:'',//上传文件的bucket
            selectUploadObject:'',//上传文件的Object
            bigPicVisible: false,//是否显示大图
            bigPicInfo:{},//大图的url
            curPage:1, //当前图片的Page
            maxPage:0, //最大的图片Page
            is_url_upload_address:'',//
            is_url_upload_loading: true,
            per_page_count:12,//
        }
    },
    components:{
        Simplert,
    },
    created(){
        this.$store.dispatch('updatePictureList',{_this:this,page:this.curPage,isFront:1});
    },
    computed:{
        getBucketList(){
            return this.$store.getters.getBucketList;
        },
        getObjectList(){
            let data = this.$store.getters.getObjectList;
            for(let i = 0; i < data.length; i++ ){
                if(data[i][this.selectUploadBucket] != undefined){
                    return data[i][this.selectUploadBucket];
                }
            }
        },
        uploadFileNeedData(){ //上传文件需要的bucket和object
            return {bucket:this.selectUploadBucket,object:this.selectUploadObject}
        },
        getPicList(){ //得到所有图片
            return this.$store.getters.getPictureList;
        },
        loopAllPic(){ //用来控制循环显示的图片
            this.maxPage = Math.ceil(this.getReallyPicCount/this.per_page_count); //在这里来根据图片实际的数量来控制page的最大数
            return this.getPicList.slice((this.curPage-1)*this.per_page_count,(this.curPage-1)*this.per_page_count+this.per_page_count);
        },
        getReallyPicCount(){ //获取实际上数据库中图片的数量
            return this.$store.state.oss.PicTotal;
        },
        getUploadAddress(){
            return this.$config.host+'/file';
        },
    },
    methods:{
        pageChange(page){
                if(page > this.maxPage){
                    return this.$Notice.error({
                        title:'Fuck',
                        desc:'Max Page Is '+this.maxPage
                    });
                }
                this.curPage = page;
                let data = this.loopAllPic;
                // console.log(data);
                let allPic = this.getPicList;
                if(allPic.length < this.curPage * this.per_page_count){
                    // let noPage = ((this.curPage-1) * this.per_page_count - allPic.length)/this.per_page_count;
                    for(let i = 1 ; i <= this.curPage ; i++){
                        if(allPic.length < i * this.per_page_count){
                            let hasData = this.getPicList.slice((i-1)*this.per_page_count,(i-1)*this.per_page_count+this.per_page_count);
                            if(hasData.length == 0){
                                this.$store.dispatch('updatePictureList',{_this:this,page:i,isFront:0});
                            }
                        }
                    }
                }
                // if(data.length == 0){ // this page no data
                //     this.$store.dispatch('updatePictureList',{_this:this,page:this.curPage,isFront:0});
                // }
                // console.log(page,this.maxPage); 
        },
        handleSuccess(res, file){ //上传文件成功
            console.log(res);
            if(res.code == 204 && res.status == 0){
                this.$Notice.success({
                    title: 'Fuck',
                    desc: 'Upload File Success'
                });
                this.$store.commit('updatePicTotal',{count:1});  //更新实际上图片的总数
                this.$store.commit('updatePictureList',{data:res.result,isFront:1}); // 上传成功后将数据追加到状态管理中
            }
        },
        handleMaxSize(file){ //
            this.$Notice.warning({
                title: '超出文件大小限制',
                desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
            });
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg ,gif 或 png 格式的图片。'
            });
        },
        handleUploadBefore(file){ //处理上传文件之前
            if(this.selectUploadBucket == ''){
               this.$Notice.warning({
                    title: 'Fuck',
                    desc: 'Bucket Is Required'
                });
               return false;
            }
            if(this.selectUploadObject == ''){
               this.$Notice.warning({
                    title: 'Fuck',
                    desc: 'Object Is Required'
                }); 
               return false;
            }
        },
        handleView(url){ //点击查看图片
            this.bigPicVisible = true;
            this.bigPicInfo =url;
        },
        handleRemove(item){ //删除图片
            let deletePic = function() {
                const _this = this;
                this.$axios({
                    url:_this.$config.host+'/file/'+item.name,
                    method:'delete',
                    data:{data:item}
                })
                .then((response)=>{
                    let data = response.data;
                    if(data.code == 204 && status == 0){
                        _this.$store.commit('deleteOnePicture',{item:item});
                        _this.$store.commit('updatePicTotal',{count:-1});  //更新实际上图片的总数
                        _this.$Notice.success({
                            title:'Fuck',
                            desc:data.result
                        });
                    }
                })
                .catch((error)=>{
                    console.log(error);
                })
                
            };
            let obj = {
                title: '是否删除该文件？',
                message: item.name,
                type: 'info',
                useConfirmBtn: true,
                customConfirmBtnText: 'OK',
                onConfirm:deletePic
            }
            this.$refs.simplert.openSimplert(obj)
        },
        isUrlUploadFile(){
            const _this = this;
            if(this.is_url_upload_address == ''){
                this.is_url_upload_loading = false;
                return ;
            }
            this.$axios({
                url:_this.$config.host+'/file',
                method:'post',
                data:{bucket:_this.selectUploadBucket,object:_this.selectUploadObject,
                    url_upload:_this.is_url_upload_address}
            })
            .then((response)=>{
                let data = response.data;
                if(data.status == 0 && data.code == 204){
                    _this.$store.commit('updatePicTotal',{count:1});  //更新实际上图片的总数
                    _this.$store.commit('updatePictureList',{data:data.result,isFront:1}); // 上传成功后将数据追加到状态管理中
                    _this.$Message.info('Upload Success!');
                    _this.is_url_upload_address='';
                }else if(data.status==1 && data.code == 200){
                    _this.$Notice.error({
                        title:'Fuck',
                        desc:data.result
                    })
                }
                _this.is_url_upload_loading = false;
                _this.showUploadModa = false;
            })  
            .catch((error)=>{
                console.log(error);
            })
        },
    },
}
</script>