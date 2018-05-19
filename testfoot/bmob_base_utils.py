#!/usr/bin/python
# coding:utf-8
# Bmob后端云基本REST API封装
import requests
import json,string
from  urllib import  parse

# 每个应用都会有这两个ID，以下方法如果不传入这两个参数，那么使用这里默认的值
APP_ID = '6ff39cf89b2961d80c536401f109dfa7'
REST_API_KEY = '2e540f69b92c8f9337dd1ae7d8e14ab7'


# 封装rest api的get方法，根据对象ID获取一条数据
# table_name：要查询的表名
# object_id：要查询的数据记录的ID
def query(table_name, object_id, app_id=APP_ID, rest_api_key=REST_API_KEY):
    #
    requests.packages.urllib3.disable_warnings()
    # 构建请求头
    headers = {}
    headers['X-Bmob-Application-Id'] = app_id
    headers['X-Bmob-REST-API-Key'] = rest_api_key

    # 构建url
    url = 'https://api.bmob.cn/1/classes/{table_name}/{object_id}'.format(table_name=table_name, object_id=object_id)

    # 发起请求
    resp = requests.get(url, headers=headers, verify=False)

    # 设置响应体编码
    resp.encoding = 'utf-8'

    if resp and resp.status_code == 200:
        return json.loads(resp.text)
    return None

# 条件查询
# 封装rest api的get方法，根据对象ID获取一条数据
# table_name：要查询的表名
# object_id：要查询的数据记录的ID
# where 需要用json格式来写出   'where={"playerName":"Sean Plott","cheatMode":false}'
def queryByWhere(table_name, whereString, app_id=APP_ID, rest_api_key=REST_API_KEY):
    #
    requests.packages.urllib3.disable_warnings()
    # 构建请求头
    headers = {}
    headers['X-Bmob-Application-Id'] = app_id
    headers['X-Bmob-REST-API-Key'] = rest_api_key
    # .不一定必须加..
    headers['Content-Type'] = 'application/json'

    url = 'https://api.bmob.cn/1/classes/{table_name}?where={whereString}'.format(table_name=table_name,whereString=whereString)

    print(url)
    wheretemp = parse.quote(whereString)

    # 构建url
    url = 'https://api.bmob.cn/1/classes/{table_name}?where={whereString}'.format(table_name=table_name,whereString=wheretemp)
    print('url:::::::'+url)

    # datajson = json.dump(whereString)
    # print(datajson)

    # 发起请求
    resp = requests.get(url, headers=headers, verify=False)

    # 设置响应体编码
    resp.encoding = 'utf-8'

    if resp and resp.status_code == 200:
        print('queryWherBy获取了的内容')

        return json.loads(resp.text)
    return None


# 封装rest api的post方法，插入一条记录
# table_name：表名，如果表名还不存在，则先创建一个表再插入数据
# data：字典，要插入的记录的各个字段的字段名和值
def insert(table_name, data, app_id=APP_ID, rest_api_key=REST_API_KEY):
    # 构建请求头
    headers = {}
    headers['X-Bmob-Application-Id'] = app_id
    headers['X-Bmob-REST-API-Key'] = rest_api_key
    headers['Content-Type'] = 'application/json'

    # 构建url
    url = 'https://api.bmob.cn/1/classes/{table_name}'.format(table_name=table_name)


    # 发起请求
    resp = requests.post(url, headers=headers, data=json.dumps(data), verify=False)

    # 设置响应体编码
    resp.encoding = 'utf-8'

    if resp and resp.status_code == 201:
        print('insert success!')
        return json.loads(resp.text)
    return None


# 封装rest api的put方法,传入记录ID，修改一条数据
# table_name：要更新的表名
# object_id：要更新的数据记录的ID
# data：字典类型，要更新的数据的键值对
def update(table_name, object_id, data, app_id=APP_ID, rest_api_key=REST_API_KEY):
    # 构建请求头
    headers = {}
    headers['X-Bmob-Application-Id'] = app_id
    headers['X-Bmob-REST-API-Key'] = rest_api_key
    headers['Content-Type'] = 'application/json'

    # 构建url
    url = 'https://api.bmob.cn/1/classes/{table_name}/{object_id}'.format(table_name=table_name, object_id=object_id)

    # 发起请求
    resp = requests.put(url, headers=headers, data=json.dumps(data), verify=False)

    # 设置响应体编码
    resp.encoding = 'utf-8'

    if resp and resp.status_code == 200:
        print('update {0} success!'.format(object_id))
        return json.loads(resp.text)
    return None


# 封装rest api的delete方法，根据对象ID删除一条记录
# table_name：要删除的记录所在的表名
# object_id：要删除的数据记录的ID
def delete(table_name, object_id, app_id=APP_ID, rest_api_key=REST_API_KEY):
    # 构建请求头
    headers = {}
    headers['X-Bmob-Application-Id'] = app_id
    headers['X-Bmob-REST-API-Key'] = rest_api_key

    # 构建url
    url = 'https://api.bmob.cn/1/classes/{table_name}/{object_id}'.format(table_name=table_name, object_id=object_id)

    # 发起请求
    resp = requests.delete(url, headers=headers, verify=False)

    # 设置响应体编码
    resp.encoding = 'utf-8'

    if resp and resp.status_code == 200:
        print
        'delete {0} success!'.format(object_id)
        return json.loads(resp.text)
    return None


# 查询一个表中的所有数据
# table_name：要查询的表名
def list(table_name, app_id=APP_ID, rest_api_key=REST_API_KEY):
    # 构建请求头
    headers = {}
    headers['X-Bmob-Application-Id'] = app_id
    headers['X-Bmob-REST-API-Key'] = rest_api_key

    # 构建url
    url = 'https://api.bmob.cn/1/classes/{table_name}'.format(table_name=table_name)

    # 发起请求
    resp = requests.get(url, headers=headers, verify=False)

    # 设置响应体编码
    resp.encoding = 'utf-8'

    if resp and resp.status_code == 200:
        return json.loads(resp.text)['results']
    return None


# 批量操作：批量创建
# request_data结构：
'''
table_name = 'test'
{
    "requests":[
        {
            "method":"POST",
            "path":"/1/classes/{0}".format(table_name),
            "body":{
                "name":"Tom",
                "age":18
            }
        },
        {
            "method":"POST",
            "path":"/1/classes/{0}".format(table_name),
            "body":{
                "name":"John",
                "age":21
            }
        }
    ]
}

'''


def batch_insert(request_data, app_id=APP_ID, rest_api_key=REST_API_KEY):
    # 构建请求头
    headers = {}
    headers['X-Bmob-Application-Id'] = app_id
    headers['X-Bmob-REST-API-Key'] = rest_api_key
    headers['Content-Type'] = 'application/json'

    # url
    url = 'https://api.bmob.cn/1/batch'

    # 发起请求
    resp = requests.post(url, data=json.dumps(request_data), headers=headers, verify=False)

    # 设置响应体编码
    resp.encoding = 'utf-8'

    if resp and resp.status_code == 200:
        return json.loads(resp.text)
    return None
