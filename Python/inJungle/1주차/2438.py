import sys

a = int(sys.stdin.readline())

def star(a) :
	if a > 1 :
		print('*', end = '')
		star(a - 1)
	elif a == 1 :
		print('*')
		return
	else : return

for i in range (1, a + 1) :
	star(i)