import sys

def is_prime(a : int) :
	if a <= 0 :	return 0
	if (a == 1) : return 0
	i = 2;
	while (i <= a / i) :
		if a % i == 0 :
			return 0;
		i += 1
	return 1

fst = int(sys.stdin.readline())

lst = []
for i in range(fst) :
	lst.append(int(sys.stdin.readline()))

def goldbach(nbr : int) : 
	a = nbr // 2
	tmp1 = a
	tmp2 = a
	while ((not is_prime(tmp1)) or (not is_prime(tmp2))) and tmp1 >= 2 and tmp2 <= nbr-1 :
		tmp1 -= 1
		tmp2 += 1
	print(tmp1, tmp2)

for i in range(fst) :
	goldbach(lst[i])



