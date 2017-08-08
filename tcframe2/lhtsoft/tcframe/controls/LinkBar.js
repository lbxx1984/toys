var TcFrame=TcFrame||{};
TcFrame.LinkBar=function(param){
	this.initializate(param);
	this.children=[];
	if(param&&param.display!=null){this.display=param.display;}
	if(param&&param.padding!=null){this.usedY=this.usedX=this.padding=param.padding;}
	if(param&&param.interval!=null){this.interval=param.interval;}
	if(param&&param.align!=null){this.align=param.align;}
	if(param&&param.autoBreak){this.autoBreak=true;}
	if(param&&param.linkWidth!=null){this.linkWidth=param.linkWidth;}
	if(param&&param.linkHeight!=null){this.linkHeight=param.linkHeight;}
}
TcFrame.LinkBar.prototype=new TcFrame.Group();
TcFrame.LinkBar.prototype.type="TcFrame.LinkBar";
TcFrame.LinkBar.prototype.linkWidth=80;
TcFrame.LinkBar.prototype.linkHeight=20;
TcFrame.LinkBar.prototype.dataProvider=function(arr){
	if(!arr||!arr.length||arr.length==0){return;}
	this.removeAll();
	for(var n=0;n<arr.length;n++){
		var btn=new TcFrame.Link({
			width:this.linkWidth,
			height:this.linkHeight,
			text:arr[n].text,
			url:arr[n].url,
			target:arr[n].target
		});
		this.add(btn);	
	}
	this.resize();
}