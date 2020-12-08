const _ = require('lodash')

module.exports = [
    {
        url: '/v1/schema_info/site_log/',
        type: 'get',
        response: _ => {
            return {
                code: 2000,
                data: [
                    {
                        user: "zhangwenbing",
                        name: "",
                        type: "install_mysql",
                        time: "2020-12-08 20:53",
                        log: "安装了mysql实例，地址%s:%s",
                        var1: "172.17.0.10",
                        var2: "",
                        var3: "",
                        var4: "",
                        var5: ""
                    }
                ]
            }
        }
    }
]