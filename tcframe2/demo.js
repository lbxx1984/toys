function demoStage3D(){
	demoContainer.removeAll();
	//3D舞台，摄像机控制机及各种按钮
	var stage3d=new TcFrame.Stage3D({
		left:5,top:5,right:5,bottom:30,backgroundMeshColor:0xc2c2c2,clearColor:0xf1f1f1,
		cameraAngleA:20,cameraAngleB:45,cameraRadius:1000,
		backgroundMeshShow:true,axisShow:true
	});
	var cameraController=new TcFrame.Stage3D.CameraController({
		right:10,bottom:30,width:100,height:100,
		cameraAngleA:20,cameraAngleB:45
	});
	var fps=new TcFrame.Stage3D.FPS({width:100,height:60,right:5,top:5});
	var dropdownlist=new TcFrame.DropDownList({left:5,bottom:3,height:27,width:120});
	var btnStartMove=new TcFrame.Button({label:'开始旋转',left:124,bottom:5,height:25,width:60});
	var btnFinishMove=new TcFrame.Button({label:'停止旋转',left:184,bottom:5,height:25,width:60});
	var btnDel=new TcFrame.Button({label:'删除物体',left:244,bottom:5,height:25,width:60});
	var carColor=new TcFrame.DropDownList({left:304,bottom:3,height:27,width:150});
	var timer=new TcFrame.Timer({delay:100});
	var core=null;
	//预设模型材质
	var path = "assets/textures/cube/pisa/";
	var cubeArr=[path+'px.png',path+'nx.png',path+'py.png',path+'ny.png',path+'pz.png',path+'nz.png'];
	var textureCube=THREE.ImageUtils.loadTextureCube(cubeArr);
	var mlib={
		"Orange":new THREE.MeshLambertMaterial({color:0xff6600,ambient:0xff2200,envMap:textureCube,reflectivity:0.3}),
		"Blue":new THREE.MeshLambertMaterial({color:0x001133,ambient:0x001133,envMap:textureCube,reflectivity:0.3}),
		"Red":new THREE.MeshLambertMaterial({color:0x660000,ambient:0x330000,envMap:textureCube,reflectivity:0.25}),
		"Black":new THREE.MeshLambertMaterial({color:0x000000,ambient:0x000000,envMap:textureCube,reflectivity:0.15}),
		"White":new THREE.MeshLambertMaterial({color:0xffffff,ambient:0x666666,envMap:textureCube,reflectivity:0.25}),
		"Carmine":new THREE.MeshPhongMaterial({color:0x770000,specular:0xffaaaa,envMap:textureCube}),
		"Gold":new THREE.MeshPhongMaterial({color:0xaa9944,specular:0xbbaa99,shininess:50,envMap:textureCube}),
		"Bronze":new THREE.MeshPhongMaterial({color:0x150505,specular:0xee6600,envMap:textureCube,reflectivity:0.25}),
		"Chrome":new THREE.MeshPhongMaterial({color:0xffffff,specular:0xffffff,envMap:textureCube,combine:THREE.Multiply}),
		"Orange metal":new THREE.MeshLambertMaterial({color:0xff6600,ambient:0xff2200,envMap:textureCube}),
		"Blue metal":new THREE.MeshLambertMaterial({color:0x001133,ambient:0x002266,envMap:textureCube}),
		"Red metal":new THREE.MeshLambertMaterial({color:0x770000,envMap:textureCube}),
		"Green metal":new THREE.MeshLambertMaterial({color:0x007711,envMap:textureCube}),
		"Black metal":new THREE.MeshLambertMaterial({color:0x222222,envMap:textureCube}),
		"Pure chrome":new THREE.MeshLambertMaterial({color:0xffffff,envMap:textureCube}),
		"Dark chrome":new THREE.MeshLambertMaterial({color:0x444444,envMap:textureCube}),
		"Darker chrome":new THREE.MeshLambertMaterial({color:0x222222,envMap:textureCube}),
		"Black glass":new THREE.MeshLambertMaterial({color:0x101016,envMap:textureCube,opacity:0.975,transparent:true}),
		"Dark glass":new THREE.MeshLambertMaterial({color:0x101046,envMap:textureCube,opacity:0.25,transparent:true}),
		"Blue glass":new THREE.MeshLambertMaterial({color:0x668899,envMap:textureCube,opacity:0.75,transparent:true}),
		"Light glass":new THREE.MeshBasicMaterial({color:0x223344,envMap:textureCube,opacity:0.25,reflectivity:0.25}),
		"Red glass":new THREE.MeshLambertMaterial({color:0xff0000,opacity:0.75,transparent:true}),
		"Yellow glass":new THREE.MeshLambertMaterial({color:0xffffaa,opacity:0.75,transparent:true}),
		"Orange glass":new THREE.MeshLambertMaterial({color:0x995500,opacity:0.75,transparent:true}),
		"Orange glass 50":new THREE.MeshLambertMaterial({color:0xffbb00,opacity:0.5,transparent:true}),
		"Red glass 50":new THREE.MeshLambertMaterial({color:0xff0000,opacity:0.5,transparent:true}),
		"Fullblack rough":new THREE.MeshLambertMaterial({color:0x000000}),
		"Black rough":new THREE.MeshLambertMaterial({color:0x050505}),
		"Darkgray rough":new THREE.MeshLambertMaterial({color:0x090909}),
		"Red rough":new THREE.MeshLambertMaterial({color:0x330500}),
		"Darkgray shiny":new THREE.MeshPhongMaterial({color:0x000000,specular:0x050505}),
		"Gray shiny":new THREE.MeshPhongMaterial({color:0x050505,shininess:20})
	}
	var dataArr=[];for(var key in mlib){dataArr.push({id:key,label:key});}
	
	stage3d.cameraController=cameraController;
	stage3d.fps=fps;
	cameraController.controlStage=stage3d;
	
	dropdownlist.dataProvider([
		{id:'0',label:"请选择"},
		{id:'_a_1',label:"怪兽Collada"},
		{id:'_s_2',label:"人面雕像CTM"},
		{id:'_s_3',label:"运动员雕像CTM"},
		{id:'_s_4',label:"沉睡男人CTM"},
		{id:'_s_gallardo',label:"兰博基尼BIN"},
		{id:'_s_veyron',label:"布加迪BIN"},
		{id:'_s_f50',label:"法拉利BIN"},
		{id:'_s_camaro',label:"雪弗兰BIN"},
		{id:'_s_male02',label:"男士BIN"},
		{id:'_s_female02',label:"女士BIN"},
		{id:'_s_male01',label:"男士OBJ"},
		{id:'_s_female01',label:"女士OBJ"},
		{id:'_s_hand',label:"运动员雕像UTF8"}
	]);
	carColor.dataProvider(dataArr);
	
	timer.func=function(){
		if(!core){return;}
		core.core.rotation.y+=Math.PI/180;
		if(core.core.rotation.y>Math.PI*2){core.core.rotation.y-=Math.PI*2;}	
	}
	function deleteCore(){
		if(core){
			if(core.id.indexOf('_a_')>-1){stage3d.removeColladaById(core.id);}
			if(core.id.indexOf('_s_')>-1){stage3d.removeCtmById(core.id);}
			core=null;	
		}	
	}
	function callback(event){core=event.target;}
	
	function addCar(car,color){
		deleteCore();
		if(car=='_s_veyron'){
			stage3d.loadBin({
				id:car,url:'assets/models/bins/veyron/VeyronNoUv_bin.js',
				materials:[
					mlib["Black rough"],	// tires + inside
					mlib["Pure chrome"],	// wheels + extras chrome
					mlib[color], 			// back / top / front torso
					mlib["Dark glass"],		// glass
					mlib["Pure chrome"],	// sides torso
					mlib["Pure chrome"],	// engine
					mlib["Red glass 50"],	// backlights
					mlib["Orange glass 50"]	// backsignals
				],
				envMap:textureCube,
				y:70,ry:45*Math.PI/180,scale:2,
				readyCallback:callback
			});	
		}else if(car=="_s_f50"){
			stage3d.loadBin({
				id:car,url:'assets/models/bins/f50/F50NoUv_bin.js',
				materials:[
					mlib[ "Dark chrome" ], 		// interior + rim
					mlib[ "Pure chrome" ], 		// wheels + gears chrome
					mlib[ "Blue glass" ], 		// glass
					mlib[color], 				// torso mid + front spoiler
					mlib[ "Darkgray shiny" ], 	// interior + behind seats
					mlib[ "Darkgray shiny" ], 	// tiny dots in interior
					mlib[color], 				// back torso
					mlib[color], 				// right mirror decal
					mlib[color], 				// front decal
					mlib[color], 				// front torso
					mlib[color], 				// left mirror decal
					mlib[ "Pure chrome" ], 		// engine
					mlib[ "Darkgray rough" ],	// tires side
					mlib[ "Darkgray rough" ],	// tires bottom
					mlib[ "Darkgray shiny" ], 	// bottom
					mlib[ "Black rough" ],		// ???
					mlib[ "Orange glass" ],		// front signals
					mlib[ "Dark chrome" ], 		// wheels center
					mlib[ "Red glass" ], 		// back lights
					mlib[ "Black rough" ], 		// ???
					mlib[ "Red rough" ], 		// seats
					mlib[ "Black rough" ], 		// back plate
					mlib[ "Black rough" ], 		// front light dots
					mlib[color], 				// back torso
					mlib[color] 				// back torso center
				],
				envMap:textureCube,
				y:70,ry:45*Math.PI/180,scale:0.07,
				readyCallback:callback
			});		
		}else if(car=="_s_camaro"){
			stage3d.loadBin({
				id:car,url:'assets/models/bins/camaro/CamaroNoUv_bin.js',
				materials:[
					mlib[ color], 				// car body
					mlib[ "Pure chrome" ], 		// wheels chrome
					mlib[ "Pure chrome" ], 		// grille chrome
					mlib[ "Dark chrome" ], 		// door lines
					mlib[ "Light glass" ], 		// windshield
					mlib[ "Gray shiny" ],        // interior
					mlib[ "Black rough" ],       // tire
					mlib[ "Fullblack rough" ],   // tireling
					mlib[ "Fullblack rough" ]    // behind grille
				],
				envMap:textureCube,
				y:100,ry:45*Math.PI/180,scale:30,
				readyCallback:callback
			});
		}else if(car=="_s_gallardo"){
			stage3d.loadBin({
				id:car,url:'assets/models/bins/gallardo/GallardoNoUv_bin.js',
				materials:[
					mlib[ "Pure chrome" ], 	// wheels chrome
					mlib[ "Black rough" ],  // tire
					mlib[ "Black glass" ], 	// windshield
					mlib[ color ], 			// body
					mlib[ "Red glass" ],    // back lights
					mlib[ "Yellow glass" ], // front lights
					mlib[ "Dark chrome" ]	// windshield rim	
				],
				envMap:textureCube,
				y:70,ry:45*Math.PI/180,scale:1.5,
				readyCallback:callback
			});
		}
	}
	carColor.addEventListener('onChange',function(event){if(!core){return};addCar(core.id,event.target.currentSelected.id)});
	dropdownlist.addEventListener('onChange',function(event){
		var id=event.target.currentSelected.id;
		if(id=='0'){return;}
		deleteCore();
		switch(id){
			case '_a_1':
				stage3d.loadCollada({
					id:id,url:'assets/models/collada/monster.dae',
					speed:0.7,scale:0.2,totalFrame:30,
					x:-100,y:0,z:0,rx:0,ry:0,rz:0,
					readyCallback:callback
				});break;
			case '_s_2':
				stage3d.loadCtm({
					id:id,url:'assets/models/ctm/WaltHead.ctm',
					envMap:textureCube,
					color:0xffffff,reflectivity:0.2,y:200,ry:45*Math.PI/180,scale:5,specular: 0xffffff, 
					readyCallback:callback
				});break;	
			case '_s_3':
				stage3d.loadCtm({
					id:id,url:'assets/models/ctm/ben.ctm',
					map:'assets/textures/uv.jpg',
					//envMap:textureCube,//加上这句就有金属质感了
					color:0xffffff,reflectivity:0.5,y:-50,ry:45*Math.PI/180,scale:500,specular: 0x444444, 
					readyCallback:callback
				});	break;
			case '_s_4':
				stage3d.loadCtm({
					id:id,url:'assets/models/ctm/LeePerry.ctm',
					map:'assets/textures/Map-COL.jpg',
					//envMap:textureCube,//加上这句就有金属质感了
					color:0xffffff,reflectivity:0.3,x:100,z:100,y:200,ry:45*Math.PI/180,scale:800,
					specular: 0x444444, shininess: 30, 
					readyCallback:callback
				});	break;
			case '_s_veyron':
				addCar(id,"Blue metal");break;
			case '_s_f50':
				addCar(id,"Red");break;	
			case '_s_camaro':
				addCar(id,"Red rough");break;
			case '_s_gallardo':
				addCar(id,"Gray shiny");break;	
			case '_s_male02':
				stage3d.loadBin({
					id:id,url:'assets/models/bins/male02/Male02_bin.js',
					y:0,ry:90*Math.PI/180,scale:2,
					readyCallback:callback
				});	break;	
			case '_s_female02':
				stage3d.loadBin({
					id:id,url:'assets/models/bins/female02/Female02_bin.js',
					y:0,ry:45*Math.PI/180,scale:2,
					readyCallback:callback
				});break;
			case '_s_male01':
				stage3d.loadObj({
					id:id,url:"assets/models/obj/male/male02.obj",
					texture:"assets/textures/uv.jpg",
					y:0,ry:90*Math.PI/180,scale:2,
					readyCallback:callback	
				});	break;
			case '_s_female01':
				stage3d.loadObj({
					id:id,url:"assets/models/obj/female/female02.obj",
					texture:"assets/textures/uv.jpg",
					y:0,ry:45*Math.PI/180,scale:2,
					readyCallback:callback	
				});break;
			case '_s_hand':
				stage3d.loadUtf8({
					id:id,url:"assets/models/utf8/ben.utf8",
					color:0x3399ff,	
					map:'assets/textures/uv.jpg',
					//envMap:textureCube,//加上这句就有金属质感了
					y:0,ry:0*Math.PI/180,scale:350,
					readyCallback:callback
				});break;			
			default:break;	
		}
	});
	btnStartMove.addEventListener('onClick',function(){timer.start()});
	btnFinishMove.addEventListener('onClick',function(){timer.stop()});
	btnDel.addEventListener('onClick',function(){deleteCore()});
	demoContainer.add(stage3d);
	demoContainer.add(cameraController);
	demoContainer.add(fps);
	demoContainer.add(dropdownlist);
	demoContainer.add(btnStartMove);
	demoContainer.add(btnFinishMove);
	demoContainer.add(btnDel);
	demoContainer.add(carColor);
}
function demoShortConnection(){
	demoContainer.removeAll();
	var labelid=new TcFrame.Label({left:10,top:10,text:"id:",width:100,height:25,align:"right"});
	var labelparam=new TcFrame.Label({left:10,top:40,text:"param:",width:100,height:25,align:"right"});
	var inputid=new TcFrame.TextInput({left:120,top:10,width:100,height:25});
	var inputparam=new TcFrame.TextInput({left:120,top:40,width:100,height:25});
	var btnget=new TcFrame.Button({left:10,top:70,width:100,height:25,label:"GET请求"});	
	var btnpost=new TcFrame.Button({left:120,top:70,width:100,height:25,label:"POST请求"});	
	var shortConnection=new TcFrame.ShortConnection();
	var uploader=new TcFrame.Uploader({
		left:10,top:100,width:210,height:25,
		toFile:"../upload/",
		loader:"php/uploader.php"
	});
	uploader.setStyle('backgroundColor',"#ff0000");
	shortConnection.addEventListener('onError',function(event){alert(event.type);});
	function getReady(response){alert(response);}
	function get(){
		shortConnection.get({
			url:"php/GetDemo.php",
			data:{id:inputid.value,param:inputparam.value},
			readyFunc:getReady
		});
	}
	function post(){
		shortConnection.post({
			url:"php/PostDemo.php",
			data:"id="+inputid.value+"&param="+inputparam.value,
			readyFunc:getReady
		});	
	}
	btnget.addEventListener('onClick',get);
	btnpost.addEventListener('onClick',post);
	uploader.addEventListener('onComplete',function(event){
		TcFrame.Alert.show({title:"上传完成",text:"图片地址:<br>"+event.url});	
	});
	uploader.addEventListener('onError',function(event){
		TcFrame.Alert.show({title:"上传失败",text:event.message});	
	});
	demoContainer.add(labelid);
	demoContainer.add(labelparam);
	demoContainer.add(inputid);
	demoContainer.add(inputparam);
	demoContainer.add(btnget);
	demoContainer.add(btnpost);
	demoContainer.add(uploader);
}
function demoStage2D(){
	demoContainer.removeAll();
	//声明组件
	var stage2d=new TcFrame.Stage2D({left:140,right:5,top:5,bottom:5});
	var list=new TcFrame.List({top:0,bottom:5,left:0,width:130});
	list.dataProvider([
		{id:"1",label:"清空"},
		{id:"2",label:"显示小坐标格"},
		{id:"3",label:"显示大坐标格"},
		{id:"4",label:"隐藏小坐标格"},
		{id:"5",label:"隐藏大坐标格"},
		{id:"6",label:"直线"},
		{id:"7",label:"圆弧"},
		{id:"8",label:"二次贝塞尔曲线"},
		{id:"9",label:"三次贝塞尔曲线"},
		{id:"10",label:"多边形"},
		{id:"11",label:"K线"},
		{id:"12",label:"圆形"},
		{id:"13",label:"椭圆"},
		{id:"14",label:"扇形"},
		{id:"15",label:"环扇"},
		{id:"16",label:"矩形"}
	]);
	function doCommand(event){
		switch(event.target.currentSelect.id){
			case "1":stage2d.removeAll();break;
			case "2":stage2d.showBackgroundMesh(1);break;
			case "3":stage2d.showBackgroundBigMesh(1);break;
			case "4":stage2d.showBackgroundMesh(0);break;
			case "5":stage2d.showBackgroundBigMesh(0);break;
			case "6":
				stage2d.Line({strokeStyle:"#ff0000",lineWidth:2,data:[[0,0],[100,100],[200,100],[50,250]]});break;
			case "7":
				stage2d.Arc({strokeStyle:"#ff00ff",lineWidth:2,x:200,y:200,radius:150,startAngle:0,endAngle:Math.PI*0.45,fill:false});break;	
			case "8":
				stage2d.QuadraticCurve({strokeStyle:"#00ff00",fromX:200,fromY:100,toX:300,toY:200,cpx:300,cpy:50,fill:false});break;
			case "9":
				stage2d.BezierCurve({strokeStyle:"#00ffff",fromX:200,fromY:100,toX:300,toY:200,cpx1:300,cpy1:50,cpx2:50,cpy2:300,fill:false});break;
			case "10":
				stage2d.Polygon({fillStyle:"rgba(250,33,79,0.5)",stroke:false,data:[[0,0],[200,100],[200,100],[50,250]]});break;	
			case "11":
				stage2d.Candlestick({x:150,begin:110,end:150,top:90,bottom:160,width:10});break;
			case "12":
				stage2d.Circle({fillStyle:"rgba(250,33,250,0.5)",stroke:false,radius:100,x:200,y:200});break;	
			case "13":
				stage2d.Ellipse({fillStyle:"rgba(35,133,79,0.5)",stroke:false,x:300,y:200,a:100,b:50});break;
			case "14":
				stage2d.Sector({fillStyle:"rgba(0,33,250,0.5)",stroke:false,x:400,y:200,radius:150,startAngle:0,endAngle:Math.PI*1.5});break;
			case "15":
				stage2d.RingSector({fillStyle:"rgba(36,33,179,0.5)",stroke:false,x:300,y:300,internalDiameter:50,outsideDiameter:100, startAngle:Math.PI*0.5,endAngle:Math.PI*1.2});break;
			case "16":
				stage2d.Rectangle({fillStyle:"rgba(0,133,179,0.5)",stroke:false,x:100,y:50,width:200,height:200});break;
			default:break;
		}
	}
	list.addEventListener('onChange',doCommand);	
	//添加到舞台
	demoContainer.add(stage2d);
	demoContainer.add(list);
}
function demoPieChart(){
	demoContainer.removeAll();
	//声明组件
	var PieChart=new TcFrame.PieChart({x:5,y:10,width:990,height:400,title:"饼型数据图"});	
	//导入数据
	PieChart.dataProvider([
		{text:"数据1",color:"#4472c4",value:0.2},
		{text:"数据2",color:"#ffc000",value:0.2},
		{text:"数据3",color:"#a5a5a5",value:0.15},
		{text:"数据4",color:"#ed7d31",value:0.1},
		{text:"数据5",color:"#5b9bd5",value:0.1},
		{text:"数据6",color:"#92d050",value:0.05},
		{text:"数据7",color:"#7030a0",value:0.1},
		{text:"数据8",color:"#c00000",value:0.1}
	]);
	//添加到舞台
	demoContainer.add(PieChart);
}
function demoRingChart(){
	demoContainer.removeAll();
	//声明组件
	var RingChart=new TcFrame.RingChart({x:5,y:10,width:990,height:400,title:"环型数据图"});
	RingChart.dataProvider([
		{text:"数据1",color:"#4472c4",value:0.2},
		{text:"数据2",color:"#ffc000",value:0.2},
		{text:"数据3",color:"#a5a5a5",value:0.15},
		{text:"数据4",color:"#ed7d31",value:0.1},
		{text:"数据5",color:"#5b9bd5",value:0.1},
		{text:"数据6",color:"#92d050",value:0.05},
		{text:"数据7",color:"#7030a0",value:0.1},
		{text:"数据8",color:"#c00000",value:0.1}
	]);
	//添加到舞台
	demoContainer.add(RingChart);
}
function demoPlotChart(){
	demoContainer.removeAll();
	//声明组件
	var PlotChart=new TcFrame.PlotChart({
		x:5,y:10,width:990,height:400,title:"动物个体分布图",
		minX:0,valueOfPixX:1,
		minY:0,valueOfPixY:1,
		backgroundMeshShow:true,autoFillAxisX:true,autoFillAxisY:true,
		comments:["X:海拔","Y:光照"]
	});
	//导入数据
	var data=[
		{label:"猴子",type:"box",color:"rgba(51,153,255,0.8)",data:[]},
		{label:"狼",type:"circle",color:"rgba(255,0,0,0.5)",data:[]},
		{label:"熊",type:"box",color:"rgba(255,255,0,0.5)",data:[]},
		{label:"兔子",type:"circle",color:"rgba(0,0,50,0.5)",data:[]}
	]
	for(var n=0;n<5;n++){data[0].data.push([parseInt(Math.random()*100),parseInt(Math.random()*300)]);}
	for(var n=0;n<5;n++){data[1].data.push([parseInt(Math.random()*100)+100,parseInt(Math.random()*300)]);}
	for(var n=0;n<5;n++){data[2].data.push([parseInt(Math.random()*100)+350,parseInt(Math.random()*300)]);}
	for(var n=0;n<5;n++){data[3].data.push([parseInt(Math.random()*600),parseInt(Math.random()*300)]);}
	PlotChart.dataProvider(data);
	//添加到舞台
	demoContainer.add(PlotChart);
}
function demoCandlestickChart(){
	demoContainer.removeAll();
	//声明组件
	var CandlestickChart=new TcFrame.CandlestickChart({
		x:5,y:10,width:990,height:400,title:"股市K线图",
		minXDate:new Date(2013,1,1,0,0,0,0),timeOfPixX:0.1,minY:500,valueOfPixY:5,unitOfx:"day",
		backgroundBigMeshShow:false,backgroundMeshShow:true,
		autoFillAxisX:true,autoFillAxisY:true,
		comments:["X:2013年2月","Y:上证综指（点）"]
	});
	//导入数据
	var arr=[];var begin=1000;
	for(var n=0;n<70;n++){
		var obj={width:8,x:n*10+5};
		obj.begin=begin;
		obj.end=obj.begin+parseInt(Math.random()*200)-100;
		obj.top=Math.max(obj.begin,obj.end)+parseInt(Math.random()*100);
		obj.bottom=Math.min(obj.begin,obj.end)-parseInt(Math.random()*100);
		arr.push(obj);
		begin=obj.end;
		obj.begin+=300;obj.end+=300;obj.top+=300;obj.bottom+=300;
	}
	CandlestickChart.dataProvider(arr);
	//添加到舞台
	demoContainer.add(CandlestickChart);
}	

function demoLineChart(){
	demoContainer.removeAll();
	//声明组件
	var LineChart=new TcFrame.LineChart({
		x:5,y:10,width:990,height:400,
		minX:0,valueOfPixX:1,minY:0,valueOfPixY:5,title:"部门利润曲线图",
		backgroundBigMeshShow:true,backgroundMeshShow:true,
		autoFillAxisX:true,autoFillAxisY:true,
		comments:["X:时间（月）","Y:利润（万元）"]
	});
	//导入数据
	LineChart.dataProvider([
		{label:"总体",color:"rgba(51,153,255,0.8)",lineWidth:2,data:[
			[0,1000],[100,1300],[200,1200],[300,1000],
			[400,1150],[500,890],[600,800],[700,920]
		]},
		{label:"部门3",color:"rgba(255,0,0,0.5)",lineWidth:3,data:[
			[0,500],[100,300],[200,150],[300,450],
			[400,480],[500,620],[600,1000],[700,900]
		]},
		{label:"部门1",color:"rgba(255,255,0,0.5)",lineWidth:1,data:[
			[0,450],[100,400],[200,350],[300,300],
			[400,350],[500,370],[600,400],[700,300]
		]},
		{label:"部门2",color:"rgba(0,0,50,0.5)",lineWidth:4,data:[
			[0,350],[100,300],[200,250],[300,200],
			[400,250],[500,270],[600,300],[700,200]
		]}
	]);
	//添加到舞台
	demoContainer.add(LineChart);
}

function demoColumnChart(){
	demoContainer.removeAll();
	//声明组件
	var ColumnChart=new TcFrame.ColumnChart({
		x:5,y:10,width:990,height:400,
		minY:0,valueOfPixY:5,title:"部门利润图",
		backgroundBigMeshShow:true,backgroundMeshShow:true,
		autoFillAxisX:false,autoFillAxisY:true,
		comments:["Y:利润（万元）"]
	});
	//导入数据
	var data={column:[],row:[]};
	data.column.push({text:"部门1",color:"#FF0000"});
	data.column.push({text:"部门2",color:"#333"});
	data.column.push({text:"部门3",color:"#3E6DB5"});
	data.row.push({text:"一月",width:80,height:20,data:[500,600,400]});
	data.row.push({text:"二月",width:80,height:20,data:[600,800,500]});
	data.row.push({text:"三月",width:80,height:20,data:[400,700,300]});
	data.row.push({text:"四月",width:80,height:20,data:[600,1200,900]});
	data.row.push({text:"五月",width:80,height:20,data:[600,1200,900]});
	data.row.push({text:"六月",width:80,height:20,data:[600,1200,900]});
	data.row.push({text:"七月",width:80,height:20,data:[600,1200,900]});
	data.row.push({text:"八月",width:80,height:20,data:[600,1200,900]});
	data.row.push({text:"九月",width:80,height:20,data:[600,1200,900]});
	data.row.push({text:"十月",width:80,height:20,data:[600,1200,900]});
	data.row.push({text:"十一月",width:80,height:20,data:[600,1200,900]});
	data.row.push({text:"十二月",width:80,height:20,data:[600,1200,900]});
	ColumnChart.dataProvider(data);
	//添加到舞台
	demoContainer.add(ColumnChart);
}
function demoAreaChart(){
	demoContainer.removeAll();
	//声明组件
	var areaChart=new TcFrame.AreaChart({
		x:5,y:10,width:990,height:400,
		minX:0,valueOfPixX:1,minY:0,valueOfPixY:5,title:"部门利润图",
		backgroundMeshShow:true,autoFillAxisX:true,autoFillAxisY:true,
		comments:["X:时间（月）","Y:利润（万元）"]
	});
	//导入数据
	areaChart.dataProvider([
		{label:"总体",color:"rgba(51,153,255,0.8)",data:[[0,1000],[100,1300],[200,1200],[300,1000],[400,1150],[500,890],[600,800],[700,920]]},
		{label:"部门3",color:"rgba(255,0,0,0.5)",data:[[0,500],[100,300],[200,150],[300,450],[400,480],[500,620],[600,1000],[700,900]]},
		{label:"部门1",color:"rgba(255,255,0,0.5)",data:[[0,450],[100,400],[200,350],[300,300],[400,350],[500,370],[600,400],[700,300]]},
		{label:"部门2",color:"rgba(0,0,50,0.5)",data:[[0,350],[100,300],[200,250],[300,200],[400,250],[500,270],[600,300],[700,200]]}
	]);
	//添加到舞台
	demoContainer.add(areaChart);
}
function demoBubbleChart(){
	demoContainer.removeAll();
	//声明组件
	var bubbleChart=new TcFrame.BubbleChart({
		x:5,y:10,width:990,height:400,title:"员工事假图",
		minXDate:new Date(2013,1,1),timeOfPixX:0.1,unitOfx:"day",
		minYDate:new Date(2013,2,1),timeOfPixY:0.1,unitOfy:"day",
		backgroundMeshShow:true,autoFillAxisX:true,autoFillAxisY:true,
		comments:["X:2013年2月事假","Y:2013年3月事假","Radius:事假总数"]
	});
	//导入数据
	bubbleChart.dataProvider([
		{x:new Date(2013,1,15),y:new Date(2013,2,3),radius:5,label:"Brain",color:"rgba(51,153,255,1)"},
		{x:new Date(2013,1,10),y:new Date(2013,2,9),radius:10,label:"Vivo",color:"rgba(51,1,255,1)"},
		{x:new Date(2013,2,5),y:new Date(2013,2,10),radius:15,label:"Ils",color:"rgba(51,153,2,1)"},
		{x:new Date(2013,2,10),y:new Date(2013,2,25),radius:5,label:"Tom",color:"rgba(255,0,0,1)"},
		{x:new Date(2013,2,25),y:new Date(2013,2,15),radius:10,label:"Kate",color:"rgba(0,255,120,1)"},
		{x:new Date(2013,3,1),y:new Date(2013,2,7),radius:30,label:"Lilei",color:"rgba(51,1,1,1)"},
		{x:new Date(2013,1,20),y:new Date(2013,2,19),radius:15,label:"Lucy",color:"rgba(3,3,3,1)"}
	]);
	//添加到舞台
	demoContainer.add(bubbleChart);
}

function demoControls3(){
	demoContainer.removeAll();
	var grid=new TcFrame.Grid({left:5,right:5,top:5,bottom:35});
	var btn1=new TcFrame.Button({left:5,bottom:5,width:80,height:25,label:"选中列",alt:"选中第一列",altShow:true});
	var btn2=new TcFrame.Button({left:90,bottom:5,width:80,height:25,label:"选中行"});
	var btn3=new TcFrame.Button({left:180,bottom:5,width:80,height:25,label:"选中单元格"});
	var btn4=new TcFrame.Button({left:270,bottom:5,width:80,height:25,label:"改变列宽"});
	var btn5=new TcFrame.Button({left:360,bottom:5,width:80,height:25,label:"按列排序"});
	var gridDate={
		column:[
			{width:80,label:'A'},{width:100,label:'B'},{width:40,label:'C'},{width:80,label:'D'},{width:80,label:'E'},{width:80,label:'F'},
			{width:80,label:'G'},{width:80,label:'H'},{width:80,label:'I'},{width:80,label:'J'},{width:80,label:'K'}
		],
		data:[]
	}
	for(var n=0;n<30;n++){
		var it=[];
		for(var m=0;m<11;m++){it.push(parseInt(Math.random()*100));}
		gridDate.data.push(it);
	}
	grid.dataProvider(gridDate);
	//挂接事件
	btn1.addEventListener('onClick',function(event){grid.selectColumn(0);});
	btn2.addEventListener('onClick',function(event){grid.selectRow(1);});
	btn3.addEventListener('onClick',function(event){grid.selectItem(2,2);});
	btn4.addEventListener('onClick',function(event){grid.changeColumnWidth(0,20);});
	btn5.addEventListener('onClick',function(event){grid.sort(0,1);});
	//添加到舞台
	demoContainer.add(grid);
	demoContainer.add(btn1);
	demoContainer.add(btn2);
	demoContainer.add(btn3);
	demoContainer.add(btn4);
	demoContainer.add(btn5);
}
function demoControls2(){
	demoContainer.removeAll();
	//声明组件
	var input=new TcFrame.TextInput({left:5,width:120,top:5,height:25});
	var colorfield=new TcFrame.ColorField({left:5,top:40});
	var datefield=new TcFrame.DateField({left:5,top:180});
	var colorpicker=new TcFrame.ColorPicker({left:130,top:5,width:24,height:24});
	var datechooser=new TcFrame.DateChooser({datatype:"MM/DD/YYYY",left:160,top:5,width:125,height:25});
	var label=new TcFrame.Label({width:70,left:210,top:180,height:25,text:"标签",align:"center"});
	var link=new TcFrame.Link({text:'lhtsoft.com',url:'http://www.lhtsoft.com',target:'_blank',left:210,height:25,width:70,top:210});
	var image=new TcFrame.Image({width:25,height:25,src:TcFrame.Skin['Image']['MenuItem']['tmpIco'],left:210,top:240});
	var imagebutton=new TcFrame.ImageButton({width:19,height:19,top:245,left:240,src:TcFrame.Skin['Image']['DateChooserNormal'],srcOver:TcFrame.Skin['Image']['DateChooserOver']});
	var number=new TcFrame.Number({showBtn:true,datatype:'int',max:1000,min:-1000,value:600,step:2,width:70,height:25,left:210,top:270});
	var combobox=new TcFrame.ComboBox({width:140,height:25,top:360,left:5});
	var dropdownlist=new TcFrame.DropDownList({width:130,height:25,top:360,left:150});
	var vRule=new TcFrame.Rule({display:"vertical",width:2,top:5,bottom:5,left:350});
	var hRule=new TcFrame.Rule({height:2,left:355,top:30,right:5});
	var vSlider=new TcFrame.Slider({left:300,top:5,width:15,height:380,display:'vertical',max:100,min:0,value:30});
	var vProgress=new TcFrame.Progress({left:325,top:5,width:15,height:380,display:'vertical',value:30});
	var hSlider=new TcFrame.Slider({right:10,top:70,width:300,height:15,max:100,min:0,value:70});
	var hProgress=new TcFrame.Progress({right:10,top:100,width:300,height:15,value:70});
	var menu=new TcFrame.Menu({left:360,right:5,height:25,top:5});
	var linkbar=new TcFrame.LinkBar({right:5,top:40,height:25,width:300});
	var list=new TcFrame.List({left:360,top:35,bottom:5,width:100,signType:"Number"});
	var tree=new TcFrame.Tree({left:465,top:35,bottom:5,width:200});
	//导入数据
	label.setStyles({'color':"#F4E18A",'border':"1px solid #333",'backgroundColor':"#c9c9f4"});
	combobox.dataProvider([{id:'1',label:"项目1"},{id:'2',label:"项目2"},{id:'3',label:"项目3"},{id:'4',label:"项目4"}]);
	dropdownlist.dataProvider([{id:'1',label:"项目1"},{id:'2',label:"项目2"},{id:'3',label:"项目3"},{id:'4',label:"项目4"}]);
	linkbar.dataProvider([{text:'lhtsoft',url:'http://www.lhtsoft.com',target:'_blank'},{text:'fancyber',url:'http://www.fancyber.com',target:'_blank'}]);
	list.dataProvider([{id:"1",label:"item1"},{id:"2",label:"item2"},{id:"3",label:"item3"},{id:"4",label:"item4"},{id:"5",label:"item5"},{id:"6",label:"item6"},{id:"7",label:"item7"},{id:"8",label:"item8"},{id:"9",label:"item9"},{id:"10",label:"item10"},{id:"11",label:"item11"},{id:"12",label:"item12"}]);
	var jsonArr=[
		{id:"1",label:'文件',children:[
			{id:"1.0",label:"打开",hotkey:"Ctrl+O"},
			{id:"1.5",label:"打开最近文档",children:[
				{id:"1.5.1",label:"1.js",children:[
					{id:"1.5.1.1",label:"2012.12.31 15:21"},
					{id:"1.5.1.2",label:"2012.12.31 15:22"},
					{id:"1.5.1.3",label:"2012.12.31 15:23"},
					{id:"1.5.1.4",label:"2012.12.31 15:24"},
					{id:"1.5.1.5",label:"2012.12.31 15:25"}
				]},
				{id:"1.5.2",label:"2.js"},
				{id:"1.5.3",label:"3.js",children:[
					{id:"1.5.3.1",label:"2012.12.30 15:21"},
					{id:"1.5.3.2",label:"2012.12.30 15:22"},
					{id:"1.5.3.3",label:"2012.12.30 15:23"},
					{id:"1.5.3.4",label:"2012.12.30 15:24"},
					{id:"1.5.3.5",label:"2012.12.30 15:25"}
				]},
				{id:"1.5.4",label:"4.js"},
				{id:"1.5.5",label:"5.js"},
				{id:"1.5.6",label:"6.js"},
				{id:"1.5.7",label:"7.js"}
			]},
			{id:"1.1",label:"保存",enable:false,hotkey:"Ctrl+S"},
			{id:"1.2",label:"另存为",enable:false,hotkey:"Ctrl+Shift+S"},
			{id:"1.3",label:"保存全部",enable:false},
			{id:"1.4",label:"退出",hotkey:"Alt+F4"}		
		]},
		{id:"2",label:'编辑'},
		{id:"5",label:'格式',children:[
			{id:"5.0",label:"缩进"},
			{id:"5.1",label:"突出"},
			{id:"5.2",label:"段落格式",children:[
				{id:"5.2.1",label:"标题1"},
				{id:"5.2.2",label:"标题2"},
				{id:"5.2.3",label:"标题3"},
				{id:"5.2.4",label:"标题4"},
				{id:"5.2.5",label:"标题5"},
				{id:"5.2.6",label:"标题6"}
			]},
			{id:"5.3",label:"对齐",checked:true},
			{id:"5.4",label:"列表",children:[
				{id:"5.4.1",label:"项目列表"},
				{id:"5.4.2",label:"编号列表"},
				{id:"5.4.3",label:"定义列表"}
			]}		
		]}
	];
	tree.dataProvider(jsonArr);
	menu.dataProvider(jsonArr);
	//挂接事件
	function showValue(event){input.setValue(event.target.value);}
	colorpicker.addEventListener('onChange',showValue);
	colorfield.addEventListener('onChange',showValue);
	datefield.addEventListener('onChange',function(event){input.setValue(event.target.value.getFullYear()+"-"+(event.target.value.getMonth()+1)+"-"+event.target.value.getDate());});
	datechooser.addEventListener('onChange',function(event){input.setValue(event.target.input.value)});
	imagebutton.addEventListener('onClick',function(event){input.setValue('click');});
	combobox.addEventListener('onChange',function(event){input.setValue(event.target.input.value);});
	dropdownlist.addEventListener('onChange',function(event){input.setValue(event.target.currentSelected.id);});
	dropdownlist.addEventListener('onClick',function(event){input.setValue(event.target.currentSelected.id);});
	number.addEventListener('onChange',showValue);
	vSlider.addEventListener('onChange',function(event){vProgress.setValue(event.target.value);});
	hSlider.addEventListener('onChange',function(event){hProgress.setValue(event.target.value);});
	menu.addEventListener('onClick',function(event){input.setValue(event.target.currentID);});
	list.addEventListener('onChange',function(event){input.setValue(event.target.currentSelect.label.text);});
	tree.addEventListener('onItemClick',function(event){input.setValue(event.target.currentID);});
	//添加到舞台
	demoContainer.add(input);
	demoContainer.add(colorfield);
	demoContainer.add(datefield);
	demoContainer.add(colorpicker);
	demoContainer.add(datechooser);
	demoContainer.add(label);
	demoContainer.add(link);
	demoContainer.add(image);
	demoContainer.add(imagebutton);
	demoContainer.add(combobox);
	demoContainer.add(dropdownlist);
	demoContainer.add(vRule);
	demoContainer.add(hRule);
	demoContainer.add(number);
	demoContainer.add(vSlider);
	demoContainer.add(hSlider);
	demoContainer.add(vProgress);
	demoContainer.add(hProgress);
	demoContainer.add(menu);
	demoContainer.add(linkbar);
	demoContainer.add(list);
	demoContainer.add(tree);
}
function demoControls1(){
	demoContainer.removeAll();
	//声明组件
	var input=new TcFrame.TextInput({left:5,width:150,top:5,height:25});
	var btn1=new TcFrame.Button({left:160,top:5,width:120,height:25,label:"Alert.show"});
	var btn2=new TcFrame.Button({left:290,top:5,width:120,height:25,label:"Alert.confirm"});
	var btn3=new TcFrame.Button({left:420,top:5,width:120,height:25,label:"Alert.prompt"});
	var btn4=new TcFrame.Button({left:5,bottom:5,width:80,height:25,label:"全选"});
	var btn5=new TcFrame.Button({left:90,bottom:5,width:80,height:25,label:"反选"});
	var btn6=new TcFrame.Button({left:550,bottom:5,width:80,height:25,label:"写入HTML"});
	var btn7=new TcFrame.Button({left:640,bottom:5,width:80,height:25,label:"获取HTML"});
	var btn8=new TcFrame.Button({left:730,bottom:5,width:80,height:25,label:"获取纯文本"});
	var btn9=new TcFrame.Button({left:820,bottom:5,width:80,height:25,label:"HTML长度"});
	var btn10=new TcFrame.Button({left:910,bottom:5,width:80,height:25,label:"文本长度"});
	var tabBar=new TcFrame.TabBar({left:5,top:40,width:540,height:25});
	var buttonBar=new TcFrame.ButtonBar({left:5,top:70,width:540,height:25});
	var checkBox=new TcFrame.CheckBox({left:420,height:25,top:40,width:80,label:"复选框"});
	var radio=new TcFrame.Radio({left:420,height:25,top:70,width:80,label:"单选框"});
	var checkboxgroup=new TcFrame.CheckBoxGroup({top:100,width:240,bottom:35,left:5,autoBreak:true,CheckBoxWidth:100});
		checkboxgroup.setStyles({'overflow':"auto",'border':"1px solid #333"});
	var radiogroup=new TcFrame.RadioGroup({top:100,width:290,bottom:35,left:250,autoBreak:true,CheckBoxWidth:100});
		radiogroup.setStyles({'overflow':"auto",'border':"1px solid #333"});
	var richtexteditor=new TcFrame.RichTextEditor({top:5,right:5,bottom:35,left:550});
	//导入数据
	tabBar.dataProvider([{id:"按钮1",label:"按钮1"},{id:"按钮2",label:"按钮2"},{id:"按钮3",label:"按钮3"},{id:"按钮4",label:"按钮4"},{id:"按钮5",label:"按钮5"}]);
	buttonBar.dataProvider([{id:"按钮1",label:"按钮1"},{id:"按钮2",label:"按钮2"},{id:"按钮3",label:"按钮3"},{id:"按钮4",label:"按钮4"},{id:"按钮5",label:"按钮5"}]);
	dataArr=[];for(n=0;n<100;n++){dataArr.push({id:n,label:"CheckBox"+n});}
	checkboxgroup.dataProvider(dataArr);
	dataArr=[];for(n=0;n<100;n++){dataArr.push({id:n,label:"Radio"+n});}
	radiogroup.dataProvider(dataArr);
	//功能函数
	function alert(){
		TcFrame.Alert.show({title:"友情提示",text:"普通信息提示",titleAlign:"center",labelAlign:"left"});	
	}
	function confirm(){
		function okFunc(){input.setValue('确定');}
		function cancelFunc(){input.setValue('取消');}
		TcFrame.Alert.confirm({title:"友情提示",text:"确定取消选择",titleAlign:"center",labelAlign:"left",okFunc:okFunc,cancelFunc:cancelFunc});
	}
	function prompt(){
		function returnfunc(a){input.setValue(a);}
		TcFrame.Alert.prompt({title:"友情提示",text:"输入一个网址",defaultValue:"http://",titleAlign:"center",labelAlign:"left",func:returnfunc});
	}
	function selectAll(){checkboxgroup.selectAll();}
	function selectOthers(){checkboxgroup.selectOthers();}
	
	//挂接事件
	btn1.addEventListener('onClick',alert);
	btn2.addEventListener('onClick',confirm);
	btn3.addEventListener('onClick',prompt);
	btn4.addEventListener('onClick',selectAll);
	btn5.addEventListener('onClick',selectOthers);
	btn6.addEventListener('onClick',function(event){richtexteditor.setHTML('<a href="http://www.lhtsoft.com" target="_blank" style="font-size:18px;color:#ff0000;">lhtsoft.com</a>');});
	btn7.addEventListener('onClick',function(event){window.alert(richtexteditor.getHTML())});
	btn8.addEventListener('onClick',function(event){window.alert(richtexteditor.getText())});
	btn9.addEventListener('onClick',function(event){window.alert(richtexteditor.htmlLength())});
	btn10.addEventListener('onClick',function(event){window.alert(richtexteditor.textLength())});
	tabBar.addEventListener('onActiveChange',function(event){input.setValue(event.target.currentID);});
	buttonBar.addEventListener('onActiveChange',function(event){input.setValue(event.target.currentID);});
	checkBox.addEventListener('onChange',function(event){input.setValue(event.target.value);});
	radio.addEventListener('onChange',function(event){input.setValue(event.target.value);});
	radiogroup.addEventListener('onChange',function(event){input.setValue(event.target.selectedID);})
	//添加到舞台
	demoContainer.add(input);
	demoContainer.add(btn1);
	demoContainer.add(btn2);
	demoContainer.add(btn3);
	demoContainer.add(btn4);
	demoContainer.add(btn5);
	demoContainer.add(btn6);
	demoContainer.add(btn7);
	demoContainer.add(btn8);
	demoContainer.add(btn9);
	demoContainer.add(btn10);
	demoContainer.add(tabBar);
	demoContainer.add(buttonBar);
	demoContainer.add(checkBox);
	demoContainer.add(radio);
	demoContainer.add(checkboxgroup);
	demoContainer.add(radiogroup);
	demoContainer.add(richtexteditor);
}
function demoTabNavigator(){
	demoContainer.removeAll();
	//声明一个TabNavigator
	var tn=new TcFrame.TabNavigator({left:30,top:30,bottom:50,right:30});
	tn.dataProvider([
		{id:"1",label:"测试容器一"},
		{id:"2",label:"测试容器二"},
		{id:"3",label:"测试容器三"},
		{id:"4",label:"测试容器四"},
		{id:"5",label:"测试容器五"},
		{id:"6",label:"测试容器六"}
	]);
	//装入舞台
	demoContainer.add(tn);
	//在第一个容器里添加个输入框
	var input=new TcFrame.TextInput({left:5,top:5,width:200,height:25});
	tn.getContainerByID("1").add(input);
	//在第二个容器里添加个Radio
	var radio=new TcFrame.Radio({left:10,top:10,width:200,height:25,label:"测试Radio"});
	tn.getContainerByID("2").add(radio);
	//添加一个按钮，控制TabNavigator显示第四个容器
	var button=new TcFrame.Button({left:30,bottom:5,width:100,height:25,label:"切换到容器二"});
	button.addEventListener('onClick',function(event){tn.setActiveByID("2");});
	demoContainer.add(button);	
}
function demoTitleWindow(){
	demoContainer.removeAll();
	//创建一个TitleWindow
	var tw=new TcFrame.TitleWindow({x:10,y:10,width:800,height:300,title:"测试TitleWindow",showMaxBtn:true,showMinBtn:true});
	demoContainer.add(tw);
	//向panel中添加一个按钮
	var button=new TcFrame.Button({x:10,y:10,width:200,height:25,label:"测试按钮"});
	tw.add(button);
	//挂接titlewindow的按钮事件
	tw.addEventListener("onCloseBtnClick",function(event){
		TcFrame.Alert.show({text:"TitleWindow CloseButton Click"});	
	});
	tw.addEventListener("onMaxBtnClick",function(event){
		TcFrame.Alert.show({text:"TitleWindow MaxButton Click"});	
	});
	tw.addEventListener("onMinBtnClick",function(event){
		TcFrame.Alert.show({text:"TitleWindow MinButton Click"});	
	});
}
function demoPanel(){
	demoContainer.removeAll();
	//创建一个panel
	var panel=new TcFrame.Panel({x:10,y:10,width:800,height:300,title:"测试Panel"});
	demoContainer.add(panel);
	//向panel中添加一个按钮
	var button=new TcFrame.Button({x:10,y:10,width:200,height:25,label:"测试按钮"});
	panel.add(button);
}
function demoGroup(){
	demoContainer.removeAll();
	//一个纵向group
	var vGroup=new TcFrame.Group({display:"vertical",left:5,top:5,bottom:5,width:80});
	vGroup.setStyle('overflow','auto');
	demoContainer.add(vGroup);
	for(var n=0;n<50;n++){
		var canvas=new TcFrame.Canvas({width:50,height:50});
		canvas.content.innerHTML=n;	
		canvas.setStyle('backgroundColor',TcFrame.ColorRGBA2HEX("rgba("+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+",1)"));
		vGroup.add(canvas);
	}
	//纵向自动换行排列group
	var vGroup=new TcFrame.Group({display:"vertical",left:90,top:5,bottom:5,width:300,autoBreak:true});
	vGroup.setStyle('overflow','auto');
	demoContainer.add(vGroup);
	for(var n=0;n<50;n++){
		var canvas=new TcFrame.Canvas({width:50,height:50});	
		canvas.content.innerHTML=n;
		canvas.setStyle('backgroundColor',TcFrame.ColorRGBA2HEX("rgba("+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+",1)"));
		vGroup.add(canvas);
	}
	//横向group
	var vGroup=new TcFrame.Group({left:400,top:5,right:5,height:80});
	vGroup.setStyle('overflow','auto');
	demoContainer.add(vGroup);
	for(var n=0;n<50;n++){
		var canvas=new TcFrame.Canvas({width:50,height:50});
		canvas.content.innerHTML=n;	
		canvas.setStyle('backgroundColor',TcFrame.ColorRGBA2HEX("rgba("+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+",1)"));
		vGroup.add(canvas);
	}
	//横向自动换行group
	var vGroup=new TcFrame.Group({left:400,top:90,right:5,bottom:5,autoBreak:true});
	vGroup.setStyle('overflow','auto');
	demoContainer.add(vGroup);
	for(var n=0;n<200;n++){
		var canvas=new TcFrame.Canvas({width:50,height:50});
		canvas.content.innerHTML=n;	
		canvas.setStyle('backgroundColor',TcFrame.ColorRGBA2HEX("rgba("+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+",1)"));
		vGroup.add(canvas);
	}
}
function demoCanvas(){
	demoContainer.removeAll();
	//声明一个容器
	var canvas=new TcFrame.Canvas({left:30,top:30,bottom:50,right:30});
	canvas.setStyles({'border':"1px solid #333",'backgroundColor':"#3399FF"});
	//另外一个容器，待添加
	var tmp1=new TcFrame.Canvas({left:30,top:30,bottom:50,right:30});
	tmp1.setStyles({'border':"1px solid #333",'backgroundColor':"rgba(145,145,145,0.8)"});
	var tmp2=new TcFrame.Canvas({left:50,top:50,bottom:50,right:30});
	tmp2.setStyles({'border':"1px solid #333",'backgroundColor':"rgba(161,230,61,0.5)"});
	//功能函数
	function addChild(){
		if(tmp1.added){return}
		canvas.add(tmp1);
		canvas.add(tmp2);
		tmp1.added=true;
	}
	function removeChild(){
		if(!tmp1.added){return}
		canvas.remove(tmp1);
		canvas.remove(tmp2);
		tmp1.added=false;
	}
	function setChildIndex(){
		if(!tmp1.added){return}	
		canvas.setChildIndex(tmp2,0);
	}
	function removeAll(){
		if(!tmp1.added){return}	
		canvas.removeAll();
		tmp1.added=false;
	}
	//控制按钮
	var btn1=new TcFrame.Button({width:80,height:25,left:30,bottom:5,label:"添加"});
	var btn2=new TcFrame.Button({width:80,height:25,left:120,bottom:5,label:"移除"});
	var btn3=new TcFrame.Button({width:80,height:25,left:210,bottom:5,label:"子件调序"});
	var btn4=new TcFrame.Button({width:80,height:25,left:300,bottom:5,label:"清空"});
	btn1.addEventListener("onClick",addChild);
	btn2.addEventListener("onClick",removeChild);
	btn3.addEventListener("onClick",setChildIndex);
	btn4.addEventListener("onClick",removeAll);
	//添加到舞台
	demoContainer.add(canvas);
	demoContainer.add(btn1);
	demoContainer.add(btn2);
	demoContainer.add(btn3);
	demoContainer.add(btn4);
}
function demoAccordion(){
	demoContainer.removeAll();
	//声明一个Accordion
	var accordion=new TcFrame.Accordion({left:30,top:30,bottom:50,right:30});
	accordion.dataProvider([
		{id:"1",label:"测试容器一"},
		{id:"2",label:"测试容器二"},
		{id:"3",label:"测试容器三"},
		{id:"4",label:"测试容器四"},
		{id:"5",label:"测试容器五"},
		{id:"6",label:"测试容器六"}
	]);
	//装入舞台
	demoContainer.add(accordion);
	//在第一个容器里添加个输入框
	var input=new TcFrame.TextInput({left:5,top:5,width:200,height:25});
	accordion.getContainerByID("1").add(input);
	//在第二个容器里添加个Radio
	var radio=new TcFrame.Radio({left:10,top:10,width:200,height:25,label:"测试Radio"});
	accordion.getContainerByID("2").add(radio);
	//添加一个按钮，控制accordion显示第四个容器
	var button=new TcFrame.Button({left:30,bottom:5,width:100,height:25,label:"切换到容器四"});
	button.addEventListener('onClick',function(event){accordion.setActiveByID("4");});
	demoContainer.add(button);
}
function demoTimer(){	
	demoContainer.removeAll();
	//声明一个输入框
	var input=new TcFrame.TextInput({left:270,bottom:5,width:100,height:25});
	//timer的回调函数
	function timerHandle(event){input.setValue(event.target.current);}
	//声明一个timer
	var timer=new TcFrame.Timer({func:timerHandle});
	//timer的控制按钮
	var btn1=new TcFrame.Button({width:80,height:25,left:5,bottom:5,label:"开始"});
	btn1.addEventListener("onClick",function(){timer.start()});
	var btn2=new TcFrame.Button({width:80,height:25,left:90,bottom:5,label:"停止"});
	btn2.addEventListener("onClick",function(){timer.stop()});
	var btn3=new TcFrame.Button({width:80,height:25,left:180,bottom:5,label:"复位"});
	btn3.addEventListener("onClick",function(){timer.reset()});
	//添加到舞台
	demoContainer.add(input);
	demoContainer.add(btn1);
	demoContainer.add(btn2);
	demoContainer.add(btn3);
}
function demoResize(){
	demoContainer.removeAll();
	//声明一个动画目标	
	var targetBox=new TcFrame.UIComponent({width:50,height:50,x:200,y:100});
	targetBox.setStyles({'backgroundColor':"#FFF000",'border':"1px solid #333"});
	//控制函数
	var isResizing=false;
	var resize=new TcFrame.Resize({target:targetBox});
		resize.addEventListener("onComplete",function(event){isResizing=false;});
	function toBig(){
		if(isResizing){return;}
		resize.toWidth=200;resize.toHeight=200;
		isResizing=true;
		resize.play();	
	}
	function toSmall(){
		if(isResizing){return;}
		resize.toWidth=50;resize.toHeight=50;
		isResizing=true;
		resize.play();	
	}
	//控制按钮
	var btn1=new TcFrame.Button({width:80,height:25,left:5,bottom:5,label:"放大"});
	btn1.addEventListener("onClick",toBig);
	var btn2=new TcFrame.Button({width:80,height:25,left:90,bottom:5,label:"缩小"});
	btn2.addEventListener("onClick",toSmall);
	//添加到舞台
	demoContainer.add(targetBox);
	demoContainer.add(btn1);
	demoContainer.add(btn2);
}	
function demoMove(){
	demoContainer.removeAll();
	//声明一个动画目标
	var targetBox=new TcFrame.UIComponent({width:50,height:50,x:200,y:100});
	targetBox.setStyles({'backgroundColor':"#FFF000",'border':"1px solid #333"});
	//控制函数
	var isMoving=false;
	var move=new TcFrame.Move({target:targetBox});
		move.addEventListener("onComplete",function(event){isMoving=false;});
	function toRight(){
		if(isMoving){return;}
		move.toX=targetBox.x+100;
		move.play();isMoving=true;
	}
	function toLeft(){
		if(isMoving){return;}
		move.toX=targetBox.x-100;
		move.play();isMoving=true;
	}
	function toTop(){
		if(isMoving){return;}
		move.toY=targetBox.y-100;
		move.play();isMoving=true;
	}
	function toBottom(){
		if(isMoving){return;}
		move.toY=targetBox.y+100;
		move.play();isMoving=true;
	}
	//控制按钮
	var btn1=new TcFrame.Button({width:25,height:25,left:65,bottom:35,label:"右"});
	btn1.addEventListener("onClick",toRight);
	var btn2=new TcFrame.Button({width:25,height:25,left:5,bottom:35,label:"左"});
	btn2.addEventListener("onClick",toLeft);
	var btn3=new TcFrame.Button({width:25,height:25,left:35,bottom:65,label:"上"});
	btn3.addEventListener("onClick",toTop);
	var btn4=new TcFrame.Button({width:25,height:25,left:35,bottom:5,label:"下"});
	btn4.addEventListener("onClick",toBottom);
	//添加到舞台
	demoContainer.add(targetBox);
	demoContainer.add(btn1);
	demoContainer.add(btn2);
	demoContainer.add(btn3);
	demoContainer.add(btn4);	
}
function demoClose(){
	demoContainer.removeAll();
	//声明一个动画目标
	var targetBox=new TcFrame.UIComponent({top:50,left:50,right:50,bottom:50});
	targetBox.setStyles({'backgroundColor':"#FFF000",'border':"1px solid #333"});
	//变换函数
	function doClose(event){
		var closeHandle=new TcFrame.Close({target:targetBox});
		targetBox.openType=event.target.currentSelected.id;
		closeHandle.play();
		//关闭完成后，再次添加到舞台
		closeHandle.addEventListener('onComplete',function(){setTimeout(function(){demoContainer.add(targetBox);},1000);});
	}
	//声明一个dropDownList显示激发不同的open方式
	var ddl=new TcFrame.DropDownList({left:5,bottom:5,width:120,height:25});
	ddl.dataProvider([
		{id:"TopToBottom",label:"TopToBottom"},
		{id:"LeftToRight",label:"LeftToRight"},
		{id:"RightToLeft",label:"RightToLeft"},
		{id:"BottomToTop",label:"BottomToTop"},
		{id:"MiddleToHeight",label:"MiddleToHeight"},
		{id:"CenterToWidth",label:"CenterToWidth"},
		{id:"PointToBorder",label:"PointToBorder"},
		{id:"Opacity",label:"Opacity"}
	]);
	ddl.addEventListener('onClick',doClose);
	//添加到舞台
	demoContainer.add(targetBox);
	demoContainer.add(ddl);	
}
function demoOpen(){
	demoContainer.removeAll();
	//声明一个动画目标
	var targetBox=new TcFrame.UIComponent({top:50,left:50,right:50,bottom:50});
	targetBox.setStyles({'backgroundColor':"#FFF000",'border':"1px solid #333"});
	//变换函数
	function doOpen(event){
		var openhandle=new TcFrame.Open({target:targetBox});
		targetBox.openType=event.target.currentSelected.id;
		openhandle.play();
	}
	//声明一个dropDownList显示激发不同的open方式
	var ddl=new TcFrame.DropDownList({left:5,bottom:5,width:120,height:25});
	ddl.dataProvider([
		{id:"TopToBottom",label:"TopToBottom"},
		{id:"LeftToRight",label:"LeftToRight"},
		{id:"RightToLeft",label:"RightToLeft"},
		{id:"BottomToTop",label:"BottomToTop"},
		{id:"MiddleToHeight",label:"MiddleToHeight"},
		{id:"CenterToWidth",label:"CenterToWidth"},
		{id:"PointToBorder",label:"PointToBorder"},
		{id:"Opacity",label:"Opacity"}
	]);
	ddl.addEventListener('onClick',doOpen);
	//添加到舞台
	demoContainer.add(targetBox);
	demoContainer.add(ddl);
}
function demoAnimation(){
	demoContainer.removeAll();
	//声明一个动画目标
	var targetBox=new TcFrame.UIComponent({width:50,height:50,x:10,y:10});
	targetBox.setStyles({'backgroundColor':"#FFF000",'border':"1px solid #333"});
	//变换函数
	function changeLeft(){
		var animation=new TcFrame.Animation({target:targetBox,fromValue:10,toValue:200,unit:"px",cssName:"left"});
		animation.play();	
	}
	function changeRight(){
		var animation=new TcFrame.Animation({target:targetBox,fromValue:10,toValue:200,unit:"px",cssName:"top"});
		animation.play();
	}
	function changeWidth(){
		var animation=new TcFrame.Animation({target:targetBox,fromValue:10,toValue:200,unit:"px",cssName:"width"});
		animation.play();
	}
	function changeHeight(){
		var animation=new TcFrame.Animation({target:targetBox,fromValue:10,toValue:200,unit:"px",cssName:"height"});
		animation.play();
	}
	function changeOpacity(){
		var animation=new TcFrame.Animation({target:targetBox,fromValue:0,toValue:100,speed:100,cssName:"opacity"});
		animation.play();
	}
	//控制按钮
	var btn1=new TcFrame.Button({width:80,height:25,left:5,bottom:5,label:"从左到右"});
	btn1.addEventListener("onClick",changeLeft);
	var btn2=new TcFrame.Button({width:80,height:25,left:90,bottom:5,label:"从上到下"});
	btn2.addEventListener("onClick",changeRight);
	var btn3=new TcFrame.Button({width:80,height:25,left:180,bottom:5,label:"宽度变化"});
	btn3.addEventListener("onClick",changeWidth);
	var btn4=new TcFrame.Button({width:80,height:25,left:270,bottom:5,label:"高度变化"});
	btn4.addEventListener("onClick",changeHeight);
	var btn5=new TcFrame.Button({width:80,height:25,left:360,bottom:5,label:"变透明度"});
	btn5.addEventListener("onClick",changeOpacity);
	//添加到舞台
	demoContainer.add(targetBox);
	demoContainer.add(btn1);
	demoContainer.add(btn2);
	demoContainer.add(btn3);
	demoContainer.add(btn4);
	demoContainer.add(btn5);
}
function demoUIComponent(){
	demoContainer.removeAll();
	//声明普通容器,设置属性,添加
	var ui1=new TcFrame.UIComponent({right:5,top:5,width:300,height:200,openType:"PointToBorder"});
	ui1.setStyles({'backgroundColor':"#FFF000",'border':"1px solid #333"});
	demoContainer.add(ui1);	
	//声明一个容器，在容器中添加常规html代码
	var ui2=new TcFrame.UIComponent({left:5,top:5,right:310,height:200});
	ui2.setStyle('border','1px solid #333');
	ui2.content.innerHTML='<a href="http://www.lhtsoft.com">www.lhtsoft.com</a>';
	demoContainer.add(ui2);
	//声明一个容器，通过Javascript添加dom
	var ui3=new TcFrame.UIComponent({right:5,top:210,width:300,bottom:5});
	ui3.setStyle('border','1px solid #333');
	for(var n=0;n<10;n++){
		var tmpinput=document.createElement('input');tmpinput.type="radio";
		ui3.content.appendChild(tmpinput);
	}
	demoContainer.add(ui3);
	//声明一个容器，在容器中添加其他容器
	var ui4=new TcFrame.UIComponent({left:5,top:210,right:310,bottom:5});
	ui4.setStyle('border','1px solid #333');
	demoContainer.add(ui4);
	for(var x=0;x < ui4.width-50;x+=50){
		for(var y=0;y < ui4.height-50;y+=50){	
			var ui=new TcFrame.UIComponent({width:50,height:50});
			var color=TcFrame.ColorRGBA2HEX("rgba("+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+",1)");
			ui.setStyle('backgroundColor',color);
			ui.x=x;ui.y=y;
			ui.parent=ui4;
			ui4.content.appendChild(ui.content);
			ui.resize();
		}
	}
}