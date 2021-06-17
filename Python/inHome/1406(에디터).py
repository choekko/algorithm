# from sys import stdin
# from collections import deque

# stdin = open("input.txt", "r")

# base = list(stdin.readline().rstrip())
# orderNum = int(stdin.readline())
# orderStk = deque()
# for _ in range(0, orderNum) :
#     orderStk.appendleft(stdin.readline().rstrip().split(' '))

# cursor = len(base)

# while True : 
#     order = orderStk.pop()
#     if order[0] == 'L' and cursor != 0 :
#         cursor -= 1
#     elif order[0] == 'D' and cursor != len(base) :
#         cursor += 1
#     elif order[0] == 'B' and cursor != 0 :
#         del base[cursor - 1]
#         cursor -= 1
#     elif order[0] == 'P' :
#         base.insert(cursor, order[1])
#         cursor += 1
#     if not orderStk :
#         break

# print(''.join(base))

from sys import stdin
from collections import deque

stdin = open("input.txt", "r")

base = stdin.readline().rstrip()

orderNum = int(stdin.readline())
orderStk = deque()
for _ in range(0, orderNum) :
    orderStk.appendleft(stdin.readline().rstrip().split(' '))

leftStk = list(base)
rightStk = []

def moveCursor(direction) :
    if direction == "left" and leftStk :
        rightStk.append(leftStk.pop())
    elif direction == "right" and rightStk :
        leftStk.append(rightStk.pop())


while True : 
    order = orderStk.pop()
    if order[0] == 'L' :
        moveCursor("left")
    elif order[0] == 'D'  :
        moveCursor("right")
    elif order[0] == 'B' and leftStk :
        leftStk.pop()
    elif order[0] == 'P' :
        leftStk.append(order[1])
    if not orderStk :
        break
    
print(''.join(leftStk + list(reversed(rightStk))))
    