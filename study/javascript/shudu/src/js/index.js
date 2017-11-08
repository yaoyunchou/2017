const oolkit = require('./core/toolkit');
const Grid = require('./ui/grid');

const PopupNumber = require("./ui/popupnumbers")
const grid = new Grid($('#container'))
grid.build();
const popup = new PopupNumber($("#popupNumbers"))

grid.bindPopup(popup);

