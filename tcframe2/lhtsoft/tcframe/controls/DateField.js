var TcFrame=TcFrame||{};
TcFrame.DateField=function(param){
	this.initializate(param);
	if(param&&param.value!=null&&typeof(param.value)=="object"&&param.value.getFullYear){this.value=param.value;}else{this.value=new Date();}
	this.itemArr=[];
	this.date=new Date();
	this.weekLabel=[TcFrame.Language['Sun'],TcFrame.Language['Mon'],TcFrame.Language['Tue'],TcFrame.Language['Wed'],TcFrame.Language['Thu'],TcFrame.Language['Fri'],TcFrame.Language['Sat']];
	this.setup(param);
	this.timer=new TcFrame.Timer({delay:100,func:this.changeMonth});
	this.timer.parent=this;
	
	this.fresh(this.value);
}
TcFrame.DateField.prototype=new TcFrame.Canvas();
TcFrame.DateField.prototype.type="TcFrame.DateField";
TcFrame.DateField.prototype.proMonth=null;
TcFrame.DateField.prototype.nextMonth=null;
TcFrame.DateField.prototype.inputYear=null;
TcFrame.DateField.prototype.inputMonth=null;
TcFrame.DateField.prototype.weekLabel=null;
TcFrame.DateField.prototype.itemArr=null;
TcFrame.DateField.prototype.date=null;
TcFrame.DateField.prototype.value=null;
TcFrame.DateField.prototype.timer=null;
TcFrame.DateField.prototype.setValue=function(date){
	if(!date||!date.getFullYear){return;}
	this.value=date;
	this.fresh(this.value);	
	this.inputYear.setValue(date.getFullYear());
	this.inputMonth.setValue(date.getMonth()+1);
}
TcFrame.DateField.prototype.changeMonthDirection=true;
TcFrame.DateField.prototype.changeMonth=function(event){
	var df=event.target.parent;
	var mon=df.date.getMonth();
	if(df.changeMonthDirection){df.date.setMonth(mon+1);}else{df.date.setMonth(mon-1);}
	df.fresh(df.date);
	df.inputYear.setValue(df.date.getFullYear());
	df.inputMonth.setValue(df.date.getMonth()+1);
}
TcFrame.DateField.prototype.fresh=function(date){
	var year=date.getFullYear();	//当前年
	var mon=date.getMonth();		//当前月
	var tmp=new Date();tmp.setFullYear(year,mon,1);
	var xq=tmp.getDay();			//当前月的1号是星期几
	var day=1;						//当前天(扫描指针)	
	//向前推看表格第一单元是几号
	while(xq>0){day--;xq--;}
	//刷整个表
	for(var y=0;y<6;y++){
		for(var x=0;x<7;x++){	
			var calc=new Date();
			calc.setFullYear(year,mon,day);
			this.itemArr[y][x].setLabel(calc.getDate());
			this.itemArr[y][x].date=calc;
			if(calc.getMonth()!=mon){
				this.itemArr[y][x].setStyles(TcFrame.Skin[this.type]["dayDifferentMonthNormal"]);
			}else{
				this.itemArr[y][x].setStyles(TcFrame.Skin[this.type]["dayNormal"]);
			}
			var now=new Date();
			if(calc.getDate()==now.getDate()&&calc.getFullYear()==now.getFullYear()&&calc.getMonth()==now.getMonth()){
				this.itemArr[y][x].setStyles(TcFrame.Skin[this.type]["dayActive"]);
			}
			day++;
		}
	}
}
TcFrame.DateField.prototype.setup=function(param){
	//顶部输入框
	this.proMonth=new TcFrame.Button({left:0,top:0,height:25,width:12,label:TcFrame.Language['rightpoint'],showBorder:false});	
	this.nextMonth=new TcFrame.Button({right:1,top:0,height:25,width:12,label:TcFrame.Language['leftpoint'],showBorder:false});
	this.inputYear=new TcFrame.Number({width:35,height:20,top:3,left:60,showBtn:false,max:2999,min:1900});
	this.inputYear.setValue(new Date().getFullYear());	
	
	this.inputMonth=new TcFrame.Number({width:35,height:20,top:3,left:100,showBtn:false,max:12,min:1});
	this.inputMonth.setValue(new Date().getMonth()+1);	

	this.add(this.proMonth);
	this.add(this.nextMonth);
	this.add(this.inputYear);
	this.add(this.inputMonth);
	//星期标签
	for(var x=0;x<7;x++){
		var label=new TcFrame.Label({text:this.weekLabel[x],width:28,height:20,x:x*28+1,y:27});	
		label.setStyles(TcFrame.Skin[this.type]['weekLabel']);
		this.add(label);
	}
	//日期标签网格
	for(var y=0;y<6;y++){
		var arr=[];
		for(var x=0;x<7;x++){	
			var item=new TcFrame.Label({text:x+y*7+1,width:28,height:20,x:x*28+1,y:47+20*y});
			item.setStyles(TcFrame.Skin[this.type]['weekLabel']);
			this.add(item);
			arr.push(item);
			item.addEventListener('onClick',function(event){
				event.target.parent.value=event.target.date;
				event.target.parent.dispatch('onChange',{target:event.target.parent});
			});
			item.addEventListener('onMouseOver',function(event){event.target.setStyles(TcFrame.Skin['TcFrame.DateField']['dayMouseOver']);});
			item.addEventListener('onMouseOut',function(event){
				if(event.target.date.getMonth()!=event.target.parent.date.getMonth()){
					event.target.setStyles(TcFrame.Skin['TcFrame.DateField']["dayDifferentMonthNormal"]);
				}else{
					event.target.setStyles(TcFrame.Skin['TcFrame.DateField']["dayNormal"]);
				}
				var now=new Date();
				if(	event.target.date.getDate()==now.getDate()&&
					event.target.date.getFullYear()==now.getFullYear()&&
					event.target.date.getMonth()==now.getMonth()
				){
					event.target.setStyles(TcFrame.Skin['TcFrame.DateField']["dayActive"]);
				}
			});
		}
		this.itemArr.push(arr);
	}
	//挂接事件
	this.proMonth.addEventListener('onMouseDown',function(event){
		event.target.parent.changeMonthDirection=false;
		event.target.parent.timer.start();
	});
	this.proMonth.addEventListener('onMouseOut',function(event){
		event.target.parent.timer.stop();
	});
	this.proMonth.addEventListener('onMouseUp',function(event){
		event.target.parent.timer.stop();
	});
	this.proMonth.addEventListener('onClick',function(event){
		event.target.parent.changeMonthDirection=false;
		event.target.parent.changeMonth({target:event.target});
	});
	this.nextMonth.addEventListener('onMouseDown',function(event){
		event.target.parent.changeMonthDirection=true;
		event.target.parent.timer.start();
	});
	this.nextMonth.addEventListener('onMouseOut',function(event){
		event.target.parent.timer.stop();
	});
	this.nextMonth.addEventListener('onMouseUp',function(event){
		event.target.parent.timer.stop();
	});
	this.nextMonth.addEventListener('onClick',function(event){
		event.target.parent.changeMonthDirection=true;
		event.target.parent.changeMonth({target:event.target});
	});
	this.inputYear.addEventListener('onChange',function(event){
		var df=event.target.parent;
		if(!event.target.value){return}
		df.date.setFullYear(event.target.value);
		df.fresh(df.date);
	});
	this.inputMonth.addEventListener('onChange',function(event){
		var df=event.target.parent;
		if(!event.target.value){return}
		df.date.setMonth(event.target.value-1);
		df.fresh(df.date);
	});
}
TcFrame.DateField.prototype.resize=function(){
	this.width=200;this.height=170;
	this.right=null;this.bottom=null;
	this.calcBorder();
	this.render();
	for(var n=0;n<this.children.length;n++){this.children[n].resize();}
}