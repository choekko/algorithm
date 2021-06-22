import sys
from itertools import permutations

#sys.stdin = open('input.txt', 'r')

cnt = int(sys.stdin.readline())
array = []
for i in range(cnt) :
	array.append(list(map(int, sys.stdin.readline().split())))
	 
a = [1, 2, 3, 4, 5, 6, 7, 8, 9]
tmp = list(permutations(a, 3)) 
possible = []

for i in range(cnt) :
	num = array[i][0]
	num_array = (num // 100, (num // 10) % 10, num % 10) 
	strike = array[i][1]
	ball = array[i][2]
	
	for i in range(len(tmp)) :
		is_strike = 0
		is_ball = 0
		for j in range(3) :
			if tmp[i][j] == num_array[j] : is_strike += 1
			elif num_array[j] in tmp[i] : is_ball += 1 
		if strike == is_strike and ball == is_ball :
			possible.append(tmp[i])
	tmp = possible
	possible = []

print(len(tmp))




