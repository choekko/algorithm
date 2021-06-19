from sys import stdin
from itertools import combinations

stdin = open("input.txt", "r")

num, target = map(int, stdin.readline().rstrip().split(' '))

cards = list(map(int, stdin.readline().rstrip().split(' ')))

methods = list(combinations(cards, 3))

tmp = target
result = 0
for method in methods :
    sumValue = sum(method) 
    if 0 <= target - sumValue < tmp :
        tmp = target - sumValue
        result = sumValue

print(result)