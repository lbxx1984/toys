var TcFrame=TcFrame||{};
TcFrame.ColumnChart=function(param){
	this.initializate(param);
	this.coordinatePaperSetup(param);
}
TcFrame.ColumnChart.prototype=new TcFrame.CoordinatePaper();
TcFrame.ColumnChart.prototype.type="TcFrame.ColumnChart";
TcFrame.ColumnChart.prototype.dataProvider=function(data){
	if(!data||!data.column||!data.row||!data.column.length||!data.row.length||!this.enable){return;}	
	if(TcFrame.IEVersion<9){
		var _this=this;
		if(!_this.stage2d.swf){
			setTimeout(function(){_this.dataProvider(data);},200);
			return;	
		}
	}
	this.stage2d.removeAll();
	this.addInstructions(data.column);
	var column=data.column.length;
	var widthCell=parseInt(this.stage2d.width/data.row.length);
	var widthColumn=parseInt((widthCell-20)/column);
	var labels=[];
	for(var n=0;n<data.row.length;n++){
		var arr=data.row[n].data;
		for(var m=0;m<arr.length;m++){
			var y=this.valueToCoordinate([null,arr[m]])[1];	
			var x=n*widthCell+10+widthColumn*m;
			this.stage2d.Rectangle({fillStyle:data.column[m].color,x:x,y:y,width:widthColumn,height:this.stage2d.height-y});
			if(m!=0){continue;}
			labels.push({text:data.row[n].text,width:data.row[n].width,height:data.row[n].height,y:0,x:x});	
		}
	}
	this.setAxisLabel(labels,'x');
}