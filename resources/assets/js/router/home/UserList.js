import React, {Component} from 'react';
import {SearchBar, List, ListView} from 'antd-mobile';

import Page from '../../page/page';

class UserList extends Component {
    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.dataBlob = {};
        this.getData = (pageIndex = 0) => {
            let length = (this.state.axiosDataLength < this.state.rowLength) ? this.state.axiosDataLength : this.state.rowLength;
            for (let i = 0; i < length; i++) {
                const ii = (pageIndex * this.state.rowLength) + i;
                this.dataBlob[ii] = 'row-' + ii;
            }
        };

        this.state = {
            dataSource: dataSource.cloneWithRows({}),
            searchName: '',//默认搜索内容
            data: [],//初始员工数据
            searchInterval: 0,//搜索定时器
            rowLength: 10,//每页条数
            pageIndex: 1,//当前页
            axiosDataLength: 0,//异步获取数据的长度
            isLoading: true,
            msg: '',//提示
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.getInitUser();
        }, 200);
    }

    //初始获取员工列表数据和加载更多时获取数据
    getInitUser() {
        axios.post('/getUser', {
            length: this.state.rowLength,
            pageIndex: this.state.pageIndex,
            searchName: this.state.searchName,
        }).then((response) => {
            if (response.status === 200) {
                this.handingData(response.data);
            }
        }).catch((error) => {
            console.log(error)
        });
    }

    handingData(data) {
        if (data.length < 1) {
            this.setState({
                isLoading: false,
                msg: '无数据',
            });
        } else {
            this.setState({
                axiosDataLength: data.length,
                data: this.state.data.concat(data),
                isLoading: false,
            });
            this.getData(this.state.pageIndex - 1);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.dataBlob)
            });
        }
    }

    //加载更多
    onEndReached(e) {
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        this.setState({
            pageIndex: this.state.pageIndex + 1,
            isLoading: true,
        });
        setTimeout(() => {
            this.getInitUser();
        }, 500);
    }


    /*------------------------------------搜索start----------------------------------*/

    //搜索员工
    searchUser(val) {
        clearInterval(this.state.searchInterval);
        this.state.searchInterval = setInterval(() => {
            this.getAxiosSearch(val);
            // this.setState({searchName:val});
            clearInterval(this.state.searchInterval);
        }, 500);
    }

    getAxiosSearch(val) {
        axios.post('/getUser', {
            length: this.state.rowLength,
            pageIndex: 1,
            searchName: val,
        }).then((response) => {
            if (response.status === 200) {
                this.clearListView();//清空列表数据
                if (response.data.length > 0) {
                    this.searchDataTrue(response.data, val);
                } else {
                    this.searchDataIsNull(response.data);
                }
            }
        }).catch((error) => {
            console.log(error)
        });
    }

    //清空列表数据
    clearListView() {
        this.dataBlob = {};
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.dataBlob)
        });
    }

    //搜索的数据处理
    searchDataTrue(data, val) {
        this.setState({
            data: data,
            axiosDataLength: data.length,
            searchName: val,
            pageIndex: 1,
            msg: '',
        });
        this.getData();
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.dataBlob)
        });
    }

    //搜索无数据处理
    searchDataIsNull(data) {
        this.setState({
            data: data,
            axiosDataLength: data.length,
            pageIndex: 1,
            isLoading: false,
            msg: "无数据",
        });
    }

    /*------------------------------------搜索end----------------------------------*/

    //列表数据
    getList(row) {
        return (
            <List.Item
                // thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                key={row.staff_sn}
                onClick={() => this.props.getUser(row)}
            >
                {row.realname} — {row.shop ? row.shop.name : (row.department ? row.department.full_name : '')}
            </List.Item>
        );
    }


    render() {
        const row = (rowData, sectionID, rowID) => {
            const obj = this.state.data[rowID];
            return (
                <div>
                    {this.getList(obj)}
                </div>
            );
        };
        return (
            <div>
                <SearchBar
                    placeholder="请输入名字"
                    onChange={
                        (val) => {
                            this.searchUser(val);
                        }
                    }
                />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={row}
                    style={{
                        height: document.documentElement.clientHeight * 3 / 4,
                        overflow: 'auto',
                        border: '1px solid #ddd',
                        margin: '0.1rem 0',
                    }}
                    // onScroll={() => { console.log('scroll'); }}
                    renderFooter={() => (<div style={{padding: 30, textAlign: 'center'}}>
                        {this.state.isLoading ? 'Loading...' : this.state.msg}
                    </div>)}
                    // useZscroller
                    onEndReached={(event) => {
                        this.onEndReached(event)
                    }}
                    onEndReachedThreshold={1000}
                />
                {/*<Page url="/getUser" rowLength="10" dataList={this.getList.bind(this)} searchName={this.state.searchName}/>*/}
            </div>
        )
    }
}

export default UserList;