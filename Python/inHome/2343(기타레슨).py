from sys import stdin

stdin = open("input.txt", "r")

lessonNum, bluerayNum = map(int, stdin.readline().rstrip().split(' '))
lessons = list(map(int, stdin.readline().rstrip().split(' ')))

minLen = max(lessons)
maxLen = minLen * lessonNum // bluerayNum

candidates = [i for i in range(minLen, maxLen + 1)] 
left = 0
right = len(candidates) - 1

while True :
    center = (left + right) // 2
    candidate = candidates[center]
    tmp = 0
    demand = 0
    for i in range(lessonNum) :
        if tmp + lessons[i] > candidate :
            demand += 1
            if demand > bluerayNum : 
                break
            tmp = 0
        tmp += lessons[i]
    if demand > bluerayNum - 1 :
        left = center + 1
    else :
        answer = candidate
        right = center - 1
    if left > right :
        break

print(answer)


