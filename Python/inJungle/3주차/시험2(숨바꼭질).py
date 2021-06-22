import sys
from collections import deque

sys.stdin = open("input.txt", "r")

sis, bro = map(int, sys.stdin.readline().split(' '))

if bro % 2 == 0 :
	stk = [(bro, 0)]
	while True :
		bro, time = stk[-1] 
		if sis < bro :
			tmp1 = bro // 2
			tmp2 = bro % 2
			stk.append((tmp1, time + 1 + tmp2))
		elif sis == bro :
			print(time)
			break 
		else :
			bro, time = stk.pop()
			if abs(sis - bro) + time < abs(sis - stk[-1][0]) + stk[-1][1] :
				print(abs(sis-bro) + time)
			else :
				print(abs(sis - stk[-1][0]) + stk[-1][1])
			break

elif bro % 2 == 1 :
	tmp = [(bro - 1 , 1), (bro, 0), (bro + 1, 1)]
	rst = bro - sis
	for i in tmp :
		stk = [i]
		while True :
			bro, time = stk[-1] 
			if sis < bro :
				tmp1 = bro // 2
				tmp2 = bro % 2
				stk.append((tmp1, time + 1 + tmp2))
			elif sis == bro :
				rst = min(rst, time)
				break 
			else :
				bro, time = stk.pop()
				if stk :
					if abs(sis - bro) + time < abs(sis - stk[-1][0]) + stk[-1][1] :
						rst = min(rst, (sis-bro) + time)
					else :
						rst = min(rst, abs(sis - stk[-1][0]) + stk[-1][1])
				else :
					rst = min(rst, (sis-bro) + time)
				break
	print(rst)
