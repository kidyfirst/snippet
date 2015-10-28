<?php
  $path=dirname($_SERVER['SCRIPT_NAME']) . "/";
  if ($_FILES["filedata"]["error"] > 0)
  {
    echo "Return Code: " . $_FILES["filedata"]["error"] . "<br />";
  }
  else
  {
    //echo "Upload: " . $_FILES["filedata"]["name"] . "<br />";
    //echo "Type: " . $_FILES["filedata"]["type"] . "<br />";
    //echo "Size: " . ($_FILES["filedata"]["size"] / 1024) . " Kb<br />";
    //echo "Temp file: " . $_FILES["filedata"]["tmp_name"] . "<br />";

    if (file_exists("upload/" . $_FILES["filedata"]["name"]))
    {
      //echo $_FILES["filedata"]["name"] . " already exists. ";
    }
    else
    {
      move_uploaded_file($_FILES["filedata"]["tmp_name"], "upload/" . $_FILES["filedata"]["name"]);
      //echo "Stored in: " . "upload/" . $_FILES["filedata"]["name"];
    }

    $src=$path . "upload/" . $_FILES["filedata"]["name"];
    $sData->url=$src;
    $ret->iRet=0;
    $ret->sData=json_encode($sData);
    $rJson=json_encode($ret);
    echo $rJson;
  }
?>