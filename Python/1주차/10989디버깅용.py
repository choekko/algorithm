import sys
from typing import MutableSequence

def binary_insertion_sort(a: MutableSequence) -> None :
	n = len(a)
	for i in range(1, n):
		key = a[i]
		pl = 0
		pr = i - 1

		while True:
			pc = (pl + pr) // 2
			if a[pc] == key:
				break
			elif a[pc] < key :
				pl = pc + 1
			else:
				pr = pc - 1
			if pl > pr :
				break

		pd = pc + 1 if pl <= pr else pr + 1

		for j in range(i, pd, -1):
			a[j] = a[j - 1]
		a[pd] = key
	
if __name__ == "__main__":
	x = [6, 4, 3, 7, 1, 9, 8]

	binary_insertion_sort(x)

	print("네")

	for i in range(7) :
		print(f"x[{i}] = {x[i]}")