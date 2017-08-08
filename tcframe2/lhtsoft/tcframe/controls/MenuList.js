var TcFrame=TcFrame||{};
TcFrame.MenuList=function(param){
	this.initializate(param);
	if(!param){return;}
	if(param.itemWidth!=null){this.itemWidth=param.itemWidth;}
	if(param.itemHeight!=null){this.itemHeight=param.itemHeight;}
}
TcFrame.MenuList.prototype=new TcFrame.Group();
TcFrame.MenuList.prototype.type="TcFrame.MenuList";;
TcFrame.MenuList.prototype.padding=2;
TcFrame.MenuList.prototype.interval=0;
TcFrame.MenuList.prototype.itemWidth=200;
TcFrame.MenuList.prototype.itemHeight=25;
TcFrame.MenuList.prototype.display="vertical";
TcFrame.MenuList.prototype.dataProvider=function(arr){
	if(!arr||!arr.length||arr.length==0){return;}
	this.removeAll();	
	for(var n=0;n<arr.length;n++){
		var items=new TcFrame.MenuItem({
			label:arr[n].label,
			hotkey:arr[n].hotkey,
			enable:arr[n].enable,
			checked:arr[n].checked,
			children:arr[n].children,
			height:this.itemHeight,
			width:this.itemWidth
		});	
		items.id=arr[n].id;
		this.add(items);
		items.addEventListener('onMouseOver',function(event){
			var menu=event.target.parent.parentMenu;
			menu.showMenuListByID(event.target.id,event.target);
		});
		items.addEventListener('onClick',function(event){
			if(!event.target.enable){return;}
			var menu=event.target.parent.parentMenu;
			menu.currentID=event.target.id;
			menu.dispatch('onClick',{target:menu});
		});
	}
	this.height=arr.length*this.itemHeight+4;
	this.width=this.itemWidth+4;
	this.resize();
}