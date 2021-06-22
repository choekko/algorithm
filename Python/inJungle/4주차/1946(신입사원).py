from sys import stdin

stdin = open("input.txt", "r")

case_num = int(stdin.readline())

for _ in range(case_num) :
	eval_num = int(stdin.readline())
	lst = [list(map(int, stdin.readline().split(' '))) 	for _ in range(eval_num) ]
	lst.sort(reverse=True)
	cnt = 1
	a, b = lst.pop()
	while lst :
		while lst and lst[-1][1] > b :
			lst.pop()
		if lst :
			a, b = lst.pop()
			cnt += 1
	print(cnt)
