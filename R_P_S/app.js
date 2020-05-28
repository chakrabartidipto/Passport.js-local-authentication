const game= ()=>{
    let pScore=0;
    let cScore=0;

const startgame=()=>{
    const playBtn= document.querySelector(".intro button");
    const introScreen= document.querySelector(".intro");
    const match= document.querySelector(".match");

    playBtn.addEventListener("click",()=>{

        introScreen.classList.add("fadeout");
        match.classList.add("fadein");

    });
}

const updateScore=()=>{
    const playerScore=document.querySelector(".player-score p");
    const computerScore=document.querySelector(".computer-score p");
    playerScore.textContent= pScore;
    computerScore.textContent= cScore;
}

const playmatch=()=>{
    const options=document.querySelectorAll(".options button");
    const playerHand=document.querySelector(".player-hand");
    const computerHand=document.querySelector(".computer-hand");
    const hands= document.querySelectorAll(".hands img");
    const computerOptions=["rock","paper","scissor"];
    
    hands.forEach(hand=>{
        hand.addEventListener("animationend",function(){
            this.style.animation="";
        });
    });

        options.forEach((option)=>{
        option.addEventListener("click",function(){
        const computerNumber= Math.floor(Math.random()*3);
        const computerChoice= computerOptions[computerNumber];
        console.log(computerChoice);
        console.log(this);
      
        setTimeout(() => {
            // call compare function here
        compareHands(this.textContent,computerChoice);
        //update images
        playerHand.src= `./assets/${this.textContent}.png`;
        computerHand.src= `./assets/${computerChoice}.png`;
        
       },2000);
        // Add animation
        playerHand.style.animation= "shakeplayer 2s ease";
        computerHand.style.animation= "shakecomputer 2s ease";
    });

});

}

const compareHands=(playerChoice,computerChoice)=>{
//updating text
const winner=document.querySelector(".winner");
// check for tie
    if (playerChoice===computerChoice){
        winner.textContent= 'It\'s a tie';
        return;
    }
    // check for rock
    if (playerChoice==='rock'){
        if(computerChoice==='paper'){
        winner.textContent= 'Computer Wins!';
        cScore++;
        updateScore();
        return;
        }
        else{
            winner.textContent= 'Player Wins!';
            pScore++;
        updateScore();
            return;
        }; }
    //check for paper
    
    if (playerChoice==='paper'){
        if(computerChoice==='scissor'){
        winner.textContent= 'Computer Wins!';
        cScore++;
        updateScore();
        return;
    }
        else{
            winner.textContent= 'Player Wins!';
            pScore++;
        updateScore();
            return;
        } }   
    //check for scissor
    
    if (playerChoice==='scissor'){
        if(computerChoice==='paper'){
        winner.textContent= 'Player Wins!';
        pScore++;
        updateScore();
        return;
    }
        else{
            winner.textContent= 'Computer Wins!';
            cScore++;
        updateScore();
            return;
        }
    }
        
}

startgame();
playmatch();
}
game();