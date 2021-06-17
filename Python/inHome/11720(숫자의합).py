from sys import stdin

stdin = open("input.txt", "r")

num = stdin.readline().rstrip()
ary = list(map(int, stdin.readline().rstrip()))

print(num)
print(sum(ary))