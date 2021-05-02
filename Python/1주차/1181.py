import sys
from typing import MutableSequence


def lenSort(a : MutableSequence, left: int, right: int) -> None:
	range = []
	range.append((left, right))
	
	while not len(range) == 0 :
		pl, pr = left, right = range.pop()
		x = len(a[(left + right) // 2])

		while pl <= pr :
			while len(a[pl]) < x : pl += 1
			while len(a[pr]) > x : pr -= 1
			if pl <= pr :
				a[pl], a[pr] = a[pr], a[pl]
				pl += 1
				pr -= 1
		if left < pr : range.append((left,pr))
		if pl < right : range.append((pl, right))

def qsort(a : MutableSequence, left: int, right: int) -> None:
	range = []
	range.append((left, right))
	
	while not len(range) == 0 :
		pl, pr = left, right = range.pop()
		x = a[(left + right) // 2]

		while pl <= pr :
			while a[pl] < x : pl += 1
			while a[pr] > x : pr -= 1
			if pl <= pr :
				a[pl], a[pr] = a[pr], a[pl]
				pl += 1
				pr -= 1
		if left < pr : range.append((left,pr))
		if pl < right : range.append((pl, right))

cnt = int(sys.stdin.readline())

x = []

for i in range(cnt) :
	a = str(sys.stdin.readline().strip())
	if not a in x : x.append(a)

cnt = len(x)

# print(x)

lenSort(x, 0, cnt - 1)

# print(x)
sa_idx = []

i = 0
tmp_cnt = 1
while i < cnt - 1 :
	if len(x[i + 1]) == len(x[i]) : 
		tmp_cnt += 1
		# print("여기")
	else :
		sa_idx.append(tmp_cnt)
		tmp_cnt = 1
		# print("여긴?")
	i += 1
sa_idx.append(tmp_cnt)

# print(f'sa_idx : {sa_idx}')

start = 0
for i in range(len(sa_idx)) :
	qsort(x, start, start + sa_idx[i] - 1 )
	start += sa_idx[i] 

for i in range(cnt) :
	print(x[i])

		






