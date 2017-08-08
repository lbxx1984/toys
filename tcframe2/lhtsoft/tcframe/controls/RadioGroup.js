var TcFrame=TcFrame||{};
TcFrame.RadioGroup=function(param){
	this.initializate(param);
	this.children=[];
	if(param&&param.display!=null){this.display=param.display;}
	if(param&&param.padding!=null){this.usedY=this.usedX=this.padding=param.padding;}
	if(param&&param.interval!=null){this.interval=param.interval;}
	if(param&&param.align!=null){this.align=param.align;}
	if(param&&param.autoBreak){this.autoBreak=true;}
	if(param&&param.RadioWidth!=null){this.RadioWidth=param.RadioWidth;}
	if(param&&param.RadioHeight!=null){this.RadioHeight=param.RadioHeight;}
}
TcFrame.RadioGroup.prototype=new TcFrame.Group();
TcFrame.RadioGroup.prototype.type="TcFrame.RadioGroup";
TcFrame.RadioGroup.prototype.RadioWidth=80;
TcFrame.RadioGroup.prototype.RadioHeight=25;
TcFrame.RadioGroup.prototype.selectedID=null;
TcFrame.RadioGroup.prototype.lastSelected=null;
TcFrame.RadioGroup.prototype.getRadioByID=function(id){
	if(this.children.length==0){return null}	
	for(var n=0;n<this.children.length;n++){if(this.children[n].id==id){return this.children[n];break;}}
	return null;
}
TcFrame.RadioGroup.prototype.selectByID=function(id){
	for(var n=0;n<this.children.length;n++){
		if(this.children[n].id==id){
			this.children[n].setValue(true);
			this.selectedID=id;	
		}else{
			this.children[n].setValue(false);	
		}
	}
	
}
TcFrame.RadioGroup.prototype.dataProvider=function(arr){
	if(!arr||!arr.length||arr.length==0){return;}
	this.removeAll();
	for(var n=0;n<arr.length;n++){
		var btn=new TcFrame.Radio({
			width:this.RadioWidth,
			height:this.RadioHeight,
			label:arr[n].label,
			value:arr[n].value
		});
		btn.id=arr[n].id;
		this.add(btn);
		btn.addEventListener('onChange',function(event){
			var group=event.target.parent;
			group.selectedID=event.target.id;	
			if(group.lastSelected){group.lastSelected.setValue(false);}
			group.lastSelected=event.target;
			group.dispatch('onChange',{target:group});
		});	
	}
	this.resize();
}