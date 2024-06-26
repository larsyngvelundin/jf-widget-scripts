window.addEventListener("load", function() {
    JFCustomWidget.subscribe("ready", function(e) {
        console.log("ready");
        console.log("JFCustomWidget.getWidgetSettings:");
        console.log(JFCustomWidget.getWidgetSettings());
    });
});