var TcFrame=TcFrame||{};
TcFrame.Rule=function(param){
	this.initializate(param);
	if(param&&param.display!=null){this.display=param.display;}
	if(param&&param.length!=null){this.length=param.length;}
	if(param&&param.style!=null){this.style=param.style;}
	if(this.style=="line"){
		if(this.display=="horizontal"){
			this.setStyles(TcFrame.Skin[this.type]['horizontal']);
		}else{
			this.setStyles(TcFrame.Skin[this.type]['vertical']);
		}
	}else if(this.style=="dotted"){
		if(this.display=="horizontal"){
			this.setStyle('backgroundImage','url('+TcFrame.Skin['Image']['RuleHorizontalBackgroundImage']+')');
		}else{
			this.setStyle('backgroundImage','url('+TcFrame.Skin['Image']['RuleVerticalBackgroundImage']+')');
		}
		
	}
}
TcFrame.Rule.prototype=new TcFrame.UIComponent();
TcFrame.Rule.prototype.type="TcFrame.Rule";
TcFrame.Rule.prototype.display="horizontal";//horizontal横向vertical纵向
TcFrame.Rule.prototype.style="line";//line实线dotted虚线 
TcFrame.Rule.prototype.length=200;
TcFrame.Rule.prototype.resize=function(){
	if(this.display=="horizontal"){
		this.top=null;this.bottom=null;this.height=1;
		if(!this.right){this.width=this.length;}	
	}else{
		this.left=null;this.right=null;this.width=1;
		if(!this.bottom){this.height=this.length}	
	}
	this.calcBorder();
	this.render();
}
