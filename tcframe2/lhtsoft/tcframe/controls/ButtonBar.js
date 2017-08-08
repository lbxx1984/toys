var TcFrame=TcFrame||{};
TcFrame.ButtonBar=function(param){
	this.initializate(param);
	if(param&&param.buttonWidth!=null){this.buttonWidth=param.buttonWidth;}
}
TcFrame.ButtonBar.prototype=new TcFrame.TabBar();
TcFrame.ButtonBar.prototype.type="TcFrame.ButtonBar";