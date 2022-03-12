import datetime
import random


feelings1 = [
    "good. I hope you are too!",
    "good. I hope you are too!",
    "good. I hope you are too!",
    "okay. What about you?",
    "okay. What about you?",
    "alright. What about you?",
    "alright. What about you?",
    "fantastic! I hope you are too!",
    "great! I hope you are too!",
    "great! I hope you are too!",
    "great! I hope you are too!",
    "a bit under the weather :(",
    "a bit under the weather :(",
    "a bit under the weather :(",
    "a bit under the weather :(",
    "ill. I hope you are feeling better than me :(",
    "like shit",
    "like shit",
]


def reply1(msg):
    d = datetime.datetime.now()
    h = int(d.strftime("%H"))

    if h < 6:
        z1 = 'Goodnight'
        z2 = ', you should be in bed now.'
    elif h < 12:
        z1 = 'Good Morning'
        z2 = ', I hope you have a nice day!'
    elif h < 18:
        z1 = 'Good Afternoon'
        z2 = ', I hope your day is going okay.'
    else:
        z1 = 'Good Evening'
        z2 = ', I hope you had a nice day.'

    response = (f'{z1} {msg.author.name}{z2} I am feeling '
                f'{feelings1[random.randrange(len(feelings1)-1)]}')
    print(response)
    return response
