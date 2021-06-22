import sys

num = int(sys.stdin.readline())
#num = 8

pos = [0] * num

flag_row = [False] * num
flag_dia1 = [False] * (num*2 - 1)   # i - j + num- 1   
flag_dia2 = [False] * (num*2 - 1)   # i + j

cnt = 0
def queen(i : int, num : int) :
	global cnt
	for j in range(num) :
		if flag_row[j] == False and flag_dia1[i - j + num - 1] == False and flag_dia2[i + j] == False :
			pos[i] = j
			flag_row[j] = True
			flag_dia1[i - j + num - 1] = True
			flag_dia2[i + j] = True
			if i != num - 1 :
				queen(i + 1, num)
			else : 
				print(pos[0:])
				cnt += 1
			flag_row[j] = False
			flag_dia1[i - j + num - 1] = False
			flag_dia2[i + j] = False

rst = 0

if num == 1 : rst = 1

elif num % 2 == 0 :
	for j in range(num // 2) :
		flag_row[j] = True
		flag_dia1[0 - j + num - 1] = True
		flag_dia2[0 + j] = True
		queen(1, num)
		flag_row[j] = False
		flag_dia1[0 - j + num - 1] = False
		flag_dia2[0 + j] = False
	rst = cnt * 2

elif num % 2 == 1 :
	for j in range(num // 2) :
		flag_row[j] = True
		flag_dia1[0 - j + num - 1] = True
		flag_dia2[0 + j] = True
		queen(1, num)
		flag_row[j] = False
		flag_dia1[0 - j + num - 1] = False
		flag_dia2[0 + j] = False
	rst = cnt * 2
	cnt = 0
	j = num // 2
	flag_row[j] = True
	flag_dia1[0 - j + num - 1] = True
	flag_dia2[0 + j] = True
	queen(1, num)
	flag_row[j] = False
	flag_dia1[0 - j + num - 1] = False
	flag_dia2[0 + j] = False
	rst += cnt


print(rst)

# cnt = 0
# queen(0, num)
# print(cnt)

