<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class IndexController extends Controller
{

    public function index()
    {
//        dd(session()->all());
        return view('index');
    }

    /**
     * 获取员工数据
     * @param Request $request
     * @return mixed
     */
    public function getUser(Request $request)
    {
        $url = config('oa.get_user');
        $array = [
            'length' => $request->length,
            'start'=>($request->pageIndex - 1) * $request->length,
            1 => ['status_id', '>=', 0],
        ];
        if (isset($request->searchName) && !empty(trim($request->searchName))) {
            $array['search'] = ['realname' => $request->searchName];
        }
        $users = app('OAService')->getDataFromApi($url, $array);
        return $users['message'];
    }

    /**
     * 表单提交
     * @param Request $request
     * @return array
     */
    public function save(Request $request)
    {
        $url = config('oa.appraiseFromSubmit');
        $result = app('OAService')->getDataFromApi($url, $request->input());
        return $result;
    }

    /**
     * 选中员工的所有评价数据
     * @param Request $request
     */
    public function selectedUserRemark(Request $request){
        $url = config('oa.selectedUserRemark');
        $result = app('OAService')->getDataFromApi($url, $request->input());
        return $result['response'];
    }


    /**
     * 获取我的评价列表
     * @param Request $request
     */
    public function mine_list(Request $request)
    {
        $data = $request->input();
        $url = config('oa.appraiseList');
        $response = app('OAService')->getDataFromApi($url, $data);
        return $response;
    }

    /**
     * 删除
     * @param Request $request
     */
    public function delete(Request $request){
        $url = config('oa.delete');
        $data = app('OAService')->getDataFromApi($url,$request->input());
        return $data;
    }
    /**
     *修改
     * @param Request $request
     */
    public function update(Request $request){
        $url = config('oa.update');
        $data = app('OAService')->getDataFromApi($url,$request->input());
        return $data;
    }
}
