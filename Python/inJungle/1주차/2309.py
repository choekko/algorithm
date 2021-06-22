import sys

lst = []

for i in range(9) : 
	lst.append(int(sys.stdin.readline()))

sum = 0

for i in range(9) :
	sum += lst[i]


flag = 0
for i in range(8) :	
	for j in range(i + 1, 9) :
		rst = sum - lst[i] - lst[j]
		if rst == 100 : 
			del lst[j], lst[i]
			flag = 1
			break
	if flag == 1 : break	

lst.sort()

for i in range(len(lst)) : print(lst[i])
