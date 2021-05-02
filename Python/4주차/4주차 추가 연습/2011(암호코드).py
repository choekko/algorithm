#https://www.acmicpc.net/problem/2011

from sys import stdin

stdin = open("input.txt", "r")

tmp = stdin.readline().rstrip()

if len(tmp) == 1 :
	if int(tmp) == 0 : 
		print(0)
	else : print(1)
	exit()

if tmp[-1] != '0' :
	stk = [1, 1]
else : 
	stk = [1, 0]

i = 1
while True :
	if i + 1 > len(tmp) :
		break
	a = tmp[-(i+1)]
	if a == '0' :
		stk.append(0)
		i += 1
		continue
	b = tmp[-i]
	two = int(a + b)
	if two <= 26 :
		stk.append(stk[-2] + stk[-1])
	else :
		stk.append(stk[-1])
	i += 1

print(stk[-1] % 1000000)