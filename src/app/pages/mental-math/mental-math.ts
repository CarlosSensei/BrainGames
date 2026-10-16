import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mental-math',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './mental-math.html',
  styleUrl: './mental-math.scss'
})

export class MentalMathComponent {

  score = 0;
  timeLeft = 30;
  answer = '';
  gameStarted = false;
  gameOver = false;
  num1 = 0;
  num2 = 0;
  operator = '+';
  correctResult = 0;

  private timer?: number;

  startGame(): void {

    this.score = 0;
    this.timeLeft = 30;
    this.gameStarted = true;
    this.gameOver = false;
    this.generateProblem();

    this.timer = window.setInterval(() => {
      this.timeLeft--;

      if (this.timeLeft <= 0) {

        clearInterval(this.timer);
        this.gameOver = true;
        this.gameStarted = false;
      }
    }, 1000);
  }

  generateProblem(): void {

    const operators = ['+', '-', '*'];

    this.operator =
      operators[Math.floor(Math.random() * operators.length)];

    this.num1 = Math.floor(Math.random() * 50) + 1;
    this.num2 = Math.floor(Math.random() * 25) + 1;

    switch (this.operator) {
      case '+':
        this.correctResult = this.num1 + this.num2;
        break;
      case '-':
        this.correctResult = this.num1 - this.num2;
        break;
      case '*':
        this.correctResult = this.num1 * this.num2;
        break;
    }
  }

  submitAnswer(): void {

    if (Number(this.answer) === this.correctResult) {
      this.score += 10;
    }

    this.answer = '';
    this.generateProblem();
  }
}