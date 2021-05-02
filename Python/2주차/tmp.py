from itertools import permutations

lst = [0, 1]
lst2 = [2, 3, 5, 6, 10]


tmp = list(permutations(lst2, 2))

print(tmp)
