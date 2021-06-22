import sys
from collections import deque

size_x, size_y = map(int, sys.stdin.readline().split(' '))

nbr = int(sys.stdin.readline())

if nbr == 0 : 
	rst = size_x * size_y
	print(rst)

else :
	lst_row = []
	lst_col = []
	for i in range(nbr) :
		tmp = sys.stdin.readline().strip().split(' ')
		if int(tmp[0]) == 0 : lst_row.append(int(tmp[1]))
		elif int(tmp[0]) == 1 : lst_col.append(int(tmp[1]))

	lst_row.append(0)
	lst_col.append(0)

	lst_row.sort()
	lst_col.sort()

	lst_row.append(size_y)
	lst_col.append(size_x)

	len_row = len(lst_row)
	len_col = len(lst_col)

	row_subt = []
	col_subt = []


	for i in range(len_row - 1) :
		row_subt.append(lst_row[i+1] - lst_row[i])

	for i in range(len_col - 1) :
		col_subt.append(lst_col[i+1] - lst_col[i])

	rst = max(row_subt) * max(col_subt)
	print(rst)



