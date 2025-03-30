document.addEventListener('DOMContentLoaded', () => {
    // Initialize variables
    let counter = 0;
    let timer;
    const counterDisplay = document.getElementById('counter');
    const plusBtn = document.getElementById('plus');
    const minusBtn = document.getElementById('minus');
    const likeBtn = document.getElementById('heart');
    const pauseBtn = document.getElementById('pause');
    const likesList = document.querySelector('.likes');
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment-input');
    const commentsList = document.getElementById('list');
    
    // Array of buttons to disable during pause
    const buttons = [plusBtn, minusBtn, likeBtn, document.getElementById('submit')];
  
    // Store likes for each number
    const likes = {};
  
    // Start the timer
    function startTimer() {
      timer = setInterval(() => {
        counter++;
        counterDisplay.textContent = counter;
      }, 1000);
    }
  
    // Initialize timer on page load
    startTimer();
  
    // Plus button functionality
    plusBtn.addEventListener('click', () => {
      counter++;
      counterDisplay.textContent = counter;
    });
  
    // Minus button functionality
    minusBtn.addEventListener('click', () => {
      counter--;
      counterDisplay.textContent = counter;
    });
  
    // Like button functionality
    likeBtn.addEventListener('click', () => {
      const currentNumber = counter;
      
      // Initialize like count if it doesn't exist
      if (!likes[currentNumber]) {
        likes[currentNumber] = 0;
      }
      
      // Increment like count
      likes[currentNumber]++;
      
      // Find or create the like display element
      let likeItem = document.querySelector(`[data-number="${currentNumber}"]`);
      
      if (likeItem) {
        likeItem.textContent = `${currentNumber} has been liked ${likes[currentNumber]} times`;
      } else {
        likeItem = document.createElement('li');
        likeItem.dataset.number = currentNumber;
        likeItem.textContent = `${currentNumber} has been liked ${likes[currentNumber]} time`;
        likesList.appendChild(likeItem);
      }
    });
  
    // Pause/Resume button functionality
    pauseBtn.addEventListener('click', () => {
      if (pauseBtn.textContent === 'pause') {
        // Pause the counter
        clearInterval(timer);
        pauseBtn.textContent = 'resume';
        
        // Disable all buttons except pause
        buttons.forEach(button => {
          button.disabled = true;
        });
      } else {
        // Resume the counter
        startTimer();
        pauseBtn.textContent = 'pause';
        
        // Enable all buttons
        buttons.forEach(button => {
          button.disabled = false;
        });
      }
    });
  
    // Comment form functionality
    commentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const commentText = commentInput.value.trim();
      
      if (commentText) {
        const commentElement = document.createElement('p');
        commentElement.textContent = commentText;
        commentsList.appendChild(commentElement);
        commentInput.value = '';
      }
    });
  });