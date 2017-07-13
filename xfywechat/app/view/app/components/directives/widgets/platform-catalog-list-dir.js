/*global angular, _*/
/**
 *
 options setting:
 1. caption: string,           editor caption
 2. enableCreate: boolean,      是否可以新增
 3. enableSpeedEdit: boolean,   是否可以快速编辑
 4. enableLineEdit: boolean,    是否可以行内编辑
 5. enableSort:boolean ,        是否可以排序
 6. enableDelete: boolean,      是否可以删除
 7. onDeleted: function,         删除执行事件
 8. onCreated: function,         创建执行事件
 9. onSorted: function,          排序执行事件
 10.onLineEdited: function,      行内编辑结束事件
 11.onSelectedChanged: function, 选中项更新事件
 12.onSpeedEdit: function,       快速编辑事件
 14.data: object{dataList, selectedItem,sortBy,displayField},       数据选项
 15.formOptions: object{formName,rows, data,lookups}        增加表单设置
 */
(function (angular) {
	"use strict";
	var module = angular.module("platform");
	module.directive("platformCatalogList", ['platformModalSvc', function (platformModalSvc) {
		return {
			restrict: 'A',
			scope: {
				options: '='
			},
			templateUrl: globals.basAppRoute + 'components/templates/platform-catalog-list-dir.html',
			link: function (scope) {

				scope.options.enableCreate = _.isBoolean(scope.options.enableCreate) ? scope.options.enableCreate : !!scope.options.onCreated;
				scope.options.enableSpeedEdit = _.isBoolean(scope.options.enableSpeedEdit) ? scope.options.enableSpeedEdit : !!scope.options.onSpeedEdit;
				scope.options.enableLineEdit = _.isBoolean(scope.options.enableLineEdit) ? scope.options.enableLineEdit : !!scope.options.onLineEdited;
				scope.options.enableSort = _.isBoolean(scope.options.enableSort) ? scope.options.enableSort : !!scope.options.onSorted;
				scope.options.enableDelete = _.isBoolean(scope.options.enableDelete) ? scope.options.enableDelete : !!scope.options.onDeleted;

				scope.displayList = [];
				scope.options.setData = function setData(data) {
					if (_.isArray(data)) {
						scope.displayList = _.sortBy(data, scope.options.data.sortBy);
						if (scope.options.data.selectedItem && scope.options.data.selectedItem.id) {
							scope.updateSelection(_.find(scope.displayList, {id: scope.options.data.selectedItem.id}));
						} else if (scope.options.data.selectedItem && scope.options.data.selectedItem._id) {
							scope.updateSelection(_.find(scope.displayList, {_id: scope.options.data.selectedItem._id}));
						} else {
							scope.updateSelection(scope.displayList[0]);
						}
					}
				};

				scope.updateSelection = function updateSelection(item) {
					if (scope.lineEditing && item !== scope.options.data.selectedItem) {
						platformModalSvc.showWarmingTip('请先保存修改！');
						return;
					}
					scope.options.data.selectedItem = item;
					scope.options.onSelectedChanged.apply(this, arguments);
				};
				scope.toggleLineEdit = function toggleLineEdit(item) {
					if(scope.options.enableSpeedEdit){
						scope.options.onSpeedEdit.call(this ,item);
						return;
					}

					if (item !== scope.options.data.selectedItem) {
						return;
					}
					scope.lineEditing = !scope.lineEditing;
					if (scope.lineEditing) {
						scope.options.data.selectedItem = item;
					} else {
						scope.options.onLineEdited.call(this, item);
					}
				};


				scope.doSaveCreate = function doSaveCreate(item) {
					if ( !scope.options.formOptions.$invalid) {
						scope.options.onCreated(item);
						scope.options.formOptions.setData({});
					}
				};

				scope.options.setData(scope.options.data.dataList);

				var watcher = scope.$watch('options.data.dataList', function (val) {
					scope.options.setData(val);
				});

				if (scope.options.formOptions) {
					scope.options.formOptions.data = scope.options.formOptions.data || {};
				}

				scope.$on('$destroy', function () {
					watcher();
				});
			}
		};
	}]);
}(angular));