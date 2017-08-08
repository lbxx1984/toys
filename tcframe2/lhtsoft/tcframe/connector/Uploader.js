var TcFrame=TcFrame||{};
TcFrame.Uploader=function(param){
	this.initializate(param);
	if(param){
		this.toFile=param.toFile;	
		this.loader=param.loader;
	}
	var _this=this;
	this.fileBtn=new TcFrame.Button({height:this.height-2,width:40,right:42,top:0,label:TcFrame.Language['select']});
	this.uploadBtn=new TcFrame.Button({height:this.height-2,width:40,right:1,top:0,label:TcFrame.Language['upload']})
	this.fileInput=new TcFrame.TextInput({height:this.height-2,left:0,top:0,right:82});
	this.add(this.fileBtn);
	this.add(this.fileInput);
	this.add(this.uploadBtn);
	this.fileSelect=document.createElement('input');
	this.fileSelect.type='file';
	this.fileSelect.id='fileField';
	this.fileSelect.name='fileField';
	this.fileSelect.style.position="absolute";
	this.fileSelect.style.width=this.fileBtn.width+"px";
	this.fileSelect.style.height=this.fileBtn.height+"px";
	this.fileSelect.style.top=this.fileBtn.y+"px";
	this.fileSelect.style.left=this.fileBtn.x+"px";
	var toFile=document.createElement('input');
	toFile.type="hidden";
	toFile.id="toFile";
	toFile.name="toFile";
	toFile.value=this.toFile;
	if(TcFrame.RunInIE&&TcFrame.IEVersion<10){
		this.fileSelect.style.filter="alpha(opacity=0)";
	}else{
		this.fileSelect.style.opacity=0;
	}
	this.form=document.createElement('form');
	this.form.style.cssText = 'position:absolute;top:0px;left:0px';
	this.form.method='POST';
	this.form.enctype='multipart/form-data';
	this.form.encoding='multipart/form-data';
    this.form.appendChild(this.fileSelect);
	this.form.appendChild(toFile);
	this.content.appendChild(this.form);
	this.iframe=document.createElement('iframe');
	this.iframe.id="newiframe";
	this.iframe.name="newiframe";
	this.iframe.style.cssText = 'position:absolute;top:-9999px; left:-9999px';
    this.content.appendChild(this.iframe);
	this.form.target="newiframe";
	this.form.action=this.loader;
	
	this.fileSelect.onchange=function(){_this.fileInput.setValue(_this.fileSelect.value);}
	this.iframe.onload = function(){
		_this.fileSelect.value="";
		var str="";
        try{
            if(_this.iframe.contentWindow){
                str = _this.iframe.contentWindow.document.body ? 
					  _this.iframe.contentWindow.document.body.innerHTML : null;
            }else{
                str = _this.iframe.contentDocument.document.body ? 
					  _this.iframe.contentDocument.document.body.innerHTML : null;
            }
        }catch(e){};
		if(!str){return;}
		if(str.indexOf(_this.toFile)==0){
			_this.dispatch('onComplete',{target:_this,url:str});
			_this.fileInput.setValue(TcFrame.Language['uploadover']);
			return;	
		}
		_this.dispatch('onError',{target:_this,message:str});
		_this.fileInput.setValue(TcFrame.Language['uploaderror']);
	}
	this.uploadBtn.addEventListener('onClick',function(event){
		if(!_this.fileSelect.value){TcFrame.Alert.show({title:TcFrame.Language['errormsg'],text:TcFrame.Language['fileurl']});return;}
      	setTimeout(function(){_this.form.submit();},100);
	});
	this.fileBtn.addEventListener('onClick',function(event){
		_this.fileInput.setValue(_this.fileSelect.value);
		_this.fileSelect.click();
	});
	this.addEventListener('onResize',function(event){
		_this.fileBtn.resize();
		_this.uploadBtn.resize();
		_this.fileInput.resize();
		_this.fileSelect.style.width=_this.fileBtn.width+"px";
		_this.fileSelect.style.height=_this.fileBtn.height+"px";
		_this.fileSelect.style.top=_this.fileBtn.y+"px";
		_this.fileSelect.style.left=_this.fileBtn.x+"px";
	});
	this.addEventListener('onMouseMove',function(event){
		var d=event.target;
		if(d.fileBtn.isMouseIn()){
			d.fileBtn.setStyles(d.fileBtn.styleMouseOver);
		}else{
			d.fileBtn.setStyles(d.fileBtn.styleNormal);
		}
	});
	this.addEventListener('onMouseDown',function(event){
		var d=event.target;
		if(d.fileBtn.isMouseIn()){
			d.fileBtn.setStyles(d.fileBtn.styleMouseDown);
		}else{
			d.fileBtn.setStyles(d.fileBtn.styleNormal);
		}
	});
	this.addEventListener('onMouseUp',function(event){
		var d=event.target;
		if(d.fileBtn.isMouseIn()){
			d.fileBtn.setStyles(d.fileBtn.styleMouseOver);
		}else{
			d.fileBtn.setStyles(d.fileBtn.styleNormal);
		}
	});
}
TcFrame.Uploader.prototype=new TcFrame.Canvas();
TcFrame.Uploader.prototype.type="TcFrame.Uploader";
TcFrame.Uploader.prototype.iframe=null;
TcFrame.Uploader.prototype.toFile="upload/";
TcFrame.Uploader.prototype.loader="php/uploader.php";
TcFrame.Uploader.prototype.form=null;
TcFrame.Uploader.prototype.fileSelect=null;
TcFrame.Uploader.prototype.fileInput=null;
TcFrame.Uploader.prototype.fileBtn=null;
TcFrame.Uploader.prototype.uploadBtn=null;
