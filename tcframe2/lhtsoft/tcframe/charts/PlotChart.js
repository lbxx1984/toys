var TcFrame=TcFrame||{};
TcFrame.PlotChart=function(param){
	this.initializate(param);
	this.coordinatePaperSetup(param);
}
TcFrame.PlotChart.prototype=new TcFrame.CoordinatePaper();
TcFrame.PlotChart.prototype.type="TcFrame.PlotChart";
TcFrame.PlotChart.prototype.dataProvider=function(arr){
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
		var data=arr[n].data;
		if(!data||!data.length){continue;}
		labelArr.push({text:arr[n].label,color:arr[n].color});
		for(var m=0;m<data.length;m++){
			var pos=this.valueToCoordinate(data[m]);
			if(arr[n].type=="circle"){
				this.stage2d.Circle({x:pos[0],y:pos[1],fillStyle:arr[n].color,stroke:false,radius:3});	
			}else{
				this.stage2d.Rectangle({x:pos[0]-3,y:pos[1]-3,width:6,height:6,fillStyle:arr[n].color,stroke:false});	
			}
		}	
	}
	this.addInstructions(labelArr);
}