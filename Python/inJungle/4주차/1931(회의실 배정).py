from sys import stdin

stdin = open("input.txt", "r")

num = int(stdin.readline())
lst = [list(map(int, stdin.readline().split(' '))) for _ in range(num)]

lst_stk = sorted(lst, key=lambda x : (-x[1], -x[0]))

a, b = lst_stk.pop()
cnt = 1
while True :
	if not lst_stk : break
	if lst_stk[-1][0] >= b :
		a, b = lst_stk.pop()
		cnt += 1
	else :
		while lst_stk and lst_stk[-1][0] < b :
			lst_stk.pop()
		if lst_stk :
			a, b = lst_stk.pop()
			cnt += 1
			
print(cnt)
