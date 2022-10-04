
from sys import stdin

# https://www.acmicpc.net/problem/1343

# stdin = open("input.txt", "r")

board = stdin.readline().rstrip()

def solution(board):
  reversed_board = list(reversed(board))
  result = ''

  count = 0
  while reversed_board:
    value = reversed_board.pop()
    if value == 'X':
      count += 1
      continue
    elif count % 2:
      return -1
    elif count:
      result += 'AAAA' * (count // 4) + 'BB' * (count % 4 // 2)
    result += '.'
    count = 0

  if count % 2:
    return -1
  elif count:
    result += 'AAAA' * (count // 4) + 'BB' * (count % 4 // 2)
  
  return result
    
print(solution(board))
