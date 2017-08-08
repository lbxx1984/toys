var TcFrame=TcFrame||{};
TcFrame.Label=function(param){
	this.initializate(param);
	if(param&&param.text!=null){this.setLabel(param.text);}
	if(param&&param.align!=null){this.setStyle('textAlign',param.align);}
	this.content.style.lineHeight=this.height+"px";
}
TcFrame.Label.prototype=new TcFrame.UIComponent();
TcFrame.Label.prototype.type="TcFrame.Label";
TcFrame.Label.prototype.height=25;
TcFrame.Label.prototype.text="label";
TcFrame.Label.prototype.setLabel=function(str){
	this.text=str;
	this.content.innerHTML=str;
}