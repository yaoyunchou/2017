(function (angular) {
	"use strict";

	angular.module('platform').directive('dateRangePicker', ['platformDateSvc',function (platformDateSvc) {
		return {
			restrict: 'A',
			scope: {
				options: '=',
				afterSelect: '&',
				range:'='
			},
			template: '<div class="col-sm-4 range-picke">' +
			'<input type="text" class="form-control">' +
			'<i data-ng-click="deleteTime()" data-ng-if="showDelete" class="glyphicon glyphicon glyphicon-remove"></i>' +
			'<i class="glyphicon glyphicon-calendar fa fa-calendar" ng-class = {\'has-remove\':!showDelete} ></i>' +
			'</div>',
			replace: true,
			link: function (scope, element) {
				scope.showDelete = false;
				scope.backData = {};
				var init = function init(){
					var defaultOpt ={
						minDate:platformDateSvc.dateRange({range:365}),
						maxDate:new Date().format('yyyy-MM-dd'),
						startDate:scope.range&&scope.range.start?scope.range.start:platformDateSvc.dateRange({range:30}),
						endDate: scope.range&&scope.range.end  ? scope.range.end:new Date().format('yyyy-MM-dd'),
						locale: {
							format: 'YYYY-MM-DD',
							language: 'zh-CN', 'daysOfWeek': [
								'日', '一', '二', '三', '四', '五', '六'
							],
							monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十月', '十二月'],
							applyLabel:'确认',
							cancelLabel:'取消'

						}
					};
					if( scope.options&& scope.options.showDelete){
						scope.showDelete = scope.options.showDelete;
					}
					var opt = angular.extend({},defaultOpt,scope.options);
					if(scope.options&&scope.options.locale){
						opt.locale = angular.extend({},defaultOpt.locale,scope.options.locale);
					}
					element.find('.glyphicon-calendar').click(
						function(){
							element.find('input').click();
						}
					);
					element.find('input').daterangepicker(opt,
						function (start, end) {
							if(scope.options&&scope.options.locale&&scope.options.locale.format){
								scope.backData.start = start.format(opt.locale.format);
								scope.backData.end = end.format(opt.locale.format);
								scope.afterSelect({data:scope.backData});
							}else{
								scope.backData.start = start.format('YYYY-MM-DD');
								scope.backData.end = end.format('YYYY-MM-DD');
								scope.afterSelect({data:scope.backData});
							}

							//console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'+')'));
						});
				};
				scope.deleteTime = function deleteTime(){
					element.find('input').val('');
					scope.backData.start = '';
					scope.backData.end = '';
					scope.afterSelect({data:scope.backData});
				};
				scope.$evalAsync(function () {
						init();
				});
				var watcher = scope.$watch('range',function(newValue){
					if(newValue){
						init();
					}
				});
				scope.$on('$detory',function(){
					watcher();
				});

			}
		};
	}]);

}(angular));