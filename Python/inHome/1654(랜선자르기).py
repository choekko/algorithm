from sys import stdin

stdin = open("input.txt", "r")

lanNum, demand = map(int, stdin.readline().rstrip().split(' '))

lans = []

for _ in range(lanNum) :
    lans.append(int(stdin.readline()))

minLen = max(lans) // demand if max(lans) > demand else 1
maxLen = max(lans)

left = minLen
right = maxLen
while True :
    center = (left + right) // 2
    cnt = 0
    for lan in lans :
        cnt += lan // center
        if cnt >= demand :
            break
    if cnt >= demand :
        left = center + 1
        answer = center
    else :
        right = center - 1
    if left > right :
        break
 
print(answer)