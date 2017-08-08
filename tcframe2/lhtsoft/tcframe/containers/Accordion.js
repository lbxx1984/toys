var TcFrame=TcFrame||{};
TcFrame.Accordion=function(param){
	this.initializate(param);
	if(param&&param.buttonHeight!=null){this.buttonHeight=param.buttonHeight;}
	this.children=[];
	this.addEventListener('onResize',this.onResize);
}
TcFrame.Accordion.prototype=new TcFrame.Canvas();
TcFrame.Accordion.prototype.type="TcFrame.Accordion";
TcFrame.Accordion.prototype.buttonHeight=25;
TcFrame.Accordion.prototype.currentID="";
TcFrame.Accordion.prototype.dataProvider=function(arr){
	if(!arr||!arr.length||arr.length==0){return;}	
	this.removeAll();
	for(var n=0;n<arr.length;n++){
		var container=new TcFrame.Canvas({left:0,right:0,y:0,height:0});
		container.id=arr[n].id;	
		this.add(container);
	}
	for(var n=0;n<arr.length;n++){
		var btn=new TcFrame.Button({left:-1,right:2,y:0,height:this.buttonHeight,label:arr[n].label});
		btn.id=arr[n].id;
		this.add(btn);
		btn.addEventListener("onClick",function(event){
			if(event.target.parent.currentID==event.target.id){return;}
			event.target.parent.currentID=event.target.id;
			event.target.parent.setActiveByID(event.target.id,false);	
		})
	}
	this.currentID=arr[0].id;
}
TcFrame.Accordion.prototype.setActiveByID=function(id,resize){
	var c=this.getContainerByID(id);
	if(!c){return;}
	this.currentID=id;
	var usedy=-1,p=0,ub=this.children.length-2,uc=0;
	for(var n=0;n<this.children.length;n++){
		if(this.children[n].type=="TcFrame.Canvas"){
			if(resize){this.children[n].height=this.height-1-this.buttonHeight*this.children.length/2;this.children[n].resize();}
			if(this.children[n].id!=id){
				this.children[n].y=-this.children[n].height-10;
				this.children[n].render();
			}
		}else{
			this.children[n].y=usedy;
			usedy+=this.buttonHeight;	
			if(this.children[n].id==id){
				p=usedy;
				usedy+=this.height-this.buttonHeight*this.children.length/2;
			}
			this.children[n].resize();
		}
	}
	c.y=p+1;c.render();
}
TcFrame.Accordion.prototype.getContainerByID=function(id){
	if(this.children==null||this.children.length==0){return null;}
	for(var n=0;n<this.children.length;n++){
		if(this.children[n].id==id&&this.children[n].type=="TcFrame.Canvas"){return this.children[n];break;}	
	}
	return null;
}
TcFrame.Accordion.prototype.onResize=function(event){
	var acd=event.target;
	if(!acd.children||acd.children.length==0){return}
	acd.setActiveByID(acd.currentID,true);
}