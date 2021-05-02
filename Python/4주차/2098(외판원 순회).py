from sys import stdin
import sys

stdin = open("input.txt", "r")

num = int(stdin.readline())

cost_ary = [list(map(int, stdin.readline().split(' '))) for _ in range(num)]

"""
의사 코드 

비트마스킹으로 방문기록을 찍어놓은걸 잠시 비트맵이라고 편하게 부르자.

check[넘버][비트맵] = 남은 방문을 하는 것의 최소 비용

dfs(현재 넘버, 비트맵) -> 남은 방문장소를 들리는데의 최소비용을 출력할거임  
						-> 처음엔 dfs(0, 1) 이 들어갈거임. (왜냐하면 그냥 0으로 시작할라구)

	if 비트맵이 전부 켜져있으면 :
		check[넘버][비트맵] = 현재넘버 -> 0 으로 가는 비용 해
		근데 만약에 못가는 곳이면 check[넘버][비트맵] = -1 해

	if check[넘버][비트맵] 의 값이 있으면
		해당 값을 리턴해주면 되징
	else 
		cost = sys.maxsize
		for 1부터 N-1 까지의 i에 대해서
			if 비트맵에 1 << i 가 안켜져있고 if 현재 넘버에서 i까지 가는 비용이 0이 아니라면 
				tmp = dfs(i, 비트맵 | 1 << i))
				if tmp != -1 
					cost = min(cost, 현재노드에서 i 가는 비용 + tmp)
		check[넘버][비트맵] = cost
		return cost
"""

check = [[0] * (2**num + 1) for _ in range(num)]

def dfs(now_nbr : int, bit_map : int) :
	if bit_map == (1 << num) - 1 :
		if cost_ary[now_nbr][0] != 0 :
			check[now_nbr][bit_map] = cost_ary[now_nbr][0]
		else :
			check[now_nbr][bit_map] = sys.maxsize
	
	if check[now_nbr][bit_map] != 0 :
		return check[now_nbr][bit_map] 
	else :
		cost = sys.maxsize
		for i in range(1, num) :
			if (bit_map & (1 << i)) == 0 and cost_ary[now_nbr][i] != 0 :
				tmp = dfs(i, bit_map | (1 << i))
				#if tmp != -1 :
				cost = min(cost, cost_ary[now_nbr][i] + tmp)
		check[now_nbr][bit_map] = cost
		return cost 

print(dfs(0, 1))