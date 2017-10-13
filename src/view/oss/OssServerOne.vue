<template>
    <div class="content">
        <span class="well block text-center">
            <b>Oss </b>
        </span>
        <hr>
        <div class="row">
            <div class="col-md-12 col-lg-12">
               <recent-upload-pic title="最近上传的图片" name="oss1"
               v-bind:needDelete="true"
                v-bind:needSelect="false"></recent-upload-pic>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <table class="table table-bordered table-hover table-responsive">
                <caption><h4>Bucket List</h4></caption>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>created_at</th>
                            <th>acl</th>
                            <th>operate</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="i in getBucketList">
                            <tr>
                                <td style="text-align:left">
                                    <Collapse v-on:on-change="lookBucketAllList">
                                        <Panel :name="i.name">{{i.name}}
                                        <p slot="content" :id="i.name">
                                            <show-object-list-by-bucket :name="i.name" :id="i.name">
                                                
                                            </show-object-list-by-bucket>    
                                        </p>
                                        <p :id="'spin'+i.name" style="display: none">
                                                 <Spin fix><Icon type="load-a" size=18 class="demo-spin-icon-load"></Icon></Spin>
                                        </p>
                                        </Panel>
                                    </Collapse>
                                </td>
                                <td>{{i.created_at}}</td>
                                <td>
                                    <Select style="width:100px">
                                        <Option v-for="item in ACLList" 
                                            :value="item.value" 
                                            :key="item.value">{{ item.label }}
                                        </Option>
                                    </Select>
                                </td>
                                <td>
                                    <Button type="ghost" size="small" shape="circle" icon="android-delete"
                                    @click="isDeleteDucket(i.name)">
                                    </Button>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-12">
                <table class="table table-bordered table-hover">
                <caption><h4>Create Bucket</h4></caption>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Operate</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                               <Input v-model="StoreBucket" size="large"
                                style="max-width:200px;"
                                placeholder="input bucket"></Input> 
                            </td>
                            <td>
                               <Button type="success" @click="submitStoreBucket">确认提交</Button> 
                            </td>
                        </tr>
                    </tbody>
                </table>    
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-12">
                <table class="table table-bordered table-hover">
                <caption><h4>Create Object</h4></caption>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Bucket</th>
                            <th>Operate</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                               <Input v-model="StoreObject" size="large"
                                style="max-width:200px;"
                                placeholder="input object"></Input> 
                            </td>
                            <td>
                                <Select style="width:100px" v-model="isSelectBucket">
                                        <Option v-for="item in getBucketList" 
                                            :value="item.name" 
                                            :key="item.name">{{ item.name }}
                                        </Option>
                                </Select>
                            </td>
                            <td>
                               <Button type="success" @click="submitStoreObject">确认提交</Button> 
                            </td>
                        </tr>
                    </tbody>
                </table>    
            </div>
        </div>
        <simplert :useRadius="true"
                  :useIcon="true"
                  ref="OssServerOne">
        </simplert>
  </div>
</template>

<script>
import RecentUploadPic from '../../components/oss/RecentUploadPic.vue';
import ShowObjectListByBucket from '../../components/oss/ShowObjectListByBucket.vue';
import Simplert from 'vue2-simplert';
export default {
  name: 'oss_server_one',
    data(){
        return {
            ACLList:[
                {
                    value:'private',
                    label:'私有读写'
                },
                {
                    value:'public_read',
                    label:'公共读私有写'
                },
                {
                    value:'public_read_write',
                    label:'公共读写'
                }
            ],
            StoreBucket:'', //新建的bucket
            StoreObject:'',//新建的object
            isSelectBucket:'',//创建object的时候需要选一个bucket
        }
    },
    components:{
        RecentUploadPic,ShowObjectListByBucket,Simplert
    },
    created(){
         this.$store.dispatch('updateBucketList',{_this:this});//请求Bucket
    },
    methods:{
        isDeleteDucket:function(name){
             const _this =this;
             let delBucket = ()=>{
                this.$axios({
                    url:_this.$config.host+_this.$config.version+_this.$config.bucket+'/'+name+'?token=fuck-love',
                    method:'delete',
                 })
                 .then((response)=>{
                    let data = response.data;
                    if(data.code === 1){
                        return msg(_this,'error', data.result);
                    }
                    this.$store.dispatch('updateBucketList',{_this:_this});
                    return msg(_this,'success','Delete Bucket success');
                 })
                 .catch((error)=>{
                    console.log(error);
                 })
             }

            let obj = {
                    title: '是否删除该目录？',
                    message: name,
                    type: 'info',
                    useConfirmBtn: true,
                    customConfirmBtnText: 'OK',
                    onConfirm:delBucket
                };
            this.$refs.OssServerOne.openSimplert(obj);
        },
        submitStoreBucket:function(){
            const _this = this;
            if(this.StoreBucket === ''){
                return msg(this,'error','Bucket不能为空');
            }
            let addBucket = ()=>{
                this.$axios({
                    method:'post',
                    url:_this.$config.host+'/api/v1/bucket',
                    data:{'bucket':_this.StoreBucket,'token':'fuck-love'}
                })
                .then((response)=>{
                    let data = response.data;

                    let info = response.data.result.info;
                    if(data.code==0 && info !== undefined){
                        this.$store.dispatch('updateBucketList',{_this:_this});
                        _this.StoreBucket = '';
                        return msg(_this,'success','create Bucket success');                  
                    }else{
                        return msg(_this,'error','create Bucket fail');  
                    }
                })
                .catch((error)=>{
                    return msg(_this,'errir','Create Bucket Fail');
                });
            };
            let obj = {
                    title: '是否添加该目录？',
                    message: this.StoreBucket,
                    type: 'info',
                    useConfirmBtn: true,
                    customConfirmBtnText: 'OK',
                    onConfirm:addBucket
                }
            this.$refs.OssServerOne.openSimplert(obj)
        },
        submitStoreObject:function(){
            const _this = this;
            if(this.StoreObject === ''){
                return msg(this,'error','Object不能为空');
            }
            if(this.isSelectBucket == ''){
                return msg(this,'error','Bucket不能为空');
            }
            this.$axios({
                url:_this.$config.host+'/api/v1/object',
                method:'post',
                data:{'object':this.StoreObject,'bucket':this.isSelectBucket,'token':'fuck-love'}
            })
            .then((response)=>{
                let data = response.data;
                if(data.status != 200 && data.code != 0){
                    return msg(_this,'error',data.result);
                }
                _this.$store.dispatch('updateObjectList',{_this:_this,name:_this.isSelectBucket});
                _this.isSelectBucket = '';
                _this.StoreObject = '';
                return msg(_this,'success',data.result);
            })
            .catch((error)=>{
                return msg(_this,'errir','Create Object Fail');
            })
        },
        // 查看某一个bucket下的所有file和dir;默认在创建子组件的时候就已经开始自动的加载数据
        lookBucketAllList:function(key){
            if(key.length>0){
                // const name = key[0];
                // if(this.$store.state.oss.BucketAllList[name] == undefined){
                //     this.$store.dispatch('updateObjectList',{_this:this,name:name});
                // }else{
                //     this.BucketObject[name] = this.$store.state.oss.BucketAllList[name];
                // }
                // console.log(this.$store.getters.getData);
            }
        },
    },
    computed:{
        getBucketList(){
            return this.$store.getters.getBucketList;
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
        padding-top:2px;
    }
    th,td{
        text-align: center;
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .list-group{
        margin:0px;
    }
</style>