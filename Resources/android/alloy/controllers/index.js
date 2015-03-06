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
    $.__views.mapcontainer = Ti.UI.createView({
        id: "mapcontainer"
    });
    $.__views.index.add($.__views.mapcontainer);
    var __alloyId0 = [];
    $.__views.appcHQ = require("ti.map").createAnnotation({
        id: "appcHQ",
        myid: "1"
    });
    __alloyId0.push($.__views.appcHQ);
    $.__views.mapview = require("ti.map").createView({
        annotations: __alloyId0,
        id: "mapview"
    });
    $.__views.mapcontainer.add($.__views.mapview);
    $.__views.textField = Ti.UI.createTextField({
        id: "textField",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        hintText: "Search",
        color: "#336699",
        top: "5%",
        left: "10%",
        right: "10%",
        width: "80%",
        height: "10%"
    });
    $.__views.mapcontainer.add($.__views.textField);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var thisWin = $.index;
    Ti.UI.createWindow();
    require("ti.map");
    var main = $.mapcontainer;
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