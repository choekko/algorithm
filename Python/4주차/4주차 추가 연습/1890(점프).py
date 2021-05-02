import sys

sys.setrecursionlimit(10000)
stdin = open("input.txt", "r") 

size = int(stdin.readline())
jump = [list(map(int, stdin.readline().split())) for _ in range(size)]

dp = [[-1] * size for _ in range(size)]

dp[size-1][size-1] = 1

drow = [1, 0]
dcol = [0, 1]

def dfs(row : int, col : int) :
	if dp[row][col] != -1 :
		return dp[row][col]
	
	if jump[row][col] == 0 and row != size -1 and col != size - 1 :
		return 0

	rst = 0
	for i in range(2) :
		nrow = row + drow[i]*jump[row][col]
		ncol = col + dcol[i]*jump[row][col]
		if nrow < size and ncol < size :
			tmp = dfs(nrow, ncol)
			dp[nrow][ncol] = tmp
			rst += tmp
	return rst

print(dfs(0, 0))