import sys
from typing import MutableSequence

sys.stdin = open("input.txt", "r")

len_inArray = int(sys.stdin.readline())
inArray = list(map(int, sys.stdin.readline().split()))
len_numArray = int(sys.stdin.readline())
numArray = list(map(int, sys.stdin.readline().split()))


# def qsort(a : MutableSequence, left: int, right: int) :
# 	range = []
# 	range.append((left, right))
	
# 	while not len(range) == 0 :
# 		pl, pr = left, right = range.pop()
# 		x = a[(left + right) // 2]

# 		while pl <= pr :
# 			while a[pl] < x : pl += 1
# 			while a[pr] > x : pr -= 1
# 			if pl <= pr :
# 				a[pl], a[pr] = a[pr], a[pl]
# 				pl += 1
# 				pr -= 1
# 		if left < pr : range.append((left,pr))
# 		if pl < right : range.append((pl, right))

# beforeNumArrayIdx = sorted(range(len(numArray)),key=numArray.__getitem__)
# qsort(inArray, 0, len_inArray - 1)
inArray.sort()

# print(numArray)
# print(beforeNumArrayIdx)


def numInArray(num : int, inArray : list, len_inArray : int) : 
	
	pl = 0
	pr = len_inArray - 1

	while True :
		pc = (pl + pr) // 2
		if inArray[pc] == num :
			return 1
		elif inArray[pc] < num:
			pl = pc + 1
		else : 
			pr = pc - 1
		if pl > pr : break
	return 0

	# def numInArray(num : int, inArray : list, len_numArray : int) : 
	# stk = []
	# stk.append([0, len_numArray - 1])
	# flag = 0
	# while True :
	# 	pl, pr = stk.pop()
	# 	center = (pl + pr) // 2
	# 	if inArray[center] == num : 
	# 		flag = 1
	# 		return flag
	# 	if num < inArray[center] and pl != pr :
	# 		stk.append([pl, center - 1])
	# 	if num > inArray[center] and pl != pr :
	# 		stk.append([center + 1, pr])
	# 	if not stk : break
	# return flag


value = 0
for i in range(len_numArray) :
	if numInArray(numArray[i], inArray, len_inArray) == 1 : 
		print(1)
	else : print(0)