(function (angular) {
    "use strict";
    angular.module('platform').directive('platformGetHeight', [function () {
        return {
            restrict: 'A',
            link: function (scope, element,attr) {
                //scope.$evalAsync(function(){
                //    var ruleHeight = $('.'+attr.standard).outerHeight();
                //    ruleHeight  -=   element.siblings().outerHeight();
                //    element.height(ruleHeight);
                //});

                var watcher = scope.$watch( 'dataList',function(){
                    setTimeout(function (){
                        var ruleHeight = $('.'+attr.standard).outerHeight();
                        ruleHeight  -=   element.siblings().outerHeight();
                        element.height(ruleHeight);
                    },200);
                });
                scope.$on('$destroy',function(){
                    watcher();
                });

            }

        };
    }]);

}(angular));