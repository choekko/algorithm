from sys import stdin

stdin = open("input.txt", "r")

num, want = map(int, stdin.readline().split(' '))

coins = [int(stdin.readline()) for _ in range(num)]

cnt = 0
while True :
	coin = coins.pop()
	cnt += want // coin
	want %= coin
	if want == 0 :
		print(cnt)
		exit() 
