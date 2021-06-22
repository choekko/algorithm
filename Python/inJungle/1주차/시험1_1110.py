import sys

num = int(sys.stdin.readline())

cnt = 0
def recycle(num : int, value : int) :
	global cnt
	if cnt != 0 :
		if num == value : return
	ten_num = num % 10
	one_num = (num % 10 + num // 10) % 10
	tmp = ten_num * 10 +  one_num
	cnt += 1
	recycle(tmp, value)


recycle(num, num)
print(cnt)