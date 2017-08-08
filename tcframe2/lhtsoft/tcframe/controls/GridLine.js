var TcFrame=TcFrame||{};
TcFrame.GridLine=function(param){
	this.initializate(param);
	if(param&&param.defaultItemWidth!=null){this.defaultItemWidth=param.defaultItemWidth;}
	this.children=[];
}
TcFrame.GridLine.prototype=new TcFrame.UIComponent();
TcFrame.GridLine.prototype.type="TcFrame.GridLine";
TcFrame.GridLine.prototype.children=null;
TcFrame.GridLine.prototype.defaultItemWidth=100;
TcFrame.GridLine.prototype.height=20;
TcFrame.GridLine.prototype.selectItems=function(b){
	if(this.children.length==0){return;}
	for(var n=0;n<this.children.length;n++){
		if(b){
			this.children[n].setStyles(TcFrame.Skin['TcFrame.GridItem']['over']);		
		}else{
			this.children[n].setStyles(TcFrame.Skin['TcFrame.GridItem']['this']);
		}
	}
}
TcFrame.GridLine.prototype.dataProvider=function(arr){
	if(!arr||!arr.length||arr.length==0){return;}
	this.content.innerHTML="";
	this.children=[];
	for(var n=0;n<arr.length;n++){
		arr[n].height=this.height;
		var item=new TcFrame.GridItem(arr[n]);
		item.parent=this;
		this.content.appendChild(item.content);	
		this.children.push(item);
	}
	this.resize();	
}
TcFrame.GridLine.prototype.resize=function(){
	if(this.children.length==0){return;}
	var usedx=0;
	for(var n=0;n<this.children.length;n++){
		this.children[n].x=usedx+1;
		usedx+=this.children[n].width+1;
		this.children[n].resize();
	}
	this.width=usedx;
	this.render();
	this.dispatch('onResize',{target:this});
}