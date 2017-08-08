var TcFrame=TcFrame||{};
TcFrame.Stage2D=function(param){
	this.initializate(param);
	this.children=[];
	if(param){
		if(param.backgroundMeshColor!=null){this.backgroundMeshColor=param.backgroundMeshColor;}
		if(param.backgroundMeshColor2!=null){this.backgroundMeshColor2=param.backgroundMeshColor2;}
		if(param.backgroundMeshInterval!=null){this.backgroundMeshInterval=param.backgroundMeshInterval;}
		if(param.backgroundMeshShow!=null){this.backgroundMeshShow=param.backgroundMeshShow;}
		if(param.backgroundBigMeshShow!=null){this.backgroundBigMeshShow=param.backgroundBigMeshShow;}
	}
	if(TcFrame.IEVersion<9){
		//在resize里面载入swf
	}else{
		this.backgroundMesh=document.createElement("canvas");
		this.backgroundMesh.style.cssText="position:absolute;left:0px;top:0px;";
		this.backgroundMesh2=document.createElement("canvas");
		this.backgroundMesh2.style.cssText="position:absolute;left:0px;top:0px;";
		if(this.backgroundMeshShow){
			this.content.appendChild(this.backgroundMesh);this.backgroundMesh.added=true;
		}
		if(this.backgroundBigMeshShow){
			this.content.appendChild(this.backgroundMesh2);this.backgroundMesh2.added=true;
		}
	}
}
TcFrame.Stage2D.prototype=new TcFrame.UIComponent();
TcFrame.Stage2D.prototype.type="TcFrame.Stage2D";
TcFrame.Stage2D.prototype.children=null;
TcFrame.Stage2D.prototype.enable=true;
TcFrame.Stage2D.prototype.swf=null;
TcFrame.Stage2D.prototype.backgroundMesh=null;
TcFrame.Stage2D.prototype.backgroundMesh2=null;
TcFrame.Stage2D.prototype.backgroundMeshColor="rgba(3,3,3,0.2)";
TcFrame.Stage2D.prototype.backgroundMeshColor2="rgba(3,3,3,0.5)";
TcFrame.Stage2D.prototype.backgroundMeshInterval=10;
TcFrame.Stage2D.prototype.backgroundMeshShow=false;
TcFrame.Stage2D.prototype.backgroundBigMeshShow=false;


TcFrame.Stage2D.prototype.newContext=function(param){//创建画布
	var canvas=document.createElement("canvas");
	canvas.style.cssText="position:absolute;left:0px;top:0px;";
	canvas.parent=this;
	canvas.width=this.width;
	canvas.height=this.height;
	var context=canvas.getContext('2d');
	context.strokeStyle=(param.strokeStyle==null)?"#99cc33":param.strokeStyle;
	context.fillStyle=(param.fillStyle==null)?"rgba(50,0,0,0.3)":param.fillStyle;
	context.lineWidth=(param.lineWidth==null)?1:param.lineWidth;
	context.shadowBlur=(param.shadowBlur==null)?0:param.shadowBlur;
	context.shadowColor=(param.shadowColor===null)?"#F2EB97":param.shadowColor;
	context.shadowOffsetX=(param.shadowOffsetX==null)?0:param.shadowOffsetX;
	context.shadowOffsetY=(param.shadowOffsetY==null)?0:param.shadowOffsetY;
	context.lineCap=(param.lineCap==null) ? "round" : param.lineCap;//butt,round,square
	this.content.appendChild(canvas);
	this.children.push(canvas);
	return context;
}
/////对外接口
TcFrame.Stage2D.prototype.removeAll=function(){
	if(TcFrame.IEVersion<9){
		var _this=this;
		if(this.swf){
			this.swf.removeAll();
		}else{
			setTimeout(function(){_this.removeAll()},1000);	
		}
		return;
	}
	this.content.innerHTML="";
	if(this.backgroundMeshShow){this.content.appendChild(this.backgroundMesh);}
	if(this.backgroundBigMeshShow){this.content.appendChild(this.backgroundMesh2);}
}
TcFrame.Stage2D.prototype.showBackgroundMesh=function(b){//显示坐标格
	if(TcFrame.IEVersion<9){
		var _this=this;
		if(this.swf){
			this.swf.showBackgroundMesh(b);
		}else{
			setTimeout(function(){_this.swf.showBackgroundMesh(b)},1000);	
		}
		return;
	}
	if(b==this.backgroundMeshShow){return;}
	if(b){this.content.appendChild(this.backgroundMesh);}else{this.content.removeChild(this.backgroundMesh);}
	this.backgroundMeshShow=b;
}
TcFrame.Stage2D.prototype.showBackgroundBigMesh=function(b){//显示大坐标格
	if(TcFrame.IEVersion<9){
		var _this=this;
		if(this.swf){
			this.swf.showBackgroundBigMesh(b);
		}else{
			setTimeout(function(){_this.swf.showBackgroundBigMesh(b)},1000);	
		}
		return;
	}
	if(b==this.backgroundBigMeshShow){return;}
	if(b){this.content.appendChild(this.backgroundMesh2);}else{this.content.removeChild(this.backgroundMesh2);}
	this.backgroundBigMeshShow=b;
}

TcFrame.Stage2D.prototype.Line=function(param){//直线
	if(!param||!param.data||!param.data.length||param.data.length==0){return;}	
	if(TcFrame.IEVersion<9){
		var _this=this;
		if(this.swf){
			this.swf.Line(param);
		}else{
			setTimeout(function(){_this.swf.Line(param)},1000);	
		}
		return;
	}
	var context=this.newContext(param);
	context.beginPath();
	for(var n=0;n<param.data.length;n++){
		if(n==0){context.moveTo(param.data[n][0],param.data[n][1]);continue;}
		context.lineTo(param.data[n][0],param.data[n][1]);	
	}
	context.stroke();
}
TcFrame.Stage2D.prototype.Arc=function(param){//圆弧
	if(!param){return;}
	if(TcFrame.IEVersion<9){
		var _this=this;
		if(this.swf){
			this.swf.Arc(param);
		}else{
			setTimeout(function(){_this.swf.Arc(param)},1000);	
		}
		return;
	}
	var context=this.newContext(param);
	context.beginPath();
	context.arc(
		(param.x==null)? 100:param.x,
		(param.y==null)? 100:param.y,
		(param.radius==null)? 50:param.radius,
		(param.startAngle==null)? 0:param.startAngle,
		(param.endAngle==null)? 1.57:param.endAngle,
		param.anticlockwise
	);
	if(param.stroke==false){}else{context.stroke();}
	if(param.fill==false){}else{context.fill();}
}
TcFrame.Stage2D.prototype.QuadraticCurve=function(param){//二次贝塞尔曲线
	if(!param){return;}
	if(TcFrame.IEVersion<9){
		var _this=this;
		if(this.swf){
			this.swf.QuadraticCurve(param);
		}else{
			setTimeout(function(){_this.swf.QuadraticCurve(param)},1000);	
		}
		return;
	}
	var context=this.newContext(param);
	context.beginPath();
	context.moveTo(
		(param.fromX==null)? 100:param.fromX,
		(param.fromY==null)? 100:param.fromY
	);
	context.quadraticCurveTo(
		(param.cpx==null)? 200:param.cpx,
		(param.cpy==null)? 200:param.cpy,
		(param.toX==null)? 300:param.toX,
		(param.toY==null)? 100:param.toY
	)
	if(param.stroke==false){}else{context.stroke();}
	if(param.fill==false){}else{context.fill();}
}
TcFrame.Stage2D.prototype.BezierCurve=function(param){//三次贝塞尔曲线
	if(!param){return;}
	if(TcFrame.IEVersion<9){
		var _this=this;
		if(this.swf){
			this.swf.BezierCurve(param);
		}else{
			setTimeout(function(){_this.swf.BezierCurve(param)},1000);	
		}
		return;
	}
	var context=this.newContext(param);
	context.beginPath();
	context.moveTo(
		(param.fromX==null)? 100:param.fromX,
		(param.fromY==null)? 100:param.fromY
	);
	context.bezierCurveTo(
		(param.cpx1==null)? 150:param.cpx1,
		(param.cpy1==null)? 200:param.cpy1,
		(param.cpx2==null)? 250:param.cpx2,
		(param.cpy2==null)? 50:param.cpy2,
		(param.toX==null)? 300:param.toX,
		(param.toY==null)? 100:param.toY
	)
	if(param.stroke==false){}else{context.stroke();}
	if(param.fill==false){}else{context.fill();}
}
TcFrame.Stage2D.prototype.Polygon=function(param){//多边形
	if(!param||!param.data||!param.data.length||param.data.length<3){return;}
	if(TcFrame.IEVersion<9){
		var _this=this;
		if(this.swf){
			this.swf.Polygon(param);
		}else{
			setTimeout(function(){_this.swf.Polygon(param)},1000);	
		}
		return;
	}
	var context=this.newContext(param);
	context.lineCap=(param.lineCap==null) ? "round" : param.lineCap;//butt,round,square
	context.beginPath();
	for(var n=0;n<param.data.length;n++){
		if(n==0){context.moveTo(param.data[n][0],param.data[n][1]);continue;}
		context.lineTo(param.data[n][0],param.data[n][1]);	
	}
	if(param.stroke==false){}else{context.stroke();}
	if(param.fill==false){}else{context.fill();}
}
TcFrame.Stage2D.prototype.Candlestick=function(param){//K线
	if(!param){return;}
	if(TcFrame.IEVersion<9){
		var _this=this;
		if(this.swf){
			this.swf.Candlestick(param);
		}else{
			setTimeout(function(){_this.swf.Candlestick(param)},1000);	
		}
		return;
	}
	var width=param.width||5;
	var x=param.x||250;
	var begin=param.begin||150;
	var end=param.end||100;
	var top=param.top||70;
	var bottom=param.bottom||170;
	param.data=[];param.stroke=false;
	if(begin<end){
		param.fillStyle=TcFrame.Skin['TcFrame.CandlestickChart']['slidecolor'];
		param.data.push([x-width*0.5,end]);param.data.push([x-1,end]);
		param.data.push([x-1,bottom]);param.data.push([x+1,bottom]);
		param.data.push([x+1,end]);param.data.push([x+width*0.5,end]);
		param.data.push([x+width*0.5,begin]);param.data.push([x+1,begin]);
		param.data.push([x+1,top]);param.data.push([x-1,top]);
		param.data.push([x-1,begin]);param.data.push([x-width*0.5,begin]);
	}else{
		param.fillStyle=TcFrame.Skin['TcFrame.CandlestickChart']['risecolor'];
		param.data.push([x-width*0.5,end]);param.data.push([x-1,end]);
		param.data.push([x-1,top]);param.data.push([x+1,top]);
		param.data.push([x+1,end]);param.data.push([x+width*0.5,end]);
		param.data.push([x+width*0.5,begin]);param.data.push([x+1,begin]);
		param.data.push([x+1,bottom]);param.data.push([x-1,bottom]);
		param.data.push([x-1,begin]);param.data.push([x-width*0.5,begin]);
	}
	this.Polygon(param);
}
TcFrame.Stage2D.prototype.Circle=function(param){//圆形
	if(!param){return;}	
	if(TcFrame.IEVersion<9){
		var _this=this;
		if(this.swf){
			this.swf.Circle(param);
		}else{
			setTimeout(function(){_this.swf.Circle(param)},1000);	
		}
		return;
	}
	param.a=param.radius||50;
	param.b=param.radius||50;
	param.startAngle=0;
	param.endAngle=6.3;
	this.Ellipse(param);
}
TcFrame.Stage2D.prototype.Ellipse=function(param){//椭圆
	if(!param){return;}
	if(TcFrame.IEVersion<9){
		var _this=this;
		if(this.swf){
			this.swf.Ellipse(param);
		}else{
			setTimeout(function(){_this.swf.Ellipse(param)},1000);	
		}
		return;
	}
	var x=(param.x==null)?200:param.x;
	var y=(param.y==null)?200:param.y;
	var a=(param.a==null)?100:param.a;
	var b=(param.b==null)?50:param.b;
	var startAngle=(param.startAngle==null)? 0:param.startAngle;
	var endAngle=(param.endAngle==null)? 6.3:param.endAngle;
	var anticlockwise=param.anticlockwise;
	if(anticlockwise){endAngle=-endAngle;}
	var data=[];
	var dAngle=(endAngle-startAngle)/50;
	while(Math.abs(startAngle-endAngle)>0.1){
		data.push([x+a*Math.cos(startAngle),y+b*Math.sin(startAngle)]);
		startAngle+=dAngle;
	}
	data.push([x+a*Math.cos(endAngle),y+b*Math.sin(endAngle)]);
	param.data=data;
	this.Polygon(param);
}
TcFrame.Stage2D.prototype.Sector=function(param){//扇形
	if(!param){return;}
	if(TcFrame.IEVersion<9){
		var _this=this;
		if(this.swf){
			this.swf.Sector(param);
		}else{
			setTimeout(function(){_this.swf.Sector(param)},1000);	
		}
		return;
	}
	var context=this.newContext(param);
	context.beginPath();
	context.moveTo((param.x==null)? 100:param.x,(param.y==null)? 100:param.y);
	context.arc(
		(param.x==null)? 100:param.x,
		(param.y==null)? 100:param.y,
		(param.radius==null)? 50:param.radius,
		(param.startAngle==null)? 0:param.startAngle,
		(param.endAngle==null)? 2.5:param.endAngle,
		param.anticlockwise
	);
	context.lineTo((param.x==null)? 100:param.x,(param.y==null)? 100:param.y);
	if(param.stroke==false){}else{context.stroke();}
	if(param.fill==false){}else{context.fill();}
}
TcFrame.Stage2D.prototype.RingSector=function(param){//环扇
	if(!param){return;}
	if(TcFrame.IEVersion<9){
		var _this=this;
		if(this.swf){
			this.swf.RingSector(param);
		}else{
			setTimeout(function(){_this.swf.RingSector(param)},1000);	
		}
		return;
	}
	var x=(param.x==null)?this.width*0.5:param.x;
	var y=(param.y==null)?this.height*0.5:param.y;
	var od=(param.outsideDiameter==null)?100:param.outsideDiameter;
	var id=(param.internalDiameter==null)?50:param.internalDiameter;
	var startAngle=(param.startAngle==null)? 0:param.startAngle;
	var endAngle=(param.endAngle==null)? 6.3:param.endAngle;
	var anticlockwise=param.anticlockwise;
	if(anticlockwise){endAngle=-endAngle;}
	var data=[];
	var dAngle=(endAngle-startAngle)/50;
	var s=startAngle;
	var e=endAngle;
	data.push([x+id*Math.cos(startAngle),y+id*Math.sin(startAngle)]);
	data.push([x+od*Math.cos(startAngle),y+od*Math.sin(startAngle)]);
	while(Math.abs(s-e)>0.1){data.push([x+od*Math.cos(s),y+od*Math.sin(s)]);s+=dAngle;}
	data.push([x+od*Math.cos(endAngle),y+od*Math.sin(endAngle)]);
	data.push([x+id*Math.cos(endAngle),y+id*Math.sin(endAngle)]);
	s=endAngle;e=startAngle;
	while(Math.abs(s-e)>0.1){data.push([x+id*Math.cos(s),y+id*Math.sin(s)]);s-=dAngle;}
	param.data=data;
	this.Polygon(param);
}
TcFrame.Stage2D.prototype.Rectangle=function(param){//矩形
	if(!param){return;}
	if(TcFrame.IEVersion<9){
		var _this=this;
		if(this.swf){
			this.swf.Rectangle(param);
		}else{
			setTimeout(function(){_this.swf.Rectangle(param)},1000);	
		}
		return;
	}
	var x=(param.x==null)?100:param.x;
	var y=(param.y==null)?100:param.y;
	var width=(param.width==null)?100:param.width;
	var height=(param.height==null)?100:param.height;
	var data=[];
	data.push([x,y]);
	data.push([x+width,y]);
	data.push([x+width,y+height]);
	data.push([x,y+height]);
	data.push([x,y]);
	param.data=data;
	this.Polygon(param);
}
TcFrame.Stage2D.prototype.resize=function(){
	this.calcBorder();
	this.render();
	if(TcFrame.IEVersion<9){//载入swf
		var id=new Date().getTime();
		this.content.innerHTML='<object style="position:absolute;" id="'+id+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+this.width+'" height="'+this.height+'"><param name="movie" value="'+TcFrame.Stage2DSwfURL+'"/><param name="quality" value="high" /></object>'
		var _this=this;
		function loaded(){
			_this.swf=document.getElementById(id);
			if(!_this.swf){setTimeout(function(){loaded();},200);return;}
			if(_this.backgroundMeshShow){_this.swf.showBackgroundMesh(true);}	
			if(_this.backgroundBigMeshShow){_this.swf.showBackgroundBigMesh(true);}
		}
		TcFrame.SwfLoadHandle=function(){loaded();}	
	}else{//绘制html5
		this.backgroundMesh.width=this.width;
		this.backgroundMesh.height=this.height;	
		this.backgroundMesh2.width=this.width;
		this.backgroundMesh2.height=this.height;	
		try{
			///绘制坐标纸
			var context=this.backgroundMesh.getContext('2d');
			context.strokeStyle=this.backgroundMeshColor;
			context.lineWidth=1;context.beginPath();
			for(var n=this.height;n>0;n-=this.backgroundMeshInterval){context.moveTo(0.5,n+0.5);context.lineTo(this.width+0.5,n+0.5);}
			for(var n=this.backgroundMeshInterval;n<this.width;n+=this.backgroundMeshInterval){context.moveTo(n+0.5,this.height);context.lineTo(n+0.5,0.5);	}
			context.stroke();
			var context2=this.backgroundMesh2.getContext('2d');
			context2.strokeStyle=this.backgroundMeshColor2;
			context2.lineWidth=1;context2.beginPath();
			var maxwidth=parseInt(this.width/this.backgroundMeshInterval)*this.backgroundMeshInterval;
			for(var n=this.height;n>0;n-=this.backgroundMeshInterval*10){context2.moveTo(0.5,n+0.5);context2.lineTo(this.width+0.5,n+0.5);}
			for(var n=this.backgroundMeshInterval*10;n<this.width;n+=this.backgroundMeshInterval*10){context2.moveTo(n+0.5,this.height);context2.lineTo(n+0.5,0.5);}
			context2.stroke();
			///坐标纸绘制完成
		}catch(e){}
	}
	this.dispatch('onResize',{target:this});
}