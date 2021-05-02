def SA(str : str) :
	a = []
	for i1 in range(len(str)) :
		a.append(str[i1:])
	print(a)
	i2 = 0
	i3 = 0
	while i2 < len(a) - 1 :
		last = min(len(a[i2]), len(a[i2+1]))
		while i3 < last :
			if a[i2][i3] == a[i2+1][i3] :
				i3 += 1
			elif a[i2][i3] > a[i2+1][i3] :
				tmp = a[i2]
				a[i2] = a[i2+1]
				a[i2+1] = tmp
				break
			else :
				break
		if i3 == len(a[i2 + 1]) :
				tmp = a[i2]
				a[i2] = a[i2+1]
				a[i2+1] = tmp
		i2 += 1
		i3 = 0
	return a

a = ['bra', 'ra', 'abra']

print(SA('abracadabra'))

		