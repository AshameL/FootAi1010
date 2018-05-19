from  django import  forms

# 登录
class Login(forms.Form):
    username =  forms.CharField()
    password = forms.CharField()

# 健康檔案
class HealthDoc(forms.Form):
    objectId = forms.CharField()
    name = forms.CharField()
    sex = forms.CharField()
    age = forms.CharField()
    height = forms.CharField()
    weight = forms.CharField()
    foot_size = forms.CharField()


class SearchByDate(forms.Form):
    datetimeStart = forms.CharField()
    datetimeEnd = forms.CharField()
    # mode = forms.CharField()