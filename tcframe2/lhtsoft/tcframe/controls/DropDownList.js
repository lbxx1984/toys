var TcFrame=TcFrame||{};
TcFrame.DropDownList=function(param){
	this.initializate(param);
	this.button=new TcFrame.Button({height:this.height-2,width:17,top:0,right:2,label:TcFrame.Language['dropdown']});
	this.button.parent=this;
	this.content.appendChild(this.button.content);
	this.input=new TcFrame.Button({left:0,top:0,width:this.width-19,height:this.height-2,label:""});
	this.input.parent=this;
	this.content.appendChild(this.input.content);
	if(param&&param.listHeight!=null){this.listHeight=param.listHeight;}
	this.button.addEventListener('onClick',this.buttonOnClick);
	this.input.addEventListener('onClick',function(event){event.target.parent.dispatch('onClick',{target:event.target.parent});});
}
TcFrame.DropDownList.prototype=new TcFrame.ComboBox();
TcFrame.DropDownList.prototype.type="TcFrame.DropDownList";
TcFrame.DropDownList.prototype.currentSelected=null;
TcFrame.DropDownList.prototype.onMouseUp=function(){};//这里注销了引起干扰的事件。
TcFrame.DropDownList.prototype.onClick=function(){};//这里注销了引起干扰的事件。
TcFrame.DropDownList.prototype.dataProvider=function(arr){
	if(!arr||!arr.length||arr.length==0){return;}
	if(this.list){
		if(this.list.added){this.list.parent.remove(this.list);this.list.added=false;}	
		this.list=null;
	}
	this.input.setLabel(arr[0].label);
	this.list=new TcFrame.List({signType:"None",width:this.width});
	this.list.parentControls=this;
	this.list.dataProvider(arr);
	this.list.addEventListener('onChange',function(event){
		var cbb=event.target.parentControls;
		cbb.currentSelected=event.target.currentSelect;
		cbb.input.setLabel(event.target.currentSelect.label.text);
		event.target.added=false;
		event.target.parent.remove(event.target);
		cbb.dispatch('onChange',{target:cbb});
		cbb.dispatch('onClick',{target:cbb});
	});
	this.currentSelected=this.list.children[0];
}