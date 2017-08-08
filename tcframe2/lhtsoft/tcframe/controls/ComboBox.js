var TcFrame=TcFrame||{};
TcFrame.ComboBox=function(param){
	this.initializate(param);
	this.button=new TcFrame.Button({height:this.height-2,width:17,top:0,right:2,label:TcFrame.Language['dropdown']});
	this.button.parent=this;
	this.content.appendChild(this.button.content);
	this.input=new TcFrame.TextInput({left:0,top:0,width:this.width-19,height:this.height-2});
	this.input.parent=this;
	this.content.appendChild(this.input.content);
	if(param&&param.listHeight!=null){this.listHeight=param.listHeight;}
	this.button.addEventListener('onClick',this.buttonOnClick);
}
TcFrame.ComboBox.prototype=new TcFrame.UIComponent();
TcFrame.ComboBox.prototype.type="TcFrame.ComboBox";
TcFrame.ComboBox.prototype.button=null;
TcFrame.ComboBox.prototype.input=null;
TcFrame.ComboBox.prototype.list=null;
TcFrame.ComboBox.prototype.listHeight=200;
TcFrame.ComboBox.prototype.buttonOnClick=function(event){
	var cbb=event.target.parent;
	if(!cbb.list||cbb.list.added){return;}
	var pos=cbb.MousePositionCompareWithLocal();
	pos[0]=TcFrame.MousePosition[0]-pos[0];
	pos[1]=TcFrame.MousePosition[1]-pos[1]+cbb.height;
	cbb.list.y=pos[1]-1;
	cbb.list.x=pos[0];
	cbb.list.width=cbb.width-2;
	cbb.list.height=cbb.listHeight;
	if(cbb.list.y+cbb.list.height>TcFrame.Boot.height){cbb.list.y-=cbb.height+cbb.list.height;}
	TcFrame.Boot.add(cbb.list);
	cbb.list.added=true;
	if(cbb.list.scrollTopValue){cbb.list.content.scrollTop=cbb.list.scrollTopValue;}
	cbb.autoHidden();	
}
TcFrame.ComboBox.prototype.hiddenField=function(){
	if(!this.list.added){return;}
	this.list.added=false;
	this.list.parent.remove(this.list);
}
TcFrame.ComboBox.prototype.autoHidden=function(){
	var autoRemoveHandle;
	var obj=this;
	clearInterval(autoRemoveHandle);
	autoRemoveHandle=setInterval(function(){
		if(!obj.list||!obj.list.added){return;}
		var a=obj.isMouseIn();
		var b=obj.list.isMouseIn();
		if(a||b){return;}
		obj.list.scrollTopValue=obj.list.content.scrollTop;
		obj.list.parent.remove(obj.list);
		obj.list.added=false;
		clearInterval(autoRemoveHandle);
	},1000);
}
TcFrame.ComboBox.prototype.dataProvider=function(arr){
	if(!arr||!arr.length||arr.length==0){return;}
	if(this.list){
		if(this.list.added){this.list.parent.remove(this.list);this.list.added=false;}	
		this.list=null;
	}
	this.list=new TcFrame.List({signType:"None",width:this.width});
	this.list.parentControls=this;
	this.list.dataProvider(arr);
	this.list.addEventListener('onChange',function(event){
		var cbb=event.target.parentControls;
		cbb.input.setValue(event.target.currentSelect.label.text);
		event.target.added=false;
		event.target.scrollTopValue=event.target.content.scrollTop;
		event.target.parent.remove(event.target);
		cbb.dispatch('onChange',{target:cbb});
	});
}
TcFrame.ComboBox.prototype.resize=function(){
	this.calcBorder();
	this.render();
	this.dispatch('onResize',{target:this});
	this.button.height=this.height-2;
	this.button.resize();
	this.input.width=this.width-19;
	this.input.height=this.height-2;
	this.input.resize();
	this.list.resize();
}