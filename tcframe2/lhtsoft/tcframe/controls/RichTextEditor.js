var TcFrame=TcFrame||{};
TcFrame.RichTextEditor=function(param){
	this.initializate(param);
	
	this.iframebox=new TcFrame.UIComponent();
	this.iframebox.parent=this;
	this.iframebox.setStyle('overflowY','scroll');
	this.toolbox=new TcFrame.Canvas();
	this.toolbox.setStyles(TcFrame.Skin['TcFrame.RichTextEditor']['toolbox']);
	this.toolbox.parent=this;
	this.iframe=document.createElement("iframe");
	this.iframe.style.cssText="position:absolute;background-color:#FFF;left:0px;border:0px;";
	this.iframe.scrolling='no';
	this.iframe.src="about:blank";
	this.iframe.parent=this;
	this.iframebox.content.appendChild(this.iframe);
	this.content.appendChild(this.iframebox.content);
	this.content.appendChild(this.toolbox.content);
	this.timer=new TcFrame.Timer({func:this.autoFixHeight});
	this.timer.parent=this;
	this.autoHiddenFieldArr=[];
	this.setupEditor(this);
	
	var config=[
		["Button","true","Undo",3,3],
		["Button","true","Redo",3,2],
		["DropDownList","get","FormatBlock",[{id:"<h1>",label:"H1"},{id:"<h2>",label:"H2"},{id:"<h3>",label:"H3"},{id:"<h4>",label:"H4"},{id:"<h5>",label:"H5"},{id:"<h6>",label:"H6"}],50],
		["DropDownList","get","FontSize",[{id:"7",label:TcFrame.Language['size1']},{id:"6",label:TcFrame.Language['size2']},{id:"5",label:TcFrame.Language['size3']},{id:"4",label:TcFrame.Language['size4']},{id:"3",label:TcFrame.Language['size5']},{id:"2",label:TcFrame.Language['size6']},{id:"1",label:TcFrame.Language['size7']}],50],
		["DropDownList","get","FontName",[{id:"Arial",label:"Arial"},{id:"Times New Roman",label:"TR Roman"},{id:"Verdana",label:"Verdana"},{id:TcFrame.Language['font1'],label:TcFrame.Language['font1']},{id:TcFrame.Language['font2'],label:TcFrame.Language['font2']},{id:TcFrame.Language['font3'],label:TcFrame.Language['font3']},{id:TcFrame.Language['font4'],label:TcFrame.Language['font4']},{id:TcFrame.Language['font5'],label:TcFrame.Language['font5']},{id:TcFrame.Language['font6'],label:TcFrame.Language['font6']}],90],
		["Button","true","Bold",3,3],
		["Button","true","Italic",3,3],
		["Button","true","Underline",3,3],
		["Button","true","StrikeThrough",3,3],
		["ColorPicker","get","ForeColor",3,3],
		["ColorPicker","get","BackColor",3,3],
		["Button","true","SuperScript",3,1],
		["Button","true","SubScript",3,2],
		["Button","true","JustifyLeft",3,2],
		["Button","true","JustifyCenter",3,2],
		["Button","true","JustifyRight",3,2],
		["Button","true","Indent",3,2],
		["Button","true","Outdent",3,2],
		["Button","true","InsertUnorderedList",3,2],
		["Button","true","InsertOrderedList",3,2],
		["Button","ask","InsertImage",3,3],
		["Button","true","InsertHorizontalRule",3,3],
		["Button","ask","CreateLink",3,3],
		["Button","true","Unlink",3,3],
		["Button","true","RemoveFormat",3,3]
	];
	for(var n=0;n<config.length;n++){
		if(config[n][0]=="Button"){
			var btn=new TcFrame.Button({width:20,height:20,showBorder:false});
			var img="<img style='position:absolute;left:"+config[n][3]+"px;top:"+config[n][4]+"px;width:15px;height:15px' src='"+TcFrame.Skin['Image']['RichTextEditor'][config[n][2]]+"'/>";
			btn.content.innerHTML=img;	
			btn.getdatatype=config[n][1];
			btn.commandtype=config[n][2];
			btn.addEventListener("onClick",this.command);
			this.toolbox.add(btn);
		}else if(config[n][0]=="DropDownList"){
			var dropdownlist=new TcFrame.DropDownList({width:config[n][4],height:22});
			dropdownlist.getdatatype=config[n][1];
			dropdownlist.commandtype=config[n][2];
			dropdownlist.dataProvider(config[n][3]);
			dropdownlist.addEventListener("onChange",this.command);
			dropdownlist.addEventListener("onClick",this.command);
			this.toolbox.add(dropdownlist);
			this.autoHiddenFieldArr.push(dropdownlist);
		}else if(config[n][0]=="ColorPicker"){
			var cp=new TcFrame.ColorPicker({width:20,height:20});
			var img="<img style='position:absolute;left:"+config[n][3]+"px;top:"+config[n][4]+"px;width:15px;height:15px' src='"+TcFrame.Skin['Image']['RichTextEditor'][config[n][2]]+"'/>";
			cp.content.innerHTML=img;
			cp.content.style.backgroundColor="";
			cp.getdatatype=config[n][1];
			cp.commandtype=config[n][2];
			cp.addEventListener("onChange",this.command);
			this.toolbox.add(cp);
			this.autoHiddenFieldArr.push(cp);
		}
	}	
	this.iframebox.addEventListener('onMouseOut',function(event){
		var rte=event.target.parent;
		rte.selection=rte.getSelection();
	});
	this.iframebox.addEventListener('onMouseOver',function(event){
		var rte=event.target.parent;
		for(var n=0;n<rte.autoHiddenFieldArr.length;n++){rte.autoHiddenFieldArr[n].hiddenField();}
	});
}

TcFrame.RichTextEditor.prototype=new TcFrame.UIComponent();
TcFrame.RichTextEditor.prototype.type="TcFrame.RichTextEditor";
TcFrame.RichTextEditor.prototype.iframeBox=null;
TcFrame.RichTextEditor.prototype.iframe=null;
TcFrame.RichTextEditor.prototype.toolbox=null;
TcFrame.RichTextEditor.prototype.editor=null;
TcFrame.RichTextEditor.prototype.timer=null;
TcFrame.RichTextEditor.prototype.selection=null;
TcFrame.RichTextEditor.prototype.autoHiddenFieldArr=null;

TcFrame.RichTextEditor.prototype.setHTML=function(str){
	if(!this.editor){return;}
	if(TcFrame.RunInIE){str="<div>"+str+"</div>";}
	this.editor.body.innerHTML=str;
}
TcFrame.RichTextEditor.prototype.getHTML=function(){
	if(!this.editor){return null;}	
	return this.editor.body.innerHTML;
}
TcFrame.RichTextEditor.prototype.getText=function(){
	if(!this.editor){return null;}	
	var rstr="";
	var inbox=false;
	var str=this.editor.body.innerHTML;	
	for(var n=0;n<str.length;n++){
		var c=str.charAt(n);
		if(c=="<"&&!inbox){inbox=true;continue;}
		if(c==">"&&inbox){inbox=false;continue;}
		if(inbox){continue;}
		rstr+=c;	
	}
	return rstr;
}
TcFrame.RichTextEditor.prototype.htmlLength=function(){
	if(!this.editor){return 0;}
	var str=this.editor.body.innerHTML;	
	return str.length;
}
TcFrame.RichTextEditor.prototype.textLength=function(){
	if(!this.editor){return 0;}	
	var rstr=0;
	var inbox=false;
	var str=this.editor.body.innerHTML;	
	for(var n=0;n<str.length;n++){
		var c=str.charAt(n);
		if(c=="<"&&!inbox){inbox=true;continue;}
		if(c==">"&&inbox){inbox=false;continue;}
		if(inbox){continue;}
		rstr++;	
	}
	return rstr;
}
TcFrame.RichTextEditor.prototype.command=function(event){
	var rte=event.target.parent.parent;
	if(event.target.getdatatype=="true"){
		rte.format(rte.selection,event.target.commandtype,[true]);	
	}else if(event.target.getdatatype=="get"){
		if(event.target.type=="TcFrame.DropDownList"){
			rte.format(rte.selection,event.target.commandtype,[event.target.currentSelected.id]);	
		}else if(event.target.type=="TcFrame.ColorPicker"){
			rte.format(rte.selection,event.target.commandtype,[event.target.value]);
		}
	}else if(event.target.getdatatype=="ask"){
		if(event.target.commandtype=="InsertImage"){
			function insertimg(url){if(!url){return;};rte.format(rte.selection,"InsertImage",[url]);}
			TcFrame.Alert.prompt({title:TcFrame.Language['alert'],text:TcFrame.Language['picurl'],defaultValue:"http://",func:insertimg});
		}else if(event.target.commandtype=="CreateLink"){
			function insertlink(url){if(!url){return;};rte.format(rte.selection,"CreateLink",[url,'_blank']);}
			TcFrame.Alert.prompt({title:TcFrame.Language['alert'],text:TcFrame.Language['link'],defaultValue:"http://",func:insertlink});
		}
	}
}
TcFrame.RichTextEditor.prototype.format=function(rang,type,valueArr){
	rang.execCommand(type,false,valueArr[0]);
	if(type=="CreateLink"){this.getParentNode(rang).target=valueArr[1];}	
	if(TcFrame.RunInIE){this.selection.select();}
}
TcFrame.RichTextEditor.prototype.getParentNode=function(rang){
	if(!rang){return null}
	parent=null;
	if(TcFrame.RunInIE){
		parent=rang.parentElement();
	}else{
		parent=this.iframe.contentWindow.getSelection().getRangeAt(0).commonAncestorContainer.parentNode;
	}	
	return parent
}
TcFrame.RichTextEditor.prototype.getSelection=function(){
	rang=null;
	if(TcFrame.RunInIE){
		rang=this.editor.selection.createRange();
	}else{
		rang=this.editor;
	}
	return rang 
}
TcFrame.RichTextEditor.prototype.setupEditor=function(target){
	try{
		this.editor=TcFrame.RunInIE ? this.iframe.contentWindow.document : this.iframe.contentDocument;
	}catch(e){
		setTimeout(function(){target.setupEditor(target)},100);return;
	}
	if(this.editor==null){setTimeout(function(){target.setupEditor(target)},100);return;}
	this.editor.open();
	this.editor.write('<html><body style="margin:0px;font-size:14px;word-wrap:break-word;">'+(TcFrame.RunInIE?"<div></div>":"")+'</body></html>');
	this.editor.close();
	this.editor.contentEditable=true;
	this.editor.designMode="on";
	this.editor.parent=this;
	this.timer.start();
}
TcFrame.RichTextEditor.prototype.autoFixHeight=function(event){
	var rte=event.target.parent;
	if(!rte.editor){return;}
	var height=rte.editor.body.scrollHeight,dh=0;
	if(!height||Math.abs(height-rte.iframe.height)<20){return;}
	if(height<rte.iframe.height){
		rte.iframe.height=rte.iframe.height;
		rte.iframe.style.height=rte.iframe.height+"px";
	}else{
		dh=height-rte.iframe.height
		rte.iframe.height=height;
		rte.iframe.style.height=height+"px";
		rte.iframebox.content.scrollTop+=dh;
	}
}
TcFrame.RichTextEditor.prototype.resize=function(){
	this.calcBorder();
	this.render();
	this.toolbox.left=0;
	this.toolbox.right=0;
	this.toolbox.top=-2;
	var usedY=0;
	var usedX=0;
	for(var n=0;n<this.toolbox.children.length;n++){
		if(usedX+this.toolbox.children[n].width>this.width){usedX=0;usedY+=this.toolbox.children[n].height+2;}
		this.toolbox.children[n].x=usedX;this.toolbox.children[n].y=usedY+2;
		usedX+=this.toolbox.children[n].width+2;
	}
	usedY+=this.toolbox.children[0].height+5;
	this.toolbox.height=usedY;
	this.toolbox.resize();
	this.iframebox.left=0;
	this.iframebox.right=0;
	this.iframebox.bottom=0;
	this.iframebox.top=this.toolbox.height-2;
	this.iframebox.resize();
	this.iframe.style.width=this.iframebox.width-18+"px";
	this.iframe.style.height=this.iframebox.height+"px";
	this.iframe.height=this.iframebox.height;
	this.dispatch('onResize',{target:this});
}