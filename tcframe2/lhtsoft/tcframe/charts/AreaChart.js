var TcFrame=TcFrame||{};
TcFrame.AreaChart=function(param){
	this.initializate(param);
	this.coordinatePaperSetup(param);
}
TcFrame.AreaChart.prototype=new TcFrame.CoordinatePaper();
TcFrame.AreaChart.prototype.type="TcFrame.AreaChart";
TcFrame.AreaChart.prototype.dataProvider=function(arr){
	if(!arr||!arr.length||!this.enable){return;}
	if(TcFrame.IEVersion<9){
		var _this=this;
		if(!_this.stage2d.swf){
			setTimeout(function(){_this.dataProvider(arr);},200);
			return;	
		}	
	}
	this.stage2d.removeAll();
	var labelArr=[];
	for(var n=0;n<arr.length;n++){
		var db={fillStyle:arr[n].color,data:[],stroke:false};
		var data=arr[n].data;
		if(!data||!data.length){continue;}
		labelArr.push({text:arr[n].label,color:arr[n].color});
		for(var m=0;m<data.length;m++){
			var pos=this.valueToCoordinate(data[m]);
			if(m==0&&pos[1]!=this.stage2d.height){db.data.push([pos[0],this.stage2d.height]);}
			db.data.push(pos);
			if(m==data.length-1&&pos[1]!=this.stage2d.height){db.data.push([pos[0],this.stage2d.height]);}
		}
		this.stage2d.Polygon(db);
	}
	this.addInstructions(labelArr);
}