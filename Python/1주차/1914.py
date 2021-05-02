import sys
import math

nbr = int(sys.stdin.readline())

def hanoi(nbr : int, start : str, tmp : str, to : str) :
	if nbr == 1 : 
		print(start, to)
		return
	hanoi(nbr - 1, start, to, tmp)
	print(start, to)
	hanoi(nbr - 1, tmp, start, to)



cnt = 0

def hanoi_cnt(nbr : int, start : str, tmp : str, to : str) :
	global cnt
	if nbr == 1 : 
#		print(start, to)
		cnt += 1
		return
	hanoi_cnt(nbr - 1, start, to, tmp)
#	print(start, to)
	cnt += 1
	hanoi_cnt(nbr - 1, tmp, start, to)

print(int(math.pow(2, nbr)) - 1)
if nbr <= 20 :
	hanoi(nbr, '1', '2', '3')	

