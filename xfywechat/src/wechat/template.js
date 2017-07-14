/**
 * Created by yao on 2016/11/2.
 */
/*global require*/
"use strict";
var ejs = require('ejs');
var heredoc = require('heredoc');

var template = heredoc(function () {/*
 <xml>
 <ToUserName><![CDATA[<%= formUserName %>]]></ToUserName>
 <FromUserName><![CDATA[<%= toUserName %>]]></FromUserName>
 <CreateTime><%= createTime %></CreateTime>
 <MsgType><![CDATA[<%= msgType %>]]></MsgType>
 <% if(msgType==='image'){ %>
 <Image>
 <MediaId><![CDATA[<%= content.mediaId%>]]></MediaId>
 </Image>
 <% }else if(msgType==='text'){ %>
 <Content><![CDATA[ <%= content %>]]></Content>
 <% }else if(msgType==='voice'){ %>
 <MediaId><![CDATA[<%= content.mediaId%>]]></MediaId>
 <Format><![CDATA[<%= Format%>]]></Format>
 <% }else if(msgType==='video'){ %>
 <Video>
 <MediaId><![CDATA[<%= content.mediaId%>]]></MediaId>
 <Title><![CDATA[<%= content.title %>]]></Title>
 <Description><![CDATA[<%= content.description %>]]></Description>
 </Video>
 <% }else if(msgType==='news'){ %>
 <ArticleCount><%= content.length %></ArticleCount>
 <Articles>
 <% content.forEach(function(item){ %>
 <item>
 <Title><![CDATA[<%= item.title1%>]]></Title>
 <Description><![CDATA[<%= item.description1 %>]]></Description>
 <PicUrl><![CDATA[<%= item.picUrl%>]]></PicUrl>
 <Url><![CDATA[<%= item.url%>]]></Url>
 </item>
 <%})%>
 </Articles>
 <% }%>
 </xml>
 */
});

var compiled = ejs.compile(template);
exports.template = module.exports = {
	compiled: compiled
};