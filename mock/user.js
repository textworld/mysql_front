const Cookies = require('js-cookie')

const USERNAME_KEY = 'user_name'

const tokens = {
    admin: {
        token: 'admin-token'
    },
    editor: {
        token: 'editor-token'
    }
}

let isLogined = false

const users = {
    'admin-token': {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
    },
    'editor-token': {
        roles: ['editor'],
        introduction: 'I am an editor',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Normal Editor'
    }
}

module.exports = [
    // user login
    {
        url: '/v1/auth/login',
        type: 'post',
        response: config => {
            const {username, password} = config.body
            console.log("username: ", username)
            console.log('password', password)
            if (username == "apple" && password == "ffffff") {
                isLogined = true
                return {
                    code: 2000,
                    data: {
                        username: "apple",
                        email: ""
                    },
                    message: ""
                }
           }else{
                return {
                    code: 4011,
                    data: {},
                    message: ""
                }
           }
        }
    },

    {
        url: '/v1/auth/user_info/',
        type: 'get',
        response: () => {
            console.log('get user')
            if (isLogined) {
                return {
                    code: 2000,
                    data: {
                        username: 'apple'
                    },
                    message: "success"
                }
            }

            return {
                code: 4001,
                data: {},
                message: "unauth"
            }
        }
    },
    // get user info
    {
        url: '/vue-element-admin/user/info\.*',
        type: 'get',
        response: config => {
            const { token } = config.query
            const info = users[token]

            // mock error
            if (!info) {
                return {
                    code: 50008,
                    message: 'Login failed, unable to get user details.'
                }
            }

            return {
                code: 20000,
                data: info
            }
        }
    },

    // user logout
    {
        url: '/v1/user/logout',
        type: 'get',
        response: _ => {
            console.log('logout in mock api')
            isLogined = false
            return {
                code: 2000,
                data: 'success'
            }
        }
    },

    {
        url: '/v1/menu',
        type: 'get',
        response: _ => {
            return {
                code: 2000,
                data: [
                    {
                        name: '权限管理',
                        icon: 'test',
                        url: '/permission',
                        children: [
                            {
                                name: '菜单管理',
                                url: '/menu'
                            },
                            {
                                name: '角色管理',
                                url: '/role'
                            }
                        ]
                    }
                ]
            }
        }
    }
]
