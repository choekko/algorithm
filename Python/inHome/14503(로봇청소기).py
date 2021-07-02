from sys import stdin

stdin = open("input.txt", "r")

row, col = map(int, stdin.readline().rstrip().split(' '))
curr_y, curr_x, curr_dir = map(int, stdin.readline().rstrip().split(' '))

room = []
for _ in range(row) :
    room.append(list(map(int, stdin.readline().rstrip().split(' '))))

dx = [0, 1, 0, -1]
dy = [-1, 0, 1, 0]

def clean() :
    global curr_x
    global curr_y
    global room
    room[curr_y][curr_x] = 2
    return

def search() :
    global curr_x
    global curr_y
    global room
    global curr_dir
    if not room[curr_y + dy[curr_dir - 1]][curr_x + dx[curr_dir - 1]] :
        curr_dir -= 1
        curr_x += dx[curr_dir]
        curr_y += dy[curr_dir]
        return "clean"
    else : 
        curr_dir -= 1
        return "search"
       
def robot() :
    clean_cnt = 0
    global curr_x
    global curr_y
    global room
    global curr_dir
    while True : 
        clean()
        clean_cnt += 1
        search_cnt = 0
        while True :
            if curr_dir < 0 : 
                curr_dir += 4
            if search() == "clean" : 
                break
            else :
                search_cnt += 1
                if search_cnt == 4 and room[curr_y - dy[curr_dir]][curr_x - dx[curr_dir]] != 1 :
                    curr_y -= dy[curr_dir]
                    curr_x -= dx[curr_dir]
                    search_cnt = 0
                elif search_cnt == 4 :
                    return clean_cnt

print(robot())
