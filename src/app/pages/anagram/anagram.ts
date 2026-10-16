import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-anagram',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './anagram.html',
  styleUrl: './anagram.scss'
})

export class AnagramComponent {

  words = [
    'ANGULAR',
    'TYPESCRIPT',
    'VARIABLE',
    'COMPONENTE',
    'SERVICIO',
    'INTERFAZ',
    'PROGRAMADOR',
    'ALGORITMO'
  ];

  currentWord = '';
  scrambledWord = '';
  answer = '';

  solved = false;

  constructor() {
    this.newGame();
  }

  newGame(): void {

    this.solved = false;
    this.answer = '';
    this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
    this.scrambledWord = this.shuffleWord(this.currentWord);
  }

  shuffleWord(word: string): string {

    let shuffled = word;
    while (shuffled === word) {
      shuffled = word
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('');
    }

    return shuffled;
  }

  wrongAnswer = false;

  checkAnswer(): void {

    if (this.answer.trim().toUpperCase() === this.currentWord) {

      this.solved = true;
      this.wrongAnswer = false;
    } else {
        
      this.wrongAnswer = true;
    }
  }
}