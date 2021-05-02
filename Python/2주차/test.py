import sys


sys.stdin = open("input.txt", "r")

# 실행
N = int(sys.stdin.readline())
quad_tree = []
for _ in range(N):
    row = list(str(sys.stdin.readline().rstrip()))
    new_row = []
    for i in row:
       new_row.append(int(i))
    quad_tree.append(new_row)


# 함수 
def make_quad(size:int, start_row:int, start_col:int):
    count = 0
    if size ==1:
        if quad_tree[start_row][start_col]:
            print(1,end='')
        else: print(0,end='')
        return
    for row in quad_tree[start_row:start_row+size]:
        count += sum(row[start_col:start_col+size])
    if count == size**2:
        print('1',end='')
        return
    elif count == 0:
        print('0', end='')
        return
    else:
        print('(', end='')
        make_quad(size//2, start_row, start_col)
        make_quad(size//2, start_row, size//2+start_col)
        make_quad(size//2, start_row+size//2, start_col)
        make_quad(size//2, start_row+size//2, size//2+start_col)
        print(')',end='')
    

make_quad(N,0,0)