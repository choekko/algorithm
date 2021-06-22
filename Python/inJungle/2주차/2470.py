import sys

sys.stdin = open("input.txt", "r")

flask_cnt = int(sys.stdin.readline())

pH = list(map(int, sys.stdin.readline().split()))

pH.sort()

def likeZero(pH : list) :
	pl = left = 0
	pr = right = flask_cnt - 1
	tmp_sum = pH[pl] + pH[pr]
	while True :
		if abs(pH[pl] + pH[pr]) < abs(tmp_sum) :
			tmp_sum = pH[pl] + pH[pr]
			left = pl
			right = pr
		if pH[pl] + pH[pr] == 0 : return [left, right]
		elif pH[pl] + pH[pr] < 0 :
			pl += 1
		else : 
			pr -= 1
		if pl == pr : return [left, right]
		
a, b = likeZero(pH)
print(pH[a], pH[b])