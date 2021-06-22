import sys
from collections import deque


sys.stdin = open("input.txt", "r")

que = deque()

num = int(sys.stdin.readline())

lst = []

def push(nbr : int) :
	que.appendleft(nbr)
def front() :
	if not que :
		return -1
	else :
		return que[-1]
def size():
	return len(que)

def pop() :
	if not que :
		return -1
	else :
		return que.pop()
def empty() :
	if not que :
		return 1
	else :
		return 0
def back() :
	if not que : 
		return -1
	else :
		return que[0]

for i in range(num) :
	tmp = sys.stdin.readline().split()
	tmp_tmp = tmp[0]
	if tmp_tmp == 'push' :
		push(int(tmp[1]))
	elif tmp_tmp == 'pop' :
		print(pop())
	elif tmp_tmp == 'size' :
		print(size())
	elif tmp_tmp == 'empty' :
		print(empty())
	elif tmp_tmp == 'front' :
		print(front())
	elif tmp_tmp == 'back' :
		print(back())