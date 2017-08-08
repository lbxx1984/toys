var TcFrame=TcFrame||{};
TcFrame.TreeItem=function(param){this.initializate(param);this.setup(param);}
TcFrame.TreeItem.prototype=new TcFrame.UIComponent();
TcFrame.TreeItem.prototype.type="TcFrame.TreeItem"
TcFrame.TreeItem.prototype.button=null;
TcFrame.TreeItem.prototype.ico=null;
TcFrame.TreeItem.prototype.label=null;
TcFrame.TreeItem.prototype.setup=function(param){
	this.button=new TcFrame.ImageButton({left:0,width:16,height:16});
	this.ico=new TcFrame.Image({left:16,width:16,height:16});
	this.label=new TcFrame.Label({left:35,right:0,top:0,bottom:0,text:"",align:"left"});
	this.button.parent=this;
	this.ico.parent=this;
	this.label.parent=this;
	this.label.setStyles(TcFrame.Skin['TcFrame.TreeItem']['labelNormal']);
	this.button.addEventListener("onClick",function(event){
		event.target.parent.dispatch('onExpandBtnClick',{target:event.target.parent});
	});
	this.addEventListener('onMouseOver',function(event){
		event.target.label.setStyles(TcFrame.Skin['TcFrame.TreeItem']['labelOver']);
		event.target.parent.dispatch("onItemOver",{target:event.target});	
	});
	this.addEventListener('onMouseOut',function(event){
		event.target.label.setStyles(TcFrame.Skin['TcFrame.TreeItem']['labelNormal']);	
		event.target.parent.dispatch("onItemOut",{target:event.target});
	});
	this.label.addEventListener('onClick',function(event){
		var tree=event.target.parent.parent;
		tree.currentID=event.target.parent.id;
		tree.dispatch("onItemClick",{target:tree});
	});
}
TcFrame.TreeItem.prototype.dataProvider=function(param){
	if(!param){return;}
	if(param.children&&param.children.length&&param.children.length>0){
		if(param.open){
			this.button.setSources({
				src:TcFrame.Skin['Image']['MenuItem']['OpenNormal'],
				srcOver:TcFrame.Skin['Image']['MenuItem']['OpenOver']
			});
			this.button.source(TcFrame.Skin['Image']['MenuItem']['OpenNormal']);
		}else{
			this.button.setSources({
				src:TcFrame.Skin['Image']['MenuItem']['CloseNormal'],
				srcOver:TcFrame.Skin['Image']['MenuItem']['CloseOver']
			});
			this.button.source(TcFrame.Skin['Image']['MenuItem']['CloseNormal']);
		}
		this.content.appendChild(this.button.content);
	}
	if(param.ico){
		this.ico.source(param.ico);
		this.content.appendChild(this.ico.content);	
	}else{
		this.ico.source(TcFrame.Skin['Image']['MenuItem']['tmpIco']);
		this.content.appendChild(this.ico.content);
	}
	this.label.setLabel(param.label);
	this.content.appendChild(this.label.content);	
}
TcFrame.TreeItem.prototype.resize=function(){
	this.calcBorder();
	this.render();
	if(this.button){this.button.top=(this.height-this.button.height)*0.5-1;this.button.resize();}
	if(this.label){this.label.resize();}
	if(this.ico){this.ico.top=(this.height-this.ico.height)*0.5;this.ico.resize();}
	this.dispatch('onResize',{target:this});
	
}
