var TcFrame=TcFrame||{};
TcFrame.Timer=function(param){
	if(!param){return;}	
	if(param.delay!=null){this.delay=param.delay;}
	if(param.count!=null){this.count=param.count;}
	if(param.func!=null&&typeof(param.func)=="function"){this.func=param.func;}
	clearInterval(this.isStart);
	this.loadEvents();
}
TcFrame.Timer.prototype=new TcFrame.Event();
TcFrame.Timer.prototype.type="TcFrame.Timer";
TcFrame.Timer.prototype.current=0;
TcFrame.Timer.prototype.count=0;
TcFrame.Timer.prototype.delay=200;
TcFrame.Timer.prototype.func=null;
TcFrame.Timer.prototype.started=false;
TcFrame.Timer.prototype.proxy;
TcFrame.Timer.prototype.doing=function(timer){
	if(timer.current==timer.count&&timer.count>0){
		timer.current=0;
		clearInterval(timer.proxy);
		timer.started=false;
		timer.dispatch("onComplete",{target:timer});
		return;
	}
	timer.current++;
	timer.func({target:timer});
}
TcFrame.Timer.prototype.reset=function(){this.current=0;}
TcFrame.Timer.prototype.start=function(){
	if(this.func==null||this.started){return;}
	this.started=true;
	var timer=this;
	timer.proxy= setInterval(function(){timer.doing(timer)},timer.delay);
}
TcFrame.Timer.prototype.stop=function(){
	this.current=0;
	this.started=false;
	clearInterval(this.proxy);
	this.dispatch("onStop",{target:this});
}