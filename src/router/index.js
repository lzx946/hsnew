import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import { common } from '@/util/common.js'
import Home from '@/components/Home'
import Expert from '@/components/Expert'
import Course from '@/components/Course'
import About from '@/components/About'
import News from '@/components/News'
import Login from '@/components/Login'
import Register from '@/components/Register'
import ExpertDetail from '@/components/ExpertDetail'
import NewsDetail from '@/components/NewsDetail'
import CourseDetail from '@/components/CourseDetail'
import StudentInfo from '@/components/StudentInfo'
import ExpertInfo from '@/components/ExpertInfo'

import PhoneHome from '@/components/PhoneHome'
import PhoneExpert from '@/components/PhoneExpert'
import PhoneCourse from '@/components/PhoneCourse'
import PhoneAbout from '@/components/PhoneAbout'
import PhoneNews from '@/components/PhoneNews'
import PhoneLogin from '@/components/PhoneLogin'
import PhoneRegister from '@/components/PhoneRegister'
import PhoneExpertDetail from '@/components/PhoneExpertDetail'
import PhoneNewsDetail from '@/components/PhoneNewsDetail'
import PhoneCourseDetail from '@/components/PhoneCourseDetail'
import PhoneStudentInfo from '@/components/PhoneStudentInfo'
import PhoneExpertInfo from '@/components/PhoneExpertInfo'
import WeixinNewCourse from '@/components/WeixinNewCourse'
import WeixinLogin from '@/components/WeixinLogin'
import WeixinPhoneCourseDetail from '@/components/WeixinPhoneCourseDetail'
import WeixinPhoneExpert from '@/components/WeixinPhoneExpert'
import WeixinPhoneExpertDetail from '@/components/WeixinPhoneExpertDetail'
import WeixinPhoneHome from '@/components/WeixinPhoneHome'
import WeixinPhoneNews from '@/components/WeixinPhoneNews'
import WeixinPhoneNewsDetail from '@/components/WeixinPhoneNewsDetail'
import WeixinPhoneBlank from '@/components/WeixinPhoneBlank'
import WeixinPhoneConUs from '@/components/WeixinPhoneConUs'
import CurriculumList from '@/components/curriculumList'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Home',
            component: Home,
        },{
            path: '/expert',
            name: 'Expert',
            component: Expert
        }, {
            path: '/course',
            name: 'Course',
            component: Course
        }, {
            path: '/about',
            name: 'About',
            component: About
        }, {
            path: '/news',
            name: 'News',
            component: News
        }, {
            path: '/etd/:id',
            name: 'ExpertDetail',
            component: ExpertDetail
        }, {
            path: '/newsd/:id',
            name: 'NewsDetail',
            component: NewsDetail
        }, {
            path: '/crd/:id',
            name: 'CourseDetail',
            component: CourseDetail

        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/si',
            name: 'StudentInfo',
            component: StudentInfo
        },
        {
            path: '/ei',
            name: 'ExpertInfo',
            component: ExpertInfo
        },
        {
            path: '/phone',
            name: 'PhoneHome',
            component: PhoneHome,
        },{
            path: '/phone/expert',
            name: 'PhoneExpert',
            component: PhoneExpert
        }, {
            path: '/phone/course',
            name: 'PhoneCourse',
            component: PhoneCourse
        }, {
            path: '/phone/about',
            name: 'PhoneAbout',
            component: PhoneAbout
        }, {
            path: '/phone/news',
            name: 'PhoneNews',
            component: PhoneNews
        }, {
            path: '/phone/etd/:id',
            name: 'PhoneExpertDetail',
            component: PhoneExpertDetail
        }, {
            path: '/phone/newsd/:id',
            name: 'PhoneNewsDetail',
            component: PhoneNewsDetail
        }, {
            path: '/phone/crd/:id',
            name: 'PhoneCourseDetail',
            component: PhoneCourseDetail

        },
        {
            path: '/phone/register',
            name: 'PhoneRegister',
            component: PhoneRegister
        },
        {
            path: '/phone/login',
            name: 'PhoneLogin',
            component: PhoneLogin
        },
        {
            path: '/phone/si',
            name: 'PhoneStudentInfo',
            component: PhoneStudentInfo
        },
        {
            path: '/phone/ei',
            name: 'PhoneExpertInfo',
            component: PhoneExpertInfo
        },
        {
            path: '/weixinphone/newcourse',
            name: 'WeixinNewCourse',
            component: WeixinNewCourse
        },
        {
            path: '/weixinphone/login',
            name: 'WeixinLogin',
            component: WeixinLogin
        }
        
        ,
        {
            path: '/weixinphone/oldcourse',
            name: 'WeixinPhoneHome',
            component: WeixinPhoneHome
        }
        ,
        {
            path: '/weixinphone/coursed/:id',
            name: 'WeixinPhoneCourseDetail',
            component: WeixinPhoneCourseDetail
        }
        ,
        {
            path: '/weixinphone/expert',
            name: 'WeixinPhoneExpert',
            component: WeixinPhoneExpert
        }
        ,
        {
            path: '/weixinphone/expertd/:id',
            name: 'WeixinPhoneExpertDetail',
            component: WeixinPhoneExpertDetail
        }
        ,
        {
            path: '/weixinphone/news',
            name: 'WeixinPhoneNews',
            component: WeixinPhoneNews
        }
        ,
        {
            path: '/weixinphone/newsd/:id',
            name: 'WeixinPhoneNewsDetail',
            component: WeixinPhoneNewsDetail
        },
        {
            path: '/weixinphone/blank',
            name: 'WeixinPhoneBlank',
            component: WeixinPhoneBlank
        },
        {
            path: '/weixinphone/conus',
            name: 'WeixinPhoneConUs',
            component: WeixinPhoneConUs
        },
        {
            //我已报名的课程
            path: '/weixinphone/curriculumList',
            name: 'curriculumList',
            component: CurriculumList,
            //进入页面前判断是否已经登录，如果没登录则跳转至登录页面
            beforeEnter: (to, from, next) => {
                common.isLogin();
                if(common.token && common.token.id) {
                    next()
                }else {
                    window.location.href = '/phone/login';
                }
            }
        }
        
    ]
})