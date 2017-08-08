var TcFrame=TcFrame||{};
TcFrame.BubbleChart=function(param){
	this.initializate(param);
	this.coordinatePaperSetup(param);
}
TcFrame.BubbleChart.prototype=new TcFrame.CoordinatePaper();
TcFrame.BubbleChart.prototype.type="TcFrame.BubbleChart";
TcFrame.BubbleChart.prototype.dataProvider=function(arr){
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
		var pos=this.valueToCoordinate([arr[n].x,arr[n].y]);	
		labelArr.push({text:arr[n].label,color:arr[n].color});
		this.stage2d.Circle({x:pos[0],y:pos[1],fillStyle:arr[n].color,stroke:false,radius:arr[n].radius});
	}
	this.addInstructions(labelArr);
}