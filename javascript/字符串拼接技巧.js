/**
 * Created by timlv on 2016/9/2.
 */
/**
 * 数组join已经是一个比较通用的方式，但是对于一些需要方便编辑，并且将编辑后的结果直接变成字符串，就用这个方式
 *
  */
var sqlf = function () {/*
 SELECT d1.orderId AS orderId
 FROM(
 SELECT forderid AS orderId,count(forderid) AS count
 FROM t_bill_detail  where 1=1
 <% if(start){ %>
 and frefundtime >= '<%= start %>'
 <% } %>
 <% if(end){ %>
 and frefundtime <= '<%= end %>'
 <% } %>
 GROUP BY orderId) AS d1
 LEFT OUTER JOIN (
 SELECT  forderid AS orderId,count(forderid) AS count
 FROM  t_bill_detail
 WHERE  fstatus = '-1'
 GROUP BY orderId
 ) AS d2
 ON d2.orderId = d1.orderId
 WHERE
 d2.count = d1.count;
 */};
sql = ejs.render(sqlf.toString().split(/\n/).slice(1, -1).join(""), where||{})