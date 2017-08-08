var TcFrame=TcFrame||{};
TcFrame.Stage3D=function(param){
	//预设参数
	this.initializate(param);
	if(!TcFrame.WebGL){this.content.appendChild(TcFrame.Warning('浏览器不支持WebGL'));return;}
	if(param){
		this.cameraRadius=(param.cameraRadius!=null)?param.cameraRadius:1000; 
		this.cameraAngleA=(param.cameraAngleA!=null)?param.cameraAngleA:40;  			
		this.cameraAngleB=(param.cameraAngleB!=null)?param.cameraAngleB:45;  	
	}
	this.cameraHome={r:this.cameraRadius,a:this.cameraAngleA,b:this.cameraAngleB}
	var clearColor=(param.clearColor!=null)?param.clearColor:0x7f7f7f;
	var lightColor=(param.lightColor!=null)?param.lightColor:0xffffff;
	var backgroundMeshColor=(param.backgroundMeshColor!=null)?param.backgroundMeshColor:0xc8c8c8;
	//三维场景
	this.scene=new THREE.Scene();
	//摄像机
	this.camera=new THREE.CombinedCamera(100,100, 45, 1, 10000, -2000, 10000 );
	//选择器
	this.projector=new THREE.Projector();
	//渲染器
	this.renderer = new THREE.WebGLRenderer({preserveDrawingBuffer:true,clearColor:clearColor,clearAlpha:1});
	this.renderer.sortObjects = false;this.renderer.setSize(100,100);this.content.appendChild(this.renderer.domElement);
	//灯光
	this.directionalLight = new THREE.DirectionalLight(lightColor,1);
	this.pointLight = new THREE.PointLight(0xffffff,2);
	//网格
	this.backgroundMesh=new THREE.Mesh(
		new THREE.PlaneGeometry(5000,5000,100,100),
		new THREE.MeshBasicMaterial({color:backgroundMeshColor,wireframe:true,transparent:true})
	);
	this.backgroundMesh.id="help_grid";this.backgroundMesh.doubleSided=true;
	//坐标轴
	this.axis = new THREE.AxisHelper();this.axis.position.set(0,1,0);
	for(var n=0;n<this.axis.children.length;n++){this.axis.children[n].id="help_axis"+n;}
	this.axis.scale.x = this.axis.scale.y = this.axis.scale.z =2;
	//添加到舞台
	this.scene.add(this.camera);
	this.scene.add(this.directionalLight);
	this.scene.add(this.pointLight);
	if(param&&param.backgroundMeshShow){this.scene.add(this.backgroundMesh);}
	if(param&&param.axisShow){this.scene.add(this.axis);}	
	//挂接事件
	this.addEventListener('onMouseMove',this.mousemove);
	//初始化数组动画组
	var _this=this;
	this.animaticMeshes=[];
	this.staticMeshes=[];
	this.content.onmousewheel=function(event){_this.mousewheel(event.wheelDelta);return false;}
	//开始渲染	
	var animate=function(){requestAnimationFrame(animate);_this.animate();}
	animate();
}
TcFrame.Stage3D.prototype=new TcFrame.UIComponent();
TcFrame.Stage3D.prototype.type="TcFrame.Stage3D";
TcFrame.Stage3D.prototype.cameraRadius=1000;
TcFrame.Stage3D.prototype.cameraAngleA=40;  			
TcFrame.Stage3D.prototype.cameraAngleB=45;
TcFrame.Stage3D.prototype.cameraHome={r:0,a:0,b:0};  		
TcFrame.Stage3D.prototype.cameraLookAt={x:0,y:0,z:0};
TcFrame.Stage3D.prototype.cameraMoveSpeed=2;
TcFrame.Stage3D.prototype.movingCamera=false;
TcFrame.Stage3D.prototype.scalingCamera=false;

TcFrame.Stage3D.prototype.scene=null;
TcFrame.Stage3D.prototype.camera=null;
TcFrame.Stage3D.prototype.projector=null;
TcFrame.Stage3D.prototype.renderer=null;
TcFrame.Stage3D.prototype.directionalLight=null;
TcFrame.Stage3D.prototype.pointLight=null;
TcFrame.Stage3D.prototype.backgroundMesh=null;
TcFrame.Stage3D.prototype.axis=null;
TcFrame.Stage3D.prototype.cameraController=null;
TcFrame.Stage3D.prototype.fps=null;
TcFrame.Stage3D.prototype.animaticMeshes=null;
TcFrame.Stage3D.prototype.staticMeshes=null;

/*
	渲染舞台
*/
TcFrame.Stage3D.prototype.animate=function(){
	if(this.cameraController){this.cameraController.animate();}
	if(this.fps){this.fps.update();}
	this.camera.lookAt(this.cameraLookAt);
	this.camera.position=this.getCameraPos();
	this.renderer.render(this.scene,this.camera);
	this.directionalLight.position=this.camera.position;
	this.pointLight.position.x=this.camera.position.x*2;
	this.pointLight.position.z=this.camera.position.z*2;
	this.pointLight.position.y=this.camera.position.y*2;
	//渲染动画
	this.renderAnimaticMeshes();
	//派发事件
	this.dispatch('onAnimate',{target:this});
}
TcFrame.Stage3D.prototype.renderAnimaticMeshes=function(){
	if(this.animaticMeshes.length>0){
		for(var n=0;n<this.animaticMeshes.length;n++){	
			if(this.animaticMeshes[n].current>this.animaticMeshes[n].max){
				this.animaticMeshes[n].current=0;
			}
			for(var i=0;i<this.animaticMeshes[n].skin.morphTargetInfluences.length;i++){
				this.animaticMeshes[n].skin.morphTargetInfluences[i] = 0;
			}
			this.animaticMeshes[n].skin.morphTargetInfluences[Math.floor(this.animaticMeshes[n].current)] = 1;
			this.animaticMeshes[n].current+=this.animaticMeshes[n].speed;
		}	
	}	
}
/*
	渲染容器
*/
TcFrame.Stage3D.prototype.resize=function(){
	this.calcBorder();
	this.render();
	this.dispatch('onResize',{target:this});
	if(!TcFrame.WebGL){return;}
	this.renderer.setSize(this.width,this.height);
	this.camera=new THREE.CombinedCamera(this.width,this.height, 45, 1, 10000, -2000, 10000 );
	this.scene.add(this.camera);
}



/*
	UTF8 Support
*/
TcFrame.Stage3D.prototype.loadUtf8=function(param){
	var loader = new THREE.UTF8Loader();
	var _this  = this;
	loader.load(param.url,function(geometry){
		var material=new THREE.MeshLambertMaterial({
			color:param.color,
			map:(param.map!=null)?THREE.ImageUtils.loadTexture(param.map):null,//贴图纹理
			envMap:param.envMap,//反射纹理
			combine:THREE.MixOperation,//缝合方式
			reflectivity:param.reflectivity,//反光度
			shininess:param.shininess//光泽度
		});
		var obj=_this.packMesh(param,{core:new THREE.Mesh(geometry,material)});
		_this.scene.add(obj.core);
		_this.staticMeshes.push(obj);
		if(typeof(param.readyCallback)=='function'){param.readyCallback({target:obj});}
		
	},{});	
}
TcFrame.Stage3D.prototype.getUtf8ById=function(id){return this.getById(id,this.staticMeshes);}
TcFrame.Stage3D.prototype.removeUtf8ById=function(id){this.staticMeshes=this.removeById(id,this.staticMeshes);}
/*
	Obj Support
*/
TcFrame.Stage3D.prototype.loadObj=function(param){
	var loader = new THREE.OBJLoader();
	var _this=this;
	loader.load(param.url,function(mesh){
		var texture=(param.texture!=null)?THREE.ImageUtils.loadTexture(param.texture):null;
		for (var i=0;i<mesh.children.length;i++){mesh.children[i].material.map=texture;}
		var obj=_this.packMesh(param,{core:mesh});
		_this.scene.add(obj.core);
		_this.staticMeshes.push(obj);
		if(typeof(param.readyCallback)=='function'){param.readyCallback({target:obj});}
	});
}
TcFrame.Stage3D.prototype.getObjById=function(id){return this.getById(id,this.staticMeshes);}
TcFrame.Stage3D.prototype.removeObjById=function(id){this.staticMeshes=this.removeById(id,this.staticMeshes);}
/*
	Bin Support
*/
TcFrame.Stage3D.prototype.loadBin=function(param){
	if(!param){return}
	var loader = new THREE.BinaryLoader( true );
	var _this  = this;
	loader.load(param.url,function(geometry){
		if(param.materials&&param.materials.length){
			for (var i=0;i<param.materials.length;i++){geometry.materials[i]=param.materials[i];}
		}
		var obj=_this.packMesh(param,{core:new THREE.Mesh(geometry,new THREE.MeshFaceMaterial())});
		_this.scene.add(obj.core);
		_this.staticMeshes.push(obj);
		if(typeof(param.readyCallback)=='function'){param.readyCallback({target:obj});}
	});
}
TcFrame.Stage3D.prototype.getBinById=function(id){return this.getById(id,this.staticMeshes);}
TcFrame.Stage3D.prototype.removeBinById=function(id){this.staticMeshes=this.removeById(id,this.staticMeshes);}
/*
	CTM Support
*/
TcFrame.Stage3D.prototype.loadCtm=function(param){
	if(!param){return;}
	var loader = new THREE.CTMLoader(this.renderer.context );
	var _this=this;
	loader.load(
		param.url,
		function(geometry){
			var material = new THREE.MeshBasicMaterial({
				color:param.color,//主光颜色
				specular:param.specular,//反光颜色						
				map:(param.map!=null)?THREE.ImageUtils.loadTexture(param.map):null,//贴图纹理
				envMap:param.envMap,//反射纹理
				combine:THREE.MixOperation,//缝合方式
				reflectivity:param.reflectivity,//反光度
				shininess:param.shininess//光泽度
			});
			var obj=_this.packMesh(param,{core:new THREE.Mesh(geometry,material)});
			_this.scene.add(obj.core);
			_this.staticMeshes.push(obj);
			if(typeof(param.readyCallback)=='function'){param.readyCallback({target:obj});}
		},true,true
	);	
}
TcFrame.Stage3D.prototype.getCtmById=function(id){return this.getById(id,this.staticMeshes);}
TcFrame.Stage3D.prototype.removeCtmById=function(id){this.staticMeshes=this.removeById(id,this.staticMeshes);}
/*
	Collada Support
*/
TcFrame.Stage3D.prototype.loadCollada=function(param){
	if(!param||!this.scene){return;}
	var loader = new THREE.ColladaLoader();
	var _this=this;
	var obj={};
	loader.options.convertUpAxis = true;
	loader.load(param.url,function colladaReady(collada){
		var obj=_this.packMesh(param,{core:collada.scene});
		obj.skin = collada.skins[0];
		obj.core.updateMatrix();
		obj.speed=param.speed||0.5;
		obj.max=param.totalFrame||obj.skin.morphTargetInfluences.length-1;
		obj.current=0;
		_this.scene.add(obj.core);
		_this.animaticMeshes.push(obj);
		if(typeof(param.readyCallback)=='function'){param.readyCallback({target:obj});}
	});
}
TcFrame.Stage3D.prototype.getColladaById=function(id){return this.getById(id,this.animaticMeshes);}
TcFrame.Stage3D.prototype.removeColladaById=function(id){this.animaticMeshes=this.removeById(id,this.animaticMeshes);}



/*
	鼠标拖动控制摄像机
*/
TcFrame.Stage3D.prototype.mousemove=function(event){
	_this=event.target;
	if(TcFrame.MouseDown&&_this.movingCamera){
		_this.setCameraLookAt(
			TcFrame.MousePosition[0]-TcFrame.MousePositionLast[0],
			TcFrame.MousePosition[1]-TcFrame.MousePositionLast[1]
		);
	}
	if(TcFrame.MouseDown&&_this.scalingCamera){
		_this.setCameraRadius(TcFrame.MousePosition[0]-TcFrame.MousePositionLast[0]);
	}
}
TcFrame.Stage3D.prototype.mousewheel=function(value){
	this.cameraRadius+=-0.2*this.cameraRadius*value*this.cameraMoveSpeed/this.width;
	this.camera.position=this.getCameraPos();
}
/*
	设置摄像机祥光参数
*/
TcFrame.Stage3D.prototype.setCameraRadius=function(dx){
	this.cameraRadius+=this.cameraRadius*dx/this.width/this.cameraMoveSpeed;
	this.camera.position=this.getCameraPos();	
}
TcFrame.Stage3D.prototype.setCameraLookAt=function(dx,dy){
	dx=this.cameraRadius*dx*this.cameraMoveSpeed*0.2/this.width;
	dy=this.cameraRadius*dy*this.cameraMoveSpeed*0.2/this.height;
	if(Math.abs(this.cameraAngleA)>5){
		this.cameraLookAt.x-=Math.sin(Math.PI*this.cameraAngleB/180)*dx;
		this.cameraLookAt.z+=Math.cos(Math.PI*this.cameraAngleB/180)*dx;
		this.cameraLookAt.x-=Math.cos(Math.PI*this.cameraAngleB/180)*dy*Math.abs(this.camera.position.y)/this.camera.position.y;
		this.cameraLookAt.z-=Math.sin(Math.PI*this.cameraAngleB/180)*dy*Math.abs(this.camera.position.y)/this.camera.position.y;
	}else{
		this.cameraLookAt.x-=Math.sin(Math.PI*this.cameraAngleB/180)*dx;
		this.cameraLookAt.z+=Math.cos(Math.PI*this.cameraAngleB/180)*dx;
		this.cameraLookAt.y+=dy;
	}
	this.camera.position=this.getCameraPos();	
}
TcFrame.Stage3D.prototype.toA=function(dx){//A  取值 -89～89
	var dy=this.cameraMoveSpeed*dx*90/Math.PI/this.height;
	if(this.cameraAngleA<90&&this.cameraAngleA+dy>90){dy=0}
	if(this.cameraAngleA>-90&&this.cameraAngleA+dy<-90){dy=0}
	this.cameraAngleA=this.cameraAngleA+dy;
	this.camera.position=this.getCameraPos();
	if(this.cameraController){
		this.cameraController.cameraAngleA=this.cameraAngleA;
		this.cameraController.camera.position=this.cameraController.getCameraPos();
	}	
}
TcFrame.Stage3D.prototype.resetCamera=function(){
	this.cameraRadius=this.cameraHome.r;
	this.cameraAngleA=this.cameraHome.a;
	this.cameraAngleB=this.cameraHome.b;
	this.cameraLookAt={x:0,y:0,z:0};
	if(this.cameraController){
		this.cameraController.cameraAngleA=this.cameraAngleA;
		this.cameraController.cameraAngleB=this.cameraAngleB;
	}
	this.animate();this.animate();
}
TcFrame.Stage3D.prototype.toB=function(dx){//B  取值 0～360
	this.cameraAngleB+=this.cameraMoveSpeed*dx*90/Math.PI/this.width;
	if(this.cameraAngleB>360){this.cameraAngleB-=360;}
	if(this.cameraAngleB<0){this.cameraAngleB=360+this.cameraAngleB;}
	this.camera.position=this.getCameraPos();
	if(this.cameraController){
		this.cameraController.cameraAngleB=this.cameraAngleB;
		this.cameraController.camera.position=this.cameraController.getCameraPos();
	}
}
TcFrame.Stage3D.prototype.cameraAngleTo=function(to,type){
	_this=this;
	if(type=="A"){
		var old=this.cameraAngleA;
		var step=Math.abs(old-to)/10;
		if(step<1){
			this.cameraAngleA=to;
			this.camera.position=this.getCameraPos();
			if(this.cameraController){
				this.cameraController.cameraAngleA=to;
				this.cameraController.camera.position=this.cameraController.getCameraPos();
			}
			return;
		}
		if(old>to){this.cameraAngleA-=step;}else{this.cameraAngleA+=step;}
		this.camera.position=this.getCameraPos();
		if(this.cameraController){
			this.cameraController.cameraAngleA=this.cameraAngleA;
			this.cameraController.camera.position=this.cameraController.getCameraPos();
		}
		setTimeout(function(){_this.cameraAngleTo(to,type)},5);
	}
	if(type=="B"){
		var old=this.cameraAngleB;
		var step=Math.abs(old-to)/10;
		if(step<1){
			this.cameraAngleB=to;
			this.camera.position=this.getCameraPos();
			if(this.cameraController){
				this.cameraController.cameraAngleB=to;
				this.cameraController.camera.position=this.cameraController.getCameraPos();
			}
			return;
		}
		if(old>to){this.cameraAngleB-=step;}else{this.cameraAngleB+=step;}
		this.camera.position=this.getCameraPos();
		if(this.cameraController){
			this.cameraController.cameraAngleB=this.cameraAngleB;
			this.cameraController.camera.position=this.cameraController.getCameraPos();
		}
		setTimeout(function(){_this.cameraAngleTo(to,type);},5);
	}
}
TcFrame.Stage3D.prototype.getCameraPos=function(){
	var y=this.cameraRadius*Math.sin(Math.PI*this.cameraAngleA/180);
	var x=this.cameraRadius*Math.cos(Math.PI*this.cameraAngleA/180)*Math.cos(Math.PI*this.cameraAngleB/180);
	var z=this.cameraRadius*Math.cos(Math.PI*this.cameraAngleA/180)*Math.sin(Math.PI*this.cameraAngleB/180);
	if(Math.abs(this.cameraAngleA)<5){
		this.backgroundMesh.rotation.z=Math.PI*0.5-Math.PI*this.cameraAngleB/180;
		this.backgroundMesh.rotation.x=Math.PI*1.5;
	}else{
		this.backgroundMesh.rotation.z=0;
		this.backgroundMesh.rotation.x=0;
	}
	return {x:x+this.cameraLookAt.x,y:y+this.cameraLookAt.y,z:z+this.cameraLookAt.z};
}
/*
	基本物体操作库
*/
TcFrame.Stage3D.prototype.getById=function(id,arr){
	if(id==null||arr==null||!arr.length){return null;}
	for(var n=0;n<arr.length;n++){if(arr[n].id==id){return arr[n];}}
	return null;
}
TcFrame.Stage3D.prototype.removeById=function(id,arr){
	if(id==null||arr==null||!arr.length){return [];}
	var newarr=[];
	for(var n=0;n<arr.length;n++){
		if(arr[n].id==id){
			this.scene.remove(arr[n].core);
		}else{
			newarr.push(arr[n]);	
		}
	}
	return newarr;
}
//将生成的物体封装后返回
TcFrame.Stage3D.prototype.packMesh=function(param,obj){
	obj.id=param.id;
	obj.core.scale.x=obj.core.scale.y=obj.core.scale.z=param.scale||1;
	obj.core.position.x=param.x||0;
	obj.core.position.y=param.y||0;
	obj.core.position.z=param.z||0;
	obj.core.rotation.x=param.rx||0;
	obj.core.rotation.y=param.ry||0;
	obj.core.rotation.z=param.rz||0;
	return obj;
}