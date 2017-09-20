<template>
	<div class="content">
		<span class="well block text-center">
            <b>文章管理</b>
        </span>	
        <hr>
        <art-sort-page></art-sort-page>
        <article-page></article-page>
       
	</div>	
</template>
<script>
    import ArtSortPage from '../../components/article/artsort.vue';
    import ArticlePage from '../../components/article/ArticlePage.vue';
	export default{
		name:'article',
		data(){
			return {
                
			}
		},
        components:{
            ArtSortPage,ArticlePage
        },
		
	}   
</script>
<style scoped>
	.content{
		padding:2px;
	}
	.panel{
		padding: 5px;
		margin: 0;
	}
</style>