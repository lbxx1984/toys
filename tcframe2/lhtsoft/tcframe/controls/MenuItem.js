var TcFrame=TcFrame||{};
TcFrame.MenuItem=function(param){
	this.initializate(param);
	if(param&&param.enable!=null){this.enable=param.enable;}
	
	this.label=new TcFrame.Label({right:84,left:this.height,top:0,bottom:0,text:param.label||"MenuItem"});	
	this.label.parent=this;
	this.label.setStyle("borderLeft","1px solid "+TcFrame.Skin[this.type]['borderHr']);
	this.label.setStyle("paddingLeft","5px");
	this.content.appendChild(this.label.content);

	this.childLabel=new TcFrame.Label({height:this.height-8,width:10,top:3,right:2,text:(param.children&&param.children.length>0)?TcFrame.Language['leftpoint']:""});	
	this.childLabel.parent=this;
	this.content.appendChild(this.childLabel.content);
		
	this.hotkey=new TcFrame.Label({right:15,top:0,width:75,bottom:0,text:param.hotkey||""});	
	this.hotkey.parent=this;
	this.hotkey.setStyle('textAlign',"right");
	this.content.appendChild(this.hotkey.content);
	
	this.checkLabel=new TcFrame.Label({left:0,top:0,width:this.height,height:this.height,text:param.checked?TcFrame.Language['itemchecked']:""});
	this.checkLabel.parent=this;
	this.checkLabel.setStyle('textAlign',"center");
	this.checkLabel.setStyle('fontWeight',"bold");
	this.content.appendChild(this.checkLabel.content);
	
	this.styleMouseOver=TcFrame.Skin[this.type]['mouseover'];
	this.styleNormal=TcFrame.Skin[this.type]['this'];
	this.styleDisable=TcFrame.Skin[this.type]['disable'];
	
	this.addEventListener("onMouseOver",function(event){
		event.target.setStyles(event.target.styleMouseOver);
		event.target.label.setStyles(event.target.styleMouseOver);
		event.target.checkLabel.setStyles(event.target.styleMouseOver);
		event.target.childLabel.setStyles(event.target.styleMouseOver);
		event.target.hotkey.setStyles(event.target.styleMouseOver);
		event.target.label.setStyle("borderLeft","1px solid "+TcFrame.Skin['TcFrame.MenuItem']['borderHrActive']);
	});
	this.addEventListener("onMouseOut",function(event){
		var skin=event.target.styleNormal;
		if(!event.target.enable){skin=event.target.styleDisable;}
		event.target.setStyles(skin);
		event.target.label.setStyles(skin);
		event.target.checkLabel.setStyles(skin);
		event.target.childLabel.setStyles(skin);
		event.target.hotkey.setStyles(skin);
		event.target.label.setStyle('borderLeft',"1px solid "+TcFrame.Skin['TcFrame.MenuItem']['borderHr']);	
	});
	this.dispatch("onMouseOut",{target:this});
}
TcFrame.MenuItem.prototype=new TcFrame.UIComponent();
TcFrame.MenuItem.prototype.type="TcFrame.MenuItem";
TcFrame.MenuItem.prototype.label=null;
TcFrame.MenuItem.prototype.checkLabel=null;
TcFrame.MenuItem.prototype.childLabel=null;
TcFrame.MenuItem.prototype.hotkey=null;
TcFrame.MenuItem.prototype.styleMouseOver=null;
TcFrame.MenuItem.prototype.styleNormal=null;
TcFrame.MenuItem.prototype.styleDisable=null;
TcFrame.MenuItem.prototype.enable=true;
TcFrame.MenuItem.prototype.setEnable=function(b){
	this.enable=b;
	this.dispatch("onMouseOut",{target:this});	
}
TcFrame.MenuItem.prototype.resize=function(){
	this.calcBorder();
	this.render();
	this.dispatch('onResize',{target:this});
	this.label.resize();
	this.hotkey.resize();
	this.childLabel.height=this.height-2;this.childLabel.resize();
	this.checkLabel.height=this.checkLabel.width=this.height;this.checkLabel.resize();
}