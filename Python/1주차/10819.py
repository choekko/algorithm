
import sys

def depth(now : int, k : int, size : int) :
	if now in visit :        		# 만약 현재 번호가 들렸던 장소라면
		visit.append(-1)       		   # 나중에 pop을 하기 때문에 이미 들렸던 장소더라도 더미 값을 append 해준다
		return               		# 돌아간다
	tmp[k] = now                 # tmp는 깊이 끝에 도달하면 출력될 방문리스트이다. 
	visit.append(now)            # visit 스택을 이용해 방문했다고 알려준다.
	if k == size - 1 :   
		rst.append(tuple(tmp))       		# 현재까지 방문 경로를 저장한 tmp를 출력하고
		return               		# 리턴
	for i in range(size) :    	 # 그 다음 방문을 두드린다.
		depth(i, k + 1, size)	 # 더 깊게 들어간다 (재귀)
		visit.pop()
	
def permutation(size : int) :
	global tmp 
	global visit
	global rst
	rst = []
	tmp = [0] * size
	visit = []
	for i in range(size) : 
		depth(i, 0, size)
		visit.pop()
	return rst

def subsum(a : list, permu: list, len : int) :
	rst = 0
	for i in range(len - 1) :
		rst += abs((a[permu[i+1]]) - (a[permu[i]]))
	return rst

num = int(sys.stdin.readline())

lst = list(map(int, sys.stdin.readline().strip().split()))

per = permutation(num)

last_max = 0

for i in range(len(per)) :
	last_max = max(last_max, subsum(lst, per[i], num))

print(last_max)



	