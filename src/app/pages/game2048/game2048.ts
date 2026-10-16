import { Component, HostListener, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-game-2048',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './game2048.html',
    styleUrl: './game2048.scss'
})

export class Game2048Component implements OnInit {

    board: number[][] = [];

    score = 0;
    hasWon = false;
    gameOver = false;

    ngOnInit(): void {
        this.newGame();
    }

    @HostListener('window:keydown', ['$event'])
    handleKeyboard(event: KeyboardEvent): void {

        if (this.gameOver) { return; }

        switch (event.key) {

            case 'ArrowLeft':
                event.preventDefault();
                this.moveLeft();
                break;

            case 'ArrowRight':
                event.preventDefault();
                this.moveRight();
                break;

            case 'ArrowUp':
                event.preventDefault();
                this.moveUp();
                break;

            case 'ArrowDown':
                event.preventDefault();
                this.moveDown();
                break;
        }
    }   

    newGame(): void {

        this.score = 0;
        this.hasWon = false;
        this.gameOver = false;

        this.board = Array(4).fill(0)
            .map(() => Array(4).fill(0));

        this.addRandomTile();
        this.addRandomTile();
    }

    addRandomTile(): void {

    const emptyCells: {
        row: number;
        col: number;
    }[] = [];

    for (let row = 0; row < 4; row++) {

        for (let col = 0; col < 4; col++) {

            if (this.board[row][col] === 0) {

                emptyCells.push({row, col});
            }
        }
    }

    if (!emptyCells.length) { return; }

    const random = emptyCells[
        Math.floor(Math.random() * emptyCells.length)
        ];

        this.board[random.row][random.col] = Math.random() < 0.9 ? 2 : 4;
    }

    moveLeft(): void {

    let moved = false;

    for (let row = 0; row < 4; row++) {

        const values = this.board[row].filter(x => x !== 0);

        for (let i = 0; i < values.length - 1; i++) {

            if (values[i] === values[i + 1]) {
                values[i] *= 2;
                this.score += values[i];
                values.splice(i + 1, 1);
            }
        }

        while (values.length < 4) { values.push(0); }

        if (JSON.stringify(values) !==
        JSON.stringify(this.board[row])
        ) {
            moved = true;
        }

        this.board[row] = values;
    }

    if (moved) {
        this.addRandomTile();
        this.checkWin();
        this.checkGameOver();
    }
    }

    moveRight(): void {

        this.reverseRows();
        this.moveLeft();
        this.reverseRows();
    }

    moveUp(): void {

        this.transpose();
        this.moveLeft();
        this.transpose();
    }

    moveDown(): void {

        this.transpose();
        this.moveRight();
        this.transpose();
    }

    reverseRows(): void {

        this.board = this.board.map(row => [...row].reverse());
    }

    transpose(): void {

        const newBoard = Array(4).fill(0)
            .map(() => Array(4).fill(0));

        for (let row = 0; row < 4; row++) {

            for (let col = 0; col < 4; col++) {

                newBoard[row][col] = this.board[col][row];
            }
        }

        this.board = newBoard;
    }

    checkWin(): void {

        for (let row = 0; row < 4; row++) {

            for (let col = 0; col < 4; col++) {

                if (this.board[row][col] >= 2048) {

                    this.hasWon = true;
                    return;
                }
            }
        }
    }

    checkGameOver(): void {

        for (let row = 0; row < 4; row++) {

            for (let col = 0; col < 4; col++) {

                if (this.board[row][col] === 0) {
                    return;
                }
            }
        }

        for (let row = 0; row < 4; row++) {

            for (let col = 0; col < 4; col++) {

                const value = this.board[row][col];

                if (col < 3 && value === this.board[row][col + 1]) {
                    return;
                }

                if (row < 3 && value === this.board[row + 1][col]) {
                    return;
                }
            }
        }

        this.gameOver = true;
    }

    getCellClass(value: number): string {
        return `value-${value}`;
    }
}