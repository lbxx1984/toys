var TcFrame=TcFrame||{};
TcFrame.RunInIE=false;//是否运行在IE下
TcFrame.RunInFF=false;//是否运行在FireFox下
TcFrame.IEVersion=9;
TcFrame.Boot=null;//整个Web的根，即第一个初始化的Application
TcFrame.RunInBODY=false;
TcFrame.SupportedBrowsers={Chrome:15,IE:7,Opera:9,Safari:5,Firefox:15}//浏览器允许的最低浏览器版本
TcFrame.WebGL=(function(){try{return!!window.WebGLRenderingContext&&!!document.createElement('canvas').getContext( 'experimental-webgl');}catch(e) {return false;}})();//判断是否支持WebGL
TcFrame.Width=-1;//全局宽度
TcFrame.Height=-1;//全局高度
TcFrame.MousePosition=[-1,-1];
TcFrame.MouseDownPosition=[-1,-1];
TcFrame.MousePositionLast=[-1,-1];
TcFrame.MouseDown=false;
TcFrame.Version="2.0";
TcFrame.Stage2DSwfURL="lhtsoft/tcframe/stage/Stage2D.swf";
TcFrame.BrowserVersion=function(){//获取浏览器版本
	var Sys={};  
	var ua = navigator.userAgent.toLowerCase();  
	var s;  
   	(s=ua.match(/msie ([\d.]+)/))?Sys.ie=s[1].split(".")[0]:  
   	(s=ua.match(/firefox\/([\d.]+)/))?Sys.firefox=s[1].split(".")[0]:  
   	(s=ua.match(/chrome\/([\d.]+)/))?Sys.chrome=s[1].split(".")[0]:  
   	(s=ua.match(/opera.([\d.]+)/))?Sys.opera=s[1].split(".")[0]:  
  	(s=ua.match(/version\/([\d.]+).*safari/))?Sys.safari =s[1].split(".")[0]:0;  
	if(Sys.ie){return ['IE',Sys.ie]} 
	if(Sys.firefox){return ['Firefox',Sys.firefox]}   
	if(Sys.chrome){return ['Chrome',Sys.chrome]}  
	if(Sys.opera){return ['Opera',Sys.opera]}  
	if(Sys.safari){return ['Safari',Sys.safari]} 
}
TcFrame.Warning=function(str){//静态警示框
	var a=document.createElement( 'div' );
	a.style.cssText='text-align:center;width:475px;margin:5em auto 0;font-family:'+TcFrame.Language['font6']+';font-size:14px;background-color:#D5D5D5;color:#333;padding:1em;'
	a.innerHTML =str;
	return a;	
}
TcFrame.SelectEnable=function(value){//设置全局是否可以选定
	if(value){
		document.body.onselectstart=function(){return true;}
	}else{
		document.body.onselectstart=function(){return false;}	
	}
}
TcFrame.Cursor=function(type){//设置全局鼠标
	document.body.style.cursor=type;
}
TcFrame.ColorRGBA2HEX=function(rgba){
	if(TcFrame.IEVersion>8||rgba.charAt(0)=='#'){return rgba;}
	var arr=rgba.split("(")[1].split(",");
	var str="#";
	for(var n=0;n<3;n++){
		var c=parseInt(arr[n]).toString(16);
		if(c.length<2){c="0"+c;}
		str+=c;
	}
	return str;	
}


///////////内部接口
TcFrame.SwfLoadHandle=null;
TcFrame.SwfLoadOver=function(){TcFrame.SwfLoadHandle();TcFrame.SwfLoadHandle=null;}
TcFrame.getBootPos=function(){
	obj=TcFrame.Boot.content;
	t=0;l=0;
	while(obj){t+= obj.offsetTop;l+=obj.offsetLeft;obj=obj.offsetParent;}
	var scTop=null,scLeft=null; 
    if(typeof window.pageYOffset != 'undefined') {
        scTop = window.pageYOffset;
		scLeft= window.pageXOffset;
	}else if(
		typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat'&&scTop==null
	){ 
        scTop = document.documentElement.scrollTop;
		scLeft = document.documentElement.scrollLeft;
	} else if (typeof document.body != 'undefined'&&scTop==null) { 
        scTop = document.body.scrollTop; 
		scLeft = document.body.scrollLeft; 
	}
	l-=scLeft;t-=scTop;
	if(TcFrame.IEVersion==7){l+=2;t+=2;}	
	return [l,t];
}
TcFrame.getMousePos=function(event){
	if(TcFrame.RunInFF){
		x=event.clientX;y=event.clientY;
	}else{
		x=window.event.clientX;y=window.event.clientY;
	}
	var bootPos=TcFrame.getBootPos();
	return [x-bootPos[0],y-bootPos[1]];
}
TcFrame.MouseMoveHandle=function(event){//系统鼠标移动
	var pos=TcFrame.getMousePos(event);
	TcFrame.MousePositionLast[0]=TcFrame.MousePosition[0];
	TcFrame.MousePositionLast[1]=TcFrame.MousePosition[1];
	TcFrame.MousePosition[0]=pos[0];
	TcFrame.MousePosition[1]=pos[1];
	TcFrame.Drag.mouseMove();
	TcFrame.Boot.dispatch('onMouseMove',{target:TcFrame.Boot});
}
TcFrame.MouseDownHandle=function(event){//系统鼠标按下
	var pos=TcFrame.getMousePos(event);
	TcFrame.MouseDownPosition[0]=pos[0];
	TcFrame.MouseDownPosition[1]=pos[1];
	TcFrame.MousePositionLast[0]=pos[0];
	TcFrame.MousePositionLast[1]=pos[1];
	TcFrame.MouseDown=true;
	TcFrame.Drag.mouseDown();
	TcFrame.Boot.dispatch('onMouseDown',{target:TcFrame.Boot});
}
TcFrame.MouseUpHandle=function(event){
	TcFrame.MouseDown=false;
	TcFrame.Cursor('default');
	TcFrame.Drag.mouseUp();
	TcFrame.Boot.dispatch('onMouseUp',{target:TcFrame.Boot});
}