var TcFrame=TcFrame||{};
TcFrame.Resize=function(param){
	if(!param){return}
	if(param.target){this.target=param.target;}
	if(param.toWidth!=null){this.toWidth=param.toWidth;}
	if(param.toHeight!=null){this.toHeight=param.toHeight;}
	this.loadEvents();
}
TcFrame.Resize.prototype=new TcFrame.Event();
TcFrame.Resize.prototype.type="TcFrame.Resize";
TcFrame.Resize.prototype.target=null;
TcFrame.Resize.prototype.toWidth=null;
TcFrame.Resize.prototype.toHeight=null;
TcFrame.Resize.prototype.play=function(){
	if(this.target==null){return;}
	var o= this.target.content;
	var d= this;
	var resizingX=false;
	var resizingY=false;
	if(this.toWidth!=null){
		var prox;
		var w=this.target.width=this.toWidth;
		clearInterval(prox);
		resizingX=true;
		prox = setInterval(function(){movex(o,w)},10); 
	}
	if(this.toHeight!=null){
		var proy;
		var h=this.target.height=this.toHeight;
		clearInterval(proy);
		resizingY=true;
		proy = setInterval(function(){movey(o,h)},10);
	}
    function movex(o,x){	
        var cx = parseInt(o.style.width); 
        if(Math.abs(cx-x)>5){ 
            o.style.width= (cx + Math.ceil((x-cx)/5)) +"px"; 
        }else{
			o.style.width=x+"px"; 
            clearInterval(prox); 
			resizingX=false;
			if(!resizingY){d.dispatch("onComplete",{target:d});}
        } 
    }
	function movey(o,y){	
        var cy = parseInt(o.style.height); 
        if(Math.abs(cy-y)>5){ 
            o.style.height= (cy + Math.ceil((y-cy)/5)) +"px"; 
        }else{ 
			o.style.height=y+"px"; 
            clearInterval(proy); 
			resizingY=false;
			if(!resizingX){d.dispatch("onComplete",{target:d});}
        }
    } 
}
