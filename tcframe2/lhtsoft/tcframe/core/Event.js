var TcFrame=TcFrame||{};
TcFrame.Event=function(){}
TcFrame.Event.prototype.type="TcFrame.Event";
TcFrame.Event.prototype.handle=null;
TcFrame.Event.prototype.loadEvents=function(){
	this.handle={};
	if(!TcFrame.Events[this.type]||TcFrame.Events[this.type].length==0){return;}
	for(n=0;n<TcFrame.Events[this.type].length;n++){this.handle[TcFrame.Events[this.type][n]]=[];}
}
TcFrame.Event.prototype.addEventListener=function(key,fun){
	if(typeof(fun)!="function"||!this.handle){return}
	var funarr=this.handle[key];
	if(!funarr){return}
	for(var n=0;n<funarr.length;n++){if(funarr[n]==fun){return}}
	funarr.push(fun);
}
TcFrame.Event.prototype.removeEventListener=function(key,fun){
	if(typeof(fun)!="function"||!this.handle){return}
	var funarr=this.handle[key];
	if(!funarr){return}
	var newarr=[];
	for(var n=0;n<funarr.length;n++){if(funarr[n]==fun){continue;}else{newarr.push(funarr[n]);}}
	this.handle[key]=newarr;
}
TcFrame.Event.prototype.dispatch=function(key,argms){
	if(!this.handle){return;}
	var funarr=this.handle[key];
	if(!funarr||funarr.length==0){return}
	for(var n=0;n<funarr.length;n++){if(typeof(funarr[n])=="function"){
		var func=funarr[n];
		func(argms);
	}}
}