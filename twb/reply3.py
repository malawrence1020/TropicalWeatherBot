import requests
from bs4 import BeautifulSoup
import re


def reply5(msg):

    # Making a GET request
    r = requests.get('https://nextspaceflight.com/')

    # Parsing the HTML
    soup = BeautifulSoup(r.content, 'html.parser')

    type = soup.find(class_='mdl-card__title-text').text.strip()
    sum = soup.find(class_='header-style').text.strip()
    det0 = soup.find(class_='mdl-card__supporting-text').text.strip()
    det = re.sub(' +', ' ', det0).split('\n')
    # content = s.find('span').text
    response = (f'The next launch is the {type} launch of {sum}. '
                f'Liftoff is at {det[0]} from {det[2]}')
    print(response)
    return response
