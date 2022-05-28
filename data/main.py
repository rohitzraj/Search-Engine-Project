import nltk
from nltk.tokenize import word_tokenize

import string
import math

with open("keywords.txt", "r") as f:
    text = f.read()
    # f.close()
    list1 = word_tokenize(text)

list2 = []

for it in list1:
    cnt = 0
    for it2 in range(1, 2586):
        with open("file" + str(it2) + ".txt", "r") as f:
            temp = f.read()

            # f.close()
            # temp2 = word_tokenize(temp)
            if it in temp:
                cnt += 1
    if cnt == 0:
        list2.append(str(1))
    else:
        rg = math.log((2585/cnt), 10)
        rg += 1
        list2.append(str(rg))

with open("idf_keywords.txt", "w+") as f:
    f.write('\n'.join(list2))