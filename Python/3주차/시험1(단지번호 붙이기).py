# 오늘도 고생 많으셨습니다. 🎉🎉🎉🎉🎉
#1 단지번호 붙이기
공무원들이 다 해줄텐데 왜 나누는지 모르겠습니다.
코드에 대해 첨언하자면,
나중에 헷갈리지 않도록 stk의 변수명을 que로 선언해주시는게 어떠실지😏 추천드립니다.
row + dx[k] 와 col + dy[k] 를 별도로 할당하고 코드를 작성하셨으면 코드가 더 보기 쉬었을 것 같습니다.

#2 숨바꼭질
수빈이가 기강을 좀 잡아놨으면 이럴 일이 없었을텐데..
코드에 대해 첨언하자면,
일단 문제를 그래프 탐색문제가 아닌 스택으로 해결하신 부분을 확인했습니다..
조건 분기를 명확히 하지 않으면 답을 찾기가 어려울 것으로 보입니다..
시간이 부족해 코드를 깊게 뜯어 보지 못했지만, 그래프를 이용해 풀거나 재귀를 이용해 푸는 과정을 경험해보시는게 어떨지 추천드립니다..
코드 상 stk, tmp 가 작성 중에 혼란을 많이 주었을것 같습니다. 부분적으로 통일성 있게 작성하면 코드를 좀 더 작성하기 수월할 것으로 사료됩니다./

#3 트리의지름
저도 이 문제는 정답을 못냈습니다..
저는 리프를 모두 구하고, 리프-리프로 이동하는 길이를 구했습니다만, 42% 런타임에러를 호출했습니다..
정해는 루트에서 가장 먼 리프 u를 dfs 1회로 구하고, 그 u에서 다시 dfs를 돌려 가장 긴 v를 찾아 그 길이를 반환하는 것입니다.
아래 링크 참조하시길 바랍니다. https://koosaga.com/14


import sys
from collections import deque

sys.stdin = open("input.txt", "r")

size = int(sys.stdin.readline())

home_ary = [list(map(int, sys.stdin.readline().strip())) for _ in range(size)]

visit_ary = [[0] * size for _ in range(size)]

dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]

stk = deque([])

# for i in range(size) :
# 	for j in range(size) :
# 		if home_ary[i][j] == 1 :
# 			stk.append((i, j))
# 			visit_ary[i][j] = 1
# 			break

cnt = 0
cnt_lst = []
for i in range(size) :
	for j in range(size) :
		if visit_ary[i][j] == 0 and home_ary[i][j] == 1 :
			stk.append((i, j))
			visit_ary[i][j] = 1
			cnt = 0
			while stk :
				row, col = stk.popleft()
				cnt += 1
				for k in range(4) :
					if 0 <= row + dx[k] < size and 0 <= col + dy[k] < size and visit_ary[row+dx[k]][col+dy[k]] == 0 and home_ary[row+dx[k]][col+dy[k]] == 1:
						stk.append((row+dx[k], col+dy[k]))
						visit_ary[row+dx[k]][col+dy[k]] = 1
			cnt_lst.append(cnt)

cnt_lst.sort()
print(len(cnt_lst))
for cnt in cnt_lst :
	print(cnt)