import sys

sys.stdin = open("input.txt", "r") 

num = int(sys.stdin.readline())


fibo = [0] * (num + 3) 

fibo[0] = 0
fibo[1] = 1
fibo[2] = 1

stk = [1, 1]

if num == 1 :
	print(1)
	exit()
if num == 2:
	print(1)
	exit()

i = 3
while True :
	a = stk.pop()
	b = stk.pop()

	fibo[i] = a + b
	if i == num :
		print(fibo[i])
		exit()
	stk.append(fibo[i])
	i += 1

	fibo[i] = a + b + a
	if i == num :
		print(fibo[i])
		exit()
	stk.append(fibo[i])
	i += 1




	