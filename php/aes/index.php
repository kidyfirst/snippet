<?php
require_once('aes.php');

//先让demo跑起来
	
//aes key由junhan分配，请不要泄漏该值，否则会造成的严重的安全问题
$aesKey = '';

/**
 * 当前业务的业务代码。
 * 如ltmclub或xxzxyy等
 */
//$code = 'xxzxsj';
$code = '';//参考上面示例替换为自己业务的业务代码

/**
 * 多业务列表的配置
 * 如xxzxyy,业务1描述|xxzxsj,业务2描述,荐
 */
//$serviceList = 'xxzxyy,业务1描述|xxzxsj,业务2描述,荐';
$serviceList = '';//参考上面示例替换为自己业务的业务代码



if (!$aesKey) {
	echo '请填入aeskey，不知道可以找junhan分配！';
	exit();
}

if (!$code) {
	echo '请填入业务代码！';
	exit();
}

//单业务模式的配置
$json_single = <<<EOT
{
    "al" : "f,1,这里全是|f,3,自定义|t,,,,|o,10,啦啦啦,,1",
    "ap" : "求你了，点自动续费"
}
EOT;

//多业务模式的配置
$json_multi = <<<EOT
{
    "sl" : "{$serviceList}",
    "list" : [{
        "al" : "f,1,这里全是|f,3,自定义|t,,,,|o,10,啦啦啦,,1",
        "ap" : "求你了，点自动续费"
    }, {
        "al" : "f,2,哇卡卡|f,4,哇擦|f,12,在干嘛,年费哦,1|o",
        "ap" : "点一下自动续费行么"
    }]
}
EOT;

$aes = new AES($aesKey);

//生成单业务模式的链接
$encrypted = bin2hex($aes->encrypt($json_single));

$params_single = array(
	//固定为字符串buy
	'm' => 'buy',
	
	//开通业务。如果有sl字段，那该业务必须在sl中，否则会报错
	'c' => $code,
	
	//aid值，用于业务统计的
	'aid' => 'test',
	
	//pf值，用于统计。联系我们产品xixiong分配
	'pf' => 'xixiong',
	
	//支付成功的返回url
	'ru' => rawurlencode('http://www.qq.com/'),
	
	//跳到支付页面后，第一个页面的左上角的返回按钮的url
	'pu' => rawurlencode('history.back'),
	
	//自定义配置
	'configs' => $encrypted
);

$p = array();
foreach ($params_single as $key => $value) {
	array_push($p, $key . '=' . $value);
}
	
$url_single = 'http://pay.qq.com/h5/index.shtml?' . implode('&', $p);



if($serviceList){
	//生成单业务模式的链接
	$encrypted = bin2hex($aes->encrypt($json_multi));
	
	$params_multi = array(
		//固定为字符串buy
		'm' => 'buy',
		
		//开通业务。如果有sl字段，那该业务必须在sl中，否则会报错
		'c' => $code,
		
		//aid值，用于业务统计的
		'aid' => 'test',
		
		//pf值，用于统计。联系我们产品xixiong分配
		'pf' => 'xixiong',
		
		//支付成功的返回url
		'ru' => rawurlencode('http://www.qq.com/'),
		
		//跳到支付页面后，第一个页面的左上角的返回按钮的url
		'pu' => rawurlencode('history.back'),
		
		//自定义配置
		'configs' => $encrypted
	);
	
	$p = array();
	foreach ($params_multi as $key => $value) {
		array_push($p, $key . '=' . $value);
	}
		
	$url_multi = 'http://pay.qq.com/h5/index.shtml?' . implode('&', $p);
}else{
	$url_multi = "javascript:alert('请填入多业务列表的配置');";
}


?><!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript" src="./cryptojs.js"></script>
<title>Midas JS SDK</title>
</head>
<body>
<a href="<?php echo $url_single;?>">单业务</a>
<a href="<?php echo $url_multi;?>">多业务</a>
</body>
</html>