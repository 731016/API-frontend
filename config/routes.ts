export default [
  {
    name: '欢迎',
    path: '/',
    icon: 'smile',
    component: './Welcome',
  },
  {
    name: '邀请页',
    path: '/:id',
    icon: 'smile',
    component: './Welcome',
    hideInMenu: true,
  },
  {
    name: '用户页',
    layout: false, // 不参与布局
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        name: '登录',
        path: '/user/login',
        component: './User/Login',
      },
      {
        name: '注册',
        path: '/user/register',
        component: './User/Register',
      },
      {
        name: '邀请码注册',
        path: '/user/register/:id',
        component: './User/Register',
        hideInMenu: true,
      },
    ],
  },
  {
    name: '接口广场',
    path: '/interface/list',
    icon: 'RedditOutlined',
    component: './InterfaceSquare',
  },
  {
    name: '个人中心',
    path: '/account/center',
    icon: 'UserOutlined',
    component: './User/UserInfo',
    hideInMenu: true,
  },
  {
    name: '接口详情',
    path: '/interface_info/:id',
    component: './InterfaceInfo',
    hideInMenu: true,
  },
  {
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/interface/list',
      },
      {
        name: '接口管理',
        path: '/admin/interface/list',
        icon: 'ApiOutlined',
        component: './Admin/InterfaceInfoList',
      },
      {
        name: '用户管理',
        path: '/admin/user/list',
        icon: 'TeamOutlined',
        component: './Admin/UserList',
      },
    ],
  },
  {
    name: '404 Not Found',
    path: '*',
    layout: false,
    component: './404',
  },
];
