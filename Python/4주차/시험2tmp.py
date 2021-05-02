
from sys import stdin
import sys

sys.setrecursionlimit(10000)
stdin = open("input.txt", "r") 

row_max, col_max = map(int, stdin.readline().split())

height_ary = [list(map(int, stdin.readline().split())) for _ in range(row_max)]

check = [[-1] * col_max for _ in range(row_max)]

check[row_max - 1][col_max - 1] = 1
visit = [[0] * col_max for _ in range(row_max)]

'''
의사 코드

dfs (row, col)     ->  최소 경로의 개수를 리턴할거야
	
	if 만약에 check[row][col] != -1 이면 
		그 값을 그대로 retrun 해

	주변을 살펴봐
		height_ary[row, col] 보다 작은 곳이 있어??
			그러면 그곳으로 dfs 한걸 받아와
			그값이 -1 이 아니라면
				check_ary[row, col]에 그걸 넣어두자
			rst 에 그값을 모아두자

	return rst 하자
'''

visit[0][0] = 1
def dfs(row : int, col : int) :
	if check[row][col] != -1 :
		return check[row][col]

	rst = 0
	if row + 1 < row_max and visit[row+1][col] == 0 :
		if height_ary[row+1][col] < height_ary[row][col] :
			visit[row+1][col] = 1
			tmp = dfs(row+1, col)
			visit[row+1][col] = 0
			if tmp != 0 :
				check[row+1][col] = tmp
				rst += tmp
	if 0 <= row - 1 and visit[row-1][col] == 0 :
		if height_ary[row-1][col] < height_ary[row][col] :
			visit[row-1][col] = 1
			tmp = dfs(row-1, col)
			visit[row-1][col] = 0
			if tmp != 0 :
				check[row-1][col] = tmp
				rst += tmp
	if col + 1 < col_max and visit[row][col + 1] == 0 :
		if height_ary[row][col+1] < height_ary[row][col] :
			visit[row][col+1] = 1
			tmp = dfs(row, col+1)
			visit[row][col+1] = 0
			if tmp != 0 :
				check[row][col+1] = tmp
				rst += tmp				
	if 0 <= col - 1 and visit[row][col - 1] == 0 :
		if height_ary[row][col-1] < height_ary[row][col] :
			visit[row][col-1] = 1
			tmp = dfs(row, col-1)
			visit[row][col-1] = 0
			if tmp != 0 :
				check[row][col-1] = tmp
				rst += tmp		
	
	return rst

print(dfs(0, 0))	

