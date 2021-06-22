from sys import stdin

stdin = open("input.txt", "r")

lst = list(stdin.readline().rstrip())

lst.reverse()

stk = []

rst_tmp = 0
flag = 0
rst = 0
while lst :
	while lst and lst[-1] != '+' and lst[-1] != '-' :
		tmp = int(lst.pop())
		rst_tmp = rst_tmp * 10 + tmp

	if flag == 1 :
		rst -= rst_tmp
	else :
		rst += rst_tmp

	if lst :
		if lst[-1] == '-' :
			flag = 1
		lst.pop()

	rst_tmp = 0

print(rst)

