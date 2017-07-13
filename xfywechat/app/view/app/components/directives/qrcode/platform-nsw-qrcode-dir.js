(function (angular) {
	"use strict";

	angular.module('platform').directive('qrCode', [function () {
		return {
			restrict: 'A',
			require: 'ngModel',
			scope:{
				qrCodeUrl:'=',
				afterSelect:'&',
			},
			link: function (scope, element, attr, ctrl) {
				var qrimage,params = {},modelValue;
				function updateQrCode() {
					var defalutOption = {
						mPosX: 0.5,
						mPosY: 0.5,
						mSize: 0.2,
						minVersion: 6,
						mode: 0,
						quiet: 1,
						radius: 0,
						render: "canvas",
						size: 200,
						background: "#ffffff",
						ecLevel: "H",
						fill: "#333333",
						fontcolor: "#ff9818",
						text: scope.qrCodeUrl
					};
					var options = $.extend({},defalutOption,params);

					element.qrcode(options);
					if(options.mode=== 0){
						if(ctrl.$viewValue!=='normal'){
							ctrl.$setViewValue('normal');
						}
					}else{
						ctrl.$setViewValue('personality');
					}
					scope.afterSelect({data:element.find('canvas')[0].toDataURL('image/png')});
					element.children('canvas').remove();
					if (!scope.$root.$$phase) {
						scope.$apply();
					}
				}

				var onImageInput = function onImageInput() {
					var input = $('<input id="image" type="file">');
					input[0].click();
					input.change(function(){
						if (input[0].files && input[0].files[0]) {
							var reader = new FileReader();
							reader.onload = function (event) {
								setTimeout(function(){
									qrimage = $('<img id="img-buffer" src="'+ event.target.result+'">')[0];
									params.image = qrimage;
									params.mode = 4;
									updateQrCode();
								}, 250);
							};
							reader.readAsDataURL(input[0].files[0]);
						}

					});
				};
				ctrl.$render = function render(){
					modelValue = ctrl.$viewValue||'';
				};

				element.click(function () {
					if(ctrl.$viewValue&&ctrl.$viewValue!=='personality'){
						onImageInput();
					}else{
						params.mode = 0;
						updateQrCode();
					}

				});
				var toWathch = scope.$watch('qrCodeUrl',function(newValue,oldValue){
					if(!!newValue&& newValue!==oldValue){
						updateQrCode();
					}else{
						modelValue = '';
					}
				});
				scope.$on('$destroy',function(){
					toWathch();
				});
			}
		};
	}]);

}(angular));