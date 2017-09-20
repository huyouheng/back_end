const state = {
	BucketObjectAllList:[], // 存储 bucke下的object
	BucketList:[], //所有的Bucket
	PictureList:[], //存储图片
	PicTotal:0,//数据库实际上的图片数量
}

const getters = {
	getObjectList:(state)=>{
		return state.BucketObjectAllList;
	},
	getBucketList:(state)=>{
		return state.BucketList;
	},
	getPictureList:(state)=>{
		return state.PictureList;
	},

}

const actions = {
	updateObjectList(context,{_this,name}){
		for(let i = 0 ; i < state.BucketObjectAllList.length ; i++){
			if(state.BucketObjectAllList[i][name] == undefined){
				continue; //表示没有数据
			}else{
				 //表示该数据是存在的，将其删除，再次更新
				 state.BucketObjectAllList.splice(i,1);
			}
		}
		_this.$axios({
            url:_this.$config.host+'/object/'+name,
            method:'get'
        })
        .then((response)=>{
            const data = response.data;
            if(data.status === 0){ //有数据
                let result = data.result;
                context.commit('updateObjectList',
                	{
                		name:name,
                		data:result
                	});
            }
        })
        .catch((error)=>{
             console.log(error);
        })
	},
	updateBucketList(context,{_this}){ //更新Bucket数据,这里是整体更新
		_this.$axios({
	        method:'get',
	        url:_this.$config.host+'/bucket'
	    })
	    .then((response)=>{
	        let data = response.data;
	        if(data.status == 0 && data.code == 200){
	        	context.commit('reinitBucketList');
	            for(let i = 0 ;i < data.result.length ;i++){
	            	context.commit('updateBucketList',{data:data.result[i]});
	            }
	        }
	        _this.BucketList = response.data.result;

	    })
	    .catch((error)=>{
	        console.log(error);
	    })
	},
	updatePictureList(context,{_this,page,isFront}){ //处理图片与服务器交互
		_this.$axios({
			url:_this.$config.host+'/file?page='+page,
			method:'get'
		})
		.then((response)=>{
			if(response.data.code == 200 && response.data.status == 0){
				let data = response.data.result.data;
				for(let i=0;i<data.length;i++){
					context.commit('updatePictureList',{data:data[i],isFront:isFront});
				}
				context.commit('_PicTotal',{count:response.data.result.total});
			}
		})
		.catch((error)=>{
			console.log(error);
		})
	},
}
const mutations = {
	updateObjectList(state ,{name,data}){
		state.BucketObjectAllList.push(data)
	},
	updateBucketList(state,{data}){
		state.BucketList.push(data);
	},
	reinitBucketList(state){ //重置BucketList = [];
		state.BucketList = [];
	},
	updatePictureList(state,{data,isFront}){ //添加图片,这里是在头部添加
		if(isFront){
			state.PictureList.splice(0,0,data);
		}else{
			state.PictureList.push(data);
		}
	},
	_PicTotal(state,{count}){ // 数据库实际存在的数量
		state.PicTotal = count;
	},
	updatePicTotal(state,{count}){ //把Total加或者减一个count
		state.PicTotal += count;
	},
	deleteOnePicture(state,{item}){ // 根据一个对象删除图片数组中的一个元素
		let index = state.PictureList.findIndex((listItem)=>{
			return listItem.id == item.id
		})
		if(index != -1){
			state.PictureList.splice(index,1);
		}
	}

}
export default{
	state,
	getters,
	actions,
	mutations
}