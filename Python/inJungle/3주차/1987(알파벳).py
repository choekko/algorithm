import sys
from collections import deque
sys.setrecursionlimit(10**6)

sys.stdin = open("input.txt", "r")

row, col = map(int, sys.stdin.readline().split())

ary = [list(sys.stdin.readline().strip()) for _ in range(row)]

alphabet_tmp = [0 for _ in range(26)]

max_cnt = 0
def dfs(i : int, j : int, ary: list, k : int) :
	global max_cnt
	alphabet_tmp[ord(ary[i][j])-65] = 1
	max_cnt = max(max_cnt, k)
	if i - 1 >= 0 and alphabet_tmp[ord(ary[i - 1][j])-65] == 0 :
		dfs(i - 1, j, ary, k+1)
		alphabet_tmp[ord(ary[i - 1][j])-65] = 0
	if i + 1 < row and alphabet_tmp[ord(ary[i + 1][j])-65] == 0 :
		dfs(i + 1, j, ary, k+1)
		alphabet_tmp[ord(ary[i + 1][j])-65] = 0
	if j - 1 >= 0 and alphabet_tmp[ord(ary[i][j - 1])-65] == 0 :
		dfs(i, j - 1, ary, k+1)
		alphabet_tmp[ord(ary[i][j - 1])-65] = 0	
	if j + 1 < col and alphabet_tmp[ord(ary[i][j + 1])-65] == 0 :
		dfs(i, j + 1, ary, k+1)
		alphabet_tmp[ord(ary[i][j + 1])-65] = 0

dfs(0, 0, ary, 1)

print(max_cnt)

