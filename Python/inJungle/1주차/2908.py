import sys

tmp = list(sys.stdin.readline().split())

def sort(a : str) :
	tmp = []
	tmp.append(int(a[2]))
	tmp.append(int(a[1]))
	tmp.append(int(a[0]))
	rst = tmp[0] * 100 + tmp[1] * 10 + tmp[2]	
	return rst;

if sort(tmp[0]) >= sort(tmp[1]) :
	print (sort(tmp[0]))
else :
	print (sort(tmp[1]))