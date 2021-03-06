var TcFrame=TcFrame||{};
TcFrame.Events={
	'TcFrame.Application':['onResize','onMouseMove','onMouseDown','onMouseUp'],
	'TcFrame.UIComponent':['onResize','onMouseOver','onMouseOut','onMouseMove','onMouseDown','onMouseUp','onClick'],
	'TcFrame.Animation':["onComplete"],
	'TcFrame.Open':["onComplete"],
	'TcFrame.Close':["onComplete"],
	'TcFrame.Move':["onComplete"],
	'TcFrame.Resize':["onComplete"],
	'TcFrame.Timer':["onComplete","onStop"],
	
	'TcFrame.Canvas':['onResize','onMouseOver','onMouseOut','onMouseMove','onMouseDown','onMouseUp','onClick'],
	'TcFrame.Group':['onResize'],
	'TcFrame.Accordion':['onResize'],
	'TcFrame.TabNavigator':['onResize'],
	'TcFrame.Panel':['onResize','onMouseOver','onMouseOut','onMouseMove','onMouseDown','onMouseUp'],
	'TcFrame.TitleWindow':['onResize','onMouseOver','onMouseOut','onMouseMove','onMouseDown','onMouseUp','onCloseBtnClick','onMaxBtnClick','onMinBtnClick'],
	'TcFrame.Button':['onResize','onMouseOver','onMouseOut','onMouseMove','onMouseDown','onMouseUp','onClick'],
	'TcFrame.Label':['onResize','onMouseOver','onMouseOut','onMouseMove','onMouseDown','onMouseUp','onClick'],
	'TcFrame.TabBar':['onResize','onActiveChange'],
	'TcFrame.ButtonBar':['onResize','onActiveChange'],
	'TcFrame.Image':['onResize','onMouseOver','onMouseOut','onMouseMove','onMouseDown','onMouseUp','onClick'],
	'TcFrame.ImageButton':['onResize','onMouseOver','onMouseOut','onMouseMove','onMouseDown','onMouseUp','onClick'],
	'TcFrame.CheckBox':['onResize','onChange'],
	'TcFrame.CheckBoxGroup':['onResize','onChange'],
	'TcFrame.Radio':['onResize','onChange','onMouseUp'],
	'TcFrame.RadioGroup':['onResize','onChange'],
	'TcFrame.TextInput':['onResize','onChange','onFocusIn','onFocusOut'],
	'TcFrame.Number':['onResize','onChange','onFocusIn','onFocusOut'],
	'TcFrame.TextArea':['onResize','onChange','onFocusIn','onFocusOut'],
	'TcFrame.ListItem':['onResize','onMouseOver','onMouseOut','onMouseMove','onMouseDown','onMouseUp','onClick'],
	'TcFrame.List':['onResize','onChange','onMouseOver','onMouseOut','onMouseMove','onMouseDown','onMouseUp','onClick'],
	'TcFrame.ComboBox':['onResize','onChange'],
	'TcFrame.DropDownList':['onResize','onChange','onClick'],
	'TcFrame.MenuItem':['onResize','onMouseOver','onMouseOut','onMouseMove','onMouseDown','onMouseUp','onClick'],
	'TcFrame.MenuList':['onResize','onItemMouseOver','onClick'],
	'TcFrame.Menu':['onResize','onClick'],
	'TcFrame.DateField':['onResize','onChange'],
	'TcFrame.DateChooser':['onResize','onChange'],
	'TcFrame.ColorField':['onResize','onChange'],
	'TcFrame.ColorPicker':['onResize','onChange','onMouseOver','onMouseOut','onMouseMove','onMouseDown','onMouseUp','onClick'],
	'TcFrame.Slider':['onChange'],
	'TcFrame.Progress':['onResize'],
	'TcFrame.RichTextEditor':['onResize'],
	'TcFrame.TreeItem':['onExpandBtnClick','onMouseOver','onMouseOut'],
	'TcFrame.Tree':['onResize','onItemOver','onItemOut','onItemClick'],	
	'TcFrame.GridItem':['onResize','onMouseOver','onMouseOut','onMouseMove','onMouseDown','onMouseUp','onClick'],
	'TcFrame.GridLine':['onResize'],
	'TcFrame.Grid':['onResize','onItemMouseOver','onItemMouseOut','onItemClick','onMouseUp'],
	'TcFrame.Stage2D':['onResize'],
	'TcFrame.CoordinatePaper':['onResize'],
	'TcFrame.RingPaper':['onResize'],
	'TcFrame.ShortConnection':['onError'],
	'TcFrame.Uploader':['onResize','onError','onComplete','onMouseMove','onMouseDown','onMouseUp'],
	'TcFrame.Stage3D':['onResize','onMouseOver','onMouseOut','onMouseMove','onMouseDown','onMouseUp','onAnimate'],
	'TcFrame.Stage3D.CameraController':['onResize','onMouseOver','onMouseOut','onMouseMove','onMouseDown','onMouseUp']
}