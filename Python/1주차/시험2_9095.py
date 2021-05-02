import sys

num = int(sys.stdin.readline())
num_list = []

for i in range(num) :
	num_list.append(int(sys.stdin.readline()))


visit = []
sumrst = [0]

cnt = 0
def sumcnt(now : int, num : int, k : int) :
	global cnt
	# if k != 0 and visit[-1] == now :
	# 	visit.append(-1)
	# 	return
	# visit.append(now)
	sumrst.append(now + sumrst[-1])
	if sumrst[-1] == num : 
		cnt += 1
		return
	if sumrst[-1] > num :
		return
	if sumrst[-1] < num :
		for i in range(1, 4) :
			sumcnt(i, num, k + 1)
			sumrst.pop()
			# visit.pop()


for num in num_list :
	for i in range(1, 4) : 
		sumcnt(i, num, 0)
		sumrst = [0]
	print(cnt)
	cnt = 0


