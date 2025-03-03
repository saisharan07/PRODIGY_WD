// script.js

class TicTacToe {
    constructor() {
        this.boardState = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.boardElement = document.getElementById('board');
        this.statusMessage = document.getElementById('status-message');
        
        this.initializeBoard();
    }

    initializeBoard() {
        this.boardElement.innerHTML = ''; // Clear the board
        this.boardState = ['', '', '', '', '', '', '', '', '']; // Reset the board state
        this.gameActive = true;
        this.currentPlayer = 'X';
        this.updateStatusMessage();

        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            cell.addEventListener('click', () => this.handleCellClick(i));
            this.boardElement.appendChild(cell);
        }
    }

    updateStatusMessage() {
        this.statusMessage.textContent = `${this.currentPlayer === 'X' ? "Player 1's Turn (X)" : "Player 2's Turn (O)"}`;
    }

    handleCellClick(index) {
        if (this.boardState[index] !== '' || !this.gameActive) return;

        // Mark the cell with the current player's symbol
        this.boardState[index] = this.currentPlayer;
        this.updateCell(index);

        // Check for win or draw
        if (this.checkWin()) {
            this.gameActive = false;
            this.statusMessage.textContent = `${this.currentPlayer} Wins!`;
            return;
        }

        if (this.boardState.every(cell => cell !== '')) {
            this.gameActive = false;
            this.statusMessage.textContent = 'It\'s a Draw!';
            return;
        }

        // Switch to the next player
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateStatusMessage();
    }

    updateCell(index) {
        const cell = this.boardElement.querySelector(`[data-index="${index}"]`);
        cell.textContent = this.boardState[index];
    }

    checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return this.boardState[a] !== '' && this.boardState[a] === this.boardState[b] && this.boardState[a] === this.boardState[c];
        });
    }

    restartGame() {
        this.initializeBoard();
    }
}

// Initialize a new TicTacToe game when the page loads
const game = new TicTacToe();
