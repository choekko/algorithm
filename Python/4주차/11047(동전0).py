from sys import stdin

stdin = open("input.txt", "r")

num, want = map(int, stdin.readline().split(' '))

coins = [int(stdin.readline()) for _ in range(num)]

cur_sum = 0
cnt = 0
while True :
	if want == 0 :
		print(cnt)
		exit()
	if coins[-1] > want : 
		coins.pop()
		continue
	cur_sum += coins[-1]
	cnt += 1
	want -= coins[-1]
