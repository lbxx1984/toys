var TcFrame=TcFrame||{};
TcFrame.CheckBox=function(param){
	this.initializate(param);
	if(param&&param.label!=null){this.labelText=param.label;}
	if(param&&param.value){this.value=true;}
	this.core=document.createElement("input");
	this.core.parent=this;
	this.core.type="checkbox";
	this.core.style.cssText="position:absolute;left:0px;";
	this.content.appendChild(this.core);
	this.label=new TcFrame.Label({left:20,right:0,top:0,bottom:0,text:this.labelText});
	this.add(this.label);
	if(this.value){this.core.checked=true;}
	var checkbox=this.core;
	this.core.onchange=function(event){
		checkbox.parent.value=checkbox.checked;
		checkbox.parent.dispatch("onChange",{target:checkbox.parent});	
	}	
}
TcFrame.CheckBox.prototype=new TcFrame.Canvas();
TcFrame.CheckBox.prototype.type="TcFrame.CheckBox";
TcFrame.CheckBox.prototype.labelText="";
TcFrame.CheckBox.prototype.core=null;
TcFrame.CheckBox.prototype.label=null;
TcFrame.CheckBox.prototype.value=false;
TcFrame.CheckBox.prototype.setValue=function(b,a){
	this.value=b;
	this.core.checked=this.value;
	if(a){this.dispatch('onChange',{target:this})};	
}
TcFrame.CheckBox.prototype.setLabel=function(str){
	this.labelText=str;
	this.label.setLabel(str);	
}
TcFrame.CheckBox.prototype.resize=function(){
	this.calcBorder();
	this.render();
	this.core.style.top=(this.height-20)/2+"px";
	this.label.resize();
	this.dispatch('onResize',{target:this});
}