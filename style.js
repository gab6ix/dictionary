const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound")
const btn = document.getElementById("search-btn")
const synonyms = ['1, 2, 3, 4, 5']




btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    btn.disable = true
    btn.innerText = "Loading..."
    result.innerHTML = ''
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            result.innerHTML = `
            <div class="word">
                <h3>${''}</h3>
                <button onclick="playSound()">
                    <i class="bi bi-volume-up-fill"></i>
                </button>
            </div>
            <div class="details">
                <p>/${data[0].phonetic || data[0].phonetics[1].text}/</p>
            </div>
        `
        

    
        result.innerHTML += data[0].meanings.map(mapToHTML);
            sound.setAttribute("src", `${data[0]?.phonetics[1]?.audio}`);
        })
        .catch( (err) =>{
            result.innerHTML = `<h3 class="error">Can't find word, please check your spellings.</h3>`;
            console.log(err);
        })
        .finally(() => btn.innerText = 'Search')
});


function playSound(){
    sound.play();
}


function mapToHTML(meaning)
{
    return `
    <p>${meaning.partOfSpeech}</p>
    <p class="word-meaning">
        ${meaning.definitions[0].definition}
    </p>
    <p class="word-example">
        ${meaning.definitions[0].example || ""}
    </p>
    <p class="word-synonyms">
        ${meaning.definitions[0].synonyms.join(', ')}
    </p>
    <p class="word-antonyms">
        ${meaning.definitions[0].antonyms.join(', ')}
    </p>`
}


// { <p>/${data[0].phonetic || data[0].phonetics[1].text}/</p> }//