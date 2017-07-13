(function (angular) {
	"use strict";
	angular.module('platform').factory('platformWechatEmotionSvc', [function () {
		var service = {},
			emotions = [{code: '/微笑', desc: '微笑', img: 0},
				{code: '/撇嘴', desc: '撇嘴', img: 1},
				{code: '/色', desc: '色', img: 2},
				{code: '/发呆', desc: '发呆', img: 3},
				{code: '/得意', desc: '得意', img: 4},
				{code: '/流泪', desc: '哭', img: 5},
				{code: '/害羞', desc: '羞', img: 6},
				{code: '/闭嘴', desc: '哑', img: 7},
				{code: '/睡', desc: '睡', img: 8},
				{code: '/大哭', desc: '哭', img: 9},
				{code: '/尴尬', desc: '囧', img: 10},
				{code: '/发怒', desc: '怒', img: 11},
				{code: '/调皮', desc: '调皮', img: 12},
				{code: '/呲牙', desc: '笑', img: 13},
				{code: '/惊讶', desc: '惊讶', img: 14},
				{code: '/难过', desc: '难过', img: 15},
				{code: '/酷', desc: '酷', img: 16},
				{code: '/冷汗', desc: '汗', img: 17},
				{code: '/抓狂', desc: '抓狂', img: 18},
				{code: '/吐', desc: '吐', img: 19},
				{code: '/偷笑', desc: '笑', img: 20},
				{code: '/:,@-D', desc: '愉快', img: 21},
				{code: '/白眼', desc: '奇', img: 22},
				{code: '/傲慢', desc: '傲', img: 23},
				{code: '/饥饿', desc: '饿', img: 24},
				{code: '/困', desc: '累', img: 25},
				{code: '/惊恐', desc: '吓', img: 26},
				{code: '/流汗', desc: '汗', img: 27},
				{code: '/憨笑', desc: '高兴', img: 28},
				{code: '/::,@', desc: '闲', img: 29},
				{code: '/奋斗', desc: '努力', img: 30},
				{code: '/咒骂', desc: '骂', img: 31},
				{code: '/疑问', desc: '疑问', img: 32},
				{code: '/嘘', desc: '秘密', img: 33},
				{code: '/晕', desc: '乱', img: 34},
				{code: '/::8', desc: '疯', img: 35},
				{code: '/:,@!', desc: '哀', img: 36},
				{code: '/骷髅', desc: '鬼', img: 37},
				{code: '/敲打', desc: '打击', img: 38},
				{code: '/再见', desc: 'bye', img: 39},
				{code: '/擦汗', desc: '汗', img: 40},
				{code: '/抠鼻', desc: '抠', img: 41},
				{code: '/鼓掌', desc: '鼓掌', img: 42},
				{code: '/糗大了', desc: '糟糕', img: 43},
				{code: '/坏笑', desc: '恶搞', img: 44},
				{code: '/左哼哼', desc: '什么', img: 45},
				{code: '/右哼哼', desc: '什么', img: 46},
				{code: '/哈欠', desc: '累', img: 47},
				{code: '/鄙视', desc: '看', img: 48},
				{code: '/委屈', desc: '难过', img: 49},
				{code: '/快哭了', desc: '快哭了', img: 50},
				{code: '/阴险', desc: '坏', img: 51},
				{code: '/亲亲', desc: '亲', img: 52},
				{code: '/吓', desc: '吓', img: 53},
				{code: '/可怜', desc: '可怜', img: 54},
				{code: '/菜刀', desc: '刀', img: 55},
				{code: '/西瓜', desc: '水果', img: 56},
				{code: '/啤酒', desc: '酒', img: 57},
				{code: '/篮球', desc: '篮球', img: 58},
				{code: '/乒乓', desc: '乒乓', img: 59},
				{code: '/咖啡', desc: '咖啡', img: 60},
				{code: '/饭', desc: '美食', img: 61},
				{code: '/猪头', desc: '动物', img: 62},
				{code: '/玫瑰', desc: '鲜花', img: 63},
				{code: '/凋谢', desc: '枯', img: 64},
				{code: '/:showlove', desc: '唇', img: 65},
				{code: '/爱心', desc: '爱', img: 66},
				{code: '/心碎', desc: '分手', img: 67},
				{code: '/蛋糕', desc: '生日', img: 68},
				{code: '/闪电', desc: '电', img: 69},
				{code: '/炸弹', desc: '炸弹', img: 70},
				{code: '/刀', desc: '刀', img: 71},
				{code: '/足球', desc: '足球', img: 72},
				{code: '/瓢虫', desc: '虫', img: 73},
				{code: '/便便', desc: '臭', img: 74},
				{code: '/月亮', desc: '月亮', img: 75},
				{code: '/太阳', desc: '太阳', img: 76},
				{code: '/礼物', desc: '礼物', img: 77},
				{code: '/拥抱', desc: '伙伴', img: 78},
				{code: '/强', desc: '赞', img: 79},
				{code: '/弱', desc: '差', img: 80},
				{code: '/握手', desc: '握手', img: 81},
				{code: '/胜利', desc: '优', img: 82},
				{code: '/抱拳', desc: '恭', img: 83},
				{code: '/勾引', desc: '勾', img: 84},
				{code: '/拳头', desc: '顶', img: 85},
				{code: '/差劲', desc: '坏', img: 86},
				{code: '/爱你', desc: '爱', img: 87},
				{code: '/NO', desc: '不', img: 88},
				{code: '/OK', desc: '好的', img: 89},
				{code: '/爱情', desc: '爱', img: 90},
				{code: '/飞吻', desc: '吻', img: 91},
				{code: '/跳跳', desc: '跳', img: 92},
				{code: '/发抖', desc: '怕', img: 93},
				{code: '/怄火', desc: '尖叫', img: 94},
				{code: '/转圈', desc: '圈', img: 95},
				{code: '/磕头', desc: '拜', img: 96},
				{code: '/回头', desc: '回头', img: 97},
				{code: '/跳绳', desc: '跳', img: 98},
				{code: '/:oY', desc: '天使', img: 99},
				{code: '/激动', desc: '激动', img: 100},
				{code: '/:hiphot', desc: '跳舞', img: 101},
				{code: '/献吻', desc: '吻', img: 102},
				{code: '/左太极', desc: '瑜伽', img: 103},
				{code: '/右太极', desc: '太极', img: 104}],
			convertRegStringPattern = /\.*([|\*|\.|\?|\+|\$|\^|\[|\]|\(|\)|\{|\}|\||\\|\/])\.*/ig;

		service.getImagePath = function getImagePath(key) {
			return globals.basAppRoot + 'plugins/kindeditor/plugins/emoticons/images/' + key + '.gif';
		};

		function _escape(val) {
			return val.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
		}
		function _unescape(val) {
			return val.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
		}

		service.imgToCode = function imgToCode(article) {
			article = article.replace(/<img[^>]+src\s*=\s*['\"][^'\"]+\/(\d+).gif?[^'\"]+['\"][^>]*>/ig, function (src, key) {
				return (_.find(emotions, {img: parseInt(key)}) || {}).code;
			})
			article = article.replace(/[\n|\r\n]/ig, ''); //把\n和\r\n都去掉
			article = article.replace(/(<a[^<]+)(<br\s+\/>)([^<]{0,}<\/a>)/ig, '$1$3\n'); //把a标签里面的换行都挪到a的外面
			article = article.replace(/<br\s*[\/?]>/ig, '\n').replace(/&nbsp;/ig, ' '); //把BR换成\n

			article = _unescape(article);
			article = _.trimRight(article,'\n');
			return article;
		};

		service.codeToImg = function codeToImg(article) {
			//article = _escape(article);
			_.forEach(emotions, function (emotion) {
				var code = emotion.code.replace(convertRegStringPattern, '\\$1');
				var reg = new RegExp(code, 'ig');
				if (reg.test(article)) {
					article = article.replace(reg, '<img src="' + service.getImagePath(emotion.img) + '" alt="' + emotion.desc + '"/>')
				}
			});

			article = article.replace(/\n/ig, '<br />');

			return article;
		};

		service.getEmotions = function getEmotions() {
			return emotions;
		};

		return service;
	}]);
}(angular));