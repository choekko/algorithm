import sys

nbr = int(sys.stdin.readline())

result = 1
for i in range(1, nbr+1) :
	result = result * i
	i += 1
print(result)