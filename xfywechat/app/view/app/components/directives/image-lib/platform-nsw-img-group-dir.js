/*globals _*/
(function (angular) {
	"use strict";
	angular.module('platform').directive('nswImgGroup', ['$timeout',function ($timeout) {
		return {
			restrict:'A',
			template:'<span class = "glyphicon glyphicon-menu-left loopleft" ng-show = "imgs.length>maxItems"  ng-click = "back()"></span>' +
			'               <div class="loopbox col-sm-11 nsw-img-group">' +
			'                   <ul>' +
			'                       <li ng-repeat = "(key,img) in imgs" class="img-container">' +
			'                           <div nsw-img ng-if="showAlt" nsw-img-src="{{nswImgSrc}}" data-is-upload="{{img.isUpload}}" data-has-progress="{{img.hasProgress}}" data-process="{{img.process}}" data-alt-readonly="{{altReadonly}}" nsw-img-alt="{{nswImgAlt}}" nsw-img-enable-edit="{{nswImgEnableEdit}}" nsw-img-remove="{{imgRemoveAttr}}">' +
			'                           </div>' +
			'                           <div nsw-img ng-if="!showAlt" nsw-img-src="{{nswImgSrc}}"data-is-upload="{{img.isUpload}}" data-has-progress="{{img.hasProgress}}" data-process="{{img.process}}" nsw-img-remove="{{imgRemoveAttr}}"></div>' +
			'                       </li>' +
			'                   </ul>' +
			'               </div>' +
			'         <span  class = "glyphicon glyphicon-menu-right loopright" ng-show = "imgs.length>maxItems"  ng-click = "mov()"></span>',
			scope:true,
			transclude:true,
			require:'ngModel',
			link:function(scope, element ,attrs, ctrl){
				scope.enableSort = attrs.enableSort === 'true';
				scope.maxItems = parseInt(attrs.maxItems||'1');
				scope.showAlt = attrs.showAlt === 'true';
				scope.altReadonly = attrs.altReadonly === 'true';
				scope.nswImgSrc = attrs.nswImgSrc||'img.url';
				scope.nswImgAlt = attrs.nswImgAlt||'img.alt';
				scope.imgRemoveAttr = attrs.nswImgRemove;
				scope.nswImgEnableEdit = attrs.nswImgEnableEdit;

				var updateDraggable = function updateDraggable(){
					var dragSource = null;
					if(attrs.nswHeight) {
						element.find('.loopbox').height(attrs.nswHeight);
					}
					if(attrs.nswWidth){
						element.find('.loopbox').width(attrs.nswWidth);
					}
					$('li.img-container',element).draggable({
						axis: "x",
						appendTo: "body",
						containment: "parent",
						revert: "invalid",
						helper: "clone",
						create:function(){
							$(this).css('list-style','none');
						},
						drag:function(e, ui){
							dragSource = $(this).scope().img;
							$(ui.helper).css('list-style', 'none');
							$(ui.helper).css('z-index','911215');
						},
						stop:function(){
							dragSource = null;
						}
					});

					$("li.img-container", element).droppable({
						accept: "li.img-container",
						drop: function( ) {
							var target = $(this).scope().img;
							if(dragSource && target && dragSource!==target){
								var srcIndex = _.findIndex(scope.imgs, dragSource), part1, part2;
								_.remove(scope.imgs, dragSource);
								var targetIndex = _.findIndex(scope.imgs, target);

								if(srcIndex>targetIndex) {
									part1 = scope.imgs.slice(0, targetIndex);
									part2 = scope.imgs.slice(targetIndex);
								}else{
									part1 = scope.imgs.slice(0, targetIndex+1);
									part2 = scope.imgs.slice(targetIndex+1);
								}
								part1.push(dragSource);


								var concated = part1.concat(part2);
								scope.imgs.length = 0;
								_.forEach(concated,function(img){
									scope.imgs.push(img);
								});
								scope.$digest();
							}

							$('.drop-active', element).removeClass('drop-active');
						},
						over:function(){
							$('.nsw-img-dir', this).addClass('drop-active');
						},
						out:function(){
							$('.nsw-img-dir',this).removeClass('drop-active');
						}
					});
					$(".loopleft").droppable({
						accept: "li.img-container",
						over:function(){
							scope.$apply(function(){
								scope.back();
							});
						},
						drop:function(){
							alert(1);
						}
					});
					$(".loopright").droppable({
						accept: "li.img-container",
						over:function(){
							scope.$apply(function(){
								scope.mov();
							});
						}
					});
				};

				scope.setModelDirty = function setModelDirty(){
					ctrl.$setViewValue(scope.imgs);
				};

				ctrl.$render = function $render(){
					scope.imgs = ctrl.$viewValue||[];

					$timeout(function(){
						updateDraggable();
					});
				};

				scope.$watch('imgs.length',function(){
					updateDraggable();
				});

				scope.$on('itemremove', function(){
					if($(".loopbox ul", element).hasClass('mov') && scope.imgs.length%scope.maxItems===0){
						scope.back();
					}
				});

				scope.mov = function () {
					$(".loopbox ul", element).addClass("mov").removeClass("back");
				};
				scope.back = function () {
					$(".loopbox ul", element).addClass("back").removeClass("mov");
				};
			}
		};
	}]);

}(angular));