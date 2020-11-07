
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
            const {username, password} = config.query
            if (username == "apple" && password == "ffffff") {
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
            return {
                code: 20000,
                data: 'success'
            }
        }
    }
]
