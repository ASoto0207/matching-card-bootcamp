function matchingCardGame(){
    const cards = document.querySelectorAll('.cards');
  
  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  let btn = document.querySelector('#rest')
  
  function addClickListeners(){
    cards.forEach(card => {
      card.addEventListener('click', () => flipCard(card)); 
    });
  }
  
  // to start the game and being to flip the cards.  
  function startGame(){
    shuffleCards()
    cards.forEach(card => card.addEventListener('click', flipCard))
  }
  
   // for the ablitly to flip the card.
    function flipCard() {
      if (lockBoard) return;
      if (this === firstCard) return;
  
      this.classList.add('flip');
  
      if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
  
        return;
      }
  
      secondCard = this;
      checkForMatch();
    }
  
    function checkForMatch() {
      let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  
      isMatch ? disableCards() : unflipCards();
    }
  
    function disableCards() {
      firstCard.removeEventListener('click' , firstCard);
      secondCard.removeEventListener('click',secondCard);
  
     resetBoard()
    }           
  
    function unflipCards() {
      lockBoard = true;
  
      setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
  
        resetBoard();
      }, 1500);
    }
  
    function resetBoard() {
      [hasFlippedCard, lockBoard] = [false, false];
      [firstCard, secondCard] = [null, null];
      btn.addEventListener('click', startGame);
      startGame();
    }
  
    function shuffleCards() {
      cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
      });
    
    }
    shuffleCards();
  addClickListeners();
  }
  