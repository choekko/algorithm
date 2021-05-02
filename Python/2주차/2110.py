import sys
from typing import MutableSequence

sys.stdin = open("input.txt", "r")

home_cnt, wifi_cnt = map(int, sys.stdin.readline().split())
home_x = []

for i in range(home_cnt) : 
	home_x.append(int(sys.stdin.readline()))

home_x.sort()

def setwifi(distance : int) :
	cur_x = 0
	cnt = 1
	for i in range(1, home_cnt) :
		if distance <= home_x[i] - home_x[cur_x] :
			cnt += 1
			cur_x = i
	return cnt


def max_mindistance() :
	min_home_x = 0
	max_home_x = home_x[home_cnt - 1]

	while True :
		mid = (max_home_x + min_home_x) // 2
		if setwifi(mid) >= wifi_cnt :
			rst = mid
			min_home_x = mid + 1
		else :
			max_home_x = mid - 1
		if max_home_x < min_home_x : break

	return rst

print(max_mindistance())
	

