#导航标签的使用说明
##使用样例

    <nsw:nav type="main" var="n">
        <a href="${n.url}">${n.name}</a>
    </nsw:nav>

##成生效果
    <ul> 
       <li><a href="">菱泰首页</a></li> 
       <li><a href="">新能源与蓄能工程</a> 
        <ul> 
         <li><a href="">空调能源冷站（蓄冷）</a></li> 
         <li><a href="">格力光伏变频空调</a></li> 
         <li><a href="">风能、太阳能（蓄电）</a></li> 
         <li><a href="">地热能开发</a></li> 
        </ul></li> 
       <li><a href="">节能改造</a> 
        <ul> 
         <li><a href="">节能咨询</a></li> 
         <li><a href="">节能方案设计</a></li> 
         <li><a href="">空调系统优化</a></li> 
         <li><a href="">节能评估</a></li> 
         <li><a href="">节能管理平台</a></li> 
        </ul></li> 
      </ul>

##变量说明

|变量名|是否必须 |默认值| 说明|
--------|---------|--------|----------|
var      |否        |  N       |引用 变量名
type    |否        | main  |main:主导航 left:左导航 bottom:底部导航
level   |否        |            |默认加载全部导航树，指定level如1，则只加载1级导航

##可以使用导航的哪些信息
    {
        "_id" :"583b8bca82ce2b6011cbf9c0",
        "projId" : "27685_PC",
        "name" : "空调能源冷站（蓄冷）",
        "imgUrl" : "",
        "url" : "products/ZhongYangKongDiaoShui.html"
    }

##使用Tips
+ `<nsw:nav >` 标签中包裹的内容为导航中li节点中包含的内容，这部分内容是可以自定的
如果不想写，你甚至可以不写内容，因为其默认内容为 
    
    <a href="${N.url}" \>${N.name}</a\>
    
    如果你愿意，你甚至可以这么写

    <nsw:nav\></nsw:nav\>

    当然你也可以进一步写成这样

    <nsw:nav /\>

    这就是加载主导航，并且显示所有层级

