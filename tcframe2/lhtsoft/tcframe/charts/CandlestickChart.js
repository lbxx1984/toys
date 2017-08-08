var TcFrame=TcFrame||{};
TcFrame.CandlestickChart=function(param){
	this.initializate(param);
	this.coordinatePaperSetup(param);
}
TcFrame.CandlestickChart.prototype=new TcFrame.CoordinatePaper();
TcFrame.CandlestickChart.prototype.type="TcFrame.CandlestickChart";
TcFrame.CandlestickChart.prototype.dataProvider=function(arr){
	if(!arr||!arr.length||!this.enable){return;}
	if(TcFrame.IEVersion<9){
		var _this=this;
		if(!_this.stage2d.swf){
			setTimeout(function(){_this.dataProvider(arr);},200);
			return;	
		}	
	}
	this.stage2d.removeAll();
	for(var n=0;n<arr.length;n++){
		var obj=arr[n];
		obj.begin=this.valueToCoordinate([null,obj.begin])[1];
		obj.end=this.valueToCoordinate([null,obj.end])[1];
		obj.top=this.valueToCoordinate([null,obj.top])[1];
		obj.bottom=this.valueToCoordinate([null,obj.bottom])[1];
		this.stage2d.Candlestick(obj);	
	}
}