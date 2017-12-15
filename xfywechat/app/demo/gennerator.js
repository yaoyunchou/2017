'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(helloWorldGennerator);

/**
 * Created by yao on 2017/6/16.
 */

function doSomeThings(next) {
  console.log('我在做事情!!!');
}
function helloWorldGennerator() {
  return _regenerator2.default.wrap(function helloWorldGennerator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 'helle';

        case 2:
          _context.next = 4;
          return doSomeThings(this);

        case 4:
          _context.next = 6;
          return 'world';

        case 6:
          _context.next = 8;
          return 'ending';

        case 8:
          return _context.abrupt('return', 'yao');

        case 9:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

var a = helloWorldGennerator();
console.log(a.next());
//# sourceMappingURL=gennerator.js.map