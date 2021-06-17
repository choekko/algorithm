from sys import stdin

stdin = open("input.txt", "r")

_ = stdin.readline()
listA = set(map(int, stdin.readline().rstrip().split(' ')))
listB = set(map(int, stdin.readline().rstrip().split(' ')))

print(listA | listB)