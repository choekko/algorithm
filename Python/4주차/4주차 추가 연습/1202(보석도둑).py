"와우 세문제 다 푸셨네요
저보다 훨씬 잘하시네요 부럽습니다 

첫번째 문제는 점화식 자체는 거의 비슷한데
dp[i] = max((dp[i - 3] + stair[i - 1]  + stair[i]), (dp[i - 2] + stair[i]))
저는 이렇게 점화식을 만들면 dp를 1차원 배열로 만들수가 있더라구요. 혹시 도움이 될까해서 남겨봅니다. 

두번째문제에서는 방문 배열 대신 check에 값이 -1이 인지 아닌지로 방문체크가 가능할 것 같습니다! 

세번째 문제는 저는 손도 거의 못댔는데 깔끔하게 너무 잘 푸신 것 같습니다. 
한수 배워갑니다.

수고 많으셨습니다! "


from sys import stdin
import heapq

stdin = open("input.txt", "r") 

dia_num, bag_num = map(int, stdin.readline().split())

dia = [list(map(int, stdin.readline().split())) for _ in range(dia_num)]
dia.sort(key = lambda x : x[0])

bag_weight = [int(stdin.readline()) for _ in range(bag_num)]
bag_weight.sort()

heap = []

dia_idx = 0
rst = 0
for weight in bag_weight:
	while True :
		if dia_idx < dia_num and dia[dia_idx][0] <= weight :
			heapq.heappush(heap, -dia[dia_idx][1])
			dia_idx += 1
			continue
		if heap : 
			rst += -(heapq.heappop(heap))
		break
print(rst)