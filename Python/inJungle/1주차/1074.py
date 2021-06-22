import sys

size, row, col = map(int, sys.stdin.readline().split(' '))

cnt = 0

def cntcnt(size : int, row : int, col : int) :
	global cnt
	if size == 0 : return 
	bound = (2**size) // 2
	if row / bound <= 1 and col / bound <= 1 : 
		cnt += ((2**(size-1)) * (2**(size-1))) * 0 
		cntcnt(size - 1, row, col)
		
	if row / bound <= 1 and col / bound > 1 : 
		cnt += ((2**(size-1)) * (2**(size-1))) * 1
		cntcnt(size - 1, row, col - bound)
		
	if row / bound > 1 and col / bound <= 1 : 
		cnt += ((2**(size-1)) * (2**(size-1))) * 2
		cntcnt(size - 1, row - bound, col)

	if row / bound > 1 and col / bound > 1 : 
		cnt += ((2**(size-1)) * (2**(size-1))) * 3
		cntcnt(size - 1, row - bound, col - bound)


cntcnt(size, row + 1, col + 1)
print(cnt)
