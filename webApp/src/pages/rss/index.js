
const RssList = resolve => require(['@/pages/rss/form/form.js'], resolve)


//const RssList = resolve => require(['@/pages/rss/list/list.js'], resolve);
const RssDetail = resolve => require(['@/pages/rss/detail/detail.js'], resolve);

export default  [
	{
		path: '/rss-list',
		name: 'RssList',
		component: RssList
	},
	{
		path: '/rss-detail/:id',
		name: 'RssDetail',
		component: RssDetail
	}
];

