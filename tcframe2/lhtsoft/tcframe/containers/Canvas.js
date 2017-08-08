var TcFrame=TcFrame||{};
TcFrame.Canvas=function(param){
	this.initializate(param);
	this.children=[];
}
TcFrame.Canvas.prototype=new TcFrame.UIComponent();
TcFrame.Canvas.prototype.type="TcFrame.Canvas";
TcFrame.Canvas.prototype.children=null;
TcFrame.Canvas.prototype.numChildren=function(){return this.children.length;}
TcFrame.Canvas.prototype.setChildIndex=function(obj,index){
	if(this.children.length==0){return;}
	var cur=-1;
	for(n=0;n<this.children.length;n++){if(this.children[n]==obj){cur=n;break;}}
	if(cur<0||cur==index){return;}
	if(index<0){index=0;}
	if(index>this.children.length-1){index=this.children.length-1;}
	var tmparr=[];
	for(n=0;n<this.children.length;n++){
		if(cur<index){
			if(n<cur||(n>cur&&n<index)||n>index){tmparr.push(this.children[n]);}
			if(n==index){tmparr.push(this.children[index]);tmparr.push(obj);}	
		}else{
			if(n<index||(n>index&&n<cur)||n>cur){tmparr.push(this.children[n]);}
			if(n==index){tmparr.push(obj);tmparr.push(this.children[index]);}
		}
	}
	this.children=tmparr;
	for(n=0;n<this.children.length;n++){this.children[n].setStyle('zIndex',n);}
}
TcFrame.Canvas.prototype.add=function(child){
	var have=false;
	for(n=0;n<this.children.length;n++){if(this.children[n]==child){have=true;break;}}
	if(have){return;}
	this.children.push(child);
	for(n=0;n<this.children.length;n++){this.children[n].setStyle('zIndex',n);}
	this.content.appendChild(child.content);
	child.parent=this;
	child.calcBorder();
	var o=new TcFrame.Open({target:child});
	o.addEventListener("onComplete",function(event){event.target.target.resize()});
	o.play();
}
TcFrame.Canvas.prototype.remove=function(child){
	var have=false;
	for(n=0;n<this.children.length;n++){if(this.children[n]==child){have=true;break;}}	
	if(!have){return;}
	this.content.removeChild(child.content);
	var arr=[];
	for(n=0;n<this.children.length;n++){
		if(this.children[n]==child){continue;}	
		arr.push(this.children[n]);
	}
	this.children=arr;
	for(n=0;n<this.children.length;n++){this.children[n].setStyle('zIndex',n);}
}
TcFrame.Canvas.prototype.removeAll=function(){
	this.content.innerHTML="";
	this.children=[];	
}
TcFrame.Canvas.prototype.resize=function(){
	this.calcBorder();
	this.render();
	this.dispatch('onResize',{target:this});
	for(var n=0;n<this.children.length;n++){this.children[n].resize();}
}