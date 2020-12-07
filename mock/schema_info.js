const _ = require('lodash')

const schemaList = [
    "test",
    "Murray",
    "Noe",
    "Jameson",
    "Dallin",
    "Ena",
    "Sonia",
    "Luigi",
    "Veronica",
    "Leon",
    "Gage",
    "Guillermo",
    "Talia",
    "Gaetano",
    "Tania",
    "Arnoldo",
    "Zelda",
    "Orie",
    "Ana"
]

const results = [
    {
        "id": 1,
        "gmt_update": "2020-11-21T03:54:57.825352Z",
        "gmt_create": "2020-11-21T03:54:57.825352Z",
        "host_ip": "192.168.31.32",
        "port": 33307,
        "schema": "test",
        "role": "master",
        "status": "online",
        "phy_host": null
    },
    {
        "id": 2,
        "gmt_update": "2020-11-21T04:07:10.544998Z",
        "gmt_create": "2020-11-21T04:07:10.544998Z",
        "host_ip": "21.55.220.121",
        "port": 425,
        "schema": "Murray",
        "role": "master",
        "status": "online",
        "phy_host": null
    },
    {
        "id": 3,
        "gmt_update": "2020-11-21T04:07:11.626177Z",
        "gmt_create": "2020-11-21T04:07:11.626177Z",
        "host_ip": "187.92.196.154",
        "port": 295,
        "schema": "Noe",
        "role": "master",
        "status": "online",
        "phy_host": null
    },
    {
        "id": 4,
        "gmt_update": "2020-11-21T04:07:12.497966Z",
        "gmt_create": "2020-11-21T04:07:12.497966Z",
        "host_ip": "200.55.164.119",
        "port": 169,
        "schema": "Jameson",
        "role": "master",
        "status": "online",
        "phy_host": null
    },
    {
        "id": 5,
        "gmt_update": "2020-11-21T04:07:13.186633Z",
        "gmt_create": "2020-11-21T04:07:13.186633Z",
        "host_ip": "224.74.163.22",
        "port": 852,
        "schema": "Dallin",
        "role": "master",
        "status": "online",
        "phy_host": null
    },
    {
        "id": 6,
        "gmt_update": "2020-11-21T04:07:13.902785Z",
        "gmt_create": "2020-11-21T04:07:13.902785Z",
        "host_ip": "197.187.209.175",
        "port": 613,
        "schema": "Ena",
        "role": "master",
        "status": "online",
        "phy_host": null
    },
    {
        "id": 7,
        "gmt_update": "2020-11-21T04:07:14.553989Z",
        "gmt_create": "2020-11-21T04:07:14.553989Z",
        "host_ip": "48.118.247.168",
        "port": 183,
        "schema": "Sonia",
        "role": "master",
        "status": "online",
        "phy_host": null
    },
    {
        "id": 8,
        "gmt_update": "2020-11-21T04:07:15.185357Z",
        "gmt_create": "2020-11-21T04:07:15.185357Z",
        "host_ip": "33.100.231.228",
        "port": 886,
        "schema": "Luigi",
        "role": "master",
        "status": "online",
        "phy_host": null
    },
    {
        "id": 9,
        "gmt_update": "2020-11-21T04:07:15.794841Z",
        "gmt_create": "2020-11-21T04:07:15.794841Z",
        "host_ip": "250.62.30.177",
        "port": 484,
        "schema": "Veronica",
        "role": "master",
        "status": "online",
        "phy_host": null
    },
    {
        "id": 10,
        "gmt_update": "2020-11-21T04:07:16.337666Z",
        "gmt_create": "2020-11-21T04:07:16.337666Z",
        "host_ip": "139.183.64.198",
        "port": 782,
        "schema": "Leon",
        "role": "master",
        "status": "online",
        "phy_host": null
    }
]

const process_list = [
    {
        "id": 23,
        "user": "root",
        "host": "172.17.0.1:59474",
        "db": null,
        "command": "Sleep",
        "time": 22506,
        "state": "",
        "info": null
    },
    {
        "id": 26,
        "user": "root",
        "host": "172.17.0.1:59480",
        "db": "zst_online_server",
        "command": "Sleep",
        "time": 22417,
        "state": "",
        "info": null
    },
    {
        "id": 28,
        "user": "root",
        "host": "172.17.0.1:59484",
        "db": "zst_online_server",
        "command": "Sleep",
        "time": 22321,
        "state": "",
        "info": null
    },
    {
        "id": 29,
        "user": "root",
        "host": "172.17.0.1:59486",
        "db": "zst_online_server",
        "command": "Sleep",
        "time": 22315,
        "state": "",
        "info": null
    },
    {
        "id": 39,
        "user": "root",
        "host": "172.17.0.1:59618",
        "db": "zst_online_server",
        "command": "Query",
        "time": 0,
        "state": "starting",
        "info": "show processlist"
    }
]

module.exports = [
    //获取数据库名
    {
        url: '/v1/schema_info/mysql_schema/get_distinct_schema_names/',
        type: 'get',
        response: _ => {
            return {
                code: 2000,
                data: schemaList,
                message: ""
            }
        }
    },

    // 元数据查询
    {
        url: '/v1/schema_info/mysql_schema/',
        type: 'get',
        response: config => {
            console.log('mysql_schema', config)
            let filtered = results.filter(r => {
                if (_.isEmpty(config.query.schema)) {
                    return true
                }

                return _.toLower(r.schema) === _.toLower(config.query.schema)
            })
            return {
                "code": 2000,
                "data": {
                    "count": 20,
                    "next": "http://127.0.0.1:8010/api/zst_mysql/v1/schema_info/mysql_schema/?p=2",
                    "previous": null,
                    "results": filtered
                },
                "message": ""
            }
        }
    },
    {
        url: '/v1/schema_info/mysql_schema/\\d+/get_process_list/',
        type: 'get',
        response: _ => {
            return {
                "code": 2000,
                "data": process_list,
                "message": ""
            }
        }
    },
    {
        url: '/v1/schema_info/mysql_schema/\\d+/kill_process_list/',
        type: 'delete',
        response: _ => {
            return {
                code: 2000,
                data: {},
                message: 'success'
            }
        }
    },
    {
        url: '/v1/schema_info/mysql_schema/install_mysql/',
        type: 'post',
        response: config => {
            results.push({

            })
            return {
                code: 2000,
                data: {}
            }
        }
    }
]
