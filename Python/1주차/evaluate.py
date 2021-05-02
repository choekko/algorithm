N = input()

if len(N) < 2:
    N = "0" + N

M = str(N[1]) + str(int(N[0]) + int(N[1]))[-1]
answer = 1

while M != N:
    M = str(M[1]) + str(int(M[0]) + int(M[1]))[-1]
    answer += 1

print(answer)