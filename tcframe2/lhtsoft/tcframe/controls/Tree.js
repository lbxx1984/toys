var TcFrame=TcFrame||{};
TcFrame.Tree=function(param){
	this.initializate(param);
	this.children=[];
	this.backgroundBox=new TcFrame.UIComponent({left:0,right:0,height:25});
	this.backgroundBox.setStyles(TcFrame.Skin['TcFrame.Tree']['backgroundBox']);
	this.backgroundBox.parent=this;
	this.addEventListener("onItemOver",function(event){
		var tree=event.target.parent;
		tree.backgroundBox.y=event.target.y;
		tree.backgroundBox.resize();	
	});
	this.addEventListener("onItemOut",function(event){
		var tree=event.target.parent;
		tree.backgroundBox.y=-30;
		tree.backgroundBox.resize();	
	});
}
TcFrame.Tree.prototype=new TcFrame.Canvas();
TcFrame.Tree.prototype.type="TcFrame.Tree";
TcFrame.Tree.prototype.data=null;
TcFrame.Tree.prototype.backgroundBox=null;
TcFrame.Tree.prototype.currentID="";
TcFrame.Tree.prototype.dataProvider=function(arr){
	if(!arr||!arr.length){return;}
	this.data=arr;this.fresh();
}
TcFrame.Tree.prototype.expand=function(event){
	var tree=event.target.parent;
	var id=event.target.id;
	if(!tree.data){return;}
	var f=false;
	function change(data){
		if(f){return;}
		if(data.id==id){
			if(data.open){data.open=false}else{data.open=true;}
			f=true;return;
		}else if(data.children&&data.children.length){
			for(var p=0;p<data.children.length;p++){change(data.children[p],id);}
		}
	}
	for(var n=0;n<tree.data.length;n++){
		if(f){break;}
		change(tree.data[n]);
	}
	if(f){tree.fresh();}
}
TcFrame.Tree.prototype.fresh=function(){
	if(!this.data){return;}
	this.removeAll();
	this.backgroundBox.y=-30;
	this.content.appendChild(this.backgroundBox.content);
	this.backgroundBox.resize();
	var y=0,width=this.width;
	function produceItem(obj,ix,parent){
		var item=new TcFrame.TreeItem({x:ix,y:y,width:width,height:25});
		item.id=obj.id;
		item.addEventListener('onExpandBtnClick',parent.expand);
		item.dataProvider(obj);
		parent.add(item);y+=25;
		if(obj.open&&obj.children&&obj.children.length){
			for(var p=0;p<obj.children.length;p++){produceItem(obj.children[p],ix+10,parent);}
		}
	}
	for(var n=0;n<this.data.length;n++){produceItem(this.data[n],0,this);}
}
TcFrame.Tree.prototype.resize=function(){
	this.calcBorder();this.render();this.fresh();
	this.dispatch('onResize',{target:this});
}