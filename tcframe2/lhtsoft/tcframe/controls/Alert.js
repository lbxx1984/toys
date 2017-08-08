var TcFrame=TcFrame||{};
TcFrame.Alert={}
TcFrame.Alert.type="TcFrame.Alert";
TcFrame.Alert.show=function(param){
	if(!param){return;}
	var bg=new TcFrame.UIComponent({left:0,right:0,top:0,bottom:0});
	var animation=new TcFrame.Animation({target:bg,fromValue:0,toValue:50,cssName:"opacity"});
	var tw=new TcFrame.TitleWindow({
		x:(TcFrame.Boot.width-300)/2,y:100,width:300,height:200,showCloseBtn:true,moveAble:true,
		title:param.title,titleAlign:param.titleAlign||"left"
	});
	var label=new TcFrame.Label({left:10,right:10,top:10,align:param.labelAlign||"left",text:param.text});
	var btn=new TcFrame.Button({width:80,height:25,right:10,bottom:10,label:TcFrame.Language['enter']});
	function close(){TcFrame.Boot.remove(bg);TcFrame.Boot.remove(tw);}
	tw.addEventListener('onCloseBtnClick',close);
	btn.addEventListener('onClick',close);
	bg.setStyle('backgroundColor','#D2D2D2');
	tw.add(label);tw.add(btn);
	TcFrame.Boot.add(bg);TcFrame.Boot.add(tw);
	animation.play();
}
TcFrame.Alert.confirm=function(param){
	if(!param){return;}	
	var OKFunc=param.okFunc;
	var CancelFunc=param.cancelFunc;
	var bg=new TcFrame.UIComponent({left:0,right:0,top:0,bottom:0});
	var animation=new TcFrame.Animation({target:bg,fromValue:0,toValue:50,cssName:"opacity"});
	var tw=new TcFrame.TitleWindow({
		x:(TcFrame.Boot.width-300)/2,y:100,width:300,height:200,showCloseBtn:true,moveAble:true,
		title:param.title,titleAlign:param.titleAlign||"left"
	});
	var label=new TcFrame.Label({left:10,right:10,top:10,align:param.labelAlign||"left",text:param.text});
	var btnOK=new TcFrame.Button({width:80,height:25,right:100,bottom:10,label:TcFrame.Language['enter']});
	var btnCancel=new TcFrame.Button({width:80,height:25,right:10,bottom:10,label:TcFrame.Language['cancel']});
	function close(p){if(p!=null&&typeof(CancelFunc)=='function'){CancelFunc();};TcFrame.Boot.remove(bg);TcFrame.Boot.remove(tw);}
	function ok(){if(typeof(OKFunc)=='function'){OKFunc()};close();}
	function cancel(){if(typeof(CancelFunc)=='function'){CancelFunc()};close();}
	tw.addEventListener('onCloseBtnClick',close);
	btnCancel.addEventListener('onClick',cancel);
	btnOK.addEventListener('onClick',ok);
	bg.setStyle('backgroundColor','#D2D2D2');
	tw.add(label);tw.add(btnOK);tw.add(btnCancel);
	TcFrame.Boot.add(bg);TcFrame.Boot.add(tw);
	animation.play();
};
TcFrame.Alert.prompt=function(param){
	if(!param){return;}
	if(TcFrame.RunInIE){TcFrame.SelectEnable(true);}
	var bg=new TcFrame.UIComponent({left:0,right:0,top:0,bottom:0});
	var animation=new TcFrame.Animation({target:bg,fromValue:0,toValue:50,cssName:"opacity"});
	var tw=new TcFrame.TitleWindow({
		x:(TcFrame.Boot.width-300)/2,y:100,width:300,height:200,showCloseBtn:true,moveAble:true,
		title:param.title,titleAlign:param.titleAlign||"left"
	});
	var label=new TcFrame.Label({left:10,right:10,top:10,align:param.labelAlign||"left",text:param.text});
	var btn=new TcFrame.Button({width:80,height:25,right:10,bottom:10,label:TcFrame.Language['enter']});
	var input=new TcFrame.TextInput({left:10,right:10,top:50,height:25});
	var func=param.func;
	if(param.defaultValue!=null){input.setValue(param.defaultValue);}
	function close(){
		TcFrame.Boot.remove(bg);
		TcFrame.Boot.remove(tw);
		if(TcFrame.RunInIE){TcFrame.SelectEnable(false);}
	}
	tw.addEventListener('onCloseBtnClick',close);
	btn.addEventListener('onClick',function(event){
		var value=input.value;	
		if(value.length==0||value==param.defaultValue){return;}
		if(typeof(func)=="function"){func(value);}
		close();
	});
	bg.setStyle('backgroundColor','#D2D2D2');
	tw.add(label);tw.add(btn);tw.add(input);
	TcFrame.Boot.add(bg);TcFrame.Boot.add(tw);
	animation.play();
}