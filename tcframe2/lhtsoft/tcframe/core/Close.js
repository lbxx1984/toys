var TcFrame=TcFrame||{};
TcFrame.Close=function(param){
	if(!param||!param.target){return;}
	this.target=param.target;
	this.loadEvents();
}
TcFrame.Close.prototype=new TcFrame.Event();
TcFrame.Close.prototype.type="TcFrame.Close";
TcFrame.Close.prototype.target=null;
TcFrame.Close.prototype.play=function(){
	if(!this.target){return;}
	var d=this;
	var target=this.target;
	var o=this.target.content;
	var t=this.target.openType;
	var x=this.target.x;
	var y=this.target.y;
	var width=this.target.width;
	var height=this.target.height;
	var nx=x,ny=y,nw=width,nh=height,no=1;
	var pro;clearInterval(pro);
	pro = setInterval(function(){ch()},10);
	function ch(){
		if(Math.abs(nh)<3){clearInterval(pro);target.parent.remove(target);d.dispatch("onComplete",{target:d});return;}
		if(Math.abs(nw)<3){clearInterval(pro);target.parent.remove(target);d.dispatch("onComplete",{target:d});return;}
		if(no<0){clearInterval(pro);target.parent.remove(target);d.dispatch("onComplete",{target:d});return;}
		switch(t){
			case "TopToBottom":
				nh-=Math.ceil(nh/5);
				o.style.height=nh+"px";break;
			case "LeftToRight":
				nw-=Math.ceil(nw/5);
				o.style.width=nw+"px";break;
			case "RightToLeft":
				nw-=Math.ceil(nw/5);
				o.style.left=(x+width-nw)+"px";o.style.width=nw+"px";break;
			case "BottomToTop":
				nh-=Math.ceil(nh/5);
				o.style.height=nh+"px";o.style.top=(y+height-nh)+"px";break;
			case "MiddleToHeight":
				nh-=Math.ceil(nh/5);
				o.style.height=nh+"px";	o.style.top=(y+(height-nh)/2)+"px";break;
			case "CenterToWidth":
				nw-=Math.ceil(nw/5);
				o.style.left=(x+(width-nw)/2)+"px"; o.style.width=nw+"px";break;
			case "PointToBorder":
				nw-=Math.ceil(nw/5);nh-=Math.ceil(nh/5);
				o.style.width=nw+"px"; o.style.height=nh+"px";	
				o.style.top=(y+(height-nh)/2)+"px";o.style.left=(x+(width-nw)/2)+"px"; 
				break;
			case "Opacity":
				no=no-0.05;
				if(TcFrame.RunInIE&&TcFrame.IEVersion<10){
					o.style.filter="alpha(opacity="+(no*100)+")";
				}else{
					o.style.opacity=no;
				}	
				break;						
			default:
				clearInterval(pro);target.parent.remove(target);d.dispatch("onComplete",{target:d});break;
		}
    }
}