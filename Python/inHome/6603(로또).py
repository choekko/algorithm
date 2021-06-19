from sys import stdin
from itertools import combinations
from itertools import chain

stdin = open("input.txt", "r")

while True :
    input = list(stdin.readline().rstrip().split(' '))
    if len(input) == 1 :
        exit(0)
    methods = list(combinations(input[1:], 6))
    for method in methods :
        print(' '.join(method))
    print('')