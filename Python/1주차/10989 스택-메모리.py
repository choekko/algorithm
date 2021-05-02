import sys
from typing import MutableSequence


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

x = [None] * cnt

for i in range(cnt) :
	x[i] = int(sys.stdin.readline())

qsort(x, 0, cnt - 1)

for i in range(cnt) :
	print(x[i])