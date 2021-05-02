import sys
from collections import deque

sys.stdin = open("input.txt", "r")

num = int(sys.stdin.readline())

lst = []

for _ in range(num) :
	a, b = map(float, sys.stdin.readline().split())
	tmp = [(a-b),(a+b)]
	lst.append(tmp)

lst.sort()
print(lst)

tmp = deque()
l = []

i = 0

cnt = 0
while i < num :
	tmp.appendleft(lst[i][1])
	i += 1
	while i < num and lst[i][0] == lst[i-1][0] :
		tmp.appendleft(lst[i][1])
		i += 1
	if not l :
		l.extend(tmp)
	else : 
		i -= 1
		while l and lst[i][0] > l[-1] :
			l.pop()
		if l and lst[i][0] == l[-1] :
			l.pop()
			for j in range(len(tmp) - 1, -1, -1) :
				for k in range(len(l) - 1, -1, -1) :
					if l[k] > tmp[j] : break
					if l[k] == tmp[j] :
						cnt += 1
						del tmp[j]
						break
			if tmp : l.extend(tmp)
			i += 1
		else : 
			l.extend(tmp)
			i += 1

print(num + cnt)

