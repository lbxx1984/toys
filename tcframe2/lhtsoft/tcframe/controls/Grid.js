var TcFrame=TcFrame||{};
TcFrame.Grid=function(param){
	this.initializate(param);
	if(param){
		if(param.defaultRowHeight!=null){this.defaultRowHeight=param.defaultRowHeight;}
		if(param.defalutColumnWidth!=null){this.defalutColumnWidth=param.defalutColumnWidth;}
		if(param.columnHeadBarHeight!=null){this.columnHeadBarHeight=param.columnHeadBarHeight;}
		if(param.rowHeadBarWidth!=null){this.rowHeadBarWidth=param.rowHeadBarWidth;}
		if(param.showColumnHead!=null){this.showColumnHead=param.showColumnHead;}
		if(param.showRowHead!=null){this.showRowHead=param.showRowHead;}
		if(param.selectType!=null){this.selectType=param.selectType;}
		if(param.sortable!=null){this.sortable=param.sortable;}
		if(param.dragable!=null){this.dragable=param.dragable;}
	}
	this.crossButton=new TcFrame.Button({label:TcFrame.Language['gridcross'],showBorder:'false'});
	this.rowHeadBar=new TcFrame.Group({display:"vertical",padding:0,interval:1});
	this.columnHeadBar=new TcFrame.Group({padding:0,interval:1});
	this.container=new TcFrame.Group({display:"vertical",padding:0,interval:1});
	this.VRule=new TcFrame.Rule({style:'dotted',display:'vertical',top:0,bottom:0,x:0});

	this.columnHeadBar.parent=this;
	this.container.parent=this;
	this.crossButton.parent=this;
	this.rowHeadBar.parent=this;
	this.VRule.parent=this;
	
	this.content.appendChild(this.crossButton.content);
	this.content.appendChild(this.rowHeadBar.content);
	this.content.appendChild(this.columnHeadBar.content);
	this.content.appendChild(this.container.content);
	
	this.container.setStyles({'overflow':'auto'});
	this.columnHeadBar.setStyle('border','');
	this.container.setStyle('border','');
	this.rowHeadBar.setStyle('border','');
	
	var a=this.container.content,b=this.columnHeadBar.content,c=this.rowHeadBar.content;
	a.onscroll=function(){b.scrollLeft=a.scrollLeft;c.scrollTop=a.scrollTop;TcFrame.MouseDown=false;}
}
TcFrame.Grid.prototype=new TcFrame.UIComponent();
TcFrame.Grid.prototype.type="TcFrame.Grid";

TcFrame.Grid.prototype.defaultRowHeight=25;
TcFrame.Grid.prototype.defalutColumnWidth=80;
TcFrame.Grid.prototype.columnHeadBarHeight=25;
TcFrame.Grid.prototype.rowHeadBarWidth=30;
TcFrame.Grid.prototype.showColumnHead=true;
TcFrame.Grid.prototype.showRowHead=true;
TcFrame.Grid.prototype.selectType="none";
TcFrame.Grid.prototype.sortable=true;
TcFrame.Grid.prototype.dragable=true;

TcFrame.Grid.prototype.container=null;
TcFrame.Grid.prototype.columnHeadBar=null;
TcFrame.Grid.prototype.rowHeadBar=null;
TcFrame.Grid.prototype.crossButton=null;

TcFrame.Grid.prototype.sortlastBtn=null;
TcFrame.Grid.prototype.selectedItem=null;
TcFrame.Grid.prototype.selectedRow=null;
TcFrame.Grid.prototype.selectedColumn=null;
TcFrame.Grid.prototype.columnWidths=null;
TcFrame.Grid.prototype.dragedCol=-1;
TcFrame.Grid.prototype.dragedLastNum=-1;
TcFrame.Grid.prototype.draged=false;

TcFrame.Grid.prototype.dataProvider=function(inner){//导入数据
	if(!inner||!inner.data||inner.data.length==0){return;}
	//列
	if(inner.column&&inner.column.length>0){
		this.columnWidths=[];
		this.columnHeadBar.removeAll();
		//列头
		for(var n=0;n<inner.column.length;n++){
			this.columnWidths.push(inner.column[n].width);
			inner.column[n].height=this.defaultRowHeight;
			var btn=new TcFrame.Button(inner.column[n]);
			btn.tid=n;btn.lastLabel=btn.label;btn.asce=true;
			this.columnHeadBar.add(btn);
			btn.addEventListener('onMouseMove',this.columnHeadMouseMove);
			btn.addEventListener('onMouseOut',this.columnHeadMouseOut);
			btn.addEventListener('onMouseDown',this.columnHeadMouseDown);
			btn.addEventListener('onMouseUp',this.columnHeadMouseUp);
		}
		var tmpbtn=new TcFrame.Button({width:100,height:this.defaultRowHeight,label:""});
		this.columnHeadBar.add(tmpbtn);
	}else{
		this.columnWidths=null;
		this.showColumnHead=false;
	}
	this.container.removeAll();
	//行
	for(var n=0;n<inner.data.length;n++){
		//行头
		var btn=new TcFrame.Button({label:n+1,width:this.rowHeadBarWidth,height:this.defaultRowHeight});
		btn.tid=n;this.rowHeadBar.add(btn);
		//row
		var line=new TcFrame.GridLine({height:this.defaultRowHeight}),arr=[];
		for(var m=0;m<inner.data[n].length;m++){
			if(this.columnWidths&&m>this.columnWidths.length-1){break;}
			if(this.columnWidths==null||this.columnWidths.length==0||this.columnWidths.length-1<m){w=this.defalutColumnWidth;}else{w=this.columnWidths[m];}
			arr.push({value:inner.data[n][m],width:w});
		}
		//补齐空格
		while(this.columnWidths&&this.columnWidths.length!=0&&arr.length<this.columnWidths.length){arr.push({value:"",width:this.columnWidths[arr.length]||this.defalutColumnWidth});}
		line.dataProvider(arr);
		this.container.add(line);	
	}
	var btn=new TcFrame.Button({label:"",width:this.rowHeadBarWidth,height:50});
	this.rowHeadBar.add(btn);
}
TcFrame.Grid.prototype.changeColumnWidth=function(col,width){//改变某列到指定宽度
	if(col>this.columnHeadBar.children.length-1||width<5){return;}
	this.columnHeadBar.children[col].width=width;this.columnHeadBar.resize();
	for(var n=0;n<this.container.children.length;n++){
		this.container.children[n].children[col].width=width;	
		this.container.children[n].resize();
	}
}
TcFrame.Grid.prototype.sort=function(column,asce){//排序
	function findMin(){
		var min=null,id=0;
		for(var j=0;j<dataArr.length;j++){
			if(dataArr[j]==null){continue;}
			if(min==null||min>dataArr[j]){min=dataArr[j];id=j;continue;}
		}
		dataArr[id]=null;return id;
	}
	var dataArr=[],orderArr=[];
	for(var n=0;n<this.container.children.length;n++){
		dataArr.push(this.container.children[n].children[column].value);
	}
	for(var i=0;i<dataArr.length;i++){
		orderArr.push(findMin());
	}
	if(!asce){orderArr.reverse();}
	this.container.setChildrenIndex(orderArr);
}
TcFrame.Grid.prototype.getColumn=function(col){
	if(col==null){return null;}
	col=parseInt(col);
	if(this.container.children.length==0){return null;}
	if(this.container.children[0].children.length-1<col){return null;}
	var arr=[];
	for(var n=0;n<this.container.children.length;n++){arr.push(this.container.children[n].children[col]);}
	return arr;
}
TcFrame.Grid.prototype.getRow=function(row){
	if(row==null){return null;}
	row=parseInt(row);
	if(this.container.children.length-1<row){return null;}
	return this.container.children[row].children;	
}
TcFrame.Grid.prototype.getItem=function(col,row){
	if(col==null||row==null){return null;}
	col=parseInt(col);
	row=parseInt(row);
	if(this.container.children.length-1<row){return null;}
	var line=this.container.children[row];
	if(line.children.length-1<col){return null;}
	return line.children[col];	
}
TcFrame.Grid.prototype.selectColumn=function(col){
	var arr=this.getColumn(col);
	if(!arr){return null;}
	for(var n=0;n<arr.length;n++){arr[n].setStyles(TcFrame.Skin['TcFrame.GridItem']['over']);}
	this.selectedColumn=arr;
	return arr;
}
TcFrame.Grid.prototype.selectRow=function(row){
	var arr=this.getRow(row);
	if(!arr){return null;}
	for(var n=0;n<arr.length;n++){arr[n].setStyles(TcFrame.Skin['TcFrame.GridItem']['over']);}
	this.selectedRow=arr;
	return arr;
}
TcFrame.Grid.prototype.selectItem=function(col,row){
	var item=this.getItem(col,row);
	if(!item){return null;}
	item.setStyles(TcFrame.Skin['TcFrame.GridItem']['over']);
	this.selectedItem=item;
	return item;
}

/*
		非接口函数
*/
TcFrame.Grid.prototype.columnHeadMouseUp=function(event){
	var grid=event.target.parent.parent;
	var btn=event.target;
	if(grid.draged){
		if(grid.dragedCol>-1){
			grid.content.removeChild(grid.VRule.content);
			grid.changeColumnWidth(grid.dragedCol,grid.dragedLastNum);
		}
	}else{
		var asce=true;
		if(!grid.sortable||grid.container.children.length==0||grid.dragedCol>-1||grid.draged){return;}
		if(grid.sortlastBtn==btn){asce=btn.asce=!btn.asce;}else{asce=btn.asce;}
		if(grid.sortlastBtn){grid.sortlastBtn.setLabel(grid.sortlastBtn.lastLabel);}
		grid.sortlastBtn=btn;
		if(asce){
			grid.sortlastBtn.setLabel(grid.sortlastBtn.lastLabel+TcFrame.Language['asce']);	
		}else{
			grid.sortlastBtn.setLabel(grid.sortlastBtn.lastLabel+TcFrame.Language['desc']);
		}
		grid.sort(event.target.tid,event.target.asce);	
	}
	grid.dragedCol=-1;
	grid.draged=false;
}
TcFrame.Grid.prototype.columnHeadMouseDown=function(event){
	var grid=event.target.parent.parent;
	var btn =event.target;
	if(!grid.dragable||TcFrame.MouseDown||grid.dragedCol<0){return;}
	TcFrame.Drag.activeGrid=grid;
	grid.dragedLastNum=grid.columnHeadBar.children[grid.dragedCol].width;
	grid.content.appendChild(grid.VRule.content);
	grid.VRule.x=grid.MousePositionCompareWithLocal()[0];
	grid.VRule.resize();
}
TcFrame.Grid.prototype.columnHeadMouseMove=function(event){
	var grid=event.target.parent.parent;
	if(!grid.dragable||TcFrame.MouseDown){return;}
	var btn =event.target;
	var x=btn.MousePositionCompareWithLocal()[0];
	if(x<5&&btn.tid>0){
		grid.dragedCol=btn.tid-1;
		TcFrame.Cursor('e-resize');
		grid.draged=true;
	}else if(x>btn.width-5){
		grid.dragedCol=btn.tid;
		TcFrame.Cursor('e-resize');
		grid.draged=true;
	}else{
		grid.dragedCol=-1;
		TcFrame.Cursor('default');
	}
}
TcFrame.Grid.prototype.columnHeadMouseOut=function(event){
	var grid=event.target.parent.parent;
	if(!grid.dragable||TcFrame.MouseDown){return;}
	grid.dragedCol=-1;
	TcFrame.Cursor('default');
}
TcFrame.Grid.prototype.drag=function(arr){//拖动
	this.dragedLastNum+=arr[0];this.VRule.x+=arr[0];this.VRule.resize();
}
TcFrame.Grid.prototype.resize=function(){
	this.calcBorder();
	this.render();
	this.dispatch('onResize',{target:this});
	if(this.showColumnHead){
		if(this.showRowHead){
			this.crossButton.left=-1;
			this.crossButton.width=this.rowHeadBarWidth;
			this.crossButton.top=-3;
			this.crossButton.height=this.columnHeadBarHeight-1;
			this.rowHeadBar.left=-1;
			this.rowHeadBar.width=this.rowHeadBarWidth;
			this.rowHeadBar.top=this.columnHeadBarHeight-3;
			this.rowHeadBar.bottom=0;
			this.columnHeadBar.left=this.rowHeadBarWidth-2;
			this.columnHeadBar.right=0;
			this.columnHeadBar.top=-2;
			this.columnHeadBar.height=this.columnHeadBarHeight;
			this.container.left=this.rowHeadBarWidth-2;
			this.container.right=0;
			this.container.top=this.columnHeadBarHeight-2;
			this.container.bottom=0;
		}else{
			this.columnHeadBar.left=-1;
			this.columnHeadBar.right=0;
			this.columnHeadBar.top=-2;
			this.columnHeadBar.height=this.columnHeadBarHeight;
			this.container.left=-1;
			this.container.right=0;
			this.container.top=this.columnHeadBarHeight-2;
			this.container.bottom=0;
		}
	}else{
		if(this.showRowHead){
			this.rowHeadBar.left=-2;
			this.rowHeadBar.width=this.rowHeadBarWidth;
			this.rowHeadBar.top=-2;
			this.rowHeadBar.bottom=0;
			this.columnHeadBar.left=this.rowHeadBarWidth-1;
			this.columnHeadBar.right=0;
			this.columnHeadBar.top=-this.columnHeadBarHeight-2;
			this.columnHeadBar.height=this.columnHeadBarHeight;
			this.container.left=this.rowHeadBarWidth-2;
			this.container.right=0;
			this.container.top=-1;
			this.container.bottom=0;
		}else{
			this.container.left=-1;
			this.container.right=0;
			this.container.top=-1;
			this.container.bottom=0;
		}
	}
	this.container.resize();
	this.columnHeadBar.resize();
	this.crossButton.resize();
	this.rowHeadBar.resize();
}