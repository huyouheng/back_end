<template>
	<div id="container" class="text-center">
		<div class="login">
			 <Input  size="large" placeholder="请输入..." style="width:300px;opacity: .6" class="input">
			 	<span slot="prepend">帐号</span>
			 </Input><br/><br/>
			 <Input  size="large" placeholder="请输入..." style="width:300px;opacity: .6" class="input">
			 	<span slot="prepend">密码</span>
			 </Input><br/><br/>
			 <Button type="success" long>确认提交</Button>
		</div>
	</div>
</template>
<script>
	export default{
		name:'login',
		created(){
			
		},
		mounted(){
			$('#container').css(
				{'width':window.innerWidth+'px',
				 'height':window.innerHeight+'px',
				 'border':'1px solid red',
				 'background':"url("+require('../../assets/images/bg.jpg')+")"
			});
		},
	}
</script>
<style scoped>
@media (max-width:375px) {
	.login{
		position: fixed;
		top: 40%;
		left: 4%;
	}
	.input{
		width:90%;
	}
}
@media (min-width:376px) and (max-width:667px) {
	.login{
		position: fixed;
		top: 30%;
		left: 30%;
	}
}
@media (min-width:667px) {
	.login{
		position: fixed;
		top: 30%;
		left: 40%;
	}
}
</style>