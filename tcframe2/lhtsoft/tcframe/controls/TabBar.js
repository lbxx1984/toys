var TcFrame=TcFrame||{};
TcFrame.TabBar=function(param){
	this.initializate(param);
	if(!param){return;}
	if(param.buttonWidth!=null){this.buttonWidth=param.buttonWidth;}
}
TcFrame.TabBar.prototype=new TcFrame.Canvas();
TcFrame.TabBar.prototype.type="TcFrame.TabBar";
TcFrame.TabBar.prototype.buttonWidth=80;
TcFrame.TabBar.prototype.currentID=null;
TcFrame.TabBar.prototype.dataProvider=function(arr){
	if(!arr||!arr.length||arr.length==0){return;}
	this.removeAll();
	var intab=false;
	if(this.type=="TcFrame.TabBar"){intab=true;}	
	for(var n=0;n<arr.length;n++){
		var btn=new TcFrame.Button({width:this.buttonWidth,height:this.height,bottom:0,left:n*this.buttonWidth,label:arr[n].label,inTab:intab});
		btn.id=arr[n].id;
		this.add(btn);	
		btn.addEventListener("onClick",function(event){
			event.target.parent.setActiveByID(event.target.id);	
		});
	}
	this.setActiveByID(arr[0].id);
	this.resize();
}
TcFrame.TabBar.prototype.setActiveByID=function(id){
	if(this.children.length==0||id==this.currentID){return}
	this.currentID="";
	var p=0;
	for(var n=0;n<this.children.length;n++){
		if(this.children[n].id==id){
			this.children[n].setActive(true);
			this.currentID=id;	
			p=0;
		}else{
			this.children[n].setActive(false);
		}
	}
	this.setChildIndex(this.children[p],this.children.length-1);
	this.dispatch("onActiveChange",{target:this});
}