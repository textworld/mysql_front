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
                Cookies.set(USERNAME_KEY,  username)
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
                    code: 400
                }
           }
        }
    },

    {
        url: '/v1/user/',
        type: 'get',
        response: () => {
            let username = Cookies.get(USERNAME_KEY)
            console.log('username', username)
            if (username) {
                return {
                    code: 2000,
                    data: {
                        username: username
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
            Cookies.remove(USERNAME_KEY)
            return {
                code: 20000,
                data: 'success'
            }
        }
    }
]
