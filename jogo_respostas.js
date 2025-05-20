// Mapeamento das palavras para os números fornecidos
const respostasPalavras = {
    1: "barco", 2: "berço", 3: "bicicleta", 4: "bola", 5: "Bússola", 6: "Casa", 7: "cebola", 8: "cigarra", 9: "copo", 10: "Cubo Metálico", 11: "dado", 12: "desodorante", 13: "dinamite", 14: "domino", 15: "duende", 16: "faca", 17: "ferro", 18: "fita adesiva", 19: "fogo", 20: "funil", 21: "gato", 22: "gelo", 23: "girafa", 24: "gorila", 25: "guitarra", 26: "harpa", 27: "helice", 28: "hipopotamo", 29: "homem de ferro", 30: "hullk", 31: "jato", 32: "jesus", 33: "jiboia", 34: "joia", 35: "jumento", 36: "lampada", 37: "leite", 38: "livros", 39: "luva de boxe", 40: "mamute", 41: "mesa", 42: "milho", 43: "moeda", 44: "munia", 45: "navio", 46: "neve", 47: "ninja", 48: "notebook", 49: "nuvem", 50: "pato", 51: "peixe", 52: "piano", 53: "porco", 54: "pudim", 55: "rato", 56: "relogio", 57: "rinoceronte", 58: "roda", 59: "colar", 60: "sapo", 61: "serra eletrica", 62: "sino", 63: "sorvete", 64: "submarino", 65: "tartaruga", 66: "telha", 67: "tigre", 68: "tomate", 69: "tubarão", 70: "vaca", 71: "vela", 72: "violão", 73: "volante", 74: "vulcão", 75: "xadrex", 76: "xerox", 77: "chinelo", 78: "ovo", 79: "chuchu", 80: "carta zap", 81: "zebra", 82: "imã", 83: "zorro", 84: "zumbi", 85: "chapeu", 86: "xerife", 87: "chicote", 88: "choop", 89: "tucano", 90: "quadro", 91: "queijo", 92: "colchão", 93: "cruz", 94: "prato", 95: "prego", 96: "projetor", 97: "drone", 98: "escada", 99: "furadeira", 100: "teclado", "00": "unicornio", 0: "anel", "01": "aspirador de po", "02": "espada", "03": "isqueiro", "04": "oscar", "05": "urso", "06": "ampulheta", "07": "enxada", "08": "injeção", "09": "onda"
};

function getRandomPalavras(numero) {
    const correta = respostasPalavras[numero];
    const todas = Object.values(respostasPalavras).filter(w => w !== correta);
    const alternativas = [];
    while (alternativas.length < 3) {
        const idx = Math.floor(Math.random() * todas.length);
        const palavra = todas[idx];
        if (!alternativas.includes(palavra)) alternativas.push(palavra);
    }
    alternativas.push(correta);
    return alternativas.sort(() => Math.random() - 0.5);
}

function mostrarCartasRespostasMemorizar(deck, updateCardDisplay, avancarProximaCarta) {
    if (!deck || deck.length === 0) return;
    const numero = deck[0].id;
    const correta = respostasPalavras[numero] || deck[0].name.toLowerCase();
    const palavras = getRandomPalavras(numero);
    const cartasDiv = document.getElementById('respostas-cartas');
    cartasDiv.innerHTML = '';
    palavras.forEach(palavra => {
        const carta = document.createElement('div');
        carta.className = 'resposta-carta';
        carta.textContent = palavra;
        carta.onclick = () => {
            if (palavra === correta) {
                carta.classList.add('correta');
                // Virar a carta do monte principal mostrando a imagem
                const deckCard = document.getElementById('deck-card');
                if (deckCard) {
                    deckCard.classList.add('flipped');
                }
                // Após 1s, avança para próxima carta e atualiza as palavras
                setTimeout(() => {
                    if (typeof avancarProximaCarta === 'function') avancarProximaCarta();
                    if (typeof updateCardDisplay === 'function') updateCardDisplay();
                    mostrarCartasRespostasMemorizar(deck, updateCardDisplay, avancarProximaCarta);
                }, 1200);
            } else {
                carta.classList.add('errada');
            }
        };
        cartasDiv.appendChild(carta);
    });
    // Atualiza o número exibido
    document.getElementById('respostas-numero').textContent = numero;
}

// Nota: A integração do modo Respostas é feita pelo fix_buttons.js
// Este código foi removido para evitar conflitos de event listeners

// Função simplificada para mostrar as 4 opções de palavras
function mostrarPalavrasRespostas(numero) {
    const cartasDiv = document.getElementById('respostas-cartas');
    cartasDiv.innerHTML = '';
    
    // Obter 4 palavras (1 correta + 3 aleatórias)
    const palavras = getRandomPalavras(numero);
    
    palavras.forEach(palavra => {
        const carta = document.createElement('div');
        carta.className = 'resposta-carta';
        carta.textContent = palavra;
        
        carta.onclick = function() {
            // Verificar se é a resposta correta
            if (palavra === respostasPalavras[numero]) {
                // Marcar como correta
                carta.classList.add('correta');
                
                // Virar a carta do deck para mostrar a imagem
                const deckCard = document.getElementById('deck-card');
                if (deckCard) {
                    deckCard.classList.add('flipped');
                }
                
                // Após 1 segundo, avançar para próxima carta
                setTimeout(function() {
                    if (window.deck && window.deck.length > 0) {
                        // Avançar o deck
                        const cartaAtual = window.deck.shift();
                        if (window.flipped) window.flipped.push(cartaAtual);
                        
                        // Atualizar a exibição
                        if (typeof window.updateCardDisplay === 'function') {
                            window.updateCardDisplay();
                        }
                        
                        // Se ainda houver cartas, continuar o jogo
                        if (window.deck.length > 0) {
                            const novoNumero = window.deck[0].id;
                            document.getElementById('respostas-numero').textContent = novoNumero;
                            mostrarPalavrasRespostas(novoNumero);
                        } else {
                            // Se acabou, mostrar mensagem de parabéns
                            cartasDiv.innerHTML = '<div style="font-size:2rem;color:#4CAF50;text-align:center;width:100%">Parabéns! Você completou todas as cartas.</div>';
                            document.getElementById('respostas-numero').textContent = '';
                        }
                    }
                    
                    // Desvirar a carta do deck
                    if (deckCard) {
                        deckCard.classList.remove('flipped');
                    }
                }, 1000);
            } else {
                // Resposta errada
                carta.classList.add('errada');
            }
        };
        
        cartasDiv.appendChild(carta);
    });
}

// Nota: O event listener para back-respostas é gerenciado pelo fix_buttons.js
