import sys

sys.stdin = open("input.txt", "r")

num = int(sys.stdin.readline())

lst = []

for i in range(num) :
	lst.append(int(sys.stdin.readline()))

tmp = 0
cnt = 0
for i in range(num) :
	if tmp < lst[-1] : 
		cnt += 1
		tmp = lst.pop()
	else : lst.pop()
	
print(cnt)