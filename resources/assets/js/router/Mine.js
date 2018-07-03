import React, {Component} from 'react';
import {List, ListView, Popup, SwipeAction, Toast, Modal, TextareaItem, Button} from 'antd-mobile';

const num_row = 12;//每页条数

class Mine extends Component {

    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.dataBlob = {};
        this.genData = (pIndex = 0) => {
            let dataLength = this.state.thisDataLength;
            let length = (dataLength < num_row) ? dataLength : num_row;

            for (let i = 0; i < length; i++) {
                const ii = (pIndex * num_row) + i;
                this.dataBlob[ii] = `row - ${ii}`;
            }
        };
        this.state = {
            dataSource: dataSource.cloneWithRows({}),
            isLoading: true,
            data: [],//初始数据
            thisDataLength: 0,//异步获取当前数据条数
            msg: '',//分页提示,
            pageIndex: 1,//当前页
            remark: '',//编辑的内容
            id: 0,//编辑id
        };
    }

    componentWillMount() {
        setTimeout(() => {
            this.axiosGetData();
        }, 600);
    }

    //获取数据
    axiosGetData() {
        axios.post('/mine_list', {
            length: num_row,
            pageIndex: this.state.pageIndex,
        })
            .then((response) => {
                if (response.status === 200) {
                    if (response.data.status === 'success') {
                        this.handlingData(response.data)
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //处理数据
    handlingData(data) {
        let newData = this.state.data.concat(data.response);
        if (newData.length < 1) {//初始无数据
            this.setState({isLoading: false, msg: '无数据'});
        }
        if (data.response.length < 1 && this.state.data.length > 0) {//加载更多时无数据
            this.setState({
                isLoading: false, msg: '无更多数据了',
                pageIndex: data.page.pages,
            });
        } else {//加载更多有数据
            this.setState({
                thisDataLength: data.response.length,
                pageIndex: data.page.pageIndex,
            });
        }
        this.genData(this.state.pageIndex - 1);
        this.setState({
            data: newData,
            dataSource: this.state.dataSource.cloneWithRows(this.dataBlob),
            isLoading: false,
        });
    }


    //加载更多
    onEndReached(event) {
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        this.setState({
            isLoading: true,
            pageIndex: this.state.pageIndex + 1,
        });
        setTimeout(() => {
            this.axiosGetData();
        }, 1000);
    }

    //详情
    details(val) {
        Popup.show(
            <List>
                <List.Item wrap>
                    时间：{val.create_time} <br/>
                    名字：{val.staff.realname} <br/>
                    职位：{val.position ? val.position : ''} <br/>
                    部门：{val.department ? val.department : ''}<br/>
                    店铺：{val.shop ? val.shop : ''}
                </List.Item>
                <List.Item wrap>
                    内容：
                    <small>{val.remark}</small>
                </List.Item>
            </List>
        )
    }

    ListData(obj, rowID) {
        return (
            <SwipeAction
                style={{backgroundColor: 'gray'}}
                autoClose
                left={[
                    {
                        text: '修改',
                        onPress: () => this.update(obj),
                        style: {backgroundColor: '#ddd', color: 'white',width:'3rem'},
                    }
                ]}
                right={[
                    {
                        text: '删除',
                        onPress: () => this.delete(obj.id),
                        style: {backgroundColor: '#F4333C', color: 'white',width:'3rem'},
                    },
                ]}
                // onOpen={() => console.log('global open')}
                // onClose={() => console.log('global close')}
            >
                <List>
                    <List.Item
                        extra={obj.create_time}
                        key={rowID}
                        onClick={
                            () => {
                                this.details(obj)
                            }
                        }
                    >
                        {obj.staff.realname}
                        <List.Item.Brief> {obj.remark}</List.Item.Brief>
                    </List.Item>
                </List>
            </SwipeAction>
        )
    }

    /*----------------------修改start---------------------*/

    update(obj) {
        this.setState({
            id: obj.id,
            remark: obj.remark,
        });
        Popup.show(
            <div>
                <List>
                    <TextareaItem
                        placeholder="请输入评价内容"
                        rows="6"
                        key="remark"
                        onChange={val => this.setState({remark: val})}
                        defaultValue={obj.remark}
                    />
                </List>
                <Button type="primary" size="small" style={{margin: '0.2rem'}}
                        onClick={() => this.updateDate()}>保存</Button>
            </div>
        );
    }

    updateDate() {
        let remark = this.state.remark;
        if ($.trim(remark).length > 0) {
            axios.post('/update', {
                id: this.state.id,
                remark: remark,
            }).then((response) => {
                if (response.status === 200) {
                    if (response.data.response === 'success') {
                        Toast.info('修改成功', 2);
                        Popup.hide();
                        this.getInitData();
                    }
                }
            }).catch((error) => {
                console.log(error);
            })
        } else {
            Toast.info('请输入内容', 2);
        }
    }

    /*----------------------修改end---------------------*/

    /*-----------------------删除start----------------------*/
    // deleteAppraise(id) {
    //     const showAlert = Modal.alert("删除", "确认删除？", [
    //         {text: '取消'},
    //         {text: '确定', onPress: () => this.delete(id)}
    //     ]);
    // }

    //删除
    delete(id) {
        axios.post('/delete', {
            id: id
        }).then((response) => {
            if (response.status === 200) {
                if (response.data.response === 'success') {
                    this.getInitData();
                    Toast.info("删除成功", 2);
                }
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    /**
     *成功处理
     */
    getInitData() {
        this.dataBlob = {};
        this.setState({
            data: [],
            dataSource: this.state.dataSource.cloneWithRows(this.dataBlob),
            thisDataLength: 0,//异步获取当前数据条数
            msg: '',//分页提示,
            pageIndex: 1,//当前页
        });
        this.axiosGetData();
    }

    /*-----------------------删除end-----------------------*/
    render() {
        const row = (rowData, sectionID, rowID) => {
            const obj = this.state.data[rowID];
            return this.ListData(obj, rowID);
            // return (
            //     <List>
            //         <List.Item
            //             extra={obj.create_time}
            //             key={rowID}
            //             onClick={
            //                 () => {
            //                     this.details(obj)
            //                 }
            //             }
            //         >
            //             {obj.staff.realname}
            //             <List.Item.Brief> {obj.remark}</List.Item.Brief>
            //         </List.Item>
            //     </List>
            // );
        };

        return (
            <ListView ref="lv"
                      dataSource={this.state.dataSource}
                      initialListSize={num_row}
                      renderFooter={() => (<div style={{padding: 30, textAlign: 'center'}}>
                          {this.state.isLoading ? 'Loading...' : this.state.msg}
                      </div>)}
                      renderRow={row}
                      useZscroller
                      style={{
                          height: document.documentElement.clientHeight - 10,
                          overflow: 'auto',
                          border: '1px solid #ddd',
                          margin: '0.1rem 0',
                      }}
                      onScroll={(event) => {
                          // console.log(event.target.style.height);
                      }}
                      onEndReached={(e) => this.onEndReached(e)}
                      onEndReachedThreshold={100}
            />
        );
    }
}

export default Mine;