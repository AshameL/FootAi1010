from django.shortcuts import render
from testfoot.forms import *
from  django.shortcuts import redirect
from  django.core.urlresolvers import reverse
from .handleFileDatas import *


# Create your views here.
def login(request):
    if request.method == 'POST':
        form = Login(request.POST)

        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            whereStr = '{"name":"' + username + '","password":"' + password + '"}'
            queryjson = queryByWhere('MobileUser', whereStr)
            print('queryjson:::::')
            print(queryjson)
            if queryjson is None or queryjson['results'] == []:
                message = '用户名密码错误'
                request.session['error_message'] = 'error'
                return redirect('%s?error_message=test' % reverse('login'))
            else:
                # 说明登录成功了
                request.session['username'] = username
                request.session['objectId'] = queryjson['results'][0]['objectId']

                return redirect(reverse('index'))
    # get返回
    return render(request, 'login.html')


def index(request):
    if request.session['username'] is None:
        return redirect(reverse('login'))
    objectId = request.session['objectId']
    if request.method == 'POST':
        form = HealthDoc(request.POST)

        if form.is_valid():
            # 提交内容

            sex = form.cleaned_data['sex']
            age = form.cleaned_data['age']
            height = form.cleaned_data['height']
            weight = form.cleaned_data['weight']
            foot_size = form.cleaned_data['foot_size']
            dict = {'sex': sex, 'age': age, 'height': height, 'weight': weight, 'foot_size': foot_size}
            update('MobileUser', objectId, dict)

    # 通过工具访问数据
    personHealthDoc = query('MobileUser', objectId)
    print('json_data')
    print(personHealthDoc)
    return render(request, 'index.html', {'personHealthDoc': personHealthDoc})


def base(request):
    # sts =queryByWhere('MobileUser','{"name":"用户"}')
    sts = query('FootData', 'eb19b75015')
    # print(sts)

    listFD = deCodeHex(sts['fileDatas'])
    # print(listFD)
    return render(request, 'base.html', {'listFD': listFD[:30]})


def faq(request):
    return render(request, 'FaQ.html')


def pushdata(request):
    # ## session 判断是否非法跳转

    # 查询表单提交
    if request.method == 'POST':
        form = SearchByDate(request.POST)
        if form.is_valid():
            datetimeStart = form.cleaned_data['datetimeStart']
            datetimeEnd = form.cleaned_data['datetimeEnd']
            objectId = request.session['objectId']
            # mode = form.cleaned_data['mode']
            # whereStr = '{"createdAt":{"$gte":{"__type":"Date","iso":"2017-09-10 11:50:04"}}}'
            whereStr = '{"createdAt":{"$gte":{"__type":"Date","iso":"' + datetimeStart + '"},"$lte":{"__type":"Date","iso":"' + datetimeEnd + '"}}}'
            whereStr = '{"createdAt":{"$gte":{"__type":"Date","iso":"' + datetimeStart + '"},"$lte":{"__type":"Date","iso":"' + datetimeEnd + '"}},"userId":"'+objectId+'"}'

            # whereStr = '{"createdAt":{"$gte":"' + datetimeStart + '","$lte":"' + datetimeEnd + '"},"mode":"' + mode + '"}'
            # print(whereStr)
            listFD = queryByWhere('FootData', whereStr)
            print(listFD)

            # queryIt
            results = listFD['results']
            #print(results)
            return render(request, 'pushData.html', {'listFd': results})

    else:
        # get网址
        return render(request, 'pushData.html')
        # sts = query('FootData', 'eb19b75015')
        # print(sts)

        # listFD = deCodeHex(sts['fileDatas'])
        # return render(request, 'pushData.html', {'listFd': listFD})


def showImg(request, objectId='3cead8b740'):
    showList = query('FootData', objectId)
    # print(showList)
    listFD = deCodeHex(showList['fileDatas'])
    return render(request, 'showImg.html', {'listFd': listFD})

def showImg2(request, objectId='3cead8b740'):
    showList = query('FootData', objectId)
    # print(showList)
    listFD = deCodeHex(showList['fileDatas'])
    return render(request, 'showImg_ModifyLY.html', {'listFd': listFD})


def test(request):
    objectId = '2cd43d5b68'
    print("objectId:"+objectId )
    sts = query('FootData', objectId)
    print(sts)
    listFD = deCodeHex(sts['fileDatas'])
    return render(request, 'test.html', {'listFd': listFD})
