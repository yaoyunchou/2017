##友情链接标签
##使用方式

    <ul class="frls">
    	<nsw:frl var="fr" stat="stat">
    	<li><a th:text="${fr.name}" th:href="${fr.url}"></a> </li>
    	</nsw:frl>
    </ul>

##生成效果

    <ul class="frls">
    	<li><a href="http://www.nsw99.com">测试友情链接</a></li>
    	<li><a href="http://www.baidu.com">百度友情链接</a></li>
    	<li><a href="http://www.sina.com.cn">新浪友情链接</a></li>
    </ul>

##变量说明

|变量名|是否必须 |默认值| 说明|
----------|---------|--------|----------|
var       |是	|F	|循环变量名
stat	|否	|stat	|循环索引变量，详细请查看[循环变量](#_3)

##循环变量 stat的使用
stat变量包含：

| 变量名称|说明|
|------------|------|
index	     |当前循环数，从0开始
count        | 当前循环数 从1开始
size          |总大小
odd          | 是否是偶数行
even        |  是否是奇数行   
first           | 是否是第一行
last           |  是不是最后一行   
