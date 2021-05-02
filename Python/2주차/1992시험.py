# 1. solve 함수에서 조건문 조건 설정이 간결하고 예뻐서 좋습니다. for문도 그렇고 itertools도 그렇고 파이썬을 잘 아시는 것 같습니다. 배울 부분이 많습니다.
# 2. 로직이 정리가 잘 되어있어서 코드가 간결하게 나온 것 같습니다. 앞에서 설명하셨으면 이해도 잘 되고 좋았을 것 같습니다.
# 3. permutation을 이용한 방법은 저도 생각해봤는데 몇 자리 까지 permutation을 만들지가 애매한 것 같습니다. 2와 541만 주어진 경우에 permutation으로는 생각하기 힘든 것 같아서 포기했습니다.


import itertools
import sys
from itertools import chain

sys.stdin = open("input.txt", "r")

size = int(sys.stdin.readline())

ary = []

for _ in range(size) :
	tmp = list(sys.stdin.readline().strip())
	ary.append(tmp)




def solve(i : int, j : int, size : int) :
	if size == 2 :
		tmp = [ary[i][j], ary[i][j+1], ary[i+1][j], ary[i+1][j+1] ]
	if size != 2 :
		tmp = [	solve(i, j, size //2), 
				solve(i, j + size // 2, size //2),
				solve(i + size // 2, j, size //2), 
				solve(i + size // 2, j + size // 2, size //2)	]
	cnt_1 = tmp.count('1')
	cnt_0 = tmp.count('0')
	if cnt_1 < 4 and cnt_0 < 4 :
		tmp2 = ["("]
		tmp2.extend(tmp)
		tmp2.extend(")")
		return tmp2
	elif not '1' in tmp :
		return '0'
	elif not '0' in tmp :
		return '1'
	else :
		tmp2 = ["("]
		tmp2.extend(tmp)
		tmp2.extend(")")
		return tmp2


		
rst = solve(0, 0, size)
print(rst)
i = 0
while i < 64*64 :
	rst = list(itertools.chain(*rst))
	i += 1
print("".join(rst))