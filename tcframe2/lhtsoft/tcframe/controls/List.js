var TcFrame=TcFrame||{};
TcFrame.List=function(param){
	this.initializate(param);
	this.children=[];
	if(!param){return;}
	if(param.itemHeight!=null){this.itemHeight=param.itemHeight;}
	if(param.signLeft!=null){this.signLeft=param.signLeft;}
	if(param.signRight!=null){this.signRight=param.signRight;}
	if(param.signType!=null){this.signType=param.signType;}
	if(param.signAlign!=null){this.signAlign=param.signAlign;}
}
TcFrame.List.prototype=new TcFrame.Group();
TcFrame.List.prototype.type="TcFrame.List";
TcFrame.List.prototype.display="vertical";
TcFrame.List.prototype.align='left';
TcFrame.List.prototype.padding=1;
TcFrame.List.prototype.interval=0;
TcFrame.List.prototype.currentSelect=null;
TcFrame.List.prototype.itemHeight=25;
TcFrame.List.prototype.signAlign="right";
TcFrame.List.prototype.signLeft="";
TcFrame.List.prototype.signRight=".";
TcFrame.List.prototype.signType="None";//Number,Lowercase,Uppercase,Alphabeta,HEX,LowerRoman,UpperRoman
TcFrame.List.prototype.dataProvider=function(arr){
	if(!arr||!arr.length||arr.length==0){return;}
	this.removeAll();
	function NtoM(p,m,ch){
		var arr=[];
		var str="";
		if(p<=m){arr.push(p);}
		while(p>m){var a=p%m;arr.push(a);var b=(p-a)/m;p=b;if(p<=m){arr.push(p);}}
		for(var p=0;p<arr.length;p++){str=ch.charAt(arr[p])+str;}
		return str;
	}
	function NtoRomen(i,b){
		var Romenum=[["I","II","III","IV","V","VI","VII","VIII","IX"],["X","XX","XXX","XL","L","LX","LXX","LXXX","XC"],["C","CC","CCC","CD","D","DC","DCC","DCCC","CM"]];
		var rs="";
		while(i>=1000){rs+='M';i-=1000;}
		if(i>=100){rs+=Romenum[2][parseInt(i/100)-1];i=i-parseInt(i/100)*100;}
		if(i>=10){rs+=Romenum[1][parseInt(i/10)-1];i=i-parseInt(i/10)*10;}
		if(i>0){rs+=Romenum[0][i-1];}
		if(!b){rs=rs.toLowerCase();}
		return rs;
	}	
	for(var n=0;n<arr.length;n++){
		var str_no="";
		switch(this.signType){
			case "Number":
				str_no=this.signLeft+(n+1)+this.signRight;break;
			case "Lowercase":
				str_no=this.signLeft+NtoM(n+1,26,'0abcdefghijklmnopqrstuvwxyz')+this.signRight;break;
			case "Uppercase":
				str_no=this.signLeft+NtoM(n+1,26,'0ABCDEFGHIJKLMNOPQRSTUVWXYZ')+this.signRight;break;	
			case "Alphabeta":
				str_no=this.signLeft+NtoM(n+1,24,TcFrame.Language['alphabeta'])+this.signRight;break;	
			case "Hex":
				str_no=this.signLeft+(n+1).toString(16)+this.signRight;break;	
			case "LowerRoman":
				str_no=this.signLeft+NtoRomen(n+1,0)+this.signRight;break;	
			case "UpperRoman":
				str_no=this.signLeft+NtoRomen(n+1,1)+this.signRight;break;
			case "None":
				str_no=null;break;							
			default:
				str_no=this.signLeft+this.signType+this.signRight;break;
		}
		var item=new TcFrame.ListItem({width:this.width,height:this.itemHeight,label:arr[n].label,sign:str_no,signAlign:this.signAlign});
		item.id=arr[n].id;
		this.add(item);
		item.addEventListener('onClick',function(event){
			var lt=event.target.parent;
			if(event.target==lt.currentSelect){return;}
			event.target.setActive(true);
			if(lt.currentSelect){lt.currentSelect.setActive(false);}
			lt.currentSelect=event.target;
			lt.dispatch("onChange",{target:lt});
		});
	}
	this.resize();
}
