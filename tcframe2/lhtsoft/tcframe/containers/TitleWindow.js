var TcFrame=TcFrame||{};
TcFrame.TitleWindow=function(param){
	this.initializate(param);
	this.initPanel(param);
	this.usedRight=this.padding;
	if(param){
		if(param.showCloseBtn!=null){this.showCloseBtn=param.showCloseBtn;}
		if(param.showMaxBtn!=null){this.showMaxBtn=param.showMaxBtn;}
		if(param.showMinBtn!=null){this.showMinBtn=param.showMinBtn;}
	}
	if(this.showCloseBtn){
		this.closeBtn=new TcFrame.Button({height:20,width:20,right:2,top:0,label:TcFrame.Language['close'],altWidth:40,altShow:true});
		this.titleBar.add(this.closeBtn);
		this.usedRight+=this.closeBtn.width-2;
		this.closeBtn.addEventListener("onClick",function(event){
			var tw=event.target.parent.parent;
			tw.dispatch("onCloseBtnClick",{target:tw});
		});
	}
	if(this.showMaxBtn){
		this.maxBtn=new TcFrame.Button({height:20,width:20,right:this.usedRight,top:0,label:TcFrame.Language['max'],altWidth:40,altShow:true});
		this.titleBar.add(this.maxBtn);
		this.usedRight+=this.maxBtn.width;
		this.maxBtn.addEventListener("onClick",function(event){
			var tw=event.target.parent.parent;
			tw.dispatch("onMaxBtnClick",{target:tw});
			if(event.target.label==TcFrame.Language['max']){event.target.setLabel(TcFrame.Language['normal']);}else{event.target.setLabel(TcFrame.Language['max']);}
		});
	}
	if(this.showMinBtn){
		this.minBtn=new TcFrame.Button({height:20,width:20,right:this.usedRight,top:0,label:"_",altWidth:40,altShow:true});
		this.titleBar.add(this.minBtn);
		this.usedRight+=this.minBtn.width+1;
		this.minBtn.addEventListener("onClick",function(event){
			var tw=event.target.parent.parent;
			tw.dispatch("onMinBtnClick",{target:tw});
		});
	}
}
TcFrame.TitleWindow.prototype=new TcFrame.Panel();
TcFrame.TitleWindow.prototype.type="TcFrame.TitleWindow";
TcFrame.TitleWindow.prototype.closeBtn=null;
TcFrame.TitleWindow.prototype.maxBtn=null;
TcFrame.TitleWindow.prototype.minBtn=null;
TcFrame.TitleWindow.prototype.usedRight=0;
TcFrame.TitleWindow.prototype.showCloseBtn=true;
TcFrame.TitleWindow.prototype.showMaxBtn=false;
TcFrame.TitleWindow.prototype.showMinBtn=false;