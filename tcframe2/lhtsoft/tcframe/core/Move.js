var TcFrame=TcFrame||{};
TcFrame.Move=function(param){
	if(!param){return;}
	if(param.target){this.target=param.target;}
	if(param.toX!=null){this.toX=param.toX;}
	if(param.toY!=null){this.toY=param.toY;}
	this.loadEvents();
}
TcFrame.Move.prototype=new TcFrame.Event();
TcFrame.Move.prototype.type="TcFrame.Move";
TcFrame.Move.prototype.target=null;
TcFrame.Move.prototype.toX=null;
TcFrame.Move.prototype.toY=null;
TcFrame.Move.prototype.play=function(){
	if(this.target==null){return;}
	var d=this;
	var o= this.target.content;
	var prox;
	var proy;
	var movingX=false;
	var movingY=false;
	if(this.toX!=null){
		var x=this.target.x=this.toX;
		clearInterval(prox);movingX=true;
		prox = setInterval(function(){movex(o,x)},10); 
	}
	if(this.toY!=null){
		var y=this.target.y=this.toY;
		clearInterval(proy);movingY=true;
		proy = setInterval(function(){movey(o,y)},10);
	}
    function movex(o,x){	
        var cx = parseInt(o.style.left); 
        if(Math.abs(cx-x)>5){ 
            o.style.left= (cx + Math.ceil((x-cx)/5)) +"px"; 
        }else{
			o.style.left=x+"px"; 
            clearInterval(prox);movingX=false;
			if(!movingY){d.dispatch("onComplete",{target:d});}
        } 
    }
	function movey(o,y){	
        var cy = parseInt(o.style.top); 
        if(Math.abs(cy-y)>5){ 
            o.style.top= (cy + Math.ceil((y-cy)/5)) +"px"; 
        }else{ 
			o.style.top=y+"px"; 
            clearInterval(proy);movingY=false;
			if(!movingX){d.dispatch("onComplete",{target:d});}
        }
    }    
}

