var TcFrame=TcFrame||{};
TcFrame.Image=function(param){
	this.initializate(param);
	this.core=document.createElement("img");
	this.core.style.cssText="position:absolute;";
	this.content.appendChild(this.core);
	if(param&&param.src!=null){this.source(param.src);}
}
TcFrame.Image.prototype=new TcFrame.UIComponent();
TcFrame.Image.prototype.type="TcFrame.Image";
TcFrame.Image.prototype.src="";
TcFrame.Image.prototype.core=null;
TcFrame.Image.prototype.source=function(url){
	this.src=url;
	this.core.src=this.src;
}
TcFrame.Image.prototype.resize=function(){
	this.calcBorder();
	this.render();
	this.core.style.width=this.width+"px";
	this.core.style.height=this.height+"px";
	this.dispatch('onResize',{target:this});
}