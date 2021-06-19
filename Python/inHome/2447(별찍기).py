from sys import stdin
import sys

size = int(stdin.readline())

threeMulti = []

tmp = size 
while True :
    tmp //= 3
    threeMulti.append(tmp)
    if tmp == 1 :
        break;

def draw(i, j) :
    for e in threeMulti :
        if i // e % 3 == 1 and j // e % 3 == 1 :
            sys.stdout.write(" ")
            return;
    sys.stdout.write("*") 
            


for i in range(size) :
    for j in range(size) : 
        draw(i, j)
    sys.stdout.write('\n')

# from sys import stdin
# import sys

# size = int(stdin.readline())

# def star(i, j):
#     if i % 3 == j % 3 == 1 : 
#         sys.stdout.write(" ")
#     elif i >= 3 or j >= 3 :
#         star(i // 3, j // 3)
#     else:
#         sys.stdout.write('*')

# for i in range(size):
#     for j in range(size):
#         star(i, j)
#     sys.stdout.write('\n')
