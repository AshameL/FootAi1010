"""FootAi URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from  testfoot import views as v

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', v.login,name='login'),
    url(r'^login', v.login,name='login'),
    url(r'^index$', v.index, name='index'),
    url(r'^FAQ', v.faq, name='faq'),
    url(r'^pushdata', v.pushdata, name='pushdata'),
    url(r'^showImg/(.*?)/$', v.showImg, name='show'),
    url(r'^showImg2/(.*?)/$', v.showImg2, name='show2'),
    #測試base页面 和其他功能函数
    url(r'^base/', v.base, name='base'),
    url(r'^test/$', v.test, name='test'),
]
