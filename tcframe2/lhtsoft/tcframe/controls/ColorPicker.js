var TcFrame=TcFrame||{};
TcFrame.ColorPicker=function(param){
	this.initializate(param);
	this.colorfield=new TcFrame.ColorField();
	this.colorfield.parentCP=this;
	this.addEventListener('onClick',function(event){
		var dc=event.target;
		if(!dc.colorfield||dc.colorfield.added){return;}
		var pos=dc.MousePositionCompareWithLocal();
		pos[0]=TcFrame.MousePosition[0]-pos[0];
		pos[1]=TcFrame.MousePosition[1]-pos[1]+dc.height;
		dc.colorfield.y=pos[1]+2;
		dc.colorfield.x=pos[0]+1;
		if(dc.colorfield.y+dc.colorfield.height>TcFrame.Boot.height){dc.colorfield.y-=dc.height+dc.colorfield.height;}
		TcFrame.Boot.add(dc.colorfield);
		dc.colorfield.added=true;
		dc.autoHidden();
	});
	this.colorfield.addEventListener('onChange',function(event){
		var cp=event.target.parentCP;
		cp.value=event.target.value;	
		cp.valueArray=event.target.valueArray;
		cp.setStyle('backgroundColor',cp.value);
		cp.dispatch('onChange',{target:cp});
	});	
}
TcFrame.ColorPicker.prototype=new TcFrame.UIComponent();
TcFrame.ColorPicker.prototype.type="TcFrame.ColorPicker";
TcFrame.ColorPicker.prototype.value="#FFF";
TcFrame.ColorPicker.prototype.valueArray=null;
TcFrame.ColorPicker.prototype.colorfield=null;
TcFrame.ColorPicker.prototype.setValue=function(color){
	this.value=color;
	this.setStyle("backgroundColor",this.value);	
}
TcFrame.ColorPicker.prototype.hiddenField=function(){
	if(!this.colorfield.added){return;}
	this.colorfield.added=false;
	this.colorfield.parent.remove(this.colorfield);
}
TcFrame.ColorPicker.prototype.autoHidden=function(){
	var autoRemoveHandle;
	var obj=this;
	clearInterval(autoRemoveHandle);
	autoRemoveHandle=setInterval(function(){
		if(!obj.colorfield||!obj.colorfield.added){return;}
		var a=obj.isMouseIn();
		var b=obj.colorfield.isMouseIn();
		if(a||b){return;}
		obj.hiddenField();
		clearInterval(autoRemoveHandle);
	},200);
}