var TcFrame=TcFrame||{};
TcFrame.GridItem=function(param){
	this.initializate(param);
	if(param&&param.value!=null){this.value=param.value;}
	if(this.value!=null){this.content.innerHTML=this.value;}
	this.addEventListener('onMouseOver',this.mouseover);
	this.addEventListener('onMouseOut',this.mouseout);
	this.addEventListener('onClick',this.mouseclick);
}
TcFrame.GridItem.prototype=new TcFrame.UIComponent();
TcFrame.GridItem.prototype.type="TcFrame.GridItem";
TcFrame.GridItem.prototype.value=null;
TcFrame.GridItem.prototype.child=null;
TcFrame.GridItem.prototype.mouseclick=function(event){
	var item=event.target;
	item.parent.parent.parent.dispatch('onItemClick',{target:item.parent.parent.parent});
}
TcFrame.GridItem.prototype.mouseover=function(event){
	var item=event.target;
	if(item.parent.parent.parent.selectType=="item"){
		item.setStyles(TcFrame.Skin[item.type]['over']);
	}else if(item.parent.parent.parent.selectType=="line"){
		item.parent.selectItems(1);
	}
	item.parent.parent.parent.selectedItem=item;
	item.parent.parent.parent.dispatch('onItemMouseOver',{target:item.parent.parent.parent});
}
TcFrame.GridItem.prototype.mouseout=function(event){
	var item=event.target;
	if(item.parent.parent.parent.selectType=="item"){
		item.setStyles(TcFrame.Skin[item.type]['this']);
	}else if(item.parent.parent.parent.selectType=="line"){
		item.parent.selectItems(0);
	}
	item.parent.parent.parent.selectedItem=item;
	item.parent.parent.parent.dispatch('onItemMouseOut',{target:item.parent.parent.parent});
}
TcFrame.GridItem.prototype.setValue=function(s){
	this.value=s;
	this.content.innerHTML=s;
	this.content.style.lineHeight=this.height+"px";
}
TcFrame.GridItem.prototype.remove=function(){
	this.content.innerHTML="";
	this.child=null;
}
TcFrame.GridItem.prototype.add=function(add){
	if(!add){return;}	
	this.remove();
	this.child=add;
	add.parent=this;
	this.content.appendChild(add.content);
	add.resize();
}
TcFrame.GridItem.prototype.resize=function(){
	this.calcBorder();
	this.render();
	this.content.style.lineHeight=this.height+"px";
	if(this.child){this.child.resize();}
	this.dispatch('onResize',{target:this});
}