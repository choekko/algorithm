from typing import NamedTuple
from collections import deque

new_id = "...."

def first(id) :
    return id.lower()

def second(id) :
    deleteMark = "~!@" + '#' + "$%^&*()=+[{]}:?,<>/"
    idDeq = deque(id)
    for i in range(len(id)) :
        curr = idDeq.pop()
        if curr not in deleteMark :
            idDeq.appendleft(curr)
    return ''.join(list(idDeq))

def third(id) :
    while id and ".." in id :
        id = id.replace("..", '.')
    return id

def fourth(id) :
    return id.strip('.')

def fifth_to_sixth(id) :
    if len(id) == 0 :
        return 'a'
    if len(id) >= 16 :
        id = id[:15].rstrip('.')
    return id

def seventh(id) :
    if id and len(id) <= 2 :
        while len(id) <= 2 :
            id += id[-1]
    return id
        

def solution(new_id):
    return seventh(fifth_to_sixth(fourth(third(second(first(new_id))))))

print(solution(new_id))