<template>
	<div>
		<span class="well text-center block"><b>数据库中心</b></span>
		<div class="row">
			<div class="col-md-12 col-lg-12">
				<Card shadow style="max-width:100%">
					<p slot="title">存在的数据表
						<a href="javascript:" class="pull-right" id="refresh_parent"><i id="refresh_table" class="icon-retweet" @click="refreshTable"></i></a>
					</p>
					<p>卡片内容</p>
					<p>卡片内容</p>
					<p>卡片内容</p>
				</Card>

				<Card shadow style="max-width:100%">
					<p slot="title">建立数据表
						<a href="javascript:" class="pull-right" id="refresh_parent"><i id="refresh_table" class="icon-retweet" @click="refreshTable"></i></a>
					</p>
					<p>
						<label>命令：</label><Input  placeholder="php artisan make:model Model/ChangeApp -m" style="max-width: 300px" v-model="exec_command"> 
						</Input><Button type="ghost" size="small" @click="shell_exec">执行</Button>
					</p>
					<p><Button type="ghost">修改表字段</Button> <Button type="ghost">修改模型</Button></p>
				</Card>
				<div style="border:1px solid #eee;width:100%;min-height:100px;">

				</div>
            </div>
		</div>
		<simplert :useRadius="true"
                  :useIcon="true"
                  ref="sqlPage">
        </simplert>
	</div>
</template>

<script>
import Simplert from 'vue2-simplert'; 
export default {
  	name: 'sql_page',
  	data () {
    	return {
    		exec_command:'', //需要执行的命令
    	}
  	},
	components:{
		Simplert,
	},
	methods:{
        refreshTable(){
            $("#refresh_table").attr({'disabled':'disabled'})
            $("#refresh_table").removeClass('icon-retweet');
            $("#refresh_table").html('loading...');
            $("#refresh_parent").attr({'disabled':'disabled'});
            setTimeout(function(){
                $("#refresh_table").removeAttr('disabled');
                $("#refresh_parent").removeAttr('disabled');
                $("#refresh_table").addClass('icon-retweet');
                $("#refresh_table").html('');
                console.log(1);
			},2000)
		},
		shell_exec(){
			const _this = this;
			if(this.exec_command == ''){
				return msg(this,'error','Command Is Empey');
			}
			this.$axios({
				method:'get',
				url:'http://127.0.0.1/newTable?command='+_this.exec_command,
			})
			.then((response)=>{
				console.log(response);
				// this.$Notice.success({
    //                 title: '这是通知标题',
    //                 desc: ''
    //           });
			})
			.catch((error)=>{
				console.log(error);
			});
		},
	}
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

</style>
