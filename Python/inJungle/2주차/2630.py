import sys

sys.stdin = open("input.txt", "r")


size = int(sys.stdin.readline())
paper_ary = []

for i in range(size) :
	paper_ary.append(list(map(int, sys.stdin.readline().split())))

#print(paper_ary)

black_cnt = 0
white_cnt = 0

def cnt_color(i : int, j : int, size : int) :
	global black_cnt
	global white_cnt
	if size == 2 :
		tmp = [	paper_ary[i][j], paper_ary[i+1][j], paper_ary[i][j+1], paper_ary[i+1][j+1] ]
	if size != 2 :
		tmp = [	cnt_color(i, j, size //2), 
				cnt_color(i + size // 2, j, size //2), 
				cnt_color(i, j + size // 2, size //2),
				cnt_color(i + size // 2, j + size // 2, size //2)	]
	if -1 in tmp :
		black_cnt += tmp.count(1)
		white_cnt += tmp.count(0)
		return -1
	elif not 1 in tmp :
		return 0
	elif not 0 in tmp :
		return 1
	else :
		black_cnt += tmp.count(1)
		white_cnt += tmp.count(0)
		return -1

cnt_color(0, 0, size)

print(white_cnt)
print(black_cnt)

