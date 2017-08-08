var TcFrame=TcFrame||{};
TcFrame.LineChart=function(param){
	this.initializate(param);
	this.coordinatePaperSetup(param);
}
TcFrame.LineChart.prototype=new TcFrame.CoordinatePaper();
TcFrame.LineChart.prototype.type="TcFrame.LineChart";
TcFrame.LineChart.prototype.dataProvider=function(arr){
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
		var db={strokeStyle:arr[n].color,data:[],lineWidth:arr[n].lineWidth||1};
		var data=arr[n].data;
		if(!data||!data.length){continue;}
		labelArr.push({text:arr[n].label,color:arr[n].color});
		for(var m=0;m<data.length;m++){db.data.push(this.valueToCoordinate(data[m]));}
		this.stage2d.Line(db);
	}
	this.addInstructions(labelArr);
}