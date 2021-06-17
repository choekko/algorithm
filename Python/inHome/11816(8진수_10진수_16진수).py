from sys import stdin

stdin = open("input.txt", "r")

num = stdin.readline()

if num[0] == '0' and num[1] == 'x' :
    notation = 16
elif num[0] == '0' :
    notation = 8
else :
    notation = 10

print(int(num, notation))