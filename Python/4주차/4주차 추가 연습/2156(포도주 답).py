import sys
sys.stdin = open("input.txt", "r") 
input = sys.stdin.readline
n = int(input())
array = [0]+[int(input()) for _ in range(n)]+[0]
dp = [0 for _ in range(n+2)]
dp[1] = array[1]
dp[2] = array[1] + array[2]
for i in range(3, n+1):
    dp[i] = dp[i-1]
    dp[i] = max(dp[i-2]+array[i], dp[i])
    dp[i] = max(dp[i-3]+array[i-1]+array[i], dp[i])
print(dp[n])