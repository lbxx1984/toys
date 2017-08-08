var TcFrame=TcFrame||{};
TcFrame.UIComponent=function(param){
	this.initializate(param);
}
TcFrame.UIComponent.prototype=new TcFrame.Event();
TcFrame.UIComponent.prototype.type="TcFrame.UIComponent";
TcFrame.UIComponent.prototype.content=null;
TcFrame.UIComponent.prototype.parent=null;
TcFrame.UIComponent.prototype.openType="";
TcFrame.UIComponent.prototype.moveAble=false;
TcFrame.UIComponent.prototype.resizeAble=false;
TcFrame.UIComponent.prototype.padding=5;
TcFrame.UIComponent.prototype.titleHeight=30;
TcFrame.UIComponent.prototype.width=100;
TcFrame.UIComponent.prototype.height=100;
TcFrame.UIComponent.prototype.x=0;
TcFrame.UIComponent.prototype.y=0;
TcFrame.UIComponent.prototype.left=null;
TcFrame.UIComponent.prototype.right=null;
TcFrame.UIComponent.prototype.bottom=null;
TcFrame.UIComponent.prototype.top=null;
TcFrame.UIComponent.prototype.skin=null;
TcFrame.UIComponent.prototype.autoRemoveHandle=null;
TcFrame.UIComponent.prototype.added=false;
TcFrame.UIComponent.prototype.initializate=function(param){
	//初始化显示容器
	this.content=document.createElement("div");
	this.content.style.cssText="position:absolute;width:0px;height:0px;top:0px;left:0px;";
	this.content.parent=this;
	//载入事件队列，设置默认样式
	this.loadEvents();
	this.setDefaultStyle();
	//初始化参数
	if(param){
		if(param.x!=null){this.x=param.x;}
		if(param.y!=null){this.y=param.y;}
		if(param.width!=null){this.width=param.width;}
		if(param.height!=null){this.height=param.height;}
		if(param.left!=null){this.left=param.left;}
		if(param.right!=null){this.right=param.right;}
		if(param.top!=null){this.top=param.top;}
		if(param.bottom!=null){this.bottom=param.bottom;}
		if(param.padding!=null){this.padding=param.padding;}
		if(param.titleHeight!=null){this.titleHeight=param.titleHeight;}
		if(param.openType!=null){this.openType=param.openType;}
	}
	//初始化边框
	this.calcBorder();
	//挂接事件
	if(TcFrame.RunInIE&&TcFrame.IEVersion<9){
		this.content.onclick=this.onClick;
		this.content.onmouseover=this.onMouseOver;
		this.content.onmouseout=this.onMouseOut;
		this.content.onmousemove=this.onMouseMove;
		this.content.onmousedown=this.onMouseDown;
		this.content.onmouseup=this.onMouseUp;
	}else{
		try{
			this.content.addEventListener('mouseover',this.onMouseOver,false);
			this.content.addEventListener('mouseout',this.onMouseOut,false);
			this.content.addEventListener('mousemove',this.onMouseMove,false);
			this.content.addEventListener('mousedown',this.onMouseDown,false);
			this.content.addEventListener('mouseup',this.onMouseUp,false);
			this.content.addEventListener('click',this.onClick,false);
		}catch(e){}
	}
}
TcFrame.UIComponent.prototype.onMouseOver=function(){this.parent.dispatch('onMouseOver',{target:this.parent});}
TcFrame.UIComponent.prototype.onMouseOut=function(){this.parent.dispatch('onMouseOut',{target:this.parent});}
TcFrame.UIComponent.prototype.onMouseMove=function(){this.parent.dispatch('onMouseMove',{target:this.parent});}
TcFrame.UIComponent.prototype.onMouseDown=function(){this.parent.dispatch('onMouseDown',{target:this.parent});}
TcFrame.UIComponent.prototype.onMouseUp=function(){this.parent.dispatch('onMouseUp',{target:this.parent});}
TcFrame.UIComponent.prototype.onClick=function(){this.parent.dispatch('onClick',{target:this.parent});}
TcFrame.UIComponent.prototype.setDefaultStyle=function(){
	var skin=TcFrame.Skin[this.type],o=null,p=null;
	if(!skin){return;}
	this.skin=skin;
	for(key in skin){
		o=skin[key];
		if(key=="this"){p=this;}else{p=this[key];}
		if(!p){continue;}
		for(keen in o){p.setStyle(keen,o[keen]);}
	}
}
TcFrame.UIComponent.prototype.setStyles=function(config){
	if(!config){return;}
	for(key in config){this.setStyle(key,config[key])}	
}
TcFrame.UIComponent.prototype.setStyle=function(key,value){
	try{this.content.style[key]=value;}catch(e){}
}
TcFrame.UIComponent.prototype.calcBorder=function(){
	var left=0,top=0,width=0,height=0;
	if(this.left!=null&&this.right!=null){
		if(this.parent){
			left=this.left;width=this.parent.width-this.left-this.right;
		}else{
			left=this.x;width=this.width;	
		}
	}else if(this.left==null&&this.right==null){
		left=this.x;width=this.width;	
	}else if(this.left==null&&this.right!=null){
		if(this.parent){
			left=this.parent.width-this.right-this.width;width=this.width;
		}else{
			left=this.x;width=this.width;		
		}
	}else if(this.left!=null&&this.right==null){
		left=this.left;width=this.width;	
	}
	
	if(this.top!=null&&this.bottom!=null){
		if(this.parent){
			top=this.top;height=this.parent.height-this.top-this.bottom;
		}else{
			top=this.y;height=this.height;
		}
	}else if(this.top==null&&this.bottom==null){
		top=this.y;height=this.height;	
	}else if(this.top==null&&this.bottom!=null){
		if(this.parent){
			top=this.parent.height-this.bottom-this.height;height=this.height;
		}else{
			top=this.y;height=this.height;
		}
	}else if(this.top!=null&&this.bottom==null){
		top=this.top;height=this.height;	
	}
	this.x=left;this.y=top;this.width=width;this.height=height;
}
TcFrame.UIComponent.prototype.isMouseIn=function(){
	var arr=this.MousePositionCompareWithLocal();
	if(arr[0]>-1&&arr[0]<=this.width&&arr[1]>-1&&arr[1]<=this.height){return true}else{return false;}	
}
TcFrame.UIComponent.prototype.MousePositionCompareWithLocal=function(){
	var w=TcFrame.MousePosition[0],h=TcFrame.MousePosition[1],obj=this,thisX=0,thisY=0;
	while(true){
		if(obj.x!=null){thisX+=obj.x;thisY+=obj.y;}else{break;}
		if(obj.parent){
			if(obj.parent.content){
				thisX-=obj.parent.content.scrollLeft;
				thisY-=obj.parent.content.scrollTop;
			}
			obj=obj.parent;
		}else{
			break;
		}
	}
	return [w-thisX,h-thisY];
}
TcFrame.UIComponent.prototype.resize=function(){
	this.calcBorder();
	this.render();
	this.dispatch('onResize',{target:this});
}
TcFrame.UIComponent.prototype.render=function(){
	this.content.style.left=this.x+"px";
	this.content.style.top=this.y+"px";
	if(this.width<0){this.width=0;}
	if(this.height<0){this.height=0;}
	this.content.style.width=this.width+"px";
	this.content.style.height=this.height+"px";
}