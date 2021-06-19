from sys import stdin

stdin = open("input.txt", "r")

target = int(stdin.readline())

# for curr in range(1, target) :
#     digit = len(str(curr))
#     result = curr
#     for i in range(0, digit) :
#         result += (curr // (10 ** i)) % 10
#         if result > target :
#             break
#     if result == target :
#         print(curr)
#         exit(0)

for curr in range(1, target) :
    currStr = str(curr)
    result = curr
    for i in range(len(currStr)) :
        result += int(currStr[i])
        if result > target :
            break
    if result == target :
        print(curr)
        exit(0)

print(0)
