var TcFrame=TcFrame||{};
TcFrame.Group=function(param){
	this.initializate(param);
	this.children=[];
	if(param){
		if(param.display!=null){this.display=param.display;}
		if(param.padding!=null){this.usedY=this.usedX=this.padding=param.padding;}
		if(param.interval!=null){this.interval=param.interval;}
		if(param.align!=null){this.align=param.align;}
		if(param.autoBreak){this.autoBreak=true;}
	}
}
TcFrame.Group.prototype=new TcFrame.Canvas();
TcFrame.Group.prototype.type="TcFrame.Group";
TcFrame.Group.prototype.display="horizontal";//horizontal横向vertical纵向
TcFrame.Group.prototype.autoBreak=false;
TcFrame.Group.prototype.padding=5;
TcFrame.Group.prototype.interval=5;
TcFrame.Group.prototype.align="top";//h:top middle bottom;v:left center right
TcFrame.Group.prototype.usedX=5;
TcFrame.Group.prototype.usedY=5;
TcFrame.Group.prototype.childRender=function(){
	this.usedX=this.padding;this.usedY=this.padding;
	for(n=0;n<this.children.length;n++){
		var pos=this.childPosition(this.children[n]);
		this.children[n].x=pos[0];this.children[n].y=pos[1];
		this.children[n].resize();
	}
}
TcFrame.Group.prototype.childPosition=function(child){
	var x=0,y=0;
	if(this.display=="horizontal"){//横向
		if(this.autoBreak){
			if(this.usedX+child.width>this.width){//换行
				this.usedX=x=this.padding;this.usedX+=child.width+this.interval;
				this.usedY=y=this.usedY+this.interval+child.height;
			}else{//不用换行
				x=this.usedX;this.usedX+=child.width+this.interval;
				y=this.usedY;
			}
		}else{
			x=this.usedX;this.usedX+=child.width+this.interval;
			if(this.align=="bottom"){
				y=this.height-this.padding-child.height;
			}else if(this.align=="middle"){
				y=(this.height-child.height)*0.5;
			}else{
				y=this.padding;
			}
		}
	}else{//纵向
		if(this.autoBreak){
			if(this.usedY+child.height>this.height){
				this.usedX=x=this.usedX+this.interval+child.width;
				this.usedY=y=this.padding;this.usedY+=child.height+this.interval;
			}else{
				y=this.usedY;this.usedY+=child.height+this.interval;
				x=this.usedX;
			}
		}else{
			y=this.usedY;this.usedY+=child.height+this.interval;
			if(this.align=="right"){
				x=this.width-this.padding-child.width;
			}else if(this.align=="center"){
				x=(this.width-child.width)*0.5;
			}else{
				x=this.padding;
			}
		}
	}
	return [x,y];
}
TcFrame.Group.prototype.setChildrenIndex=function(arr){
	if(!arr||!arr.length||arr.length==0){return;}
	var tarr=[];	
	for(var n=0;n<arr.length;n++){
		if(arr[n]>this.children.length-1||!this.children[arr[n]]){continue;}	
		tarr.push(this.children[arr[n]]);
		this.children[arr[n]]=null;
	}
	this.children=tarr;
	this.childRender();
}
TcFrame.Group.prototype.setChildIndex=function(obj,index){
	//判断条件
	if(this.children.length==0){return;}
	var cur=-1;
	for(n=0;n<this.children.length;n++){if(this.children[n]==obj){cur=n;break;}}
	if(cur<0||cur==index){return;}
	if(index<0){index=0;}
	if(index>this.children.length-1){index=this.children.length-1;}
	//移动位置
	var tmparr=[];
	for(n=0;n<this.children.length;n++){
		if(cur<index){
			if(n<cur||(n>cur&&n<index)||n>index){tmparr.push(this.children[n]);}
			if(n==index){tmparr.push(this.children[index]);tmparr.push(obj);}	
		}else{
			if(n<index||(n>index&&n<cur)||n>cur){tmparr.push(this.children[n]);}
			if(n==index){tmparr.push(obj);tmparr.push(this.children[index]);}
		}
	}
	this.children=tmparr;
	//重新渲染
	this.childRender();
}
TcFrame.Group.prototype.add=function(child){
	//是否存在
	var have=false;
	for(n=0;n<this.children.length;n++){if(this.children[n]==child){have=true;break;}}
	if(have){return;}
	//重置位置
	this.children.push(child);
	child.left=child.right=child.top=child.bottom=null;
	var pos=this.childPosition(child);
	child.x=pos[0];child.y=pos[1];
	this.content.appendChild(child.content);
	child.parent=this;
	//渲染展开
	var o=new TcFrame.Open({target:child});
	o.addEventListener("onComplete",function(event){event.target.target.resize()});
	o.play();
}
TcFrame.Group.prototype.remove=function(child){
	//是否存在
	var have=false;
	for(n=0;n<this.children.length;n++){if(this.children[n]==child){have=true;break;}}	
	if(!have){return;}
	this.content.removeChild(child.content);
	var arr=[];
	for(n=0;n<this.children.length;n++){
		if(this.children[n]==child){continue;}	
		arr.push(this.children[n]);
	}
	this.children=arr;
	//重新渲染
	this.childRender();
}
TcFrame.Group.prototype.resize=function(){
	this.calcBorder();
	this.render();
	this.dispatch('onResize',{target:this});
	for(var n=0;n<this.children.length;n++){this.children[n].resize();}
	//重新渲染
	this.childRender();
}

