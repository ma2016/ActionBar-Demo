var thisWin=$.index;
var win = Ti.UI.createWindow();
var Map = require('ti.map');

	    	
var main = Map.createView({
    mapType: Map.NORMAL_TYPE,
    region: {
        latitude:37.78739929199219,
        longitude:-122.4031982421875,
        latitudeDelta:.05,
        longitudeDelta:.05
    },
    animate:true,
    regionFit:true,
    userLocation:false,
    height:'100%',
    top:0
});
/*
var main=Ti.UI.createView({
	backgroundColor: "#fff"
});*/
// store drawermenu and main in global variable for easy access from menu
Alloy.CFG.drawermenu=$.drawermenu;
Alloy.CFG.main=main;

var menu=Alloy.createController('menu').getView();

$.drawermenu.init({
    menuview:menu,
    mainview:main,
    duration:200,
    parent: thisWin
});

thisWin.addEventListener('open',function(e){
	var actionBarHelper = require('com.alcoapps.actionbarhelper')(thisWin);	
	actionBarHelper.setIcon('/drawericonw@2x.png');
	actionBarHelper.setTitle('ActionBar with DrawerMenu');
	actionBarHelper.setUpAction(function(e){
		$.drawermenu.showhidemenu();
	});
	actionBarHelper.displayHomeAsUp(false);
});

thisWin.open();
