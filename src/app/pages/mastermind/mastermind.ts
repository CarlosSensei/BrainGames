import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Attempt {
  guess: string;
  correctPosition: number;
  correctNumber: number;
}

@Component({
  selector: 'app-mastermind',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './mastermind.html',
  styleUrl: './mastermind.scss'
})

export class MastermindComponent {

  secretNumber = '';
  currentGuess = '';

  attempts: Attempt[] = [];
  maxAttempts = 10;

  constructor() { this.newGame(); }

  newGame(): void {
    this.secretNumber = this.generateSecretNumber();
    this.currentGuess = '';
    this.attempts = [];
  }

  generateSecretNumber(): string {
    const digits = ['0','1','2','3','4','5','6','7','8','9'];
    const result: string[] = [];
    while (result.length < 4) {

      const index = Math.floor(Math.random() * digits.length);
      result.push(digits[index]);
      digits.splice(index, 1);
    }

    return result.join('');
  }

  submitGuess(): void {
    if (this.currentGuess.length !== 4) {
      return;
    }

    const attempt = this.evaluateGuess(this.currentGuess);
    this.attempts.unshift(attempt);
    this.currentGuess = '';
  }

  evaluateGuess(guess: string): Attempt {
    let correctPosition = 0;
    let correctNumber = 0;

    for (let i = 0; i < 4; i++) {
      if (guess[i] === this.secretNumber[i]) {
        correctPosition++;
      } else if (this.secretNumber.includes(guess[i])) {
        correctNumber++;
      }
    }

    return {guess,correctPosition,correctNumber};
  }

  get isWinner(): boolean {

    return this.attempts.some(attempt => attempt.correctPosition === 4);
  }

  get isGameOver(): boolean {

    return this.attempts.length >= this.maxAttempts;
  }
}