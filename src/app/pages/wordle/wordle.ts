import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Guess {
  word: string;
  states: ('correct' | 'present' | 'absent')[];
}

@Component({
  selector: 'app-wordle',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './wordle.html',
  styleUrl: './wordle.scss'
})

export class WordleComponent {

  words = [
    'CASAS',
    'PERRO',
    'GATOS',
    'NUBES',
    'ARBOL',
    'PLAYA',
    'TARTA',
    'FUEGO',
    'LIBRO',
    'RATON'
  ];

  secretWord = '';
  currentWord = '';

  attempts: Guess[] = [];
  maxAttempts = 6;

  constructor() { this.newGame(); }

  newGame(): void {

    this.secretWord =
      this.words[Math.floor(Math.random() * this.words.length)];
    this.currentWord = '';
    this.attempts = [];
  }

  submitGuess(): void {

    const guess = this.currentWord.trim().toUpperCase();
    if (guess.length !== 5) {
      return;
    }

    const states: ('correct' | 'present' | 'absent')[] =
      Array(5).fill('absent');

    const remainingLetters =
      this.secretWord.split('');

    // Correctas
    for (let i = 0; i < 5; i++) {
      if (guess[i] === this.secretWord[i]) {

        states[i] = 'correct';
        remainingLetters[i] = '';
      }
    }

    // Presentes
    for (let i = 0; i < 5; i++) {
      if (states[i] === 'correct') {
        continue;
      }

      const index =
      remainingLetters.indexOf(guess[i]);

      if (index !== -1) {

        states[i] = 'present';
        remainingLetters[index] = '';
      }
    }

    this.attempts.push({word: guess, states});
    this.currentWord = '';
  }

  get isWinner(): boolean {

    return this.attempts.some(attempt => attempt.word === this.secretWord);
  }

  get isGameOver(): boolean {

    return this.isWinner || this.attempts.length >= this.maxAttempts;
  }
}
