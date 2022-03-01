
//shared variables
const quoteContainer= document.querySelector("#quote-container")
let newQuote= document.createElement("div");
newQuote.id="quote"
let newH2=document.createElement("h2");
let newSpan =document.createElement("span")
quoteContainer.append(newQuote)
newQuote.append(newH2,newSpan)

//functions

function getQuotes(){
 fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    showQuotes(data)
  }).catch((error)=>{
    console.error(error)
    backUpQuote()
  });
  
}
getQuotes()

function showQuotes(data){
  //randomizes a numberand uses in the index to get a random quote
  const dataDetails= Math.floor(Math.random()*data.length)
  const dataIndex= data[dataDetails];
  newH2.textContent=`"${dataIndex.text}"`;
  newSpan.textContent=`-${dataIndex.author}`; 
  if(newSpan.textContent==="-null"){
    newSpan.textContent="- Unknown"
  } 

}
function backUpQuote(){
  newH2.textContent=`"If you gave me 6 hours to chop down a tree i'd spent the first 4 sharpening the axe. "`;
  newSpan.textContent=`-Abraham Lincoln`;

}