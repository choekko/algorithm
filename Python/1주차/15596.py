def solve(a : list) -> int :
	i = 0
	rst = 0
	while i < len(a) :
		rst += a[i]
		i += 1
	return rst