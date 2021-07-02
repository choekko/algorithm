# from sys import stdin

# stdin = open("input.txt", "r")

# num = int(stdin.readline())

# def solution(order, stk) : 
#     stk_rev = stk
#     stk_rev.reverse()
#     order_list = list(order)
#     order_list.reverse()
#     while order_list :
#         curr = order_list.pop()
#         if curr == 'D' :
#             if stk_rev :
#                 stk_rev.pop()
#                 continue
#             else :
#                 print("error")
#                 return
#         else :
#             if order_list and order_list[-1] == 'R' :
#                 order_list.pop()
#                 continue
#             else :
#                 stk_rev.reverse()
#     if not stk_rev :
#         print("[]")
#     else :
#         stk_rev.reverse()
#         print('[' + ','.join(stk_rev) + ']')


# for _ in range(num) :
#     order = stdin.readline().rstrip()
#     stk_num = int(stdin.readline())
#     if stk_num == 0 :
#         stk = []
#         _ = stdin.readline()
#     else :
#         stk = list(stdin.readline().rstrip().strip(']').strip('[').split(','))
#     solution(order, stk)


from sys import stdin
from collections import deque

stdin = open("input.txt", "r")

num = int(stdin.readline())

def solution(order, que) : 
    que_rev = que
    order_list = list(order)
    order_list.reverse()
    flag = 0
    while order_list :
        while order_list and order_list[-1] == 'R' : 
            order_list.pop()
            flag = not flag
        while order_list and order_list[-1] == 'D' :
            order_list.pop()
            if not que_rev :
                print("error")
                return
            if flag :
                que_rev.pop()
            else :
                que_rev.popleft()
    if not que_rev :
        print("[]")
    else :
        if flag == 1 :
            que_rev.reverse()
        print('[' + ','.join(que_rev) + ']')


for _ in range(num) :
    order = stdin.readline().rstrip()
    que_num = int(stdin.readline())
    if que_num == 0 :
        que = []
        _ = stdin.readline()
    else :
        que = deque(stdin.readline().rstrip().strip(']').strip('[').split(','))
    solution(order, que)
