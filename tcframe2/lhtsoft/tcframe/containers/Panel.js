var TcFrame=TcFrame||{};
TcFrame.Panel=function(param){
	this.initializate(param);
	this.initPanel(param);
}
TcFrame.Panel.prototype=new TcFrame.UIComponent();
TcFrame.Panel.prototype.type="TcFrame.Panel";
TcFrame.Panel.prototype.dragAdded=false;
TcFrame.Panel.prototype.moveAble=false;
TcFrame.Panel.prototype.resizeAble=false;
TcFrame.Panel.prototype.titleBar=null;
TcFrame.Panel.prototype.titleLabel=null;
TcFrame.Panel.prototype.title="";
TcFrame.Panel.prototype.titleAlign="";
TcFrame.Panel.prototype.container=null;
TcFrame.Panel.prototype.initPanel=function(param){
	//param
	if(param){
		if(param.moveAble){this.moveAble=true;}
		if(param.resizeAble){this.resizeAble=true;}
		if(param.title!=null){this.title=param.title}else{this.title=this.type;}
		if(param.titleAlign!=null){this.titleAlign=param.titleAlign}else{this.titleAlign="left"}
	}
	//titleBar
	this.titleBar=new TcFrame.Canvas({top:this.padding,left:this.padding,right:this.padding,height:this.titleHeight-this.padding});
	this.titleBar.parent=this;
	this.titleBar.setStyles(TcFrame.Skin["TcFrame.Panel"]["titlebar"]);
	this.content.appendChild(this.titleBar.content);
	//container
	this.container=new TcFrame.Canvas({top:this.titleHeight,left:this.padding,right:this.padding,bottom:this.padding});
	this.container.parent=this;
	this.content.appendChild(this.container.content);
	this.container.setStyles(TcFrame.Skin["TcFrame.Panel"]["container"]);
	//titleLabel
	this.titleLabel=new TcFrame.Label({left:0,right:0,top:0,text:this.title});
	this.titleLabel.setStyles(TcFrame.Skin["TcFrame.Panel"]["titlelabel"]);
	this.titleLabel.setStyle("textAlign",this.titleAlign);
	this.titleBar.add(this.titleLabel);
	//children
	this.children=this.container.children;
}
TcFrame.Panel.prototype.add=function(obj){this.container.add(obj);}
TcFrame.Panel.prototype.remove=function(obj){this.container.remove(obj);}
TcFrame.Panel.prototype.numChildren=function(){return this.container.numChildren();}
TcFrame.Panel.prototype.setChildIndex=function(obj,index){this.container.setChildIndex(obj,index);}
TcFrame.Panel.prototype.removeAll=function(){this.container.removeAll()};
TcFrame.Panel.prototype.resize=function(){
	this.calcBorder();
	this.render();
	this.dispatch('onResize',{target:this});
	this.titleBar.resize();
	this.container.resize();
	if(!this.dragAdded){
		if(this.moveAble&&this.parent==TcFrame.Boot){TcFrame.Drag.moveAbleObjectsArr.push(this);}
		if(this.resizeAble&&this.parent==TcFrame.Boot){TcFrame.Drag.resizeAbleObjectsArr.push(this);}
		this.dragAdded=true;
	}
}