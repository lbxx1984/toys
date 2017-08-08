var TcFrame=TcFrame||{};
TcFrame.Animation=function(param){
	this.setValues(param);
	this.loadEvents();
}
TcFrame.Animation.prototype=new TcFrame.Event();
TcFrame.Animation.prototype.type="TcFrame.Animation";
TcFrame.Animation.prototype.target=null;
TcFrame.Animation.prototype.cssName=null;
TcFrame.Animation.prototype.fromValue=null;
TcFrame.Animation.prototype.toValue=null;
TcFrame.Animation.prototype.speed=10;
TcFrame.Animation.prototype.unit=null;
TcFrame.Animation.prototype.setValues=function(param){
	if(param.target){this.target=param.target;}
	if(param.toValue!=null){this.toValue=param.toValue;}
	if(param.fromValue!=null){this.fromValue=param.fromValue;}
	if(param.speed!=null){this.speed=param.speed;}
	if(param.unit!=null){this.unit=param.unit;}
	if(param.cssName!=null){this.cssName=param.cssName;}
}
TcFrame.Animation.prototype.play=function(){
	if(!this.target||!this.target.content||this.cssName==null||this.fromValue==null||this.toValue==null){return}
	var timeHandle;clearInterval(timeHandle);
	var d=this;
	var fromValue=this.fromValue;
	var toValue=this.toValue;
	var gap=Math.abs(fromValue-toValue);
	var speed=this.speed;
	var cssName=this.cssName;
	var unit=this.unit;
	var o=this.target.content;
   	timeHandle= setInterval(function(){change()},10); 
    function change(){
        if(Math.abs(fromValue-toValue)/gap>(1/speed)){ 
			fromValue+=Math.ceil((toValue-fromValue)/speed);
        }else{
			fromValue=toValue;
			d.dispatch("onComplete",{target:d});
            clearInterval(timeHandle); 
        }
		if(cssName=="opacity"){
			if(TcFrame.RunInIE&&TcFrame.IEVersion<10){
				o.style.filter="alpha(opacity="+fromValue+")";
			}else{
				o.style.opacity=fromValue/100;
			}
			return;	
		}
		if(unit){
			o.style[cssName]=fromValue+unit;
		}else{
			o.style[cssName]=fromValue;
		}
    }
}