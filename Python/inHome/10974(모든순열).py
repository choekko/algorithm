# from sys import stdin
# from itertools import permutations

# stdin = open("input.txt", "r")

# num = int(stdin.readline().rstrip())

# digit = [str(i) for i in range(1, num + 1)]

# methods = list(permutations(digit, num))

# for method in methods :
#     print(' '.join(method))


### 위에거는 너무 내장함수 의존이라 직접 만들어보자 ###

from sys import stdin
from collections import deque

stdin = open("input.txt", "r")

num = int(stdin.readline().rstrip())

digits = ''.join([str(i) for i in range(1, num + 1)])

dfsStk = deque([(str(i), 1) for i in range(num, 0, -1)])

while dfsStk :
    curr, depth = dfsStk.pop()
    if depth == num :
        print(' '.join(curr))
    else :
        for digit in digits :
            if digit not in curr :
                dfsStk.appendleft((curr + digit, depth + 1))
            






