var TcFrame=TcFrame||{};
TcFrame.TabNavigator=function(param){
	this.initializate(param);
	if(param){
		if(param.buttonWidth!=null){this.buttonWidth=param.buttonWidth;}
		if(param.buttonHeight!=null){this.buttonHeight=param.buttonHeight;}
	}
}
TcFrame.TabNavigator.prototype=new TcFrame.Canvas();
TcFrame.TabNavigator.prototype.type="TcFrame.TabNavigator";
TcFrame.TabNavigator.prototype.buttonWidth=80;
TcFrame.TabNavigator.prototype.buttonHeight=25;
TcFrame.TabNavigator.prototype.currentID=null;
TcFrame.TabNavigator.prototype.tabbar=null;
TcFrame.TabNavigator.prototype.dataProvider=function(arr){
	if(!arr||!arr.length||arr.length==0){return;}
	this.removeAll();
	for(var n=0;n<arr.length;n++){
		var container=new TcFrame.Canvas({left:0,right:2,top:this.buttonHeight-1,bottom:2});
		container.id=arr[n].id;	
		container.setStyle("border",TcFrame.Skin["TcFrame.Button"]["activeTab"]["borderLeft"]);
		this.add(container);
	}
	this.tabbar=new TcFrame.TabBar({left:0,right:1,top:0,height:this.buttonHeight,buttonWidth:this.buttonWidth});
	this.tabbar.dataProvider(arr);
	this.add(this.tabbar);
	this.tabbar.addEventListener("onActiveChange",function(event){event.target.parent.setActiveByID(event.target.currentID)});
	var o=this;
	setTimeout(function(){o.setActiveByID(arr[0].id);},100);
}
TcFrame.TabNavigator.prototype.setActiveByID=function(id){
	if(!this.children||this.children.length==0){return;}
	var have=false;
	for(var n=0;n<this.children.length;n++){if(this.children[n].type=="TcFrame.Canvas"&&this.children[n].id==id){have=true;break;}}
	if(!have){return;}
	this.currentID=id;
	this.tabbar.setActiveByID(id);
	for(var n=0;n<this.children.length;n++){
		if(this.children[n].type!="TcFrame.Canvas"){continue;}
		if(this.children[n].id==id){
			this.children[n].bottom=2;	
			this.children[n].top=this.buttonHeight-1;
		}else{
			this.children[n].top=-9999;
			this.children[n].bottom=9999;		
		}
		this.children[n].resize();
	}
}
TcFrame.TabNavigator.prototype.getContainerByID=function(id){
	if(this.children==null||this.children.length==0){return null;}
	for(var n=0;n<this.children.length;n++){
		if(this.children[n].type!="TcFrame.Canvas"){continue;}
		if(this.children[n].id==id&&this.children[n].type=="TcFrame.Canvas"){return this.children[n];break;}	
	}
	return null;
}