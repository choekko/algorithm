import sys
import copy
from collections import deque

sys.stdin = open("input.txt", "r")

row, col = map(int, sys.stdin.readline().split())


ice_height = []
for _ in range(row) :	
	ice_height.append(list(map(int, sys.stdin.readline().split())))


is_visit = [[0] * col for _ in range(row)]

stk = []
cnt = 0
for i in range(row) :
	for j in range(col) :
		if ice_height[i][j] != 0 :
			if cnt == 0 :
				stk.append((i, j))
				is_visit[i][j] = 1
			cnt += 1

def year() :
	global ice_height
	global is_visit
	global cnt
	year = 0
	while stk :
		tmp_cnt = 1
		is_visit[stk[-1][0]][stk[-1][1]] = 1
		tmp = 0
		flag = 0
		minus_cnt = 0
		near_zero_ary = [[0] * col for _ in range(row)]
		while stk :
			cur_row, cur_col = stk.pop()
			near_zero = 0
			if cur_row - 1 >= 0 and is_visit[cur_row - 1][cur_col] == 0 :
				if ice_height[cur_row - 1][cur_col] == 0 :
					near_zero += 1
				else : 
					stk.append((cur_row - 1, cur_col))
					is_visit[cur_row-1][cur_col] = 1
					tmp_cnt += 1
			if cur_row + 1 < row and is_visit[cur_row + 1][cur_col] == 0 :
				if ice_height[cur_row + 1][cur_col] == 0 :
					near_zero += 1
				else : 
					stk.append((cur_row + 1, cur_col))
					is_visit[cur_row+1][cur_col] = 1
					tmp_cnt += 1
			if cur_col - 1 >= 0 and is_visit[cur_row][cur_col - 1] == 0 :
				if ice_height[cur_row][cur_col - 1] == 0 :
					near_zero += 1
				else : 
					stk.append((cur_row, cur_col - 1))
					is_visit[cur_row][cur_col - 1] = 1
					tmp_cnt += 1
			if cur_col + 1 < col and is_visit[cur_row][cur_col + 1] == 0 :
				if ice_height[cur_row][cur_col + 1] == 0 :
					near_zero += 1
				else : 
					stk.append((cur_row, cur_col + 1))	
					is_visit[cur_row][cur_col + 1] = 1
					tmp_cnt += 1
			near_zero_ary[cur_row][cur_col] = ice_height[cur_row][cur_col] - near_zero
			if near_zero_ary[cur_row][cur_col] < 0 :
				near_zero_ary[cur_row][cur_col] = 0
			if near_zero_ary[cur_row][cur_col] == 0 :
				minus_cnt += 1
			if flag == 0 and near_zero_ary[cur_row][cur_col] != 0 :
				tmp = (cur_row, cur_col)
				flag = 1
			near_zero = 0 
		if tmp == 0 :
			if tmp_cnt == cnt :
				return 0
			return year
		elif tmp_cnt == cnt :
			stk.append(tmp)		
			year += 1
			cnt -= minus_cnt
			is_visit = [[0] * col for _ in range(row)]
			ice_height= near_zero_ary
			near_zero_ary = []
	return year

print(year())




