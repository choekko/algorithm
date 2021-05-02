import sys
from itertools import combinations

sys.stdin = open("input.txt", "r")


num, st = map(int, sys.stdin.readline().split())

lst = list(map(int, sys.stdin.readline().split()))

tmp = []

for i in range(num) :
	tmp.append((lst[i], 1)) 

i = 2
while len(tmp) <= st :
	tmp_tmp = lst * i
	tmp.extend(list(combinations(tmp_tmp, i)))
	i += 1

print(tmp)

