function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        exitOnClose: true,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.drawermenu = Alloy.createWidget("com.alcoapps.drawermenu", "widget", {
        id: "drawermenu",
        __parentSymbol: $.__views.index
    });
    $.__views.drawermenu.setParent($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var thisWin = $.index;
    Ti.UI.createWindow();
    var Map = require("ti.map");
    var main = Map.createView({
        mapType: Map.NORMAL_TYPE,
        region: {
            latitude: 37.78739929199219,
            longitude: -122.4031982421875,
            latitudeDelta: .05,
            longitudeDelta: .05
        },
        animate: true,
        regionFit: true,
        userLocation: false,
        height: "100%",
        top: 0
    });
    Alloy.CFG.drawermenu = $.drawermenu;
    Alloy.CFG.main = main;
    var menu = Alloy.createController("menu").getView();
    $.drawermenu.init({
        menuview: menu,
        mainview: main,
        duration: 200,
        parent: thisWin
    });
    thisWin.addEventListener("open", function() {
        var actionBarHelper = require("com.alcoapps.actionbarhelper")(thisWin);
        actionBarHelper.setIcon("/drawericonw@2x.png");
        actionBarHelper.setTitle("ActionBar with DrawerMenu");
        actionBarHelper.setUpAction(function() {
            $.drawermenu.showhidemenu();
        });
        actionBarHelper.displayHomeAsUp(false);
    });
    thisWin.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;