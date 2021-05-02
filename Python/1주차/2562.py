import sys

lst = []

lst.extend(int(sys.stdin.readline()) for i in range(9))

print(max(lst))

for i in range(len(lst)) :
	if lst[i] == max(lst) :
		rst = i + 1
		print(rst)