const Grid = require('./ui/grid');
new Grid($('.container')).build();
 //整个document圈闭屏蔽默认右键
 $(document).bind("contextmenu", function (oEvent) {
    if (!oEvent) oEvent = window.event;
    if (oEvent.button == 2) {
        if (document.all) window.event.returnValue = false;// for IE
        else event.preventDefault();
    }
});
