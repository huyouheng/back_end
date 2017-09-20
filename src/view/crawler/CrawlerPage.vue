<template>
    <div class="content">
        <span class="well text-center block">
            <b>Crawler</b>
        </span>
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <Card shadow style="width:320px">
                    <p slot="title">爬取过的数据</p>
                    <p>修改表子段</p>
                    <p>修改模型</p>
                </Card>
            </div>
        </div>
        <div class="row">
            <table class="table table-bordered table-responsive">
                <caption>爬取数据</caption>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Url</th>
                        <th>Page</th>
                        <th>Operate</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Input v-model="CrawlerName" size="large" placeholder="large size"></Input>
                        </td>
                        <td>
                            <Input v-model="CrawlerUrl" size="large" placeholder="large size"></Input>
                        </td>
                        <td>
                            <Input v-model="CrawlerPage" size="large" placeholder="large size"></Input>
                        </td>
                        <td>
                            <Button type="primary" @click="StartCrawler">执行</Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <simplert :useRadius="true"
                  :useIcon="true"
                  ref="crawlerPage">
        </simplert>
    </div>
</template>

<script>
import Simplert from 'vue2-simplert';
export default {
  name: 'hello',
    data () {
        return {
            CrawlerName:'',
            CrawlerUrl:'',
            CrawlerPage:'',
        }
    },
    components:{
        Simplert,
    },
    methods:{
        StartCrawler(){
            const _this =this;
            if(this.CrawlerPage == '' || this.CrawlerName == '' || this.CrawlerUrl == ''){
                return msg(this,'error','Params Is Empey');
            }
            let yesCrawler = ()=>{
                this.$axios({
                    url:'http://127.0.0.1/crawler',
                    method:'post',
                    data:{name:_this.CrawlerName,url:_this.CrawlerUrl,page:_this.CrawlerPage}
                })
                .then((response)=>{
                    console.log(response);
                })
                .catch((error)=>{
                    console.log(error);
                })
            };
            let obj = {
                    title: '是否执行？',
                    message: name,
                    type: 'info',
                    useConfirmBtn: true,
                    customConfirmBtnText: 'OK',
                    onConfirm:yesCrawler
                };
            this.$refs.crawlerPage.openSimplert(obj)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    th{
        text-align: center;
    }
    .content{
        padding:2px;
    }
</style>
