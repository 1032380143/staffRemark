import React, {Component} from 'react';
import {TabBar} from 'antd-mobile';

class Menus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'appraise',
            hidden: false,
        }
    }

    render() {
        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
                hidden={this.state.hidden}
            >
                <TabBar.Item
                    title="评价"
                    key="appraise"
                    selected={this.state.selectedTab === 'appraise'}
                    onPress={
                        () => {
                            this.context.router.history.push('/');
                            this.setState({
                                selectedTab: 'appraise',
                            })
                        }
                    }
                    icon={<div style={{
                        width: '0.44rem',
                        height: '0.44rem',
                        // background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  0.42rem 0.42rem no-repeat'
                    }}
                    />
                    }
                    selectedIcon={<div style={{
                        width: '0.44rem',
                        height: '0.44rem',
                        // background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  0.42rem 0.42rem no-repeat'
                    }}
                    />
                    }
                >
                </TabBar.Item>
                <TabBar.Item
                    title="我的"
                    key="mine"
                    icon={<div style={{
                        width: '0.44rem',
                        height: '0.44rem',
                        // background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  0.42rem 0.42rem no-repeat'
                    }}
                    />
                    }
                    selectedIcon={<div style={{
                        width: '0.44rem',
                        height: '0.44rem',
                        // background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  0.42rem 0.42rem no-repeat'
                    }}
                    />
                    }
                    selected={this.state.selectedTab === 'mine'}
                    // badge={1}
                    onPress={() => {
                        this.context.router.history.push('/mine');
                        this.setState({
                            selectedTab: 'mine',
                        });
                    }}
                    data-seed="logId"
                >
                </TabBar.Item>
            </TabBar>
        );
    }
}

Menus.contextTypes = {
    router: React.PropTypes.object
};

export default Menus;