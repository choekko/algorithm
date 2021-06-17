from sys import stdin

stdin = open("input.txt", "r")

_ = stdin.readline()
word = list(stdin.readline().rstrip())
word.append("end")
numberList = [str(i) for i in range(0, 10)]

result = 0
tmp = 0
for letter in word :
    if letter in numberList :
        tmp = tmp * 10 + int(letter)
    else :
        result += tmp
        tmp = 0

print(result)

