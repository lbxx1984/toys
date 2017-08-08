var TcFrame=TcFrame||{};
TcFrame.Number=function(param){
	this.initializate(param);
	if(param&&param.showBtn!=null){this.showBtn=param.showBtn;}
	if(param&&param.datatype!=null){this.dataType=param.datatype;}
	if(param&&param.max!=null){this.max=param.max;}
	if(param&&param.min!=null){this.min=param.min;}
	if(param&&param.step!=null){this.step=param.step;}
	if(param&&param.value!=null){this.value=param.value;}
	
	this.core=document.createElement("input");
	this.core.type="text";
	this.core.parent=this;
	this.core.style.cssText="position:absolute;border:0px;outline:none;padding-left:0px;padding-right:0px;text-align:center";
	this.content.appendChild(this.core);
	this.upStepBtn=new TcFrame.Button({right:1,top:-2,width:this.height/2,height:this.height/2,label:TcFrame.Language['upbtn'],showBorder:false});
	this.upStepBtn.parent=this;
	this.downStepBtn=new TcFrame.Button({right:1,bottom:1,width:this.height/2,height:this.height/2,label:TcFrame.Language['downbtn'],showBorder:false});
	this.downStepBtn.parent=this;
	if(this.showBtn){
		this.content.appendChild(this.downStepBtn.content);
		this.content.appendChild(this.upStepBtn.content);
		this.downStepBtn.added=true;
		this.upStepBtn.added=true;
	}
	this.upStepBtn.addEventListener('onMouseDown',function(event){
		event.target.parent.changeValueDirection=false;
		event.target.parent.timer.start();
	});
	this.upStepBtn.addEventListener('onMouseUp',function(event){
		event.target.parent.timer.stop();
	});
	this.upStepBtn.addEventListener('onMouseOut',function(event){
		event.target.parent.timer.stop();
	});
	this.upStepBtn.addEventListener('onClick',function(event){
		event.target.parent.changeValueDirection=false;
		event.target.parent.changeValue({target:event.target});
	});
	this.downStepBtn.addEventListener('onMouseDown',function(event){
		event.target.parent.changeValueDirection=true;
		event.target.parent.timer.start();
	});
	this.downStepBtn.addEventListener('onMouseUp',function(event){
		event.target.parent.timer.stop();
	});
	this.downStepBtn.addEventListener('onMouseOut',function(event){
		event.target.parent.timer.stop();
	});
	this.downStepBtn.addEventListener('onClick',function(event){
		event.target.parent.changeValueDirection=true;
		event.target.parent.changeValue({target:event.target});
	});
	var input=this.core;
	var focusfunc=function(event){
		input.parent.setStyles(input.parent.focusStyle);
		input.parent.dispatch('onFocusIn',{target:input.parent});
	}
	var blurfunc=function(event){
		input.value=input.parent.format(input.value,1);
		if(input.parent.dataType=="float"){
			input.parent.value=parseFloat(input.value);
		}else{
			input.parent.value=parseInt(input.value);
		}
		input.parent.setStyles(input.parent.normalStyle);
		input.parent.dispatch('onFocusOut',{target:input.parent});
		input.parent.dispatch('onChange',{target:input.parent});
	}
	try{this.core.addEventListener("focus",focusfunc,false);}catch(e){this.core.onfocus=focusfunc;}
	try{this.core.addEventListener("blur",blurfunc,false);}catch(e){this.core.onblur=blurfunc;}
	
	this.core.onkeyup=function(event){
		input.value=input.parent.format(input.value);
		if(input.parent.dataType=="float"){
			input.parent.value=parseFloat(input);
		}else{
			input.parent.value=parseInt(input);
		}
		input.parent.value=input.value;
		input.parent.dispatch('onChange',{target:input.parent});
	}
	this.normalStyle=TcFrame.Skin['TcFrame.Number']['this'];
	this.focusStyle=TcFrame.Skin['TcFrame.Number']['focus'];
	this.timer=new TcFrame.Timer({delay:100,func:this.changeValue});
	this.timer.parent=this;
	this.setValue(this.value);
}
TcFrame.Number.prototype=new TcFrame.UIComponent();
TcFrame.Number.prototype.type="TcFrame.Number";
TcFrame.Number.prototype.core=null;
TcFrame.Number.prototype.normalStyle=null;
TcFrame.Number.prototype.focusStyle=null;
TcFrame.Number.prototype.dataType="int";//int float
TcFrame.Number.prototype.showBtn=true;
TcFrame.Number.prototype.upStepBtn=null;
TcFrame.Number.prototype.downStepBtn=null;
TcFrame.Number.prototype.max=9999;
TcFrame.Number.prototype.min=-9999;
TcFrame.Number.prototype.step=1;
TcFrame.Number.prototype.value=0;
TcFrame.Number.prototype.timer=null;
TcFrame.Number.prototype.changeValueDirection=true;
TcFrame.Number.prototype.changeValue=function(event){
	var num=event.target.parent;
	if(num.value+""=="NaN"){num.value=0;}
	if(num.changeValueDirection){num.value-=num.step;}else{num.value+=num.step;}
	num.setValue(num.value);
}
TcFrame.Number.prototype.format=function(num,fout){
	var a="-.0123456789",s=num.toString(),v="",f=false,d=false,n=0,c="",k=0;
	for(n=0;n<s.length;n++){
		c=s.charAt(n);
		if(a.indexOf(c)<0){continue;}	
		if(c=="-"){
			if(n!=0||f){continue;}
			v+=c;f=true;continue;
		}
		if(c=="."){
			if(d){continue;}
			if(fout&&n==s.length-1){break;}	
			if(n==0||(n==1&&v=="-")){v+="0.";d=true;continue;}
			v+=c;d=true;continue;
		}
		v+=c;continue;
	}
	if(this.dataType=="float"){k=parseFloat(v);}else{k=parseInt(v);}
	if(k>this.max&&fout){v=this.max.toString();}
	if(k<this.min&&fout){v=this.min.toString();}
	return v;
}
TcFrame.Number.prototype.setStepBtnVisible=function(b){
	if(b==this.showBtn){return;}
	this.showBtn=b;
	if(this.showBtn){
		this.content.appendChild(this.downStepBtn.content);
		this.content.appendChild(this.upStepBtn.content);
		this.downStepBtn.added=true;
		this.upStepBtn.added=true;
		this.resize();
	}else{
		this.content.removeChild(this.downStepBtn.content);
		this.content.removeChild(this.upStepBtn.content);
		this.downStepBtn.added=false;
		this.upStepBtn.added=false;
	}
}
TcFrame.Number.prototype.setValue=function(str){
	var num=this.format(str);
	if(this.dataType=="float"){this.value=parseFloat(num);}else{this.value=parseInt(num);}
	this.core.value=this.value;this.dispatch('onChange',{target:this});
}
TcFrame.Number.prototype.resize=function(){
	this.calcBorder();
	this.render();
	var w=this.width,h=this.height;
	if(TcFrame.RunInIE){w-=2;h-=2;}else{h-=2;}
	this.core.style.width=w+"px";
	this.core.style.height=h+"px";
	this.dispatch('onResize',{target:this});
	if(this.showBtn){
		this.downStepBtn.width=this.upStepBtn.width=this.height/2-1;
		this.upStepBtn.height=this.upStepBtn.height=this.height/2;
		this.upStepBtn.resize();
		this.downStepBtn.resize();
	}
}