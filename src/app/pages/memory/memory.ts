import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-memory',
    standalone: true,
    imports: [
    CommonModule,
    FormsModule
    ],
    templateUrl: './memory.html',
    styleUrl: './memory.scss'
})

export class MemoryComponent {

    level = 1;
    sequence = '';
    userInput = '';
    countdown = 0;
    countdownActive = false;
    roundSuccess = false;
    showSequence = false;
    gameOver = false;

    gameState:
        'idle' |
        'countdown' |
        'memorizing' |
        'answering' |
        'gameover' = 'idle';

    constructor( private cdr: ChangeDetectorRef) {}

    startGame(): void {
        this.level = 1;
        this.sequence = '';
        this.userInput = '';
        this.showSequence = false;
        this.gameOver = false;
        this.countdownActive = false;

        this.nextRound();
    }

    nextRound(): void {
        this.userInput = '';
        this.sequence = this.generateSequence(this.level + 2);
        this.countdown = 3;
        this.countdownActive = true;
        this.showSequence = false;

        const countdownTimer = setInterval(() => {
            this.countdown--;
            this.cdr.detectChanges();

            if (this.countdown <= 0) {
                clearInterval(countdownTimer);
                this.countdownActive = false;
                this.showSequence = true;
                this.cdr.detectChanges();

                setTimeout(() => {
                    this.showSequence = false;
                    this.cdr.detectChanges();
                }, 2500);
            }
        }, 1000);
    }

    generateSequence(length: number): string {
        let result = '';
        for (let i = 0; i < length; i++) {

            result += Math.floor(Math.random() * 10);
        }

        return result;
    }

    submit(): void {
        if (this.userInput === this.sequence) {
            this.roundSuccess = true;
            this.level++;

            setTimeout(() => {

                this.roundSuccess = false;
                this.nextRound();
            }, 1000);
        } else {
            this.gameOver = true;
        }
    }
}
