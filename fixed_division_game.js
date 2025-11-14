// Inicializar jogo da Divisão
function initializeDivisionGame() {
    const numberButtons = document.getElementById('division-number-buttons');
    const randomOption = document.getElementById('random-div-option');
    const startButton = document.getElementById('start-div');
    const divisionPlay = document.getElementById('division-play');
    const divisionOptions = document.querySelector('.division-options');
    const scoreDisplay = document.getElementById('div-score-display');
    const questionCard = document.getElementById('div-question-card');
    const answerCard = document.getElementById('div-answer-card');
    const imageCard = document.getElementById('div-image-card');
    const questionCount = document.getElementById('div-question-count');
    const answerCount = document.getElementById('div-answer-count');
    const imageCount = document.getElementById('div-image-count');
    const userAnswer = document.getElementById('div-user-answer');
    const checkAnswer = document.getElementById('div-check-answer');
    const winMessage = document.getElementById('div-win');
    
    // Limpar botões de números
    numberButtons.innerHTML = '';
    
    // Adicionar botões de 1 a 9 (começando de 1 para evitar divisão por zero)
    for (let i = 1; i <= 9; i++) {
        const button = document.createElement('div');
        button.className = 'number-button';
        button.textContent = i;
        button.style.backgroundColor = getRandomColor();
        
        button.addEventListener('click', function() {
            // Selecionar tabuada
            selectedTable = i;
            
            // Destacar botão selecionado
            const allButtons = numberButtons.querySelectorAll('.number-button');
            allButtons.forEach(btn => btn.style.border = 'none');
            button.style.border = '3px solid #333';
            
            // Mostrar botão iniciar
            startButton.classList.remove('hidden');
        });
        
        numberButtons.appendChild(button);
    }
    
    let selectedTable = null;
    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let totalQuestions = 0;
    let imageCardFlipped = false; // Flag para controlar se a carta de imagem está virada
    
    // Iniciar jogo
    startButton.addEventListener('click', function() {
        if (selectedTable !== null) {
            // Esconder opções e mostrar jogo
            divisionOptions.classList.add('hidden');
            divisionPlay.classList.remove('hidden');
            
            // Gerar perguntas
            generateQuestions();
            
            // Iniciar jogo
            currentQuestionIndex = 0;
            score = 0;
            totalQuestions = 0;
            imageCardFlipped = false;
            
            // Esconder mensagem de vitória
            winMessage.classList.add('hidden');
            
            // Mostrar primeira pergunta
            showQuestion();
        }
    });
    
    // Gerar perguntas da tabuada de divisão
    function generateQuestions() {
        questions = [];
        
        // Para a divisão, vamos gerar perguntas onde o dividendo é um múltiplo do divisor
        for (let i = 0; i <= 10; i++) {
            const result = i; // O resultado da divisão (quociente)
            const dividend = selectedTable * i; // O dividendo (número a ser dividido)
            
            questions.push({
                table: selectedTable, // O divisor
                dividend: dividend,   // O dividendo
                result: result        // O resultado (quociente)
            });
        }
        
        // Embaralhar se opção aleatória estiver marcada
        if (randomOption.checked) {
            shuffleArray(questions);
        }
        
        totalQuestions = questions.length;
        updateScore();
    }
    
    // Mostrar pergunta atual
    function showQuestion() {
        // Resetar cartas de pergunta e resposta
        questionCard.classList.remove('flipped');
        answerCard.classList.remove('flipped');
        imageCard.classList.remove('flipped');
        
        if (currentQuestionIndex < questions.length) {
            const question = questions[currentQuestionIndex];
            
            // Mostrar pergunta na frente da carta (não no verso)
            const questionFront = questionCard.querySelector('.card-front');
            questionFront.innerHTML = `<div style="font-size: 36px; font-weight: bold;">${question.dividend} ÷ ${question.table}</div>`;
            
            // Atualizar contadores
            questionCount.textContent = `Cartas: ${questions.length - currentQuestionIndex}`;
            answerCount.textContent = `Cartas: ${currentQuestionIndex}`;
            imageCount.textContent = `Cartas: ${currentQuestionIndex}`;
            
            // Focar no campo de resposta
            userAnswer.value = '';
            userAnswer.focus();
        } else {
            // Jogo completo
            winMessage.classList.remove('hidden');
        }
    }
    
    // Verificar resposta
    function checkUserAnswer() {
        if (currentQuestionIndex < questions.length) {
            const question = questions[currentQuestionIndex];
            const answer = parseInt(userAnswer.value);
            
            if (!isNaN(answer)) {
                // Virar carta de pergunta
                questionCard.classList.add('flipped');
                
                // Mostrar resposta correta
                const answerBack = answerCard.querySelector('.card-back div');
                answerBack.textContent = question.result;
                answerCard.classList.add('flipped');
                
                // Mostrar imagem correspondente ao resultado
                const imageResult = cardsData.find(card => {
                    // Converter para string para comparar corretamente "00", "01", etc.
                    return String(card.id) === String(question.result);
                });
                
                if (imageResult) {
                    const imageBack = imageCard.querySelector('.card-back');
                    imageBack.querySelector('img').src = imageResult.image;
                    imageBack.querySelector('.card-code').textContent = imageResult.code;
                    imageBack.querySelector('.card-name').textContent = imageResult.name;
                    imageCard.classList.add('flipped');
                    imageCardFlipped = true;
                }
                
                // Verificar se resposta está correta
                if (answer === question.result) {
                    score++;
                }
                
                // Atualizar pontuação
                updateScore();
                
                // Avançar para próxima pergunta após um tempo
                setTimeout(() => {
                    // Resetar as cartas antes de mostrar a próxima pergunta
                    questionCard.classList.remove('flipped');
                    answerCard.classList.remove('flipped');
                    imageCard.classList.remove('flipped');
                    imageCardFlipped = false;
                    
                    currentQuestionIndex++;
                    showQuestion();
                }, 1500);
            }
        }
    }
    
    // Atualizar pontuação
    function updateScore() {
        const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
        scoreDisplay.textContent = `Pontuação: ${score}/${totalQuestions} (${percentage}%)`;
    }
    
    // Evento de clique no botão verificar
    checkAnswer.addEventListener('click', checkUserAnswer);
    
    // Evento de tecla Enter no campo de resposta
    userAnswer.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkUserAnswer();
        }
    });
    
    // Botão voltar
    document.getElementById('back-div').addEventListener('click', function() {
        hideAllGames();
        document.querySelector('.game-selection').classList.remove('hidden');
    });
}
