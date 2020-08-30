[//]: # (Image References)

[output]: images/example.png "Sample Output"
[seasons]: images/SeasonsAndChapters.png "Season and Chapter Selector"
[chapter-codes]: images/ChapterCodes.png "Chapter Codes"

# Anne with an E WordCloud

In this repo I've made a little experiment to create a WordCloud based on Netflix and CBC's Anne with an E.

## Sample Output
![Sample Output][output]

## Usage

### Fetching the transcript

To fetch the transcripts you have to open the `index.html` file at the `GetScript` folder. There, you have 2 buttons for the 1<sup>st</sup> and 2<sup>nd</sup> seasons of the series:

![Season and Chapter Selector][seasons]

Now, open the DevTools. In Chrome:
* **Windows:** `Ctrl + Shift + I`
* **MacOS:** `⌘ + ⎇  + I`

When you click on the Seasons buttons, the following will appear at the DevTools console:

![Chapter Codes][chapter-codes]

Copy the code of the chapter you want and paste it in the textbox near the *Chapter* button. Then, click the *Chapter* button and the transcript will download.

### Creating the WordCloud

Open and edit the python file `main.py` in the `WordCloud` folder. The parameters you want to change are the silhouette image (`<SILHOUETTE>`) and the text input (`<FILENAME>`). Example files `color_silhouette` and `example_script` are provided.

Now, with a terminal open at the `WordCloud` directory, run the python file with `python main.py`.

## Special Thanks

### WordCloud

Thanks to [Andreas Mueller](https://github.com/amueller) for creating the WordCloud ([GitHub](https://github.com/amueller/word_cloud)) library.

## Licensing

This repo is MIT licensed.