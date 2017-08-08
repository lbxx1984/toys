var TcFrame=TcFrame||{};
TcFrame.ListItem=function(param){
	this.initializate(param);
	this.styleNormal=TcFrame.Skin[this.type]['this'];
	this.styleOver=TcFrame.Skin[this.type]['mouseover'];
	this.styleDown=TcFrame.Skin[this.type]['mousedown'];
	this.styleActive=TcFrame.Skin[this.type]['active'];
	if(param&&param.signAlign!=null){this.signAlign=param.signAlign;}
	if(param&&param.sign!=null){
		this.no=new TcFrame.Label({x:0,y:0,width:param.noWidth||25,height:this.height,text:param.sign});	
		this.no.parent=this;
		this.no.setStyle('textAlign',this.signAlign);
		this.no.setStyle('paddingLeft','2px');
		this.no.setStyle('paddingRight','2px');
		this.content.appendChild(this.no.content);
	}
	if(param&&param.label){
		var w=this.width;
		if(this.no){w-=this.no.width;}
		this.label=new TcFrame.Label({right:0,y:0,width:w,height:this.height,text:param.label});	
		this.label.parent=this;
		this.label.setStyle('paddingLeft','2px');
		this.content.appendChild(this.label.content);
	}
	if(param&&param.active){
		this.setStyles(this.styleActive);	
	}
	this.addEventListener('onMouseOver',function(event){
		var target=event.target;
		target.setStyles(target.styleOver);
	});
	this.addEventListener('onMouseDown',function(event){
		var target=event.target;
		target.setStyles(target.styleDown);
	});
	this.addEventListener('onMouseUp',function(event){
		var target=event.target;
		target.setStyles(target.styleOver);
	});
	this.addEventListener('onMouseOut',function(event){
		var target=event.target;
		if(target.active){
			target.setStyles(target.styleActive);
		}else{
			target.setStyles(target.styleNormal);
		}
	});
}
TcFrame.ListItem.prototype=new TcFrame.UIComponent();
TcFrame.ListItem.prototype.type="TcFrame.ListItem";
TcFrame.ListItem.prototype.no=null;
TcFrame.ListItem.prototype.label=null;
TcFrame.ListItem.prototype.styleNormal=null;
TcFrame.ListItem.prototype.styleOver=null;
TcFrame.ListItem.prototype.styleDown=null;
TcFrame.ListItem.prototype.styleActive=null;
TcFrame.ListItem.prototype.signAlign="center";
TcFrame.ListItem.prototype.active=false;
TcFrame.ListItem.prototype.setActive=function(b){
	this.active=b;
	if(this.active){
		this.setStyles(this.styleActive);
	}else{
		this.setStyles(this.styleNormal);
	}
}
TcFrame.ListItem.prototype.setStyles=function(obj){
	if(this.no){this.no.setStyles(obj);}
	if(this.label){this.label.setStyles(obj);}
}
TcFrame.ListItem.prototype.resize=function(){
	this.calcBorder();
	this.render();
	this.dispatch('onResize',{target:this});
	if(this.no){this.no.resize();}
	if(this.label){this.label.resize();}
}