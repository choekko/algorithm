from sys import stdin

# https://www.acmicpc.net/problem/22864

stdin = open("./input.txt", "r")

fatigue_per_hour, jobs_per_hour, charge_per_hour, max_fatigue = map(int, stdin.readline().rstrip().split(' '))

def solution(fatigue_per_hour, jobs_per_hour, charge_per_hour, max_fatigue):
  remain_time = 24
  current_fatigue = 0
  jobs_finished = 0

  def work():
    nonlocal remain_time
    nonlocal current_fatigue
    nonlocal jobs_finished

    current_fatigue += fatigue_per_hour
    remain_time -= 1
    jobs_finished += jobs_per_hour
    return


  def rest():
    nonlocal remain_time
    nonlocal current_fatigue
    nonlocal jobs_finished

    current_fatigue -= charge_per_hour
    if current_fatigue < 0:
      current_fatigue = 0
    remain_time -= 1
    return

  while remain_time:
    if current_fatigue + fatigue_per_hour > max_fatigue:
      rest()
      continue
    work()

  return jobs_finished


print(solution(fatigue_per_hour, jobs_per_hour, charge_per_hour, max_fatigue))


