a, b, c, d = map(int, input().split())

tmp1 = c - a
tmp2 = d - b

result = min(a, b, tmp1, tmp2)

print(result)
