// Script para garantir que os botões funcionem corretamente
document.addEventListener('DOMContentLoaded', function() {
    
    // Função para esconder todos os jogos e mostrar a seleção principal
    function hideAllGames() {
        document.getElementById('memorize-game').classList.add('hidden');
        document.getElementById('memory-game').classList.add('hidden');
        document.getElementById('multiplication-game').classList.add('hidden');
        document.querySelector('.game-selection').classList.remove('hidden');
    }
    
    // Botão Memorizar com carta
    const memorizeBtn = document.getElementById('memorize-btn');
    if (memorizeBtn) {
        memorizeBtn.onclick = function() {
            document.getElementById('memorize-game').classList.remove('hidden');
            document.getElementById('memory-game').classList.add('hidden');
            document.getElementById('multiplication-game').classList.add('hidden');
            document.querySelector('.game-selection').classList.add('hidden');
        };
    }
    
    // Botão Jogo da Memória
    const memoryBtn = document.getElementById('memory-btn');
    if (memoryBtn) {
        memoryBtn.onclick = function() {
            document.getElementById('memory-game').classList.remove('hidden');
            document.getElementById('memorize-game').classList.add('hidden');
            document.getElementById('multiplication-game').classList.add('hidden');
            document.querySelector('.game-selection').classList.add('hidden');
        };
    }
    
    // Botão Jogo da Multiplicação
    const multiplicationBtn = document.getElementById('multiplication-btn');
    if (multiplicationBtn) {
        multiplicationBtn.onclick = function() {
            document.getElementById('multiplication-game').classList.remove('hidden');
            document.getElementById('memorize-game').classList.add('hidden');
            document.getElementById('memory-game').classList.add('hidden');
            document.querySelector('.game-selection').classList.add('hidden');
        };
    }
    
    // Botões de voltar
    const backMemorizeBtn = document.getElementById('back-memorize');
    if (backMemorizeBtn) {
        backMemorizeBtn.onclick = function() {
            hideAllGames();
        };
    }
    
    const backMemoryBtn = document.getElementById('back-memory');
    if (backMemoryBtn) {
        backMemoryBtn.onclick = function() {
            hideAllGames();
        };
    }
    
    const backMultBtn = document.getElementById('back-mult');
    if (backMultBtn) {
        backMultBtn.onclick = function() {
            hideAllGames();
        };
    }
    
    // Inicialização concluída
});
