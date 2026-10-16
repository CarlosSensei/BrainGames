import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Cell {
  value: number | null;
  fixed: boolean;
  invalid: boolean;
}

@Component({
  selector: 'app-takuzu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './takuzu.html',
  styleUrl: './takuzu.scss'
})

export class TakuzuComponent {

  board: Cell[][] = [];
  solution: number[][] = [];
  boardSize = 6;
  completed = false;

  private boards = {

    4: [
      [
        [0, 0, 1, 1],
        [1, 1, 0, 0],
        [0, 1, 0, 1],
        [1, 0, 1, 0]
      ]
    ],

    6: [
      [
        [1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1],
        [1, 1, 0, 0, 1, 0],
        [0, 0, 1, 1, 0, 1],
        [1, 0, 0, 1, 1, 0],
        [0, 1, 1, 0, 0, 1]
      ]
    ],

    8: [
      [
        [1,0,1,0,1,0,1,0],
        [0,1,0,1,0,1,0,1],
        [1,1,0,0,1,1,0,0],
        [0,0,1,1,0,0,1,1],
        [1,0,0,1,1,0,0,1],
        [0,1,1,0,0,1,1,0],
        [1,1,0,1,0,0,1,0],
        [0,0,1,0,1,1,0,1]
      ]
    ]
  };

  constructor() {
    this.startGame(6);
  }

  startGame(size: 4 | 6 | 8): void {

    this.boardSize = size;

    const boardList =
      this.boards[size as keyof typeof this.boards];

    const randomBoard =
      boardList[
        Math.floor(Math.random() * boardList.length)
      ];

    this.solution =
      randomBoard.map(row => [...row]);

    const puzzle =
      this.createPuzzle(
        this.solution,
        size === 4 ? 0.35 :
        size === 6 ? 0.45 : 0.55
      );

    this.board = puzzle.map(row =>
      row.map(cell => ({
        value: cell,
        fixed: cell !== null,
        invalid: false
      }))
    );

    this.completed = false;

    this.validateBoard();
  }

  resetGame(): void {
    this.startGame(this.boardSize as 4 | 6 | 8);
  }

  createPuzzle(
    solution: number[][],
    percentageToHide: number
  ): (number | null)[][] {

    const puzzle =
      solution.map(row => [...row]);

    const totalCells =
      this.boardSize * this.boardSize;

    const cellsToHide =
      Math.floor(totalCells * percentageToHide);

    let removed = 0;

    while (removed < cellsToHide) {

      const row =
        Math.floor(Math.random() * this.boardSize);

      const col =
        Math.floor(Math.random() * this.boardSize);

      if (puzzle[row][col] !== null) {

        puzzle[row][col] = null;

        removed++;
      }
    }

    return puzzle;
  }

  toggleCell(row: number, col: number): void {

    const cell = this.board[row][col];

    if (cell.fixed) {
      return;
    }

    if (cell.value === null) {
      cell.value = 0;
    }
    else if (cell.value === 0) {
      cell.value = 1;
    }
    else {
      cell.value = null;
    }

    this.validateBoard();
    this.checkVictory();
  }

  validateBoard(): void {

    this.board.forEach(row =>
      row.forEach(cell => cell.invalid = false)
    );

    this.validateRows();
    this.validateColumns();
  }

  validateRows(): void {

    for (let row = 0; row < this.boardSize; row++) {

      const values =
        this.board[row].map(c => c.value);

      const invalid =
        this.hasThreeConsecutive(values) ||
        this.exceedsBalance(values);

      if (invalid) {

        this.board[row].forEach(cell =>
          cell.invalid = true
        );
      }
    }
  }

  validateColumns(): void {

    for (let col = 0; col < this.boardSize; col++) {

      const values =
        this.board.map(row => row[col].value);

      const invalid =
        this.hasThreeConsecutive(values) ||
        this.exceedsBalance(values);

      if (invalid) {

        for (let row = 0; row < this.boardSize; row++) {

          this.board[row][col].invalid = true;
        }
      }
    }
  }

  hasThreeConsecutive(
    values: (number | null)[]
  ): boolean {

    for (let i = 0; i < values.length - 2; i++) {

      const a = values[i];
      const b = values[i + 1];
      const c = values[i + 2];

      if (
        a !== null &&
        a === b &&
        b === c
      ) {
        return true;
      }
    }

    return false;
  }

  exceedsBalance(
    values: (number | null)[]
  ): boolean {

    const max =
      this.boardSize / 2;

    const zeros =
      values.filter(v => v === 0).length;

    const ones =
      values.filter(v => v === 1).length;

    return zeros > max || ones > max;
  }

  checkVictory(): void {

    for (let row = 0; row < this.boardSize; row++) {

      for (let col = 0; col < this.boardSize; col++) {

        if (
          this.board[row][col].value !==
          this.solution[row][col]
        ) {
          this.completed = false;
          return;
        }
      }
    }

    this.completed = true;
  }

  getSymbol(
    value: number | null
  ): string {

    if (value === 1) {
      return '⚫';
    }

    if (value === 0) {
      return '⚪';
    }

    return '';
  }
}