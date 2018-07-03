import React,{Component} from 'react';
import {List,TextareaItem,Button,Toast} from 'antd-mobile';

class Appraise extends Component{
    constructor(props){
        super(props);
        this.state = {
            staff:props.staff,
            remark:'',
        };
    }

    //保存
    save() {
        axios.post('/save', {
            staff_sn: this.state.staff.staff_sn,
            remark: this.state.remark,
        })
            .then((response) => {
                if (response.status === 200) {
                    if (response.data.status === 'error') {
                        const errors = response.data.message.map((v) =>
                            <p>{v}</p>
                        );
                        Toast.info(errors, 3);
                    } else if (response.data.status === 'success') {
                        this.setState({
                            remark: '',
                        });
                        this.props.closePopup();
                        Toast.info('保存成功', 2);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
    render(){
        return(
            <div>
            <List>
                <TextareaItem
                    placeholder="请输入评价内容"
                    rows="6"
                    key="remark"
                    onChange={val => this.setState({remark: val})}
                    value={this.state.remark}
                />
            </List>
            <Button type="primary" size="small" style={{margin: '0.2rem'}} onClick={() => this.save()}>保存</Button>
            </div>
        )
    }
}
export default Appraise;