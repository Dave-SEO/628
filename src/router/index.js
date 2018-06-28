import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: resolve => require(['views/login/login'], resolve)
    },
    {
      path: '/home',
      name: 'Home',
      // component: resolve => require(['components/demo'], resolve),
      component: resolve => require(['views/Home'], resolve),
      children: [
        {
          path: '/MeetingList',
          name: 'MeetingList',
          component: resolve => require(['views/Meeting/MeetingList'], resolve)
        },
        {
          path: '/UserCenter',
          name: 'UserCenter',
          component: resolve => require(['views/UserCenter/UserCenter'], resolve)
        },
        {
          path: '/PeopleManagement',
          name: 'PeopleManagement',
          component: resolve => require(['views/people/PeopleManagement'], resolve)
        },
        {
          path: '/GroupManagement',
          name: 'GroupManagement',
          component: resolve => require(['views/group/GroupManagement'], resolve)
        },
        {
          path: '/Member',
          name: 'Member',
          component: resolve => require(['views/group/Member'], resolve)
        },
        {
          path: '/PeopleList/:id',
          name: 'PeopleList',
          component: resolve => require(['views/group/PeopleList'], resolve)
        },
        {
          path: '/MeetingManagement',
          name: 'MeetingManagement',
          component: resolve => require(['views/Meeting/MeetingManagement'], resolve)
        },
        {
          path: '/AddPeople',
          name: 'AddPeople',
          component: resolve => require(['views/people/AddPeople'], resolve)
        },
        {
          path: '/CreateRoom',
          name: 'CreateRoom',
          component: resolve => require(['views/Meeting/CreateRoom'], resolve)
        },
        {
          path: '/meetingEdit/:id',
          name: 'meetingEdit',
          component: resolve => require(['views/meeting/meetingEdit'], resolve)
        },
        {
          path: '/meetingDetail/:id',
          name: 'meetingDetail',
          component: resolve => require(['views/meeting/details'], resolve)
        },
        {
          // 人员管理-编辑
          path: '/edit/:id',
          name: 'edit',
          component: resolve => require(['views/people/edit'], resolve)
        }
      ]
    },
    {
      path: '/addMeeting/:id',
      name: '/addMeeting',
      component: resolve => require(['views/Meeting/AddMeeting'], resolve)
    }
    // {
    //   path: '/demo',
    //   name: 'demo',
    //   component: resolve => require(['components/demo'], resolve)
    // }
  ]
})
