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
const generateTemplates = (familyName)=>{
  var template= Handlebars.compile(templatefile);
  var templatedata = {
    familyName:familyName,
  }
  var templateHtml = template(templatedata);
  htmlDisplay.innerHTML += templateHtml;
}


//showing the first two characters
var startCharacter = 0;
var endCharacter = 2;
var characters = getCharacters();
characters.then(data=>{
    var families = [];
    let i= 0;
    data.map(el=>{
        families[i++]={
            family : el.family,
        } 
    })
    //putting every characetsr in their family object
    families.map(familyObj=>{
      var characters=[];
      let i = 0;
      data.map(char=>{
        if(familyObj.family === char.family){
          characters[i++] = char;
        }
      })
      familyObj.characters= characters;
    })
  //  console.log(families);
   var familyName = families.slice(startCharacter,endCharacter);
   generateTemplates(familyName);
});

//creating array for family name
 

//loading two more images
const performCharacters= ()=>{
  startCharacter+=2;
  endCharacter+=2;
  //hide the button after there is no data
  if(endCharacter>52){
    loadButton.classList.add("hide");
  }
  var families = [];
  characters.then(data=>{
    //getting the family name
    let i= 0;
    data.map(el=>{
        families[i++]=el.family;
    })

    //filtering the family name
    var uniqueFamily= families.filter((item,index) => 
    families.indexOf(item) === index);
    
    //creating objects for filtered names
    var uniqueFamilyName =[]
    let j= 0;
    uniqueFamily.map(el=>{
        uniqueFamilyName[j++]={
            family:el,
        }
    })
     //putting every characetsr in their family object
     uniqueFamilyName.map(familyObj=>{
      var characters=[];
      let i = 0;
      data.map(char=>{
        if(familyObj.family === char.family){
          characters[i++] = char;
        }
      })
      familyObj.characters= characters;
    })
    //console.log(uniqueFamilyName);
    //console.log(uniqueFamilyName)
   var familyName = uniqueFamilyName.slice(startCharacter,endCharacter);
   generateTemplates(familyName);
 });
}

//load images when button clicking
loadButton.addEventListener("click", ()=>{
  performCharacters();
})

//helper function
// Handlebars.registerHelper('ifCond', function(v1, v2, options) {
//     if(v1 === v2) {
//       return options.fn(this);
//     }
//     return options.inverse(this);
//   });