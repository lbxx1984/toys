var TcFrame=TcFrame||{};
TcFrame.ColorField=function(param){
	this.initializate(param);
	this.valueArray=[];
	this.image=new TcFrame.Image({x:0,y:0,width:277,height:129,src:TcFrame.Skin['Image']['ColorFieldBackground']})
	this.image.parent=this;
	this.content.appendChild(this.image.content);
	this.image.addEventListener("onMouseMove",this.mousemove);
	this.image.addEventListener("onClick",this.mouseclick);
}
TcFrame.ColorField.prototype=new TcFrame.UIComponent();
TcFrame.ColorField.prototype.type="TcFrame.ColorField";
TcFrame.ColorField.prototype.image=null;
TcFrame.ColorField.prototype.value="#555555";
TcFrame.ColorField.prototype.valueArray=null;
TcFrame.ColorField.prototype.hue = 60;
TcFrame.ColorField.prototype.adeg = 60;
TcFrame.ColorField.prototype.sat = 1;
TcFrame.ColorField.prototype.val = 1;
TcFrame.ColorField.prototype.threec = new Array("#666666", "#555555", "#545657");

TcFrame.ColorField.prototype.mouseclick=function(event){
	var target=event.target.parent;
	if(target.threec[2] == target.value){return false};
	target.setSquare(target.adeg);
	target.value= target.threec[2];
	target.dispatch("onChange",{target:target});
  	return false;
}
TcFrame.ColorField.prototype.mousemove=function(event){
	var target=event.target.parent;
	var mousepos=target.MousePositionCompareWithLocal();
	var x=533*mousepos[0]/target.width;
	var y=257*mousepos[1]/target.height;
	if(x >295){target.greyMoved(x,y);return false;}
 	if(y >256){return false;}
    cartx = x - 128;
    carty = 128 - y;
    cartx2 = cartx * cartx;
    carty2 = carty * carty;
    cartxs = (cartx < 0)?-1:1;
    cartys = (carty < 0)?-1:1;
    cartxn = cartx/128;                    
    rraw = Math.sqrt(cartx2 + carty2);     
    rnorm = rraw/128;
    if(rraw == 0){
		sat = 0; val = 0;
		rgb = new Array(0,0,0);
    }else{
		arad = Math.acos(cartx/rraw);
		aradc = (carty>=0)?arad:2*Math.PI - arad;
      	target.adeg = 360 * aradc/(2*Math.PI);
      	if (rnorm > 1) {
            rgb = new Array(255,255,255);
            sat = 1;
            val = 1;            
         }else if (rnorm >= .5) {
	      	sat = 1 - ((rnorm - .5) *2);
            val = 1;
	      	rgb = target.hsv2rgb(target.adeg,sat,val);
	     }else {
            sat = 1;
	      	val = rnorm * 2;
	      	rgb = target.hsv2rgb(target.adeg,sat,val);}
   	}
   	c = target.rgb2hex(rgb);
	target.hexColorArray(c);
   	return false;
}
TcFrame.ColorField.prototype.greyMoved=function(x,y){
    this.adeg = this.hue;
    xside = (x<=553)?x - 296:256;
    yside = (y<=256)?y:256;
    sat = xside/256;
    val = 1-(yside/256);
    c = this.rgb2hex(this.hsv2rgb(this.hue,sat,val));
    this.hexColorArray(c);
    return false;
}
TcFrame.ColorField.prototype.rgb2hsv=function(value){
	var arr=this.hex2rgb(value);
	r=arr[0];g=arr[1];b=arr[2]
  	r /= 255;
 	g /= 255;
  	b /= 255;
 	var min, max, delta;
  	var hsv = new Array(3);
  	min = Math.min(r,g,b);
 	max = Math.max(r,g,b);
  	hsv.v = max;
  	delta = max - min;
 	if (max != 0) hsv.s = delta/max;
  	else {
    	hsv.s = .005;
    	hsv.h = 0;
    	return hsv;
  	}
 	if(delta == 0) {
    	hsv.s = .005;
    	hsv.h = 0;
    	return hsv;
  	}
  	if (r == max) hsv.h = (g-b)/delta;
  	else if(g == max) hsv.h = 2+(b-r)/delta;
  	else hsv.h = 4+(r-g)/delta;
  	hsv.h *= 60;
  	if(hsv.h<0) hsv.h += 360;
 	if(hsv.h>=360) hsv.h -= 360;
  	return hsv;
}
TcFrame.ColorField.prototype.hsv2rgb=function(Hdeg,S,V){
	H = Hdeg/360;
	if(S==0){ 
    	R = V*255; 
    	G = V*255;
    	B = V*255;
	}else{
    	var_h = H*6;
    	var_i = Math.floor( var_h ); 
    	var_1 = V*(1-S);
    	var_2 = V*(1-S*(var_h-var_i));
    	var_3 = V*(1-S*(1-(var_h-var_i)));
    	if (var_i==0)      {var_r=V ;    var_g=var_3; var_b=var_1}
    	else if (var_i==1) {var_r=var_2; var_g=V;     var_b=var_1}
    	else if (var_i==2) {var_r=var_1; var_g=V;     var_b=var_3}
    	else if (var_i==3) {var_r=var_1; var_g=var_2; var_b=V}
    	else if (var_i==4) {var_r=var_3; var_g=var_1; var_b=V}
    	else               {var_r=V;     var_g=var_1; var_b=var_2}
    	R = Math.round(var_r*255);
    	G = Math.round(var_g*255);
    	B = Math.round(var_b*255);
	}
  	return new Array(R,G,B);
}
TcFrame.ColorField.prototype.rgb2hex=function(rgbary){
	cary = new Array; 
	cary[3] = "#";
	for (i=0; i < 3; i++) {
    	cary[i] = parseInt(rgbary[i]).toString(16);
		if (cary[i].length < 2) cary[i] = "0"+ cary[i];
    	cary[3] = cary[3] + cary[i];
    	cary[i+4] = rgbary[i];
  	}
	return cary;
}
TcFrame.ColorField.prototype.hex2rgb=function(str){
	var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
	var sColor=str.toLowerCase();
	if(sColor && reg.test(sColor)){
		if(sColor.length===4){
			var sColorNew = "#";
			for(var i=1; i<4; i+=1){sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));	}
			sColor = sColorNew;
		}
		var sColorChange = [];
		for(var i=1; i<7; i+=2){sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));}
		return sColorChange;
	}else{
		return sColor;	
	}	
}
TcFrame.ColorField.prototype.hexColorArray=function(c){
    this.threec[2] = c[3];
  	this.threec[1] = this.webRounder(c,17);
   	this.threec[0] = this.webRounder(c,51);
    return false;
}
TcFrame.ColorField.prototype.webRounder=function(c,d){
 	thec = "#";
  	for (i=0; i<3; i++) {
		num = Math.round(c[i+4]/d) * d;
      	numc = num.toString(16);
      	if (String(numc).length < 2) numc = "0" + numc;
      	thec += numc;
  	}
  	return thec;
}
TcFrame.ColorField.prototype.setSquare=function(deg){
 	this.hue = deg;
	this.adeg = deg;
	c=this.rgb2hex(this.hsv2rgb(this.hue,1,1));
	this.content.style.backgroundColor=c[3];
	this.value=c[3];
	this.valueArray=c;
}
TcFrame.ColorField.prototype.setRGBValue=function(value){
	this.value=value;
	var hsv=this.rgb2hsv(value);
	this.hue=hsv.h;this.sat=hsv.v;this.val=hsv.s;
	var c = this.rgb2hex(this.hsv2rgb(this.hue,this.sat,this.val));
	this.setSquare(this.hue);
}

TcFrame.ColorField.prototype.resize=function(){
	this.width=277;this.height=129;
	this.right=null;this.bottom=null;
	this.calcBorder();
	this.render();
	this.image.resize();
}