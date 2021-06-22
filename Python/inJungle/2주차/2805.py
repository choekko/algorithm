import sys

sys.stdin = open("input.txt", "r")

n_tree, n_want = map(float, sys.stdin.readline().split())

height_ary = list(map(int, sys.stdin.readline().split()))
height_ary.sort(reverse=True)

def trimtree(n_want : int, height_ary : list, max_height : int) : 
	
	pl = 0
	pr = max_height
	

	while True :
		pc = (pl + pr) // 2
		trees = 0
		for num in height_ary :
			if num > pc :
				trees += num - pc  
			else : break
		if trees >= n_want:
			tree_height = pc
			pl = pc + 1
		else : 
			pr = pc - 1
		if pl > pr : break
	return tree_height

print(trimtree(n_want, height_ary, max(height_ary)))