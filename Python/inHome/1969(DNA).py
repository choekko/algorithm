from collections import Counter
from sys import stdin

# https://www.acmicpc.net/status?user_id=cyhh94&problem_id=1969&from_mine=1

stdin = open("input.txt", "r")


def solution():
  dna_num, dna_length = map(int, stdin.readline().rstrip().split())
  col_values = ["" for _ in range(dna_length)]
  
  count = 0
  while dna_num > count:
    dna = stdin.readline().rstrip()
    for idx, char in enumerate(dna):
      col_values[idx] += char
    count += 1
  
  result_dna = ''
  hamming_distance_sum = 0
  for col_value in col_values:
    most_common_nucleotide, most_common_number = sorted(Counter(col_value).items(), key=lambda x: (-x[1], x[0]))[0]
    hamming_distance_sum += dna_num - most_common_number
    result_dna += most_common_nucleotide
  
  print(result_dna)
  print(hamming_distance_sum)

solution()




