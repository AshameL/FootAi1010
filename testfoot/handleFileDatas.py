from .bmob_base_utils import *

# 处理那一长串的数字的本类
class fileData:
    time = 0  # 0-...的数字 2b
    left1 = 0
    left2 = 0
    left3 = 0
    left4 = 0
    left5 = 0
    left6 = 0
    left7 = 0
    left8 = 0
    left9 = 0
    right1 = 0
    right1 = 0
    right2 = 0
    right3 = 0
    right4 = 0
    right5 = 0
    right6 = 0
    right7 = 0
    right8 = 0
    right9 = 0

# 处理数据。并返回list
def deCodeHex(sData):
    # 时间2b 左脚 9b 右脚 9b
    list = []
    #print(len(sData))
    print(sData)

    # 一条记录 长度40
    for i in range(int(len(sData) / 40)):
        fd = fileData()
        # j 计数器 j=i*40+?
        # time 4位 0-3
        j = i * 40
        # print(i)
        fd.time = int(sData[j:j + 4], 16)
        # 左脚1-9 每个2b
        fd.left1 = int(sData[j + 4:j + 6], 16)
        fd.left2 = int(sData[j + 6:j + 8], 16)
        fd.left3 = int(sData[j + 8:j + 10], 16)
        fd.left4 = int(sData[j + 10:j + 12], 16)
        fd.left5 = int(sData[j + 12:j + 14], 16)
        fd.left6 = int(sData[j + 14:j + 16], 16)
        fd.left7 = int(sData[j + 16:j + 18], 16)
        fd.left8 = int(sData[j + 18:j + 20], 16)
        fd.left9 = int(sData[j + 20:j + 22], 16)
        fd.right1 = int(sData[j + 22:j + 24], 16)
        fd.right2 = int(sData[j + 24:j + 26], 16)
        fd.right3 = int(sData[j + 26:j + 28], 16)
        fd.right4 = int(sData[j + 28:j + 30], 16)
        fd.right5 = int(sData[j + 30:j + 32], 16)
        fd.right6 = int(sData[j + 32:j + 34], 16)
        fd.right7 = int(sData[j + 34:j + 36], 16)
        fd.right8 = int(sData[j + 36:j + 38], 16)
        fd.right9 = int(sData[j + 38:j + 40], 16)
        list.append(fd)
    return list


# 计算步态周期
