let clickcount =0
let height=120
let width=100
let inflationrate=20
let maxsize=300
let highestPopcount=0
let currentPopcount=0
let startButton= document.getElementById("start-button")
let inflateButton=document.getElementById("inflate-button")
let clockId=0
let timeremaining=0
let gamelength=10000
let currentPlayer={ }
var players = []
 
loadPlayers()

function setPlayer(event)
{
   event.preventDefault()
   let form=event.target
let PlayerName=form.PlayerName.value
 currentPlayer=players.find(player => player.name == PlayerName)
  if(!currentPlayer)
  {
     currentPlayer={
        name:PlayerName,
        topscore:0
      }
      //console.log(players)
      players.push(currentPlayer)
      //console.log(players);
      savePlayer()
  }
  console.log(currentPlayer)
form.reset()
document.getElementById("game").classList.remove("hidden")
form.classList.add("hidden")

draw()
   drawscoreboard()
}
function changeplayer()
{
   document.getElementById("player-form").classList.remove("hidden")
   document.getElementById("game").classList.add("hidden")

}
function savePlayer()
{
   window.localStorage.setItem("Players",JSON.stringify(players))
}
var playersData;
function loadPlayers()
{
   // console.log('in')
   playersData=JSON.parse(window.localStorage.getItem("Players"))
   if(playersData)
   {
      players=playersData
   }
}
function start()
{ 
   document.getElementById("game-control").classList.remove("hidden")
   document.getElementById("main-control").classList.add("hidden")
   document.getElementById("scoreboard").classList.add("hidden")
   startclock()
   setTimeout(stopGame,gamelength)
}
function startclock()
{
 timeremaining=gamelength
 drawclock()
 clockId=setInterval(drawclock,1000);
}
function stopclock()
{
 clearInterval(clockId)  
}
function drawclock()
{
 let countdownElem=document.getElementById("countdown")
 countdownElem.innerText=(timeremaining/1000).toString()
  timeremaining-=1000
  
}
function inflate()
{ 
   clickcount++
   
   height+=inflationrate
   width+=inflationrate
   
   if(height>=maxsize)
   {
      //debugger
     // console.log("pop the balloon ")
    var balloonElement=document.getElementById("balloon")
     balloonElement.classList.add("green")
      document.getElementById("pop-sound").play()    
       height=0
      width=0
      currentPopcount++
         }
     draw()
   
   }
function draw()
{
   let balloonElement=document.getElementById("balloon")
   let clickcountElem=document.getElementById("click-count")
   let popcountElem=document.getElementById("pop-count")
   let highpopcountElem=document.getElementById("high-pop-count")
   let playernameElem=document.getElementById("player-name")
   
  
   balloonElement.style.height =height+ "px";
   balloonElement.style.width = width +"px";
   popcountElem.innerText=currentPopcount.toString()
   highpopcountElem.innerText=(currentPlayer.topscore?currentPlayer.topscore.toString():"");
   clickcountElem.innerText = clickcount.toString()
   playernameElem.innerText=currentPlayer.name

   

}
function stopGame()
{
   console.log("GAME OVER!!!!!")
   document.getElementById("main-control").classList.remove("hidden")
   document.getElementById("scoreboard").classList.remove("hidden")
   document.getElementById("game-control").classList.add("hidden")

      clickcount=0
      height=120
      width=100
      if(currentPopcount>currentPlayer.topscore)
      {
         currentPlayer.topscore=currentPopcount
      }
      currentPopcount=0
      
      stopclock()
      draw()
      drawscoreboard()
}
function drawscoreboard()
{
   let template = " "
   players.sort((p1,p2) => p2.topscore - p1.topscore)
   players.forEach(player => {
      template += `<div class="d-flex space-between">
      <span>
         <i class="fa fa-user"> </i>
         ${player.name}
      </span>
      <span>score: ${player.topscore}</span>
   </div>`
   })

   document.getElementById("players").innerHTML = template
}
drawscoreboard()