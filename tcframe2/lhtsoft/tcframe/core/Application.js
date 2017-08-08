var TcFrame=TcFrame||{};
TcFrame.Application=function(param){
	//已经初始化一次，不再重复
	var container=null;//嵌入的容器
	if(TcFrame.Boot){return TcFrame.Boot;}
	if(param&&param.container){
		container=param.container;
		container.style.position="relative";
		if(param.left){container.style.left=param.left+"px"}
		if(param.width){container.style.width=param.width+"px"}
		if(param.height){container.style.height=param.height+"px"}
		if(param.top){container.style.top=param.top+"px"}		
	}else{
		container=document.body;container.innerHTML="";
		TcFrame.RunInBODY=true;
	}
	//判断浏览器是否满足版本要求
	var bv=TcFrame.BrowserVersion();
	var errorstr='<span style="color:#333;font-weight:bold;">'+TcFrame.Language['waring0']+bv[0]+bv[1]+TcFrame.Language['waring1']+'</span><br><br><br>'+TcFrame.Language['waring2'];
	for(key in TcFrame.SupportedBrowsers){
		errorstr+=key+TcFrame.SupportedBrowsers[key]+",";
		if(key==bv[0]&&bv[1]*1>=TcFrame.SupportedBrowsers[key]){this.enable=true;break;}
	}
	errorstr=errorstr.slice(0,errorstr.length-1);
	//提示不符合条件
	if(!this.enable){
		TcFrame.Boot=null;
		errorstr+=TcFrame.Language['waring3']+'<br><br><br><br><div style="color:#ff0000;font-size:12px;">'+TcFrame.Language['waring4']+'</div><br><div style="font-size:12px;" align="right">2013 LHTSOFT.COM Corporation</div>';
		container.innerHTML="";
		var warning=TcFrame.Warning(errorstr);
		container.appendChild(warning);
		return;
	}
	//初始化系统变量
	if(bv[0]=="IE"){TcFrame.RunInIE=true;TcFrame.IEVersion=bv[1];}
	if(bv[0]=="Firefox"){TcFrame.RunInFF=true;}
	if(container!=document.body){
		this.width=TcFrame.Width=parseInt(container.style.width);
		this.height=TcFrame.Height=parseInt(container.style.height);
	}else{
		if(TcFrame.RunInIE&&TcFrame.IEVersion<9){
			this.width=TcFrame.Width=document.documentElement.offsetWidth;
			this.height=TcFrame.Height=document.documentElement.offsetHeight;
		}else{
			this.width=TcFrame.Width=window.innerWidth;
			this.height=TcFrame.Height=window.innerHeight;
		}
	}
	TcFrame.Boot=this;
	TcFrame.Cursor("default");
	TcFrame.SelectEnable(false);
	//载入滚动条样式
	if(TcFrame.RunInIE){
		container.innerHTML=TcFrame.Skin['TcFrame.ScrollIE'];
	}else if(TcFrame.RunInFF){
		container.innerHTML=TcFrame.Skin['TcFrame.ScrollFireFox'];
	}else{
		container.innerHTML=TcFrame.Skin['TcFrame.ScrollChrome'];
	}
	//初始化容器
	this.content=document.createElement("div");
	this.content.style.cssText="overflow:auto;width:"+TcFrame.Width+"px;height:"+TcFrame.Height+"px;top:0px;left:0px;overflow:hidden;";
	if(TcFrame.RunInBODY){this.content.style.position="absolute"}
	container.appendChild(this.content);
	container.style.overflow="hidden";
	//挂接系统事件
	if(TcFrame.RunInFF){
		window.addEventListener("mousemove",TcFrame.MouseMoveHandle,false);
		window.addEventListener("mousedown",TcFrame.MouseDownHandle,false);
		window.addEventListener("mouseup",TcFrame.MouseUpHandle,false);
	}else{
		this.content.onmousedown=TcFrame.MouseDownHandle;
		this.content.onmousemove=TcFrame.MouseMoveHandle;
		this.content.onmouseup=TcFrame.MouseUpHandle;
	}
	
	function getPos(){//获取container在屏幕中的实际位置，去除滚动条的影响
		var obj=container,l=0,t=0;
		while(1){
			if(!obj.style.left){break;}
			l+=parseInt(obj.style.left);
			t+=parseInt(obj.style.top);
			obj=obj.parentNode;
			if(TcFrame.RunInIE&&TcFrame.IEVersion>8){
				if(!obj){break;}
				l-=obj.scrollLeft;
				t-=obj.scrollTop;
				continue;
			}
			if(obj==document.body){
				var scTop=null,scLeft=null; 
        		if(typeof window.pageYOffset != 'undefined') {
            		scTop = window.pageYOffset;
					scLeft= window.pageXOffset;
				}else if(
					typeof document.compatMode != 'undefined' && 
					document.compatMode != 'BackCompat'&&
					scTop==null
				){ 
            		scTop = document.documentElement.scrollTop;
					scLeft = document.documentElement.scrollLeft;
				} else if (typeof document.body != 'undefined'&&scTop==null) { 
            		scTop = document.body.scrollTop; 
					scLeft = document.body.scrollLeft; 
				}
				l-=scLeft;t-=scTop;
				break;
			}
			if(!obj){break;}
			l-=obj.scrollLeft;
			t-=obj.scrollTop;
		}
		TcFrame.Boot.left=l;TcFrame.Boot.top=t;
	}
	window.onscroll=getPos;
	window.onresize=function(){
		var newWidth=0;
		var newHeight=0;
		if(container!=document.body){
			newWidth=parseInt(container.style.width);
			newHeight=parseInt(container.style.height);
		}else{
			if(TcFrame.RunInIE&&TcFrame.IEVersion<9){
				newWidth=document.documentElement.offsetWidth;
				newHeight=document.documentElement.offsetHeight;
			}else{
				newWidth=window.innerWidth;
				newHeight=window.innerHeight;
			}	
		}
		if(newWidth==TcFrame.Boot.width&&newHeight==TcFrame.Boot.height){return;}
		TcFrame.Boot.width=this.width=newWidth;
		TcFrame.Boot.height=this.height=newHeight;
		TcFrame.Boot.setStyle("width",TcFrame.Boot.width+"px");
		TcFrame.Boot.setStyle("height",TcFrame.Boot.height+"px");
		for(var n=0;n<TcFrame.Boot.children.length;n++){TcFrame.Boot.children[n].resize();}
		TcFrame.Boot.dispatch('onResize',{target:TcFrame.Boot});
	};
	//初始化
	this.children=[];
	this.loadEvents();
	this.setDefaultStyle();
	getPos();
}
TcFrame.Application.prototype=new TcFrame.Event();
TcFrame.Application.prototype.type="TcFrame.Application";
TcFrame.Application.prototype.content=null;
TcFrame.Application.prototype.enable=false;
TcFrame.Application.prototype.width=0;
TcFrame.Application.prototype.height=0;
TcFrame.Application.prototype.left=0;
TcFrame.Application.prototype.right=0;
TcFrame.Application.prototype.children=null;
TcFrame.Application.prototype.setDefaultStyle=function(){
	var skin=TcFrame.Skin[this.type],o=null,p=null;
	if(!skin){return;}
	this.skin=skin;
	for(key in skin){
		o=skin[key];
		if(key=="this"){p=this;}else{p=this[key];}
		if(!p){continue;}
		for(keen in o){p.setStyle(keen,o[keen]);}
	}
}
TcFrame.Application.prototype.setStyle=function(key,value){this.content.style[key]=value;}
TcFrame.Application.prototype.numChildren=function(){return this.children.length;}
TcFrame.Application.prototype.setChildIndex=function(obj,index){
	if(this.children.length==0){return;}
	var cur=-1;
	for(n=0;n<this.children.length;n++){if(this.children[n]==obj){cur=n;break;}}
	if(cur<0||cur==index){return;}
	if(index<0){index=0;}
	if(index>this.children.length-1){index=this.children.length-1;}
	var tmparr=[];
	for(n=0;n<this.children.length;n++){
		if(cur<index){
			if(n<cur||(n>cur&&n<index)||n>index){tmparr.push(this.children[n]);}
			if(n==index){tmparr.push(this.children[index]);tmparr.push(obj);}	
		}else{
			if(n<index||(n>index&&n<cur)||n>cur){tmparr.push(this.children[n]);}
			if(n==index){tmparr.push(obj);tmparr.push(this.children[index]);}
		}
	}
	this.children=tmparr;
	for(n=0;n<this.children.length;n++){this.children[n].setStyle('zIndex',n);}
}
TcFrame.Application.prototype.add=function(child){
	var have=false;
	for(n=0;n<this.children.length;n++){if(this.children[n]==child){have=true;break;}}
	if(have){return;}
	this.children.push(child);
	for(n=0;n<this.children.length;n++){this.children[n].setStyle('zIndex',n);}
	this.content.appendChild(child.content);
	child.parent=this;
	child.calcBorder();
	var o=new TcFrame.Open({target:child});
	o.addEventListener("onComplete",function(event){event.target.target.resize()});
	o.play();
}
TcFrame.Application.prototype.remove=function(child){
	var have=false;
	for(n=0;n<this.children.length;n++){if(this.children[n]==child){have=true;break;}}	
	if(!have){return;}
	this.content.removeChild(child.content);
	var arr=[];
	for(n=0;n<this.children.length;n++){
		if(this.children[n]==child){continue;}	
		arr.push(this.children[n]);
	}
	this.children=arr;
	for(n=0;n<this.children.length;n++){this.children[n].setStyle('zIndex',n);}
}
TcFrame.Application.prototype.removeAll=function(){
	this.content.innerHTML="";
	this.children=[];	
}

