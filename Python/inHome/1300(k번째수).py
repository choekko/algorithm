from sys import stdin

stdin = open("input.txt", "r")

size = int(stdin.readline())
index = int(stdin.readline())

left = 1
right = size ** 2

while True :
    center = (left + right) // 2
    limit = size if size < center else center
    cnt = 0
    for num in range(1, limit + 1) :
        tmp = center // num if center // num < size else size
        cnt += tmp
    if cnt >= index :
        right = center - 1
        answer = center
    else :
        left = center + 1
    if left > right :
        break

print(answer)