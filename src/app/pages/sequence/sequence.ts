import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface SequencePuzzle {
  sequence: string;
  answer: string;
}

@Component({
  selector: 'app-sequence',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './sequence.html',
  styleUrl: './sequence.scss'
})

export class SequenceComponent {

  puzzles: SequencePuzzle[] = [
    {
      sequence: '2, 4, 6, 8, ?',
      answer: '10'
    },
    {
      sequence: '5, 10, 15, 20, ?',
      answer: '25'
    },
    {
      sequence: '3, 6, 12, 24, ?',
      answer: '48'
    },
    {
      sequence: '1, 1, 2, 3, 5, ?',
      answer: '8'
    },
    {
      sequence: 'A, C, E, G, ?',
      answer: 'I'
    },
    {
      sequence: 'Z, X, V, T, ?',
      answer: 'R'
    }
  ];

  currentPuzzle!: SequencePuzzle;

  userAnswer = '';
  solved = false;
  wrongAnswer = false;

  constructor() { this.newPuzzle(); }

  newPuzzle(): void {

    this.currentPuzzle =
      this.puzzles[Math.floor(Math.random() * this.puzzles.length)];
    this.userAnswer = '';
    this.solved = false;
    this.wrongAnswer = false;
  }

  checkAnswer(): void {

    if (
      this.userAnswer.trim().toUpperCase() ===
      this.currentPuzzle.answer.toUpperCase()
    ) {

      this.solved = true;
      this.wrongAnswer = false;
    } else {
      
      this.wrongAnswer = true;
    }
  }
}