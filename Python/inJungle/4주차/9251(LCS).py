from sys import stdin

stdin = open("input.txt", "r") 

str1 = list(stdin.readline().rstrip())
str2 = list(stdin.readline().rstrip())

ary = [[0] * (len(str1)) for _ in range(len(str2))]

for i in range(len(str2)) :
	for j in range(len(str1)) :
		if str2[i] != str1[j] :
			if i - 1 < 0 and j - 1 < 0 :
				ary[i][j] = 0
			elif i - 1 < 0 :
				ary[i][j] = ary[i][j - 1]
			elif j - 1 < 0 :
				ary[i][j] = ary[i - 1][j]
			else :
				ary[i][j] = max(ary[i-1][j], ary[i][j-1])
		else :
			if i - 1 >= 0 and j - 1 >= 0 :
				ary[i][j] = ary[i-1][j-1] + 1
			else :
				ary[i][j] = 1

print(ary[len(str2) - 1][len(str1) - 1])