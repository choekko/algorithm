import sys
from collections import deque

sys.stdin = open("input.txt", "r")

row, col = map(int, sys.stdin.readline().split(' '))

ary = [list(sys.stdin.readline().strip()) for _ in range(row)]
watertime = [[2500] * col for _ in range(row)]

flag = 0
water_idx = deque([])
for i in range(row) :
	for j in range(col) :
		if flag == 2 : break
		if ary[i][j] == 'D' :
			where_home = (i, j)
			watertime[i][j] = 2501 #집
		if ary[i][j] == 'S' :
			where_I = deque([(i, j, 0)])
		if ary[i][j] == '*' :
			water_idx.append((i, j, 0))
		if ary[i][j] == 'X' :
			watertime[i][j] = -1 #돌




def flowwater() :
	while True :
		i, j, time = water_idx.popleft()
		if time == 0 :
			watertime[i][j] = time
		if i - 1 >= 0 and watertime[i - 1][j] == 2500	:
			water_idx.append((i - 1, j, time + 1))
			watertime[i-1][j] = time + 1
		if i + 1 < row and watertime[i + 1][j] == 2500 :
			water_idx.append((i + 1, j, time + 1))
			watertime[i+1][j] = time + 1
		if j - 1 >= 0 and watertime[i][j - 1] == 2500 :
			water_idx.append((i, j - 1, time + 1))
			watertime[i][j-1] = time + 1
		if j + 1 < col and watertime[i][j + 1] == 2500 :
			water_idx.append((i, j + 1, time + 1))
			watertime[i][j+1] = time + 1
		if not water_idx :
			break

def gogo() :
	while True : 
		i, j, time = where_I.popleft()
		if (i, j) == where_home :
			print(time)
			break
		if time == 0 :
			ary[i][j] = 'No'
		if i - 1 >= 0 and (ary[i - 1][j] == '.' or ary[i - 1][j] == 'D') and watertime[i - 1][j] > time + 1:
			where_I.append((i - 1, j, time + 1))
			ary[i - 1][j] = 'No'
		if i + 1 < row and (ary[i + 1][j] == '.' or ary[i + 1][j] == 'D') and watertime[i + 1][j] > time + 1:
			where_I.append((i + 1, j, time + 1))
			ary[i + 1][j] = 'No'
		if j - 1 >= 0 and (ary[i][j - 1] == '.' or ary[i][j - 1] == 'D') and watertime[i][j - 1] > time + 1:
			where_I.append((i, j - 1, time + 1))
			ary[i][j - 1] = 'No'
		if j + 1 < col and (ary[i][j + 1] == '.' or ary[i][j + 1] == 'D') and watertime[i][j + 1] > time + 1 :
			where_I.append((i, j + 1, time + 1))
			ary[i][j + 1] = 'No'
		if not where_I :
			print("KAKTUS")
			break
if water_idx :
	flowwater()
gogo()


