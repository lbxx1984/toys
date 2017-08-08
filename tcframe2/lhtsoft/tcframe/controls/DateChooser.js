var TcFrame=TcFrame||{};
TcFrame.DateChooser=function(param){
	this.initializate(param);
	if(param&&param.datatype!=null){this.datatype=param.datatype;}
	if(param&&param.value!=null&&typeof(param.value)=="object"&&param.value.getFullYear){this.value=param.value;}else{this.value=new Date();}
	//声明组件
	this.input=new TcFrame.TextInput({left:0,top:0,bottom:2,right:25});
	this.input.core.style.textAlign="center";
	this.input.parent=this;
	this.content.appendChild(this.input.content);
	this.button=new TcFrame.ImageButton({src:TcFrame.Skin['Image']['DateChooserNormal'],srcOver:TcFrame.Skin['Image']['DateChooserOver']});
	this.button.parent=this;
	this.content.appendChild(this.button.content);
	this.datefield=new TcFrame.DateField();
	this.datefield.parentDC=this;
	//挂接事件
	this.button.addEventListener("onClick",function(event){
		var dc=event.target.parent;
		if(!dc.datefield||dc.datefield.added){return;}
		var pos=dc.MousePositionCompareWithLocal();
		pos[0]=TcFrame.MousePosition[0]-pos[0];
		pos[1]=TcFrame.MousePosition[1]-pos[1]+dc.height;
		dc.datefield.y=pos[1];
		dc.datefield.x=pos[0]+1;
		if(dc.datefield.y+dc.datefield.height>TcFrame.Boot.height){dc.datefield.y-=dc.height+dc.datefield.height;}
		TcFrame.Boot.add(dc.datefield);
		dc.datefield.added=true;
		dc.autoHidden();		
	});
	this.datefield.addEventListener("onChange",function(event){
		event.target.parentDC.setValue(event.target.value);
	});
	this.input.addEventListener("onFocusOut",function(event){
		event.target.parent.format(event.target.value);
	});
	this.setValue(this.value);
	this.datefield.setValue(this.value);
}
TcFrame.DateChooser.prototype=new TcFrame.UIComponent();
TcFrame.DateChooser.prototype.type="TcFrame.DateChooser";
TcFrame.DateChooser.prototype.value=null;
TcFrame.DateChooser.prototype.datatype="YYYY-MM-DD";
TcFrame.DateChooser.prototype.button=null;
TcFrame.DateChooser.prototype.datefield=null;
TcFrame.DateChooser.prototype.input=null;
TcFrame.DateChooser.prototype.format=function(str){
	var av="9876543210",ps=0,year="",month="",day="",tmp=this.datatype;
	for(var n=0;n<this.datatype.length;n++){
		if(this.datatype.charAt(n)=="Y"&&year.length==0){
			while(ps<str.length&&year.length<4){
				if(av.indexOf(str.charAt(ps))>-1){year+=str.charAt(ps);}
				ps++;
			}
		}else if(this.datatype.charAt(n)=="M"&&month.length==0){
			while(ps<str.length&&month.length<2){
				if(av.indexOf(str.charAt(ps))>-1){month+=str.charAt(ps);}
				ps++;
			}
		}else if(this.datatype.charAt(n)=="D"&&day.length==0){
			while(ps<str.length&&day.length<2){
				if(av.indexOf(str.charAt(ps))>-1){day+=str.charAt(ps);}
				ps++;
			}
		}
	}
	this.value=new Date();
	this.value.setFullYear(parseInt(year),parseInt(month)-1,parseInt(day));
	this.datefield.setValue(this.value);
	this.setValue(this.value);
}
TcFrame.DateChooser.prototype.autoHidden=function(){
	var autoRemoveHandle;
	var obj=this;
	clearInterval(autoRemoveHandle);
	autoRemoveHandle=setInterval(function(){
		if(!obj.datefield||!obj.datefield.added){return;}
		var a=obj.isMouseIn();
		var b=obj.datefield.isMouseIn();
		if(a||b){return;}
		obj.datefield.parent.remove(obj.datefield);
		obj.datefield.added=false;
		clearInterval(autoRemoveHandle);
	},1000);
}
TcFrame.DateChooser.prototype.setValue=function(date){
	this.value=date;
	var year=this.value.getFullYear();
	var month=this.value.getMonth()+1;
	var day=this.value.getDate();
	var str=this.datatype;
	if(month<10){month="0"+month;}
	if(day<10){day="0"+day;}
	str=str.replace("YYYY",year);
	str=str.replace("MM",month);
	str=str.replace("DD",day);
	this.input.setValue(str);
	var d=this;
	setTimeout(function(){d.dispatch('onChange',{target:d})},50);	
}
TcFrame.DateChooser.prototype.resize=function(){
	this.calcBorder();
	this.render();
	this.dispatch('onResize',{target:this});
	this.button.right=2;this.button.height=19;this.button.width=19;this.button.top=(this.height-19)/2;
	this.button.resize();
	this.input.resize();
}