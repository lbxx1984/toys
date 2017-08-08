var TcFrame=TcFrame||{};
TcFrame.Stage3D=TcFrame.Stage3D||{};
TcFrame.Stage3D.FPS=function(param){
	this.initializate(param);
	this.content.style.overflow="hidden";
	this.stats = new Stats();
	this.stats.domElement.style.position = 'absolute';
	this.stats.domElement.style.top = '0px';
	this.stats.domElement.style.width=this.width+"px";
	this.stats.domElement.style.height=this.height+"px";
	this.content.appendChild(this.stats.domElement);
}
TcFrame.Stage3D.FPS.prototype=new TcFrame.UIComponent();
TcFrame.Stage3D.FPS.prototype.type="TcFrame.Stage3D.FPS";
TcFrame.Stage3D.FPS.prototype.stats=null;
TcFrame.Stage3D.FPS.prototype.update=function(){this.stats.update();}
TcFrame.Stage3D.FPS.prototype.resize=function(){
	this.calcBorder();
	this.render();
	this.stats.domElement.style.width=this.width+"px";
	this.stats.domElement.style.height=this.height+"px";
}