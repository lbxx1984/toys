var TcFrame=TcFrame||{};
TcFrame.TextInput=function(param){
	this.initializate(param);
	
	this.core=document.createElement("input");
	this.core.type="text";
	this.core.parent=this;
	this.core.style.cssText="position:absolute;border:0px;outline:none;padding-left:2px;padding-right:2px;";
	this.content.appendChild(this.core);
	var input=this.core;
	var focusfun=function(event){
		input.parent.setStyles(input.parent.focusStyle);
		input.parent.dispatch('onFocusIn',{target:input.parent});
	}
	var blurfun=function(event){
		input.parent.value=input.value;
		input.parent.setStyles(input.parent.normalStyle);
		input.parent.dispatch('onFocusOut',{target:input.parent});
		input.parent.dispatch('onChange',{target:input.parent});
	}
	try{this.core.addEventListener("focus",focusfun,false);}catch(e){this.core.onfocus=focusfun;}
	try{this.core.addEventListener("blur",blurfun,false);}catch(e){this.core.onblur=blurfun;}
	this.core.onkeyup=function(event){
		input.parent.value=input.value;
		input.parent.dispatch('onChange',{target:input.parent});
	}
	this.normalStyle=TcFrame.Skin['TcFrame.TextInput']['this'];
	this.focusStyle=TcFrame.Skin['TcFrame.TextInput']['focus'];
	
	if(param&&param.logo!=null){
		this.logo=new TcFrame.Image({src:param.logo})	
		this.logo.parent=this;
		this.content.appendChild(this.logo.content);
	}
	if(param&&param.password){
		this.password=true;
		this.core.type="password"
	}
}
TcFrame.TextInput.prototype=new TcFrame.UIComponent();
TcFrame.TextInput.prototype.type="TcFrame.TextInput";
TcFrame.TextInput.prototype.core=null;
TcFrame.TextInput.prototype.value="";
TcFrame.TextInput.prototype.normalStyle=null;
TcFrame.TextInput.prototype.focusStyle=null;
TcFrame.TextInput.prototype.logo=null;
TcFrame.TextInput.prototype.password=false;
TcFrame.TextInput.prototype.isPassword=function(b){
	this.password=b;
	if(this.password){this.core.type="password"}else{this.core.type="text";}
}
TcFrame.TextInput.prototype.setValue=function(str){
	this.value=str;
	this.core.value=str;
	this.dispatch('onChange',{target:this});	
}
TcFrame.TextInput.prototype.setLogo=function(url){
	if(!this.logo){
		this.logo=new TcFrame.Image({src:url})	
		this.logo.parent=this;
		this.content.appendChild(this.logo.content);
		this.logo.width=this.logo.height=this.height-4;
		this.logo.x=this.width-this.logo.width-2;
		this.logo.y=(this.height-this.logo.height)/2;
		this.logo.resize();	
	}else{
		this.logo.source(url);	
	}
}
TcFrame.TextInput.prototype.resize=function(){
	this.calcBorder();
	this.render();
	if(this.logo){
		this.logo.width=this.logo.height=this.height-4;
		this.logo.x=this.width-this.logo.width-2;
		this.logo.y=(this.height-this.logo.height)/2;
		this.logo.resize();
	}
	var w=this.width,h=this.height;
	if(TcFrame.RunInIE){w-=2;h-=2;}else{h-=2;}
	this.core.style.width=w+"px";
	this.core.style.height=h+"px";
	this.dispatch('onResize',{target:this});
}