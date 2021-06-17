from sys import stdin

stdin = open("input.txt", "r")

_ = stdin.readline()
setA = set(map(int, stdin.readline().rstrip().split(' ')))
setB = set(map(int, stdin.readline().rstrip().split(' ')))

print(len(setA^setB))

# def setSubstract(setA: list, setB: list) :
#     result = []
#     for i in setA :
#         flag = 0
#         for j in setB :
#             if j == i :
#                 flag = 1
#             if j >= i :
#                 break
#         if flag == 0 :
#             result.append(i)
#     return result

# print(len(setSubstract(setA, setB)) + len(setSubstract(setB, setA)))
