var TcFrame=TcFrame||{};
TcFrame.ShortConnection=function(){this.loadEvents();}
TcFrame.ShortConnection.prototype=new TcFrame.Event();
TcFrame.ShortConnection.prototype.type="TcFrame.ShortConnection";
TcFrame.ShortConnection.prototype.xmlHttp=function(){
	var xmlHttp=null;
	try{
 		xmlHttp=new XMLHttpRequest();
	}catch(e){
 		try{
 			xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
  		}catch(e){
  			xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
  		}
 	}
	return xmlHttp;
}
TcFrame.ShortConnection.prototype.get=function(param){
	if(!param||!param.url||!param.data||!param.readyFunc){return;}
	var url=param.url;
	var data=param.data;
	var readyFunc=param.readyFunc;
	var xmlHttp=this.xmlHttp();
	var connector=this;
	if(!xmlHttp){this.dispatch('onError',{type:'XMLHTTP:NULL'});return;}
	//写GET链接
	var queryString = url+"?";
	for(var key in data){queryString+=key+"="+data[key]+"&";}
	queryString=queryString.substr(0,queryString.length-1);
	//设置回调函数
  	xmlHttp.onreadystatechange = function(){
		TcFrame.Cursor("default");
		if (xmlHttp.readyState==4||xmlHttp.readyState=="complete"){ 
			if(!xmlHttp.responseText||xmlHttp.responseText.length==0){
				connector.dispatch('onError',{type:'Response:NULL'});return;
			}else{
				if(typeof(readyFunc)=="function"){readyFunc(xmlHttp.responseText);}
			}
		} 	
	};
	TcFrame.Cursor("wait");
    xmlHttp.open("GET",queryString,true);
    xmlHttp.send(null);
}
TcFrame.ShortConnection.prototype.post=function(param){
	if(!param||!param.url||!param.data||!param.readyFunc){return;}
	var url=param.url;
	var data=param.data;
	var readyFunc=param.readyFunc;
	var xmlHttp=this.xmlHttp();
	var connector=this;
	if(!xmlHttp){this.dispatch('onError',{type:'XMLHTTP:NULL'});return;}
	xmlHttp.onreadystatechange = function(){
		TcFrame.Cursor("default");
		if (xmlHttp.readyState==4||xmlHttp.readyState=="complete"){ 
			if(!xmlHttp.responseText||xmlHttp.responseText.length==0){
				connector.dispatch('onError',{type:'Response:NULL'});return;
			}else{
				if(typeof(readyFunc)=="function"){readyFunc(xmlHttp.responseText);}
			}
		} 	
	};
	TcFrame.Cursor("wait");
	xmlHttp.open("POST",url,true);
 	xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlHttp.send(data);
}