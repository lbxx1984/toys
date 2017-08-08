var TcFrame=TcFrame||{};
TcFrame.Open=function(param){
	if(!param||!param.target){return;}
	this.target=param.target;
	this.loadEvents();
}
TcFrame.Open.prototype=new TcFrame.Event();
TcFrame.Open.prototype.type="TcFrame.Open";
TcFrame.Open.prototype.target=null;
TcFrame.Open.prototype.play=function(){
	if(!this.target){return;}
	var d=this;
	var o=this.target.content;
	var t=this.target.openType;
	var x=this.target.x;
	var y=this.target.y;
	var width=this.target.width;
	var height=this.target.height;
	var nx=0,ny=0,nw=0,nh=0,no=0;
	var pro;clearInterval(pro);
	switch(t){
		case "TopToBottom":
			o.style.left=x+"px";o.style.top=y+"px";o.style.width=width+"px";
			pro = setInterval(function(){ch(1)},10);break;
		case "LeftToRight":
			o.style.left=x+"px";o.style.top=y+"px";o.style.height=height+"px";
			pro = setInterval(function(){ch(2)},10);break;
		case "RightToLeft":
			o.style.top=y+"px";o.style.height=height+"px";
			pro = setInterval(function(){ch(3)},10);break;
		case "BottomToTop":
			o.style.left=x+"px";o.style.width=width+"px";
			pro = setInterval(function(){ch(4)},10);break;
		case "MiddleToHeight":
			o.style.left=x+"px";o.style.width=width+"px";
			pro = setInterval(function(){ch(5)},10);break;
		case "CenterToWidth":
			o.style.top=y+"px";o.style.height=height+"px";
			pro = setInterval(function(){ch(6)},10);break;
		case "PointToBorder":
			pro = setInterval(function(){ch(7)},10);break;	
		case "Opacity":
			o.style.left=x+"px";o.style.top=y+"px";
			o.style.width=width+"px";o.style.height=height+"px";
			if(TcFrame.RunInIE&&TcFrame.IEVersion<10){
				o.style.filter="alpha(opacity=0)";
			}else{
				o.style.opacity=0;
			}
			no=0;
			pro = setInterval(function(){ch(8)},10);break;							
		default:
			this.dispatch("onComplete",{target:d});break;
	}
	function ch(type){
		if(Math.abs(nh-height)<2){nh=height;}
		if(Math.abs(nw-width)<2){nw=width;}
		if(no>0.95){no=1;}
		switch(type){
			case 1:
				if(nh!=height){nh+=Math.ceil((height-nh)/5);}else{d.dispatch("onComplete",{target:d});clearInterval(pro);}
				o.style.height=nh+"px";	break;
			case 2:
				if(nw!=width){ nw+=Math.ceil((width-nw)/5);}else{d.dispatch("onComplete",{target:d});clearInterval(pro);} 
				o.style.width=nw+"px";	break;
			case 3:
				if(nw!=width){ nw+=Math.ceil((width-nw)/5);}else{d.dispatch("onComplete",{target:d});clearInterval(pro);}
				o.style.left=(x+width-nw)+"px";o.style.width=nw+"px";break;	
			case 4:
				if(nh!=height){nh+=Math.ceil((height-nh)/5);}else{d.dispatch("onComplete",{target:d});clearInterval(pro);}
				o.style.height=nh+"px";o.style.top=(y+height-nh)+"px";break;
			case 5:
				if(nh!=height){nh+=Math.ceil((height-nh)/5);}else{d.dispatch("onComplete",{target:d});clearInterval(pro);}
				o.style.height=nh+"px";	o.style.top=(y+(height-nh)/2)+"px";break;
			case 6:
				if(nw!=width){ nw+=Math.ceil((width-nw)/5);}else{d.dispatch("onComplete",{target:d});clearInterval(pro);}
				o.style.left=(x+(width-nw)/2)+"px"; o.style.width=nw+"px";break;
			case 7:
				if(nw!=width){nw+=Math.ceil((width-nw)/5);}
				if(nh!=height){nh+=Math.ceil((height-nh)/5);}
				if(nh==height&&nw==width){clearInterval(pro);d.dispatch("onComplete",{target:d});}
				o.style.width=nw+"px"; o.style.height=nh+"px";	
				o.style.top=(y+(height-nh)/2)+"px";
				o.style.left=(x+(width-nw)/2)+"px"; break;
			case 8:
				no+=0.02;
				if(TcFrame.RunInIE&&TcFrame.IEVersion<10){
					o.style.filter="alpha(opacity="+(no*100)+")";
				}else{
					o.style.opacity=no;
				}
				if(no==1){clearInterval(pro);d.dispatch("onComplete",{target:d});}
			default:break;
		}
    }
}