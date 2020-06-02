// Enable GET Request CORS
const cors_anywhere = "https://cors-anywhere.herokuapp.com/"
const season1_url = "Season_1_(Anne_with_an_E)";
const season2_url = "Season_2_(Anne_with_an_E)";

// BASE URLS
const temp_base_url_pre = "https://anneofgreengables.fandom.com/api/v1/Articles/List?expand=1&category=";
const temp_base_url_post = "_transcripts&origin=*&limit=25";

const capi_base_url = "https://anneofgreengables.fandom.com/api/v1/Articles/AsSimpleJson?id=";

// Season 1
function temp_1() {
    peticion(cors_anywhere + temp_base_url_pre + season1_url + temp_base_url_post, 0);
}

// Season 2
function temp_2() {
    peticion(cors_anywhere + temp_base_url_pre + season2_url + temp_base_url_post, 0);
}

// Get Chapter Script
function capi() {
    textBox = document.getElementById('tBox');
    var capId = textBox.value;
    peticion(cors_anywhere + capi_base_url + capId, 1);
}

var datos;

// String with all the words Anne says
var wordsOfAnne = "";

/* Type:
0: season
1: chapter
*/
function peticion(url, type) {
    const Http = new XMLHttpRequest();
    Http.open("GET", url);
    Http.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        datos = data;
        var i = 1;
        if (Http.status >= 200 && Http.status < 400) {
            switch (type) {
                case 0:
                    handleTemp(data);
                    break;
                case 1:
                    handleCap(data);
                    break;
                default:
                    break;
            }
        } else {
            console.log('error')
        }
    }
    Http.send()
}

// Handle Season
function handleTemp(data) {
    var i = 1;
    data.items.forEach(capitulo => {
        console.log(i + ": " + capitulo.title);
        console.log("   " + capitulo.id);
        i++;
    })
}

// Handle Chapter
function handleCap(data) {
    var i = 1;
    var previousCharacter = "";
    var transcriptContents = data.sections[0].content;
    transcriptContents = transcriptContents.filter(item => !item.text.includes("SCENE:") && !item.text.includes("INTRO") && !item.text.includes("FLASHBACK:"));
    getNamesOfCharacters(transcriptContents);
    transcriptContents.forEach(line => {
        console.log(i + ": " + line.text);
        previousCharacter = assignFragment(line.text, previousCharacter);
        i++;

    })
    
    download("Anne.txt", wordsOfAnne);

}

// Download Script
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

// Get all character names on a given chapter
function getNamesOfCharacters(contents) {
    var names = [];

    contents.forEach(line => {
        var name = line.text.substring(0, line.text.indexOf(':'));
        if (name.length > 0) {
            if(names.indexOf(name) === -1){
                names.push(name);
            }
        }
    });
    console.log(names);
}

// Add words said by Anne to the string
function assignFragment(fragment, previousCharacter){
    var character = fragment.substring(0, fragment.indexOf(':'));
    fragment = fragment.replace(/[,.!?\\-]/g, "");
    if(character.len == 0){
        if (previousCharacter == "Anne" || previousCharacter == "Anne Shirley"){
            wordsOfAnne += " " + fragment;
        }
    }
    else {
        if (character == "Anne" || character == "Anne Shirley"){
            wordsOfAnne += " " + fragment.substring(fragment.indexOf(':') + 1);
        }
        else{
            previousCharacter = character;
        }
    }
    return previousCharacter;
}