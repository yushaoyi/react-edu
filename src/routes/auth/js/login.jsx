import React, { Component } from 'react';
import { GlobalStoreContext } from '../../../App'
import LoginSev from '../services/login.sev'
import { Button } from 'antd-mobile';

class Login extends Component {

    state = {
        phone: '',
        password: ''
    }

    constructor () {
      super()
    }

    doRegister = async (data) => {
        try {
            let result = await LoginSev.register({});
            console.log(result)
        } catch (err) {
            console.error(err);
        }
    }

    componentWillMount(){
      // let type = this.props.location.pathname.split('/')[2];
      this.doRegister({});
    }

    handleLoginBtn = (event, dispatch) => {
        console.log('login')
        setTimeout(_ => {
            dispatch({
                type: 'SET_USER_INFO',
                userInfo: {
                    userName: 'aa',
                    token: 'test'
                }
            })
            this.props.history.push('/appMain/personCenter')
        }, 1000)
    }

    render () {
        return (
            <GlobalStoreContext.Consumer>
                {
                    context => (
                        <div className="login-page">
                          <Button>default</Button>
                            <button className="login-submit-btn"
                                onClick={(e) => this.handleLoginBtn(e, context.dispatch) }
                            >
                               登录
                            </button>
                        </div>
                    )
                }
            </GlobalStoreContext.Consumer>
        )
    }
}

export default Login
