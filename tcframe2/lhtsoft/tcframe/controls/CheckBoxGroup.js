var TcFrame=TcFrame||{};
TcFrame.CheckBoxGroup=function(param){
	this.initializate(param);
	this.children=[];
	if(param){
		if(param.display!=null){this.display=param.display;}
		if(param.padding!=null){this.usedY=this.usedX=this.padding=param.padding;}
		if(param.interval!=null){this.interval=param.interval;}
		if(param.align!=null){this.align=param.align;}
		if(param.autoBreak){this.autoBreak=true;}
		if(param.CheckBoxWidth!=null){this.CheckBoxWidth=param.CheckBoxWidth;}
		if(param.CheckBoxHeight!=null){this.CheckBoxHeight=param.CheckBoxHeight;}
	}
}
TcFrame.CheckBoxGroup.prototype=new TcFrame.Group();
TcFrame.CheckBoxGroup.prototype.type="TcFrame.CheckBoxGroup";
TcFrame.CheckBoxGroup.prototype.CheckBoxWidth=80;
TcFrame.CheckBoxGroup.prototype.CheckBoxHeight=25;
TcFrame.CheckBoxGroup.prototype.getCheckBoxByID=function(id){
	if(this.children.length==0){return null}	
	for(var n=0;n<this.children.length;n++){if(this.children[n].id==id){return this.children[n];break;}}
	return null;
}
TcFrame.CheckBoxGroup.prototype.selectAll=function(){
	for(var n=0;n<this.children.length;n++){this.children[n].setValue(true);}
	this.dispatch('onChange',{target:this});
}
TcFrame.CheckBoxGroup.prototype.selectOthers=function(){
	for(var n=0;n<this.children.length;n++){this.children[n].setValue(!this.children[n].value);}
	this.dispatch('onChange',{target:this});
}
TcFrame.CheckBoxGroup.prototype.selectByID=function(arr){
	this.selectAll();
	this.selectOthers();
	if(!arr||!arr.length||arr.length==0){return;}
	for(var n=0;n<arr.length;n++){
		var ck=this.getCheckBoxByID(arr[n]);
		if(!ck){continue;}
		ck.setValue(true);	
	}
	this.dispatch('onChange',{target:this});
}
TcFrame.CheckBoxGroup.prototype.getSelected=function(){
	var arr=[];
	if(this.children.length==0){return arr;}
	for(var n=0;n<this.children.length;n++){
		if(this.children[n].value){arr.push(this.children[n]);}	
	}
	return arr;
}
TcFrame.CheckBoxGroup.prototype.dataProvider=function(arr){
	if(!arr||!arr.length||arr.length==0){return;}
	this.removeAll();
	for(var n=0;n<arr.length;n++){
		var btn=new TcFrame.CheckBox({
			width:this.CheckBoxWidth,
			height:this.CheckBoxHeight,
			label:arr[n].label,
			value:arr[n].value
		});
		btn.id=arr[n].id;
		this.add(btn);
		btn.addEventListener('onChange',function(event){event.target.parent.dispatch('onChange',{target:event.target.parent});});	
	}
	this.resize();
}