import sys
from sys import *
from typing import MutableSequence

setrecursionlimit(10**6)


sys.stdin = open("input.txt", "r")

home_cnt, wifi_cnt = map(int, sys.stdin.readline().split())
home_x = []

for i in range(home_cnt) : 
	home_x.append(int(sys.stdin.readline()))

home_x.sort()

flag = 0
last_cnt = 1
def flagof(distance : int, wifi_cnt : int, home_cnt : int, start_idx : int) :
	global last_cnt
	global flag
	pl = start_idx
	pr = home_cnt - 1
	while True :
		pc = (pl + pr) // 2
		if home_x[pc] - home_x[start_idx]  >= distance :
			tmp_pc = pc
			flag = 1
		if home_x[pc] - home_x[start_idx] < distance :
			pl = pc + 1
		else :
			pr = pc - 1 
		if pl > pr : break
	if flag == 1 : 
		flag = 0
		last_cnt += 1
		# print(home_x[tmp_pc], end=' ')
		if last_cnt == wifi_cnt : return True
		else : return(flagof(distance, wifi_cnt, home_cnt, tmp_pc))
	else :
		if last_cnt != wifi_cnt : return False

# print(home_x[0], end=' ')


i = 0
while True :
	if flagof(i, wifi_cnt, home_cnt, 0) == True :
		# print("zㅋㅋ")
		i += 1
		last_cnt = 1
		continue
	else : break

print(i - 1) 






