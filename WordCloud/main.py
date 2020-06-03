import os
import re
import multidict as multidict
from os import path
from PIL import Image
from wordcloud import WordCloud, ImageColorGenerator
import numpy as np
import matplotlib.pyplot as plt

# get data directory (using getcwd() is needed to support running example in generated IPython notebook)
d = path.dirname(__file__) if "__file__" in locals() else os.getcwd()

def getFrequencyDictForText(sentence):
    fullTermsDict = multidict.MultiDict()
    tmpDict = {}

    # making dict for counting frequencies
    for text in sentence.split(" "):
        if re.match("a|the|an|the|to|in|for|of|or|by|with|is|on|that|be", text):
            continue
        val = tmpDict.get(text, 0)
        tmpDict[text.lower()] = val + 1
    for key in tmpDict:
        fullTermsDict.add(key, tmpDict[key])
    return fullTermsDict

def makeImage(text):
    anne_mask = np.array(Image.open(path.join(d, "silueta_color2.png")))

    wc = WordCloud(background_color="white", mask=anne_mask);
    # generate word cloud
    wc.generate_from_frequencies(text)

    image_colors = ImageColorGenerator(anne_mask)
    image_colors.default_color = [0.6,0.6,0.6]

    wc.recolor(None,image_colors)
    wc.to_file("output.png")

# Read the whole text.
text = open(path.join(d, 'Anne (2).txt')).read()

# Generate a word cloud image
makeImage(getFrequencyDictForText(text))
