var TcFrame=TcFrame||{};
TcFrame.Menu=function(param){
	this.initializate(param);
	if(!param){return;}
	if(param.buttonWidth!=null){this.buttonWidth=param.buttonWidth;}
	if(param.closeSpeed!=null){this.closeSpeed=param.closeSpeed;}
	if(param.itemWidth!=null){this.itemWidth=param.itemWidth;}
	this.timer=new TcFrame.Timer({delay:this.closeSpeed,func:this.autoHidden});
	this.timer.parent=this;
}
TcFrame.Menu.prototype=new TcFrame.Group();
TcFrame.Menu.prototype.type="TcFrame.Menu";
TcFrame.Menu.prototype.padding=0;
TcFrame.Menu.prototype.interval=0;
TcFrame.Menu.prototype.buttonWidth=80;
TcFrame.Menu.prototype.itemWidth=200;
TcFrame.Menu.prototype.closeSpeed=1000;
TcFrame.Menu.prototype.currentID="";
TcFrame.Menu.prototype.timer=null
TcFrame.Menu.prototype.menulistArr=null;
TcFrame.Menu.prototype.autoHidden=function(event){
	var menu=event.target.parent;
	var isin=menu.isMouseIn();
	if(isin){return;}
	var closeArr=[];
	for(var n=0;n<menu.menulistArr.length;n++){
		if(menu.menulistArr[n].added==false){continue;}
		closeArr.push(n);
		if(menu.menulistArr[n].isMouseIn()){return;}
	}
	menu.timer.stop();
	if(closeArr.length==0){return;}
	for(var n=0;n<closeArr.length;n++){
		menu.menulistArr[closeArr[n]].added=false;
		menu.menulistArr[closeArr[n]].parent.remove(menu.menulistArr[closeArr[n]]);	
	}
}
TcFrame.Menu.prototype.dataProvider=function(arr){
	if(!arr||!arr.length||arr.length==0){return;}
	this.removeAll();
	this.menulistArr=[];
	var menu=this;
	//生成顶级菜单
	for(var n=0;n<arr.length;n++){
		var btn=new TcFrame.Button({width:this.buttonWidth,height:this.height,label:arr[n].label,showBorder:false});
		btn.id=arr[n].id;	
		this.add(btn);
		btn.addEventListener('onMouseOver',function(event){
			event.target.parent.showMenuListByID(event.target.id,event.target);
		});
	}
	//生成各级menuitems
	function buildMenuList(arr,id,parent){
		var menulist=new TcFrame.MenuList({itemWidth:menu.itemWidth,itemHeight:25});	
		menulist.dataProvider(arr);
		menulist.id=id;
		menulist.added=false;
		menulist.parentMenu=parent;
		parent.menulistArr.push(menulist);
		for(var n=0;n<arr.length;n++){
			if(!arr[n].children||!arr[n].children.length){continue;}
			buildMenuList(arr[n].children,arr[n].id,parent);
		}
	}
	for(var n=0;n<arr.length;n++){
		if(!arr[n].children||!arr[n].children.length){continue;}
		buildMenuList(arr[n].children,arr[n].id,this);
	}
}
TcFrame.Menu.prototype.showMenuListByID=function(id,parent){
	this.currentID=id;
	if(!this.menulistArr||this.menulistArr.length==0){return;}
	function closelist(lp){lp.added=false;	lp.parent.remove(lp);}
	var list=null;
	for(var n=0;n<this.menulistArr.length;n++){if(this.menulistArr[n].id==id){list=this.menulistArr[n];break;}}
	if(!list||list.added){
		for(var n=0;n<this.menulistArr.length;n++){
			if(!this.menulistArr[n].added){continue;}
			var tid=this.menulistArr[n].id;
			if(tid.length>id.length||id.indexOf(tid)!=0){closelist(this.menulistArr[n]);continue;}	
		}
		return;
	}
	//显示
	list.added=true;
	var pos=parent.MousePositionCompareWithLocal();
	if(parent.type=="TcFrame.Button"){
		pos[0]=TcFrame.MousePosition[0]-pos[0]+1;
		pos[1]=TcFrame.MousePosition[1]-pos[1]+parent.height+1;
	}else{
		pos[0]=TcFrame.MousePosition[0]-pos[0]+parent.width;
		pos[1]=TcFrame.MousePosition[1]-pos[1];
	}
	list.x=pos[0];
	list.y=pos[1];
	TcFrame.Boot.add(list);
	//分析id，将id的子菜单、其他分支树上的菜单隐藏
	for(var n=0;n<this.menulistArr.length;n++){
		if(!this.menulistArr[n].added){continue;}
		var tid=this.menulistArr[n].id;
		if(tid.length>id.length||id.indexOf(tid)!=0){closelist(this.menulistArr[n]);continue;}
		if(id==tid){continue;}
	}
	//自动计时器
	this.timer.start();
}