import sys
import math

def is_prime(a : int) :
	if a <= 0 :	return 0
	if (a == 1) : return 0
	i = 2;
	while (i <= a / i) :
		if a % i == 0 :
			return 0;
		i += 1
	return 1

nbr = int(sys.stdin.readline())

str = sys.stdin.readline().split(' ')

lst = []
for i in range(nbr) : 
	lst.append(int(str[i]))

cnt = 0
for i in range(nbr) : 
	if is_prime(lst[i]) == 1 : cnt += 1

print(cnt)