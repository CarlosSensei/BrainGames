import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hangman',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hangman.html',
  styleUrl: './hangman.scss'
})

export class HangmanComponent {

  words = [
    'ANGULAR',
    'TYPESCRIPT',
    'JAVASCRIPT',
    'PROGRAMADOR',
    'COMPONENTE',
    'VARIABLE',
    'SERVICIO',
    'INTERFAZ'
  ];

  selectedWord = '';
  guessedLetters: string[] = [];
  wrongLetters: string[] = [];
  maxLives = 6;

  constructor() {
    this.newGame();
  }

  newGame(): void {
    this.selectedWord =
      this.words[Math.floor(Math.random() * this.words.length)];
    this.guessedLetters = [];
    this.wrongLetters = [];
  }

  get livesRemaining(): number {
    return this.maxLives - this.wrongLetters.length;
  }

  get displayedWord(): string[] {
    return this.selectedWord.split('').map(letter =>
      this.guessedLetters.includes(letter) ? letter : '_');
  }

  get isWinner(): boolean {
    return this.selectedWord.split('')
      .every(letter => this.guessedLetters.includes(letter));
  }

  get isLoser(): boolean {
    return this.livesRemaining <= 0;
  }

  guess(letter: string): void {

    if (this.isWinner || this.isLoser) { return; }

    letter = letter.toUpperCase();

    if (
      this.guessedLetters.includes(letter) ||
      this.wrongLetters.includes(letter)
    ) { return; }

    if (this.selectedWord.includes(letter)) {
      this.guessedLetters.push(letter);
    } else {
      this.wrongLetters.push(letter);
    }
  }

  alphabet(): string[] {
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  }
}