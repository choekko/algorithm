from sys import stdin

stdin = open("input.txt", "r") 

obj_num, bag_max = map(int, stdin.readline().split())

value_lst = [list(map(int, stdin.readline().split())) for _ in range(obj_num)]


maxval_ary = [[0] * obj_num for _ in range(bag_max + 1)]

def solve(obj_num : int, bag_max : int, value_lst : list, maxval_ary : list) :
	for i in range(1, bag_max + 1) :
		for j in range(0, obj_num) :
			if value_lst[j][0] > i :
				if j - 1 >= 0 :
					maxval_ary[i][j] = maxval_ary[i][j-1]
			else :
				tmp = i - value_lst[j][0]
				if j - 1 >= 0 :
					maxval_ary[i][j] = max(maxval_ary[tmp][j-1] + value_lst[j][1], maxval_ary[i][j-1])
				else :
					maxval_ary[i][j] = value_lst[j][1]
	return maxval_ary[bag_max][obj_num-1]

print(solve(obj_num, bag_max, value_lst, maxval_ary))