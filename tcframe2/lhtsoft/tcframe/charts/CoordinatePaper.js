var TcFrame=TcFrame||{};
TcFrame.CoordinatePaper=function(param){
	this.initializate(param);
	this.coordinatePaperSetup(param);
}
TcFrame.CoordinatePaper.prototype=new TcFrame.Canvas();
TcFrame.CoordinatePaper.prototype.type="TcFrame.CoordinatePaper";
TcFrame.CoordinatePaper.prototype.title="Charts";
TcFrame.CoordinatePaper.prototype.backgroundMeshShow=false;
TcFrame.CoordinatePaper.prototype.backgroundBigMeshShow=false;
TcFrame.CoordinatePaper.prototype.unitOfx="number";				//number,day,hour,minute,second;
TcFrame.CoordinatePaper.prototype.unitOfy="number";				//number,day,hour,minute,second;
TcFrame.CoordinatePaper.prototype.minX=0;						//X轴起点代表的值
TcFrame.CoordinatePaper.prototype.minY=0;						//Y轴起点代表的值
TcFrame.CoordinatePaper.prototype.minXDate=null;				//X轴起点代表的时间
TcFrame.CoordinatePaper.prototype.minYDate=null;				//X轴起点代表的时间
TcFrame.CoordinatePaper.prototype.valueOfPixX=1;				//X轴每像素代表的值
TcFrame.CoordinatePaper.prototype.valueOfPixY=2;				//Y轴每像素代表的值
TcFrame.CoordinatePaper.prototype.timeOfPixX=0.1;				//X轴每像素代表的时间，单位是unitOfX
TcFrame.CoordinatePaper.prototype.timeOfPixY=0.1;				//X轴每像素代表的时间，单位是unitOfX
TcFrame.CoordinatePaper.prototype.backgroundMeshInterval=10;	//坐标轴默认每个单元格多少像素
TcFrame.CoordinatePaper.prototype.autoFillAxisX=false;			//是否自动填充X坐标轴说明
TcFrame.CoordinatePaper.prototype.autoFillAxisY=false;			//是否自动填充Y坐标轴说明
TcFrame.CoordinatePaper.prototype.stage2d=null;
TcFrame.CoordinatePaper.prototype.instructionBar=null;
TcFrame.CoordinatePaper.prototype.commentBar=null;
TcFrame.CoordinatePaper.prototype.titleBar=null;
TcFrame.CoordinatePaper.prototype.axisXBar=null;
TcFrame.CoordinatePaper.prototype.axisYBar=null;
TcFrame.CoordinatePaper.prototype.enable=true;

TcFrame.CoordinatePaper.prototype.coordinatePaperSetup=function(param){
	if(TcFrame.IEVersion<9){
		//this.content.appendChild(TcFrame.Warning(TcFrame.Language['warningHTML']));	
		//this.enable=false;
		//return;
	}
	if(param){
		if(param.backgroundMeshShow!=null){this.backgroundMeshShow=param.backgroundMeshShow;}
		if(param.backgroundBigMeshShow!=null){this.backgroundBigMeshShow=param.backgroundBigMeshShow;}
		if(param.backgroundMeshInterval!=null){this.backgroundMeshInterval=param.backgroundMeshInterval;}
		if(param.title!=null){this.title=param.title;}
		if(param.autoFillAxisX!=null){this.autoFillAxisX=param.autoFillAxisX;}
		if(param.autoFillAxisY!=null){this.autoFillAxisY=param.autoFillAxisY;}
		if(param.unitOfx!=null){this.unitOfx=param.unitOfx;}
		if(param.unitOfy!=null){this.unitOfy=param.unitOfy;}
		if(param.minX!=null){this.minX=param.minX;}
		if(param.minY!=null){this.minY=param.minY;}
		if(param.minXDate!=null){this.minXDate=param.minXDate;}else{this.minXDate=new Date();}
		if(param.minYDate!=null){this.minYDate=param.minYDate;}else{this.minYDate=new Date();}
		if(param.valueOfPixX!=null){this.valueOfPixX=param.valueOfPixX;}
		if(param.valueOfPixY!=null){this.valueOfPixY=param.valueOfPixY;}
		if(param.timeOfPixX!=null){this.timeOfPixX=param.timeOfPixX;}
		if(param.timeOfPixY!=null){this.timeOfPixY=param.timeOfPixY;}
	}else{
		this.minXDate=new Date();this.minYDate=new Date();
	}
	this.stage2d=new TcFrame.Stage2D({
		left:40,right:160,top:30,bottom:30,
		backgroundMeshShow:this.backgroundMeshShow,
		backgroundBigMeshShow:this.backgroundBigMeshShow,
		backgroundMeshInterval:this.backgroundMeshInterval	
	});
	this.stage2d.setStyles({'borderLeft':'1px solid #333','borderBottom':'1px solid #333'});
	this.titleBar=new TcFrame.Label({text:this.title,top:5,left:0,right:0,height:25,align:"center"});
	this.titleBar.setStyles({'fontWeight':"bold",'fontSize':"14px"});
	this.instructionBar=new TcFrame.Group({display:"vertical",right:5,top:30,width:150,bottom:110,padding:2,interval:0});
	this.commentBar=new TcFrame.Group({display:"vertical",right:5,bottom:30,width:150,height:70,padding:6,interval:0});
	this.axisXBar=new TcFrame.Canvas({left:20,right:10,height:20,bottom:2});
	this.axisYBar=new TcFrame.Canvas({top:7,left:2,width:30,bottom:20});
	this.axisYBar.setStyle('backgroundColor','');
	this.axisXBar.setStyle('backgroundColor','');
	this.axisXBar.setStyle('overflow','hidden');
	this.axisYBar.setStyle('overflow','hidden');
	this.commentBar.setStyle('border','1px solid #c2c2c2');
	this.instructionBar.setStyle('border','1px solid #c2c2c2');
	this.add(this.stage2d);
	this.add(this.instructionBar);
	this.add(this.commentBar);
	this.add(this.titleBar);
	this.add(this.axisXBar);
	this.add(this.axisYBar);
	if(param&&param.comments&&param.comments.length){this.addComments(param.comments);}
	this.autoSetAxisLabel();
}
TcFrame.CoordinatePaper.prototype.valueToCoordinate=function(arr){
	if(!arr||!arr.length||!arr.length==2){return null;}
	function trans(value,type,minValue,minDate,valueOfPix,timeOfPix){
		var x=-1
		switch(type){
			case "day":
				x=(value.getTime()-minDate.getTime())/(timeOfPix*24*60*60*1000);break;
			case "hour":
				x=(value.getTime()-minDate.getTime())/(timeOfPix*60*60*1000);break;
			case "minute":
				x=(value.getTime()-minDate.getTime())/(timeOfPix*60*1000);break;
			case "second":
				x=(value.getTime()-minDate.getTime())/(timeOfPix*1000);break;
			default:
				x=(value-minValue)/valueOfPix;break;
		}
		return x;
	}
	var x=(arr[0]!=null)?trans(arr[0],this.unitOfx,this.minX,this.minXDate,this.valueOfPixX,this.timeOfPixX):null;
	var y=(arr[1]!=null)?this.stage2d.height-trans(arr[1],this.unitOfy,this.minY,this.minYDate,this.valueOfPixY,this.timeOfPixY):null;
	return [x,y];
}
TcFrame.CoordinatePaper.prototype.addInstructions=function(arr){
	if(!arr||!arr.length){return;}
	for(var n=0;n<arr.length;n++){
		var box=new TcFrame.Canvas({width:140,height:25});
			box.setStyle('overflow','hidden')
		var line=new TcFrame.UIComponent({width:30,height:5,y:10,x:5});
		var label=new TcFrame.Label({text:arr[n].text||""+n,width:100,x:40,y:0});	
		line.setStyles({'backgroundColor':TcFrame.ColorRGBA2HEX(arr[n].color)||"#000"});
		box.add(line);box.add(label);
		this.instructionBar.add(box);
	}
}
TcFrame.CoordinatePaper.prototype.addComments=function(arr){
	if(!arr||!arr.length){return;}
	for(var n=0;n<arr.length;n++){
		var label=new TcFrame.Label({text:arr[n],width:120,height:20});	
		this.commentBar.add(label);
	}
}
TcFrame.CoordinatePaper.prototype.setAxisLabel=function(arr,type){
	if(!arr||!arr.length){return}
	for(var n=0;n<arr.length;n++){
		var label=new TcFrame.Label({text:arr[n].text,y:arr[n].y,x:arr[n].x,width:arr[n].width,height:arr[n].height,align:"center"});	
		label.setStyle('overflow',"hidden");
		if(type=="x"){this.axisXBar.add(label);}else{this.axisYBar.add(label);}
	}
}
TcFrame.CoordinatePaper.prototype.autoSetAxisLabel=function(){
	this.axisXBar.removeAll();
	this.axisYBar.removeAll();
	var positionX=0,positionY=this.axisYBar.height-20;
	var valueX=this.minX,valueY=this.minY;
	var timeX=new Date(),timeY=new Date();
	timeX.setTime(this.minXDate.getTime());
	timeY.setTime(this.minYDate.getTime());
	function getLabel(type,value,time,step1,step2){
		var str="";
		switch(type){
			case "day":
				str+=time.getMonth()+1+"/"+time.getDate();
				time.setDate(time.getDate()+step2);
				break;
			case "hour":
				if(time.getHours()<10){str+="0"}
				str+=time.getHours()+"h";
				time.setHours(time.getHours()+step2);
				break;
			case "minute":
				if(time.getHours()<10){str+="0"}
				str+=time.getHours()+":"
				if(time.getMinutes()<10){str+="0"}
				str+=time.getMinutes();
				time.setMinutes(time.getMinutes()+step2);
				break;
			case "second":
				if(time.getMinutes()<10){str+="0"}
				str+=time.getMinutes()+":"
				if(time.getSeconds()<10){str+="0"}
				str+=time.getSeconds();
				time.setSeconds(time.getSeconds()+step2);
				break;
			default:
				str=value;value+=step1;break;
		}
		return [str,value,time];
	}
	if(this.autoFillAxisX){
		while(positionX<this.stage2d.width){
			var arr=getLabel(
				this.unitOfx,
				valueX,
				timeX,
				this.backgroundMeshInterval*10*this.valueOfPixX,
				this.backgroundMeshInterval*10*this.timeOfPixX
			);
			valueX=arr[1];timeX=arr[2];
			var label=new TcFrame.Label({text:arr[0],x:positionX,width:40,height:20,align:"center"});
			label.setStyle('overflow',"hidden");
			this.axisXBar.add(label);
			positionX+=this.backgroundMeshInterval*10;
		}		
	}
	if(this.autoFillAxisY){
		while(positionY>0){
			var arr=getLabel(
				this.unitOfy,
				valueY,
				timeY,
				this.backgroundMeshInterval*10*this.valueOfPixY,
				this.backgroundMeshInterval*10*this.timeOfPixY
			);
			valueY=arr[1];timeY=arr[2];
			var label=new TcFrame.Label({text:arr[0],y:positionY,width:30,height:20,align:"right"});
			label.setStyle('overflow',"hidden");this.axisYBar.add(label);
			positionY-=this.backgroundMeshInterval*10;
		}
	}
}


