<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['middleware'=>['user']],function(){
    Route::get('/', ['uses'=>'IndexController@index']);//首页
    Route::post('/getUser',['uses'=>'IndexController@getUser']);//评价获取员工
    Route::post('/save',['uses'=>'IndexController@save']);//评价保存处理
    Route::post('/selectedUserRemark',['uses'=>'IndexController@selectedUserRemark']);//选中员工的所有评价数据

    Route::post('/mine_list',['uses'=>'IndexController@mine_list']);//我的评价
    Route::post('/delete',['uses'=>'IndexController@delete']);//删除
    Route::post('/update',['uses'=>'IndexController@update']);//修改
});
