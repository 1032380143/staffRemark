import React, {Component} from 'react';
import {ListView, List, Toast} from 'antd-mobile';

class Page extends Component {
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
            rowLength: this.props.rowLength,//每页条数
            axiosDataLength: 0,//异步获取数据的长度
            pageIndex: 1,//当前页
            data: [],//当前数据
            isLoading: true,
            msg: '',
            searchName: this.props.searchName,//搜索
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.getAxios();
        }, 200);
    }

    //动态获取父组件的搜索值
    componentWillReceiveProps(nextProps) {
        this.setState({
            searchName: nextProps.searchName,
        });
        axios.post(this.props.url, {
            searchName: nextProps.searchName,
            length: this.state.rowLength,
            pageIndex: 1,
        }).then((response) => {
            if (response.status === 200) {
                this.dataBlob = {};
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.dataBlob)
                });
                this.refs.list.scrollTo(0, 0);
                if (response.data.length > 0) {
                    //搜索有数据
                    this.setState({
                        data: response.data,
                        axiosDataLength: response.data.length,
                        pageIndex: 1,
                        searchName: nextProps.searchName,
                        msg: '',
                    });
                    this.getData();
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(this.dataBlob)
                    });
                } else {
                    //无数据
                    this.setState({
                        data: response.data,
                        axiosDataLength: response.data.length,
                        pageIndex: 1,
                        isLoading: false,
                        msg: "",
                    })
                }

            }
        }).catch((error) => {
            console.log(error);
        })
    }

    getAxios() {
        axios.post(this.props.url, {
            searchName: this.state.searchName,
            length: this.state.rowLength,
            pageIndex: this.state.pageIndex,
        })
            .then((response) => {
                if (response.status === 200) {
                    this.handingData(response.data);
                }
            }).catch((error) => {

        })
    }

    handingData(data) {
        let newData = this.state.data.concat(data);
        if (data.length > 0) {
            this.setState({
                axiosDataLength: data.length,
                isLoading: false,
            });
            this.getData(this.state.pageIndex - 1);
            this.setState({
                data: newData,
                dataSource: this.state.dataSource.cloneWithRows(this.dataBlob)
            });
        } else {
            // this.setState({
            //     axiosDataLength: data.length,
            //     isLoading: false,
            //     msg: 'qqq'
            // });
            if (newData.length > 0) {
                this.setState({
                    axiosDataLength: data.length,
                    isLoading: false,
                    msg: '无更多数据了'
                });
                // Toast.info('无更多数据了', 2);
            } else {
                this.setState({
                    axiosDataLength: data.length,
                    isLoading: false,
                    msg: '该员工无评价信息'
                });
            }
        }
    }

    onEndReached(e) {
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        this.setState({
            pageIndex: this.state.pageIndex + 1,
            isLoading: true,
        });
        setTimeout(() => {
            this.getAxios();
        }, 500);
    }

    render() {
        const row = (rowData, sectionID, rowID) => {
            return this.props.dataList(this.state.data[rowID]);
        };
        return (
            <ListView
                ref="list"
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
                useZscroller
                onEndReached={(event) => {
                    this.onEndReached(event)
                }}
                onEndReachedThreshold={1000}
            />
        )
    }
}

export default Page;