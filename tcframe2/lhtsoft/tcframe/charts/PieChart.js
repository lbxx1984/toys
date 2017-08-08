var TcFrame=TcFrame||{};
TcFrame.PieChart=function(param){
	this.initializate(param);
	this.RingPaperSetup(param);
	if(param){
		if(param.radius!=null){this.radius=param.radius}	
	}
}
TcFrame.PieChart.prototype=new TcFrame.RingPaper();
TcFrame.PieChart.prototype.type="TcFrame.PieChart";
TcFrame.PieChart.prototype.title="Charts";
TcFrame.PieChart.prototype.stage2d=null;
TcFrame.PieChart.prototype.instructionBar=null;
TcFrame.PieChart.prototype.titleBar=null;
TcFrame.PieChart.prototype.radius=100;
TcFrame.PieChart.prototype.dataProvider=function(arr){
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
		arr[n].outsideDiameter=this.radius;
		arr[n].stroke=false;
		arr[n].startAngle=begin;
		arr[n].endAngle=begin+Math.PI*arr[n].value*2;
		begin=arr[n].endAngle
		this.DrawRing(arr[n]);
	}
}


