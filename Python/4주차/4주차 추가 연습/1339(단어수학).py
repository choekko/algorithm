import sys
from collections import deque

sys.stdin = open("input.txt", "r") 

num = int(sys.stdin.readline())

str_list = [deque([]) for _ in range(num)]

check_ary = [0] * (ord("Z") - ord("A") + 1)



for i in range(num) :
	tmp_list = list(map(str, sys.stdin.readline().strip()))
	cnt = 1
	while tmp_list :
		str_tmp = tmp_list.pop()
		check_ary[ord(str_tmp) - ord("A")] += cnt
		cnt *= 10
		str_list[i].appendleft(str_tmp)

# print(check_ary)

cresendo = sorted(range(len(check_ary)),key=check_ary.__getitem__)

# print(cresendo)

i = 25
cnt = 0
while check_ary[cresendo[i]] != 0 :
	check_ary[cresendo[i]] = str(9 - cnt)
	i -= 1
	cnt += 1


rst = [deque([]) for _ in range(num)]

for i in range(num) :
	for j in range(len(str_list[i])) :
		rst[i].appendleft(check_ary[ord(str_list[i].pop()) - ord("A")])

# print(rst)

for i in range(num) :
	rst[i] = int(''.join(rst[i]))

print(sum(rst))
