<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>备注</title>
	 <meta name="viewport" content="width=device-width, initial-scale=0.5, maximum-scale=1.0,user-scalable=no">
    <meta name="csrf-token" content="{{csrf_token()}}">
    <meta name="x5-fullscreen" content="true">
    <meta name="full-screen" content="yes">
    {{--<link rel="stylesheet" type="text/css" href="{{asset('css/app.css')}}">--}}
    <style>
        .am-list-view-scrollview-content{
            width:100%;
        }
    </style>
</head>
<body>
<div id="content"></div>
</body>
<script src="{{asset('/js/dingtalk.js')}}"></script>
<script src="{{asset('js/app.js')}}"></script>
<script src="{{asset('js/index.js')}}"></script>
<script>
    dd.ready(function(){
       dd.ui.webViewBounce.disable();
    });
</script>
</html>