<?php
/**
 * @author bingo <xsbchen@tencent.com>
 * Thanks jayli(https://gist.github.com/jayli/2485984)
 */

$files = isset($_GET['files']) ? $_GET['files'] : null;
$root = isset($_GET['root']) ? $_GET['root'] : null;
$alias = isset($_GET['alias']) ? $_GET['alias'] : '';

if (empty($files)) {
    exit('miss files param!');
}

if (empty($root)) {
    exit('miss root param!');
}

if (!file_exists($root)) {
    exit('root not exists!');
}

//cdn上存在的各种可能的文件类型
$mimeTypes = array(
    'js' => 'Content-Type: application/x-javascript',
    'css' => 'Content-Type: text/css',
    'jpg' => 'Content-Type: image/jpg',
    'gif' => 'Content-Type: image/gif',
    'png' => 'Content-Type: image/png',
    'jpeg' => 'Content-Type: image/jpeg',
    'swf' => 'Content-Type: application/x-shockwave-flash'
);

//文件的最后修改时间
$lastModifiedTime = 0;

// request headers
$requestHeaders = getallheaders();

// 输出结果使用的数组
$result = array();

//文件类型
$type = '';

// 清理参数列表和锚点
$files = preg_replace('/[?#].*/m', '', $files);

// 路径分隔符统一
$files = unixfyPath($files);
$root = unixfyPath($root);
$alias = unixfyPath($alias);

// 切分文件列表
$files = explode(',', $files);

if (empty($files)) {
    exit('use "," delimited files');
}

// 得到拼接文件的Last-Modified时间
foreach ($files as $fileName) {
    $filePath = getRealFilePath($root, $alias, $fileName);
    if (is_file($filePath)) {
        $fileMtime = filemtime($filePath);
        if ($fileMtime && ($fileMtime > $lastModifiedTime)) {
            $lastModifiedTime = $fileMtime;
        }
    }
}

// 检查请求头的if-modified-since，判断是否304
if (isset($requestHeaders['If-Modified-Since']) && (strtotime($requestHeaders['If-Modified-Since']) == $lastModifiedTime)) {
    // 如果客户端带有缓存
    header('Last-Modified: ' . gmdate('D, d M Y H:i:s', $lastModifiedTime . ' GMT'), true, 304);
    exit;
}

// 拼接文件，并应用通用规则
foreach ($files as $fileName) {
    $filePath = getRealFilePath($root, $alias, $fileName);

    if (empty($type)) {
        $type = getExtend($fileName);
    }

    if (!is_file($filePath)) {
        exit("{$filePath} not found!");
    }

    $result[] = file_get_contents($filePath);
}

//添加过期头，过期时间1年
header("Expires: " . date("D, j M Y H:i:s", strtotime("now + 10 years")) . " GMT");
header("Cache-Control: max-age=315360000");
header('Last-Modified: ' . gmdate('D, d M Y H:i:s', $lastModifiedTime) . ' GMT');

//输出文件类型
header($mimeTypes[$type]);

//输出文件
echo join("\n", $result);

//得到扩展名
function getExtend($fileName)
{
    $parts = explode('.', $fileName);
    $idx = count($parts) - 1;
    return $parts[$idx];
}

function str_replace_once($needle, $replace, $haystack) { 
// Looks for the first occurence of $needle in $haystack 
// and replaces it with $replace. 
$pos = empty($needle)?false:strpos($haystack, $needle);
if ($pos === false) { 
return $haystack; 
} 
return substr_replace($haystack, $replace, $pos, strlen($needle)); 
} 

// 获取真实文件路径（去掉别名）
function getRealFilePath($root, $alias, $fileName)
{
    $realFileName = str_replace_once($alias, '', $fileName);
    return $root . $realFileName;
}

function unixfyPath($path)
{
    return preg_replace('/\\\\/', '/', $path);
}
