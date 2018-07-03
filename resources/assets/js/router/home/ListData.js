import React, {Component} from 'react';
import {List, Flex, Button, Toast, Popup, ListView} from 'antd-mobile';

import Page from '../../page/page';//评价列表
import UserList from './UserList';//选择员工
import Staff from './staff';//员工信息
import Appraise from './appraise';//评价

class ListData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staff: props.staff,
            refresh: false,
            data: [],
        }
    }

    componentDidMount() {
        // this.refs.list.style.marginTop = (this.refs.topBox.offsetHeight+1)+'px';
        this.getAppraiseList(this.state.staff.staff_sn);
    }

    //员工信息
    staffInfo() {
        return (
            <Staff staff={this.state.staff}/>
        )
    }

    //列表数据
    getList(row) {
        return (
            <List.Item
                // thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                extra={row.create_time}
                key={row.id}
                onClick={() => this.getUserDetails(row)}
            >
                {row.entry_name}
                <List.Item.Brief>
                    {row.remark}
                </List.Item.Brief>
            </List.Item>
        );
    }

    //列表详情
    getUserDetails(val) {
        Popup.show(
            <List>
                <List.Item wrap>
                    时间：{val.create_time} <br/>
                    名字：{val.staff.realname} <br/>
                    职位：{val.position ? val.position : ''} <br/>
                    部门：{val.department ? val.department : ''}<br/>
                    店铺：{val.shop ? val.shop : ''}<br/>
                    评价人：{val.entry_name}
                </List.Item>
                <List.Item wrap>
                    内容：
                    <small>{val.remark}</small>
                </List.Item>
            </List>
        )
    }

    //更换员工处理
    getUser(staff) {
        this.setState({
            staff: staff,
            data: [],
        });
        Popup.hide();
        this.getAppraiseList(staff.staff_sn);
    }

    //获取员工列表数据
    chooseUser() {
        Popup.show(<UserList getUser={this.getUser.bind(this)}/>);
    };

    dataInfo() {
        return (
            <div
                style={{
                    // height: document.documentElement.clientHeight * 3 / 4,
                    overflow: 'auto',
                    marginTop: this.refs.topBox?(this.refs.topBox.offsetHeight+1)+'px':'4.1rem',
                    marginBottom:'100px',
                    position:'absolute',
                    width:'100%',
                }}
            >
                {/*<Page url="/selectedUserRemark" rowLength="3" dataList={this.getList.bind(this)}*/}
                {/*searchName={this.state.staff.staff_sn} />*/}
                {this.handlingData()}
            </div>
        )
    }

    /**
     * 用户列表（不带分页）
     */
    getAppraiseList(staff_sn) {
        axios.post('/selectedUserRemark', {
            searchName: staff_sn,
            length: 100,
            pageIndex: 1,
        }).then((response) => {
            if (response.status === 200) {
                this.setState({
                    data: response.data,
                });
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    handlingData() {
        const listData = this.state.data.map((val, key) =>
            <List.Item
                // thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                extra={val.create_time}
                key={val.id}
                onClick={() => this.getUserDetails(val)}
            >
                {val.entry_name}
                <List.Item.Brief>
                    {val.remark}
                </List.Item.Brief>
            </List.Item>
        );
        return listData;
    }

    /**
     *评价
     */
    appraise() {
        Popup.show(<Appraise staff={this.state.staff} closePopup={() => this.closePopup()}/>)
    }

    closePopup() {
        Popup.hide();
        // this.setState({
        //     refresh: true,
        // })
        this.setState({
            data: [],
        });
        this.getAppraiseList(this.state.staff.staff_sn);
    }

    render() {
        return (
            <div>
                {this.dataInfo()}
                <div style={{position: 'fixed', top: 0,backgroundColor: '#eee',width:'100%'}} ref="topBox">
                    <Flex>
                        <Flex.Item><Button size="small" onClick={() => this.chooseUser()}>更换</Button></Flex.Item>
                        <Flex.Item><Button size="small" onClick={() => this.appraise()}>评价</Button></Flex.Item>
                    </Flex>
                    {this.staffInfo()}
                </div>
            </div>
        )
    }
}

export default ListData;