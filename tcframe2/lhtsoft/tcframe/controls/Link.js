var TcFrame=TcFrame||{};
TcFrame.Link=function(param){
	this.initializate(param);
	this.core=document.createElement("a");
	if(param&&param.text!=null){this.setText(param.text);}
	if(param&&param.url!=null){this.url=param.url;}
	if(param&&param.target!=null){this.target=param.target;}
	this.content.style.lineHeight=this.height+"px";
	this.core.href=this.url;
	this.core.target=this.target;
	this.content.appendChild(this.core);
}
TcFrame.Link.prototype=new TcFrame.UIComponent();
TcFrame.Link.prototype.type="TcFrame.Link";
TcFrame.Link.prototype.height=25;
TcFrame.Link.prototype.core=null;
TcFrame.Link.prototype.text="lhtsoft";
TcFrame.Link.prototype.url="http://www.lhtsoft.com";
TcFrame.Link.prototype.target="_blank";
TcFrame.Link.prototype.setText=function(str){
	this.text=str;
	this.core.innerHTML=str;
}