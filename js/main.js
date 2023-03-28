
var templatefile= document.querySelector("#template").innerHTML;
const loadButton = document.querySelector(".load");
const htmlDisplay = document.querySelector("#content");



//fetching the data
const getCharacters =async()=>{
 let charactersData = await fetch("https://thronesapi.com/api/v2/Characters")
  let characters = await charactersData.json();
  return characters;
}

//generate templates with given data
const generateTemplates = (data)=>{
  var template= Handlebars.compile(templatefile);
  var templatedata = {
    characters : data,
  }
  var templateHtml = template(templatedata);
  htmlDisplay.innerHTML += templateHtml;
}

//showing the first two characters
var startCharacter = 0;
var endCharacter = 2;
var characters = getCharacters();
characters.then(data=>{
  var showcharacter = data.slice(startCharacter,endCharacter);
  generateTemplates(showcharacter);
});


//loading two more images
const performCharacters= ()=>{
  startCharacter+=2;
  endCharacter+=2;
  //hide the button after there is no data
  if(endCharacter>52){
    loadButton.classList.add("hide");
  }
  characters.then(data=>{
   var showcharacter = data.slice(startCharacter,endCharacter);
   generateTemplates(showcharacter);
 });
}

//load images when button clicking
loadButton.addEventListener("click", ()=>{
  performCharacters();
})






