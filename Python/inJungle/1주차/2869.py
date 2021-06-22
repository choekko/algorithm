import sys
import math

a, b, c = map(int, sys.stdin.readline().split(' '))



rst = (c - a) / (a-b)
rst = math.ceil(rst)
rst += 1


print(rst)