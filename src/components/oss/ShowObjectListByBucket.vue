<template>
    <ul class="list-group">
        <template v-for="object in getData">
            <li class="list-group-item" v-for="item in object[name]">
                {{item}}
                <Button class="pull-right" type="ghost" size="small" shape="circle" icon="android-delete" 
                    @click="isDeleteObject(name,item)">
                </Button>
            </li>
        </template>
        <simplert :useRadius="true"
                  :useIcon="true"
                  ref="deleteObject">
        </simplert>
    </ul>
</template>

<script>
import { mapGetters } from 'vuex'
import Simplert from 'vue2-simplert'
export default {
    props:['name','data'],
    name: this.name,
    data () {
        return {
           
        }
    },
     components:{
        Simplert
    },
    created(){
        this.$store.dispatch('updateObjectList',{_this:this,name:this.name});
    },
    mounted(){
    },
    computed:{
        ...mapGetters({
            Data:'getObjectList'
        }),
        getData:function(){
            let data = this.Data;
            return data;
        },
    },
    methods:{
        isDeleteObject:function(parent,child){
            const _this =this;
            let delObject = function(){
                this.$axios({
                    url:_this.$config.host+'/api/v1/object/',
                    method:'delete',
                    data:{bucket:parent,object:child,token:'fuck-love'}
                })
                .then((response)=>{
                    let data = response.data;
                    if(data.status == 200 && data.code == 0){
                        _this.$store.dispatch('updateObjectList',{_this:_this,name:_this.name});
                        return this.$Notice.success({title: 'Fuck',desc: data.result});
                    }
                })
                .catch((error)=>{
                    console.log(error);
                })
            };
            if(parent != '' || child != ''){
                let obj = {
                    title: '是否删除该目录？',
                    message: child,
                    type: 'info',
                    useConfirmBtn: true,
                    customConfirmBtnText: 'OK',
                    onConfirm:delObject
                }
                this.$refs.deleteObject.openSimplert(obj)
            }
        },
    },
}
</script>

<style scoped>
    
</style>
