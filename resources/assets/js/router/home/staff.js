import React, {Component} from 'react';
import {List, Flex, Popup} from 'antd-mobile';

class Staff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staff: props.staff,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            staff: nextProps.staff,
        });
    }

    /**
     * 获取详细信息
     */
    staff() {
        Popup.show(this.staffInfoDetail())
    }

    staffInfoDetail() {
        const staff = this.state.staff;
        const card = staff.id_card_number;
        const year = card.substring(6, 10);
        const month = card.substring(10, 12);
        const day = card.substring(12, 14);
        const birthday = year + '年' + month + '月' + day + '日';
        return (
            <List>
                <List.Item>
                    <List.Item.Brief>
                        <Flex>
                            <Flex.Item style={{flex: 1}}/>
                            <Flex.Item style={{flex: 9}}><strong>姓名：</strong></Flex.Item>
                            <Flex.Item style={{flex: 21}}>{staff.realname}</Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item style={{flex: 1}}/>
                            <Flex.Item style={{flex: 9}}><strong>手机：</strong></Flex.Item>
                            <Flex.Item style={{flex: 21}}>{staff.mobile}</Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item style={{flex: 1}}/>
                            <Flex.Item style={{flex: 9}}><strong>生日：</strong></Flex.Item>
                            <Flex.Item style={{flex: 21}}>{birthday}</Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item style={{flex: 1}}/>
                            <Flex.Item style={{flex: 9}}><strong>学历：</strong></Flex.Item>
                            <Flex.Item
                                style={{flex: 21}}>{staff.education ? staff.education : '无'}</Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item style={{flex: 1}}/>
                            <Flex.Item style={{flex: 9}}><strong>身高/体重：</strong></Flex.Item>
                            <Flex.Item
                                style={{flex: 21}}>{staff.height ? staff.height : '0'}cm/{staff.weight ? staff.weight : '0'}kg</Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item style={{flex: 1}}/>
                            <Flex.Item style={{flex: 9}}><strong>入职时间：</strong></Flex.Item>
                            <Flex.Item style={{flex: 21}}>{staff.hired_at}</Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item style={{flex: 1}}/>
                            <Flex.Item style={{flex: 9}}><strong>转正时间：</strong></Flex.Item>
                            <Flex.Item style={{flex: 21}}>{staff.employed_at ? staff.employed_at : '无'}</Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item style={{flex: 1}}/>
                            <Flex.Item style={{flex: 9}}><strong>职位：</strong></Flex.Item>
                            <Flex.Item style={{flex: 21}}>{staff.position ? staff.position.name : ''}</Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item style={{flex: 1}}/>
                            <Flex.Item style={{flex: 9}}><strong>招聘人：</strong></Flex.Item>
                            <Flex.Item
                                style={{flex: 21}}>{staff.recruiter_name ? staff.recruiter_name : '无'}</Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item style={{flex: 1}}/>
                            <Flex.Item style={{flex: 9}}><strong>部门：</strong></Flex.Item>
                            <Flex.Item
                                style={{flex: 21}}>{staff.department ? staff.department.full_name : '无'}</Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item style={{flex: 1}}/>
                            <Flex.Item style={{flex: 9}}><strong>店铺代码：</strong></Flex.Item>
                            <Flex.Item
                                style={{flex: 21}}>{staff.shop_sn ? staff.shop_sn.toUpperCase() : '无'}</Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item style={{flex: 1}}/>
                            <Flex.Item style={{flex: 9}}><strong>店铺：</strong></Flex.Item>
                            <Flex.Item style={{flex: 21}}>{staff.shop ? staff.shop.name : '无'}</Flex.Item>
                        </Flex>
                    </List.Item.Brief>
                </List.Item>
            </List>
        )
    }

    staffInfo() {
        const staff = this.state.staff;
        return (
            <List>
                <List.Item
                    arrow="down"
                    onClick={() => this.staff()}
                >
                    <List.Item.Brief>
                        <Flex>
                            <Flex.Item style={{flex: 1}}/>
                            <Flex.Item style={{flex: 9}}><strong>姓名：</strong></Flex.Item>
                            <Flex.Item style={{flex: 21}}>{staff.realname}</Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item style={{flex: 1}}/>
                            <Flex.Item style={{flex: 9}}><strong>部门：</strong></Flex.Item>
                            <Flex.Item
                                style={{flex: 21}}>{staff.department ? staff.department.full_name : '无'}</Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item style={{flex: 1}}/>
                            <Flex.Item style={{flex: 9}}><strong>职位：</strong></Flex.Item>
                            <Flex.Item style={{flex: 21}}>{staff.position ? staff.position.name : ''}</Flex.Item>
                        </Flex>
                    </List.Item.Brief>
                </List.Item>
            </List>
        )
    }

    render() {
        return (
            <div>
                {this.staffInfo()}
            </div>
        )
    }
}

export default Staff;