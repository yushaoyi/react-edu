import React, { Component } from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import CourseList from '../routes/home/js/courseList'
import CourseDetail from '../routes/home/js/courseDetail';
import PersonCenter from '../routes/personCenter/personCenter';
import MyCourseList from '../routes/personCenter/course/js/myCourseList';
import MyCourseDetail from '../routes/personCenter/course/js/myCourseDetail';
import MyOrder from '../routes/personCenter/order/js/order';
import PaySettlement from '../routes/pay/js/paySettlement';
import PayAddress from '../routes/pay/js/payAddress';
// import classNames from 'classnames';
import { GlobalStoreContext } from '../App'
import { TabBar } from 'antd-mobile';

class AppMain extends Component {

    state = {
      selectedTab: 'homeTab',
      userInfo: ''
    }

    tabList = [
      {
        key: 'homeTab',
        icon: 'icon-home',
        iconSelected: 'icon-home_selected',
        title: '首页',
        badge: 0,
        url: 'courseList'
      },
      {
        key: 'courseTab',
        icon: 'icon-course',
        iconSelected: 'icon-course_selected',
        title: '课程',
        badge: 0,
        url: 'myCourse'
      },
      {
        key: 'myTab',
        icon: 'icon-my',
        iconSelected: 'icon-my_selected',
        title: '我的',
        badge: 0,
        url: 'personCenter'
      },
    ]

    handleAppControlBtn = (event, context) => {
        let useInfo = context.userInfo || sessionStorage.getItem('userInfo')
        // todo 先判断是否登录
        if (useInfo) {
            this.props.history.push('/auth/login')
        } else {
            this.props.history.push('/auth/toLogin')
        }
    }

    renderContent = (item, index) => {
      this.setState({
        selectedTab: item.key,
      });
      const { match } = this.props
      const parentUrl = match.url
      console.log(`${parentUrl}/${item.url}`)
      this.props.history.push(`${parentUrl}/${item.url}`)
    }
    //
    renderTabItem = () => {

       return this.tabList.map((item, index) => {
         return <TabBar.Item
           icon={
             <i className={ ['iconfont', item.icon ].join(' ') } style={{fontSize: '20px'}}></i>
           }
           selectedIcon={
             <i className={ ['iconfont', item.iconSelected ].join(' ') } style={{fontSize: '20px'}}></i>
           }
           title={ item.title }
           key={ item.key }
           badge={ item.badge }
           selected={this.state.selectedTab === item.key}
           onPress={() => {
             this.renderContent(item, index)
           }}
         >
         </TabBar.Item>
      })

    }

    render () {
        // const inputCls = classNames({
        //     'input-wrapper': true,
        //     'fx-row': true
        // })
        const { match } = this.props
        const parentUrl = match.url
        return (
            <GlobalStoreContext.Consumer>
                {
                    context => (
                        <div className="main">
                            {/*<div className="app-control">*/}
                                {/*<button type="button"*/}
                                        {/*className={ "app-control-btn " + (context.userInfo ? "active" : "") }*/}
                                        {/*onClick={(e) => this.handleAppControlBtn(e, context)}*/}
                                {/*><i className="iconfont icon-home"></i></button>*/}
                            {/*</div>*/}
                            <section className="main-content">
                                <Route exact path={`${parentUrl}`} render = {() => (
                                    <Redirect to={`${parentUrl}/courseList`}/>
                                )}/>
                                <Route path={`${parentUrl}/courseList`} component={CourseList}/>
                                <Route path={`${parentUrl}/courseDetail/:courseId`} component={CourseDetail}/>
                                <Route path={`${parentUrl}/personCenter`} component={PersonCenter}/>
                                <Route path={`${parentUrl}/myCourse`} component={MyCourseList}/>
                                <Route path={`${parentUrl}/myCourseDetail/:courseId`} component={MyCourseDetail}/>
                                <Route path={`${parentUrl}/myOrder`} component={MyOrder}/>
                                <Route path={`${parentUrl}/paySettlement/:productId`} component={PaySettlement}/>
                                <Route path={`${parentUrl}/payAddress`} component={PayAddress}/>
                            </section>
                          <section className="main-tab">
                            <TabBar
                              unselectedTintColor="#949494"
                              tintColor="#33A3F4"
                              barTintColor="white"
                              // hidden={this.state.hidden}
                              noRenderContent={true}
                              tabBarPosition='bottom'
                            >
                              { this.renderTabItem() }
                            </TabBar>
                          </section>

                        </div>
                    )
                }
            </GlobalStoreContext.Consumer>
        )
    }
}

export default AppMain