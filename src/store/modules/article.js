const state = {
	 ArtSortList:[],
	 ArtcileList:[],
}

const getters = {
	 getAllArtSort:(state)=>{
	 	return state.ArtSortList;
	 },
	 getAllArticleFromVuex:(state)=>{
	 	return state.ArtcileList;
	 },
}

const actions = {
	 getSortFromServer(context,{_this}){
	 	_this.$axios({
	 		url:_this.$config.host+'/artsort',
	 		method:'get'
	 	})
	 	.then((response)=>{
	 		let data = response.data.data;
	 		for(let i=0;i<data.length;i++){
	 			context.commit('pushOneItemSort',{data:data[i]});
	 		}
	 	})
	 	.catch((error)=>{
	 		console.log(error);
	 	})
	 },
	 getArticleFromServer(context,{_this}){ //获取文章
	 	_this.$axios({
	 		url:_this.$config.host+'/article',
	 		method:'get'
	 	})
	 	.then((response)=>{
	 		let data = response.data.data;
	 		for(let i=0;i<data.length;i++){
	 			context.commit('pushOneItemArticle',{data:data[i]});
	 		}
	 	})
	 	.catch((error)=>{
	 		console.log(error);
	 	})
	 },

}
const mutations = {
	 pushOneItemSort(state,{data}){ //插入一条后放到状态中
	 	state.ArtSortList.push(data);
	 },
	 deleteOneItemSort(state,{item}){//删除一条
	 	let index = state.ArtSortList.findIndex((listItem)=>{
	 		return listItem.id == item.id;
	 	});
	 	if(index != -1)
	 		state.ArtSortList.splice(index,1);
	 },
	 pushOneItemArticle(state,{data}){//插入一条文章进入管理中
	 	state.ArtcileList.push(data);
	 },
	 deleteOneItemArticle(state,{item}){//删除一文章
	 	let index = state.ArtcileList.findIndex((listItem)=>{
	 		return listItem.id == item.id;
	 	});
	 	if(index != -1)
	 		state.ArtcileList.splice(index,1);
	 },
}
export default{
	state,
	getters,
	actions,
	mutations
}