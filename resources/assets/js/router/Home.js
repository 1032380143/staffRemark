import React, {Component} from 'react';
import {List, Popup, Button} from 'antd-mobile'
import {createForm} from 'rc-form';

import UserList from './home/UserList';//员工弹出层列表
import ListData from './home/ListData';//选择员工时的列表页


const onMaskClose = () => {
    console.log('onMaskClose');
};

class Appraise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staff_sn: '',//员工初始工号
            remark: '',//评价内容
            staff_info: false
        };
    }

    getUser(staff) {
        this.setState({
            staff_sn: staff.staff_sn,
            staff_info: staff
        });
        Popup.hide();
    }

    //获取员工列表数据
    chooseUser() {
        Popup.show(<UserList getUser={this.getUser.bind(this)}/>, {onMaskClose});
    };


    //选择员工按钮
    chooseUserButton(){
        return (
            <List>
                <List.Item>
                    <Button size="small" onClick={() => this.chooseUser()}>选择员工</Button>
                </List.Item>
            </List>
        )
    }

    render() {
        return (
            <div className="section">
                {this.state.staff_info ? <ListData staff={this.state.staff_info} /> : this.chooseUserButton()}
            </div>
        )
    }
}

export default Appraise;