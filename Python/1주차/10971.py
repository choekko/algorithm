import sys
from collections import deque


size = int(sys.stdin.readline())
# cost_array = [[0, 10, 15, 20], [5, 0, 9, 10], [0, 13, 0, 12], [8, 8, 9, 0]]
cost_array = []
for i in range(size) :
	cost_array.append(list(map(int, sys.stdin.readline().strip().split(' '))))



def depth(now : int, k : int, size : int, cost_array : list) :
	if now in visit and not k == 0 :        		# 만약 현재 번호가 들렸던 장소라면
		visit.append(-1)
		cost.append(-1)       		   # 나중에 pop을 하기 때문에 이미 들렸던 장소더라도 더미 값을 append 해준다
		return
	if not k == 0 : cost.append(cost[-1] + cost_array[visit[-1]][now])
	if (cost[-1] >= mincost[-1] and not mincost[-1] == 0) or (k != 0 and cost_array[visit[-1]][now] == 0) : 
		visit.append(-1)
		return		               		# 돌아간다              
	if not k == 0 : visit.append(now)            									# visit 스택을 이용해 방문했다고 알려준다.
	if k == size - 1 : 
		if cost_array[now][visit[0]] != 0  :
			cost.append(cost[-1] + cost_array[now][visit[0]])
			if cost[-1] <= mincost[-1] :
				mincost.pop()
				mincost.append(cost[-1])	
			# print(cost[-1])
			cost.pop()
			# visit.append(visit[0])  #지워
			# print(visit)
			# print(mincost[-1])
			# visit.pop()      		# 현재까지 방문 경로를 저장한 tmp를 출력하고
		return               		# 리턴
	for i in range(size) :    	 # 그 다음 방문을 두드린다.
		depth(i, k + 1, size, cost_array)	 # 더 깊게 들어간다 (재귀)
		visit.pop()
		cost.pop()

		
	
def rotation(size : int, cost_array : list) : 
	global visit
	global cost
	global mincost
	cost = deque([0])
	mincost = deque([10000000])
	for i in range(size) : 
		visit = deque([i]) 
		depth(i, 0, size, cost_array)
		visit.pop()
	return mincost.pop()

print(rotation(size, cost_array))



