import sys
from collections import deque

sys.stdin = open("input.txt", "r")

size = int(sys.stdin.readline())

apple_cnt = int(sys.stdin.readline())

apple_ary = []
for _ in range(apple_cnt) :
	tmp = list(map(int, sys.stdin.readline().split()))
	tmp[0] -= 1
	tmp[1] -= 1
	apple_ary.append(tmp)

snake_move_cnt = int(sys.stdin.readline())

snake_move = deque()
for _ in range(snake_move_cnt) :
	snake_move.appendleft(list(map(str, sys.stdin.readline().split())))


dx = [-1, 0, 1, 0]
dy = [0, -1, 0, 1]

cur_dir = 2
snake_body = deque([[0, 0]])

def rotation(direction : str) :
	global cur_dir
	if direction == 'L' :
		cur_dir -= 1
		if cur_dir < 0 :
			cur_dir += 4
	if direction == 'D' :
		cur_dir += 1
		if cur_dir > 3:
			cur_dir -= 4

def move() :
	global time
	global cur_dir
	time += 1
	snake_body.append([x+y for x, y in zip(snake_body[-1],[dy[cur_dir], dx[cur_dir]])])
	if not 0 <= snake_body[-1][0] <= size - 1 or not 0 <= snake_body[-1][1] <= size - 1 :
		print(time)
		exit()
	tmp = snake_body[-1]
	if snake_body.pop() in snake_body : 
		print(time)
		exit()
	snake_body.append(tmp)
	if snake_body[-1] in apple_ary :
		apple_ary.remove(snake_body[-1])
		return
	else :
		snake_body.popleft()

time = 0

def where() :
	print(f'- - - - - -time : {time}- - - - - - -')
	for i in range(size) :
		for j in range(size) :
			if [i, j] in snake_body :
				print('■', end='')
			elif [i, j] in apple_ary :
				print('★', end='')
			else : print('□', end='')
		print('')
	print(f'- - - - - - - - - - - - - - - - - - -')

where()
while snake_move :
	a, b = snake_move.pop()
	for i in range(int(a)-time) :
		move()
		where()
	rotation(b)

while True :
	move()
	where()