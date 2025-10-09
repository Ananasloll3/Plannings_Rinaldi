// Konami Code - Version corrigée et simplifiée
// Séquence: ↑ ↑ ↓ ↓ ← → ← → B A

(function() {
    // Séquence du code Konami en codes de touches
    const konamiSequence = [
        38, 38, // ↑ ↑
        40, 40, // ↓ ↓  
        37, 39, 37, 39, // ← → ← →
        66, 65 // B A
    ];
    
    let userSequence = [];
    let sequenceTimer = null;
    
    // Fonction pour réinitialiser la séquence
    function resetSequence() {
        userSequence = [];
        if (sequenceTimer) {
            clearTimeout(sequenceTimer);
            sequenceTimer = null;
        }
    }
    
    // Fonction d'activation du code Konami
    function activateKonami() {
        console.log('🎮 KONAMI CODE ACTIVÉ!');
        
        // Créer un effet visuel
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(45deg, #ff0000, #00ff00, #0000ff, #ffff00);
            z-index: 999999;
            opacity: 0;
            animation: konamiFlash 3s ease-in-out;
            pointer-events: none;
        `;
        
        // Message
        const message = document.createElement('div');
        message.innerHTML = '🎮 KONAMI CODE! 🎮';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 48px;
            font-weight: bold;
            color: white;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
            z-index: 9999999;
            animation: konamiPulse 0.8s ease-in-out;
        `;
        
        // Ajouter les animations CSS
        if (!document.getElementById('konami-styles')) {
            const styles = document.createElement('style');
            styles.id = 'konami-styles';
            styles.textContent = `
                @keyframes konamiFlash {
                    0% { opacity: 0; }
                    50% { opacity: 0.8; }
                    100% { opacity: 0; }
                }
                @keyframes konamiPulse {
                    0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
                    50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
                    100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(flash);
        document.body.appendChild(message);
        
        // Redirection après 1.5 secondes
        setTimeout(() => {
            if (document.getElementById("titre").innerHTML === "Planning") {
                window.location.href = './poker/rekop.html';
            }
            else {
                window.location.href = 'https://www.youtube.com/watch?v=xvFZjo5PgG0&list=RDxvFZjo5PgG0&start_radio=1';
            }
        }, 1500);
        
        // Nettoyer les éléments
        setTimeout(() => {
            if (flash.parentNode) flash.parentNode.removeChild(flash);
            if (message.parentNode) message.parentNode.removeChild(message);
        }, 2000);
    }
    
    // Gestionnaire d'événement pour les touches
    function handleKeyDown(event) {
        const keyCode = event.keyCode || event.which;
        
        // Ajouter la touche à la séquence utilisateur
        userSequence.push(keyCode);
                
        // Vérifier si on a trop de touches
        if (userSequence.length > konamiSequence.length) {
            userSequence.shift(); // Supprimer la première touche
        }
        
        // Vérifier si la séquence correspond
        let matches = true;
        if (userSequence.length === konamiSequence.length) {
            for (let i = 0; i < konamiSequence.length; i++) {
                if (userSequence[i] !== konamiSequence[i]) {
                    matches = false;
                    break;
                }
            }
            
            if (matches) {
                activateKonami();
                return;
            }
        }
        
        // Vérifier si le début de la séquence correspond encore
        let validStart = true;
        for (let i = 0; i < userSequence.length; i++) {
            if (userSequence[i] !== konamiSequence[i]) {
                validStart = false;
                break;
            }
        }
        
        // Si le début ne correspond pas, réinitialiser
        if (!validStart) {
            resetSequence();
            // Re-vérifier avec juste cette touche
            if (keyCode === konamiSequence[0]) {
                userSequence = [keyCode];
            }
        }
        
        // Timer pour réinitialiser après 3 secondes
        if (sequenceTimer) {
            clearTimeout(sequenceTimer);
        }
        sequenceTimer = setTimeout(resetSequence, 3000);
    }
    
    // Attacher l'événement keydown
    document.addEventListener('keydown', handleKeyDown);
    
})();