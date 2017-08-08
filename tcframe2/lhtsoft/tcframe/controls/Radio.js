var TcFrame=TcFrame||{};
TcFrame.Radio=function(param){
	this.initializate(param);
	if(param&&param.label!=null){this.labelText=param.label;}
	if(param&&param.value){this.value=true;}
	this.core=document.createElement("input");
	this.core.parent=this;
	this.core.type="radio";
	this.core.style.cssText="position:absolute;left:0px;";
	this.content.appendChild(this.core);
	this.label=new TcFrame.Label({left:20,right:0,top:0,bottom:0,text:this.labelText});
	this.add(this.label);
	if(this.value){this.core.checked=true;}
	var radio=this.core;
	this.core.onchange=function(event){
		radio.parent.value=radio.checked;
		radio.parent.dispatch("onChange",{target:radio.parent});	
	}
	if(TcFrame.IEVersion==7){
		this.addEventListener("onMouseUp",function(event){
			radio.checked=!radio.checked;
			radio.parent.value=radio.checked;
			radio.parent.dispatch("onChange",{target:radio.parent});
		});	
	}
}
TcFrame.Radio.prototype=new TcFrame.Canvas();
TcFrame.Radio.prototype.type="TcFrame.Radio";
TcFrame.Radio.prototype.labelText="";
TcFrame.Radio.prototype.core=null;
TcFrame.Radio.prototype.label=null;
TcFrame.Radio.prototype.value=false;
TcFrame.Radio.prototype.setValue=function(b,a){
	this.value=b;
	this.core.checked=this.value;
	if(a){this.dispatch('onChange',{target:this})};	
}
TcFrame.Radio.prototype.setLabel=function(str){
	this.labelText=str;
	this.label.setLabel(str);	
}
TcFrame.Radio.prototype.resize=function(){
	this.calcBorder();
	this.render();
	this.core.style.top=(this.height-20)/2+"px";
	this.label.resize();
	this.dispatch('onResize',{target:this});
}