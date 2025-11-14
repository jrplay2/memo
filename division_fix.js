// Modified setTimeout function for the Division game
setTimeout(() => {
    // Resetar as cartas antes de mostrar a próxima pergunta
    questionCard.classList.remove('flipped');
    answerCard.classList.remove('flipped');
    imageCard.classList.remove('flipped');
    imageCardFlipped = false;
    
    currentQuestionIndex++;
    showQuestion();
}, 1500);
