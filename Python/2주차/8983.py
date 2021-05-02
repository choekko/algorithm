import sys

sys.stdin = open("input.txt", "r")

shotwhere_cnt, duckwhere_cnt, shotrange = map(int, sys.stdin.readline().split())
shotwhere = list(map(int, sys.stdin.readline().split()))
duckwhere = []

for i in range(duckwhere_cnt) :
	duckwhere.append(list(map(int, sys.stdin.readline().split())))

shotwhere.sort()

def near_x(duckwhere_i : list, shotwhere : list) :
	duckwhere_x = duckwhere_i[0]
	pl = 0
	pr = shotwhere_cnt - 1
	tmp = 1000000000
	while True :
		pc = (pl + pr) // 2
		if abs(duckwhere_x - shotwhere[pc]) <= tmp :
			near_x = shotwhere[pc]
			tmp = abs(duckwhere_x - shotwhere[pc])
		if shotwhere[pc] >= duckwhere_x :
			pr = pc - 1
		else :
			pl = pc + 1
		if pl > pr : break
	return near_x

def is_value(duckwhere_i : list, near_x : int) :
	if abs(duckwhere_i[0] - near_x) + duckwhere_i[1] <= shotrange :
		return True
	else : False


cnt = 0
for i in range(duckwhere_cnt) :
	if is_value(duckwhere[i], near_x(duckwhere[i], shotwhere)) == True :
		cnt += 1

print(cnt)