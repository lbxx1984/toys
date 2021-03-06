var TcFrame=TcFrame||{};
TcFrame.Drag={
	moveAbleObjectsArr:[],
	resizeAbleObjectsArr:[],
	activeObject:null,
	activeSlider:null,
	activeGrid:null,
	activeStage3D:null,
	command:"default",
	mouseMoveWhileDown:function(){
		//slider拖动
		if(this.activeSlider){
			this.activeSlider.btnMove([
				TcFrame.MousePosition[0]-TcFrame.MousePositionLast[0],
				TcFrame.MousePosition[1]-TcFrame.MousePositionLast[1]
			]);
			return;
		}
		//grid拖动
		if(this.activeGrid){
			this.activeGrid.drag([
				TcFrame.MousePosition[0]-TcFrame.MousePositionLast[0],
				TcFrame.MousePosition[1]-TcFrame.MousePositionLast[1]
			]);
			return;
		}
		if(this.activeStage3D){
			this.activeStage3D.movingCamera=false;
			this.activeStage3D.scalingCamera=false;
			if(this.activeStage3D.cameraController){
				this.activeStage3D.cameraController.moveBtn.setActive(false);
				this.activeStage3D.cameraController.scaleBtn.setActive(false);
			}
			if(this.command=="camera_ctrl_cir"){
				this.activeStage3D.toB(TcFrame.MousePosition[0]-TcFrame.MousePositionLast[0]);		
			}else{
				this.activeStage3D.toA(TcFrame.MousePosition[1]-TcFrame.MousePositionLast[1]);	
				this.activeStage3D.toB(TcFrame.MousePosition[0]-TcFrame.MousePositionLast[0]);	
			}
			return;	
		}
		if(this.command=="default"||this.moveAbleObjectsArr.length==0){return;}
		//UIComponent拖动
		var o=this.activeObject;
		if(this.command=="pointer"){
			if(o.left==null&&o.right==null){
				o.x+=TcFrame.MousePosition[0]-TcFrame.MousePositionLast[0];
			}else if(o.left==null&&o.right!=null){
				o.right-=TcFrame.MousePosition[0]-TcFrame.MousePositionLast[0];
				if(o.right<0){o.right=0;}
				if(o.right+o.width>o.parent.width){o.right=o.parent.width-o.width;}
			}else if(o.left!=null&&o.right==null){
				o.left+=TcFrame.MousePosition[0]-TcFrame.MousePositionLast[0];
				if(o.left<0){o.left=0}
				if(o.left+o.width>o.parent.width){o.left=o.parent.width-o.width;}	
			}else{
				if(o.right-TcFrame.MousePosition[0]+TcFrame.MousePositionLast[0]>0&&o.left+TcFrame.MousePosition[0]-TcFrame.MousePositionLast[0]>0){
					o.left+=TcFrame.MousePosition[0]-TcFrame.MousePositionLast[0];
					o.right-=TcFrame.MousePosition[0]-TcFrame.MousePositionLast[0];
				}			
			}
			if(o.top==null&&o.bottom==null){
				o.y+=TcFrame.MousePosition[1]-TcFrame.MousePositionLast[1];
			}else if(o.top==null&&o.bottom!=null){
				o.bottom-=TcFrame.MousePosition[1]-TcFrame.MousePositionLast[1];
				if(o.bottom<0){o.bottom=0;}
				if(o.bottom+o.height>o.parent.height){o.bottom=o.parent.height-o.height;}
			}else if(o.top!=null&&o.bottom==null){
				o.top+=TcFrame.MousePosition[1]-TcFrame.MousePositionLast[1];
				if(o.top<0){o.top=0;}
				if(o.top+o.height>o.parent.height){o.top=o.parent.height-o.height;}
			}else{
				if(o.top+TcFrame.MousePosition[1]-TcFrame.MousePositionLast[1]>0&&o.bottom-TcFrame.MousePosition[1]+TcFrame.MousePositionLast[1]>0){
					o.top+=TcFrame.MousePosition[1]-TcFrame.MousePositionLast[1];
					o.bottom-=TcFrame.MousePosition[1]-TcFrame.MousePositionLast[1];
				}
			}
		}
		if(this.command=="nw-resize"||this.command=="n-resize"||this.command=="ne-resize"){//n
			o.height-=TcFrame.MousePosition[1]-TcFrame.MousePositionLast[1];
			if(o.top==null){
				o.y+=TcFrame.MousePosition[1]-TcFrame.MousePositionLast[1];
			}else{
				o.top+=TcFrame.MousePosition[1]-TcFrame.MousePositionLast[1];
			}	
		}
		if(this.command=="nw-resize"||this.command=="w-resize"||this.command=="sw-resize"){//w
			o.width-=TcFrame.MousePosition[0]-TcFrame.MousePositionLast[0];
			if(o.left==null){
				o.x+=TcFrame.MousePosition[0]-TcFrame.MousePositionLast[0];
			}else{
				o.left+=TcFrame.MousePosition[0]-TcFrame.MousePositionLast[0];
			}
		}
		if(this.command=="e-resize"||this.command=="ne-resize"||this.command=="se-resize"){//e
			if(o.right==null){
				o.width+=TcFrame.MousePosition[0]-TcFrame.MousePositionLast[0];
			}else{
				o.right-=TcFrame.MousePosition[0]-TcFrame.MousePositionLast[0];	
			}
		}
		if(this.command=="s-resize"||this.command=="sw-resize"||this.command=="se-resize"){//s
			if(o.bottom==null){
				o.height+=TcFrame.MousePosition[1]-TcFrame.MousePositionLast[1];
			}else{
				o.bottom-=TcFrame.MousePosition[1]-TcFrame.MousePositionLast[1];
			}	
		}
		o.resize();
		return;	
	},
	mouseMove:function(){
		//引擎队列里没有物体返回
		if(
			this.moveAbleObjectsArr.length==0&&
			this.activeSlider==null&&
			this.activeGrid==null&&
			this.activeStage3D==null
		){return;}
		////////////如果鼠标是按下的
		if(TcFrame.MouseDown){this.mouseMoveWhileDown();return;}
		////////////鼠标未按下，判断是否有动作
		this.activeObject=null;this.command="default";
		//判断是否resize
		for(n=0;n<this.resizeAbleObjectsArr.length;n++){
			var obj=this.resizeAbleObjectsArr[n];
			var ma=obj.MousePositionCompareWithLocal();
			if(ma[0]<0||ma[0]>obj.width||ma[1]<0||ma[1]>obj.height){continue;}
			if(ma[0]<obj.padding){
				if(ma[1]<obj.padding){
					this.command="nw-resize";
				}else if(ma[1]>obj.height-obj.padding){
					this.command="sw-resize";	
				}else{
					this.command="w-resize";
				}	
			}else if(ma[0]>obj.padding&&ma[0]<obj.width-obj.padding){
				if(ma[1]<obj.padding){
					this.command="n-resize";
				}else if(ma[1]>obj.height-obj.padding){
					this.command="s-resize";
				}
			}else{
				if(ma[1]<obj.padding){
					this.command="ne-resize";
				}else if(ma[1]>obj.height-obj.padding){
					this.command="se-resize";	
				}else{
					this.command="e-resize";
				}	
			}
			this.activeObject=this.resizeAbleObjectsArr[n];
			break;
		}
		//判断是否move
		for(n=0;n<this.moveAbleObjectsArr.length;n++){
			var ma=this.moveAbleObjectsArr[n].MousePositionCompareWithLocal();
			if(
				ma[0]<this.moveAbleObjectsArr[n].padding||
				ma[0]>this.moveAbleObjectsArr[n].width-this.moveAbleObjectsArr[n].padding||
				ma[1]<this.moveAbleObjectsArr[n].padding||
				ma[1]>this.moveAbleObjectsArr[n].titleHeight-this.moveAbleObjectsArr[n].padding
			){continue;}
			this.activeObject=this.moveAbleObjectsArr[n];
			this.command="pointer";
			break;
		}
		TcFrame.Cursor(this.command);
	},
	mouseDown:function(){},
	mouseUp:function(){
		this.activeSlider=null;
		this.activeGrid=null;
		this.activeStage3D=null;
	}
}