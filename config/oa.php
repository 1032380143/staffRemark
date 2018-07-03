<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 2017/9/22
 * Time: 10:07
 */
$http = env('OA_PATH', 'http://192.168.20.238:8003');
//$http = 'http://192.168.1.117:8001/';
//$http = 'http://192.168.1.20:8001/';

return [
    'oa_path' => $http,
    'client_id' => env('OA_CLIENT_ID'),
    'client_secret' => env('OA_CLIENT_SECRET'),
    'login' => $http . '/api/get_current_user',//oa登录
    'oaApiPath' => $http . '/api/', /* OA接口根路由 */
    'receiptUrl' => null, /* 重定向地址 应指向getAppToken方法 */
    'get_user' => $http . '/api/get_user',//获取员工信息

    'selectedUserRemark' => $http . '/api/appraise/selectedUserRemark',//选中员工的所有评价数据
    'appraiseFromSubmit' => $http . '/api/appraise/appraiseFromSubmit',//评价表单提交
    'appraiseList' => $http . '/api/appraise/appraiseList',//当前 评价列表
    'delete' => $http . '/api/appraise/delete',//删除
    'update' => $http . '/api/appraise/update',//修改
];