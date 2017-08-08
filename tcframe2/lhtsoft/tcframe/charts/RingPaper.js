var TcFrame=TcFrame||{};
TcFrame.RingPaper=function(param){
	this.initializate(param);
	this.RingPaperSetup(param);
}
TcFrame.RingPaper.prototype=new TcFrame.Canvas();
TcFrame.RingPaper.prototype.type="TcFrame.RingPaper";
TcFrame.RingPaper.prototype.title="Charts";
TcFrame.RingPaper.prototype.stage2d=null;
TcFrame.RingPaper.prototype.titleBar=null;
TcFrame.RingPaper.prototype.enable=true;
TcFrame.RingPaper.prototype.RingPaperSetup=function(param){
	if(TcFrame.IEVersion<9){}
	if(param){
		if(param.title!=null){this.title=param.title;}
	}
	this.stage2d=new TcFrame.Stage2D({left:0,right:0,top:0,bottom:0});
	this.stage2d.setStyles({'border':''});
	this.titleBar=new TcFrame.Label({text:this.title,top:0,left:0,right:0,height:25,align:"center"});
	this.titleBar.setStyles({'fontWeight':"bold",'fontSize':"14px"});
	this.add(this.stage2d);
	this.add(this.titleBar);
}
TcFrame.RingPaper.prototype.DrawRing=function(param){
	if(!param){return}
	this.stage2d.RingSector(param);	
	if(param.text!=null){
		var center=(param.endAngle-param.startAngle)*0.5+param.startAngle
		var ox=param.x||this.stage2d.width*0.5,oy=param.y||this.stage2d.height*0.5;
		var sx=ox+Math.cos(center)*(param.internalDiameter+2);
		var sy=oy+Math.sin(center)*(param.internalDiameter+2);
		var ex=ox+Math.cos(center)*param.outsideDiameter*1.5;
		var ey=oy+Math.sin(center)*param.outsideDiameter*1.5;
		var px=0;
		var _this=this;
		function addlabel(x,y,width,height,text,align){
			if(TcFrame.IEVersion<9){
				if(!_this.stage2d.swf){
					setTimeout(function(){addlabel(x,y,width,height,text,align)},200);	
					return;
				}else{
					_this.stage2d.swf.addLabel({x:x,y:y,width:width,height:height,text:text,align:align});
				}
			}else{
				var label=new TcFrame.Label({x:x,y:y,width:width,height:height,text:text,align:align});
				label.setStyles({"color":param.fillStyle});
				_this.add(label);
			}
		}
		
		if(sx<ex){
			px=ex+param.outsideDiameter*0.5;
			addlabel(px+5,ey-10,80,20,param.text,'left');
		}else if(sx>ex){
			px=ex-param.outsideDiameter*0.5;
			addlabel(px-85,ey-10,80,20,param.text,'right');
		}else if(sx==ex){
			if(ey<=sy){
				px=ex+param.outsideDiameter*0.5;
				addlabel(px+5,ey-10,80,20,param.text,'left');
			}else{
				px=ex-param.outsideDiameter*0.5;
				addlabel(px-85,ey-10,80,20,param.text,'right');
			}
		}
		if(ey>this.stage2d.height){ey=this.stage2d.height-20;}
		if(ey<0){ey=20;}
		this.stage2d.Line({lineWidth:2,strokeStyle:param.fillStyle,data:[[sx,sy],[ex,ey],[px,ey]]});
	}
}


