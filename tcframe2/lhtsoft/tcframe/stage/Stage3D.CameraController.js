var TcFrame=TcFrame||{};
TcFrame.Stage3D=TcFrame.Stage3D||{};
TcFrame.Stage3D.CameraController=function(param){
	this.initializate(param);
	if(param){
		this.cameraAngleA=(param.cameraAngleA!=null)?param.cameraAngleA:40;  			
		this.cameraAngleB=(param.cameraAngleB!=null)?param.cameraAngleB:45;  	
	}
	if(!TcFrame.WebGL){this.content.appendChild(TcFrame.Warning('浏览器不支持WebGL'));return;}
	this.objects=[];
	//三维场景
	this.scene=new THREE.Scene();
	//摄像机
	this.camera=new THREE.PerspectiveCamera(33,1,1,10000);
	//选择器
	this.projector=new THREE.Projector();
	//渲染器
	this.renderer = new THREE.WebGLRenderer({preserveDrawingBuffer:true,clearAlpha:0});
	this.renderer.sortObjects = false;
	this.renderer.setSize(100,100);
	this.content.appendChild(this.renderer.domElement);
	//添加到舞台
	this.scene.add(this.camera);
	//各种按钮
	this.moveBtn=new TcFrame.ImageButton({
		width:15,height:14,left:25,top:5,
		src:TcFrame.Skin['Image']['CameraController']['cameraMoveNormal'],
		srcOver:TcFrame.Skin['Image']['CameraController']['cameraMoveOver'],
		srcDown:TcFrame.Skin['Image']['CameraController']['cameraMoveDown'],
		srcActive:TcFrame.Skin['Image']['CameraController']['cameraMoveActive']
	});
	this.scaleBtn=new TcFrame.ImageButton({
		width:15,height:14,left:45,top:5,
		src:TcFrame.Skin['Image']['CameraController']['scaleNormal'],
		srcOver:TcFrame.Skin['Image']['CameraController']['scaleOver'],
		srcDown:TcFrame.Skin['Image']['CameraController']['scaleDown'],
		srcActive:TcFrame.Skin['Image']['CameraController']['scaleActive']
	});
	this.resetBtn=new TcFrame.ImageButton({
		width:15,height:14,left:5,top:5,
		src:TcFrame.Skin['Image']['CameraController']['homeNormal'],
		srcOver:TcFrame.Skin['Image']['CameraController']['homeOver'],
		srcDown:TcFrame.Skin['Image']['CameraController']['homeDown']
	});
	this.add(this.moveBtn);this.add(this.scaleBtn);this.add(this.resetBtn);
	var info=[
		{id:"cir",x:0,y:-20,z:0,rx:0,ry:0,rz:0,tid:0,ds:false},
		{id:"font",x:20,y:0,z:0,rx:Math.PI/2,ry:0,rz:Math.PI*1.5,tid:2,ds:true},
		{id:"back",x:-20,y:0,z:0,rx:Math.PI*0.5,ry:0,rz:Math.PI*0.5,tid:3,ds:true},
		{id:"top",x:0,y:20,z:0,rx:0,ry:0,rz:0,tid:4,ds:true},
		{id:"bottom",x:0,y:-20,z:0,rx:Math.PI,ry:0,rz:0,tid:5,ds:true},
		{id:"left",x:0,y:0,z:20,rx:0.5*Math.PI,ry:0,rz:0,tid:6,ds:true},
		{id:"right",x:0,y:0,z:-20,rx:-0.5*Math.PI,ry:Math.PI,rz:0,tid:7,ds:true},
		{id:"font_left_top",x:17.5,y:17.5,z:17.5,rx:0,ry:0,rz:0,tid:1,ds:false},
		{id:"font_right_top",x:17.5,y:17.5,z:-17.5,rx:0,ry:0,rz:0,tid:1,ds:false},
		{id:"left_top_back",x:-17.5,y:17.5,z:17.5,rx:0,ry:0,rz:0,tid:1,ds:false},
		{id:"back_top_right",x:-17.5,y:17.5,z:-17.5,rx:0,ry:0,rz:0,tid:1,ds:false},
		{id:"left_font_bottom",x:17.5,y:-17.5,z:17.5,rx:0,ry:0,rz:0,tid:1,ds:false},
		{id:"font_right_bottom",x:17.5,y:-17.5,z:-17.5,rx:0,ry:0,rz:0,tid:1,ds:false},
		{id:"left_back_bottom",x:-17.5,y:-17.5,z:17.5,rx:0,ry:0,rz:0,tid:1,ds:false},
		{id:"right_back_bottom",x:-17.5,y:-17.5,z:-17.5,rx:0,ry:0,rz:0,tid:1,ds:false},
		{id:"left_top",x:0,y:17.5,z:17.5,rx:0,ry:0,rz:0,tid:1,ds:false},
		{id:"left_bottom",x:0,y:-17.5,z:17.5,rx:0,ry:0,rz:0,tid:1,ds:false},
		{id:"top_right",x:0,y:17.5,z:-17.5,rx:0,ry:0,rz:0,tid:1,ds:false},
		{id:"bottom_right",x:0,y:-17.5,z:-17.5,rx:0,ry:0,rz:0,tid:1,ds:false},
		{id:"top_font",x:17.5,y:17.5,z:0,rx:0,ry:0,rz:0,tid:1,ds:false},
		{id:"bottom_font",x:17.5,y:-17.5,z:0,rx:0,ry:0,rz:0,tid:1,ds:false},
		{id:"back_bottom",x:-17.5,y:-17.5,z:0,rx:0,ry:0,rz:0,tid:1,ds:false},
		{id:"top_back",x:-17.5,y:17.5,z:0,rx:0,ry:0,rz:0,tid:1,ds:false},
		{id:"font_left",x:17.5,y:0,z:17.5,rx:0,ry:0,rz:0,tid:1,ds:false},
		{id:"font_right",x:17.5,y:0,z:-17.5,rx:0,ry:0,rz:0,tid:1,ds:false},
		{id:"back_right",x:-17.5,y:0,z:-17.5,rx:0,ry:0,rz:0,tid:1,ds:false},
		{id:"back_left",x:-17.5,y:0,z:17.5,rx:0,ry:0,rz:0,tid:1,ds:false}
	];
	for(var n=0;n<info.length;n++){
		var material=null,mesh=null,a=100,b=100,c=100;
		if(n<7){
			if(n>0){a=b=30;}
			mesh=new THREE.Mesh(
				new THREE.PlaneGeometry(a,b),new THREE.MeshBasicMaterial({color:0xffffff,
					map:THREE.ImageUtils.loadTexture(TcFrame.Language['cameracontroller'][info[n].tid],THREE.UVMapping)
				})
			);
		}else if(n>6){
			if(n<15){a=b=c=5;
			}else if(n<19){a=30;b=5;c=5;
			}else if(n>22){a=5;b=30;c=5;
			}else{a=5;b=5;c=30;}
			mesh=new THREE.Mesh(
				new THREE.CubeGeometry(a,b,c),new THREE.MeshBasicMaterial({color:0xffffff,
					map:THREE.ImageUtils.loadTexture(TcFrame.Language['cameracontroller'][info[n].tid],THREE.UVMapping)
				})
			);	
		}
		mesh.position.x=info[n].x;mesh.position.y=info[n].y;mesh.position.z=info[n].z;
		mesh.rotation.x=info[n].rx;mesh.rotation.y=info[n].ry;mesh.rotation.z=info[n].rz;
		mesh.doubleSided=info[n].ds;mesh.id="camera_ctrl_"+info[n].id;
		this.scene.add(mesh);this.objects.push(mesh);
	}	
	//挂接事件
	this.addEventListener('onMouseMove',this.mousemove);
	this.addEventListener('onMouseUp',this.mouseup);
	this.addEventListener('onMouseDown',this.mousedown);
	this.moveBtn.addEventListener('onClick',function(event){
		_this=event.target.parent;
		event.target.setActive(!event.target.active);
		event.target.parent.scaleBtn.setActive(false);
		if(_this.controlStage){
			_this.controlStage.movingCamera=event.target.active;
			_this.controlStage.scalingCamera=false;
		}
	});
	this.scaleBtn.addEventListener('onClick',function(event){
		_this=event.target.parent;
		event.target.setActive(!event.target.active);
		event.target.parent.moveBtn.setActive(false);
		if(_this.controlStage){
			_this.controlStage.scalingCamera=event.target.active;
			_this.controlStage.movingCamera=false;
		}
	});
	this.resetBtn.addEventListener('onClick',function(event){
		_this=event.target.parent;
		if(_this.controlStage){
			_this.controlStage.resetCamera();
		}
	});
}
TcFrame.Stage3D.CameraController.prototype=new TcFrame.Canvas();
TcFrame.Stage3D.CameraController.prototype.type="TcFrame.Stage3D.CameraController";
TcFrame.Stage3D.CameraController.prototype.width=120;
TcFrame.Stage3D.CameraController.prototype.height=120;
TcFrame.Stage3D.CameraController.prototype.cameraRadius=208;
TcFrame.Stage3D.CameraController.prototype.cameraAngleA=40;  			
TcFrame.Stage3D.CameraController.prototype.cameraAngleB=45;  		
TcFrame.Stage3D.CameraController.prototype.cameraLookAt={x:0,y:0,z:0};
TcFrame.Stage3D.CameraController.prototype.cameraMoveSpeed=0.3;
TcFrame.Stage3D.CameraController.prototype.command="";

TcFrame.Stage3D.CameraController.prototype.scene=null;
TcFrame.Stage3D.CameraController.prototype.camera=null;
TcFrame.Stage3D.CameraController.prototype.projector=null;
TcFrame.Stage3D.CameraController.prototype.renderer=null;
TcFrame.Stage3D.CameraController.prototype.objects=null;
TcFrame.Stage3D.CameraController.prototype.INTERSECTED=null;
TcFrame.Stage3D.CameraController.prototype.controlStage=null;
TcFrame.Stage3D.CameraController.prototype.moveBtn=null;
TcFrame.Stage3D.CameraController.prototype.scaleBtn=null;
TcFrame.Stage3D.CameraController.prototype.resetBtn=null;

TcFrame.Stage3D.CameraController.prototype.mousedown=function(event){
	if(event.target.command==""){event.target.command="camera_ctrl_free";}
	TcFrame.Drag.activeStage3D=event.target.controlStage;
	TcFrame.Drag.command=event.target.command;
}
TcFrame.Stage3D.CameraController.prototype.mousemove=function(event){
	var _this=event.target,mousepos=_this.MousePositionCompareWithLocal();
	_this.getMouseOverGeo(2*mousepos[0]/_this.width-1,-2*mousepos[1]/_this.height+1);
}
TcFrame.Stage3D.CameraController.prototype.mouseup=function(event){
	var _this=event.target.controlStage,_command=event.target.command;
	if(!_this){return;}
	var a=_this.cameraAngleA,b=_this.cameraAngleB;
	switch(_command){
		case "camera_ctrl_font_left_top":a=45;b=45;break;
		case "camera_ctrl_left_top_back":a=45;b=135;break;
		case "camera_ctrl_back_top_right":a=45;b=225;break;
		case "camera_ctrl_font_right_top":a=45;b=315;break;
		case "camera_ctrl_left_font_bottom":a=-45;b=45;break;
		case "camera_ctrl_left_back_bottom":a=-45;b=135;break;
		case "camera_ctrl_right_back_bottom":a=-45;b=225;break;
		case "camera_ctrl_font_right_bottom":a=-45;b=315;break;
		case "camera_ctrl_left_top":a=45;b=90;break;
		case "camera_ctrl_left_bottom":a=-45;b=90;break;
		case "camera_ctrl_top_right":a=45;b=270;break;
		case "camera_ctrl_bottom_right":a=-45;b=270;break;
		case "camera_ctrl_top_font":a=45;b=0;break;
		case "camera_ctrl_bottom_font":a=-45;b=0;break;
		case "camera_ctrl_top_back":a=45;b=180;break;
		case "camera_ctrl_back_bottom":a=-45;b=180;break;
		case "camera_ctrl_font_left":a=0;b=45;break;
		case "camera_ctrl_font_right":a=0;b=315;break;
		case "camera_ctrl_back_right":a=0;b=225;break;
		case "camera_ctrl_back_left":a=0;b=135;break;
		case "camera_ctrl_left":a=0;b=90;break;
		case "camera_ctrl_right":a=0;b=270;break;
		case "camera_ctrl_font":a=0;b=0;break;
		case "camera_ctrl_back":a=0;b=180;break;
		case "camera_ctrl_top":a=89;break;
		case "camera_ctrl_bottom":a=-89;break;
		default:break;	
	}
	_this.cameraAngleTo(a,"A");_this.cameraAngleTo(b,"B");
}
TcFrame.Stage3D.CameraController.prototype.getCameraPos=function(){
	var y=this.cameraRadius*Math.sin(Math.PI*this.cameraAngleA/180);
	var x=this.cameraRadius*Math.cos(Math.PI*this.cameraAngleA/180)*Math.cos(Math.PI*this.cameraAngleB/180);
	var z=this.cameraRadius*Math.cos(Math.PI*this.cameraAngleA/180)*Math.sin(Math.PI*this.cameraAngleB/180);
	return {x:x+this.cameraLookAt.x,y:y+this.cameraLookAt.y,z:z+this.cameraLookAt.z};
}
TcFrame.Stage3D.CameraController.prototype.getMouseOverGeo=function(x,y){
	if(this.INTERSECTED){this.INTERSECTED.material.color.setHex(this.INTERSECTED.currentHex);}	
	var vector=new THREE.Vector3(x,y,0.5);
	this.projector.unprojectVector(vector,this.camera);
	var ray=new THREE.Ray(this.camera.position,vector.subSelf(this.camera.position ).normalize());
	var intersects = ray.intersectObjects(this.objects)
	if (intersects.length<1){
		this.INTERSECTED=null;
		this.command="";
		return null;
	} 
	for(var n=0;n<intersects.length;n++){if(intersects[n].object.id.indexOf("camera_ctrl")>-1){break;}}
	if(n==intersects.length){
		this.INTERSECTED=null;
		this.command="";
		return null;
	}
	this.INTERSECTED=intersects[n].object;
	if(!this.INTERSECTED.currentHex){this.INTERSECTED.currentHex=this.INTERSECTED.material.color.getHex();}
	this.INTERSECTED.material.color.setHex(0x3399ff);
	this.command=this.INTERSECTED.id;
	return this.INTERSECTED;
}
TcFrame.Stage3D.CameraController.prototype.animate=function(){//渲染函数，由主stage3D触发
	this.camera.lookAt(this.cameraLookAt);
	this.camera.position=this.getCameraPos();
	this.renderer.render(this.scene,this.camera);
}
TcFrame.Stage3D.CameraController.prototype.resize=function(){
	this.calcBorder();
	this.render();
	for(var n=0;n<this.children.length;n++){this.children[n].resize();}
	this.dispatch('onResize',{target:this});
	if(!TcFrame.WebGL){return;}
	this.renderer.setSize(this.width,this.height);
	this.camera=new THREE.PerspectiveCamera(33,1,1,10000);
	this.scene.add(this.camera);
}