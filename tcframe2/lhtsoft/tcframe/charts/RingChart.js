var TcFrame=TcFrame||{};
TcFrame.RingChart=function(param){
	this.initializate(param);
	this.RingPaperSetup(param);
	if(param){
		if(param.outSideRadius!=null){this.outSideRadius=param.outSideRadius}	
		if(param.internalRadius!=null){this.internalRadius=param.internalRadius}	
	}
}
TcFrame.RingChart.prototype=new TcFrame.RingPaper();
TcFrame.RingChart.prototype.type="TcFrame.RingChart";
TcFrame.RingChart.prototype.title="Charts";
TcFrame.RingChart.prototype.stage2d=null;
TcFrame.RingChart.prototype.instructionBar=null;
TcFrame.RingChart.prototype.titleBar=null;
TcFrame.RingChart.prototype.outSideRadius=100;
TcFrame.RingChart.prototype.internalRadius=20;
TcFrame.RingChart.prototype.dataProvider=function(arr){
	if(!arr||!arr.length||!this.enable){return;}
	if(TcFrame.IEVersion<9){
		var _this=this;
		if(!_this.stage2d.swf){
			setTimeout(function(){_this.dataProvider(arr);},200);
			return;	
		}	
	}
	this.stage2d.removeAll();
	var begin=0;
	for(var n=0;n<arr.length;n++){
		arr[n].fillStyle=arr[n].color;
		arr[n].internalDiameter=0;
		arr[n].outsideDiameter=this.outSideRadius;
		arr[n].internalDiameter=this.internalRadius;
		arr[n].stroke=false;
		arr[n].startAngle=begin;
		arr[n].endAngle=begin+Math.PI*arr[n].value*2;
		begin=arr[n].endAngle
		this.DrawRing(arr[n]);
	}
}

