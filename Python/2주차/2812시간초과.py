import sys
import copy

sys.stdin = open("input.txt", "r")

cnt, del_cnt = map(int, sys.stdin.readline().split())

nbr = list(sys.stdin.readline().strip())

print(nbr)

tmp = sorted(range(len(nbr)),key=nbr.__getitem__)
print(tmp, nbr)

for i in range(del_cnt) :
	del tmp[0]

tmp.sort()

for i in range(len(tmp)) :
	print(nbr[tmp[i]], end = '')