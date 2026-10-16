import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface SudokuCell {
  value: number;
  fixed: boolean;
  invalid: boolean;
}

@Component({
  selector: 'app-sudoku',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './sudoku.html',
  styleUrl: './sudoku.scss'
})

export class SudokuComponent implements OnInit {

  selectedRow = -1;
  selectedCol = -1;

  completed = false;

  puzzle: number[][] = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],

    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],

    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ];

  solution: number[][] = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],

    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],

    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
  ];

  board: SudokuCell[][] = [];

  ngOnInit(): void {
    this.createBoard();
  }

  createBoard(): void {

    this.completed = false;
    this.board = this.puzzle.map(row =>
      row.map(cell => ({
        value: cell,
        fixed: cell !== 0,
        invalid: false
      }))
    );
  }

  resetBoard(): void {
    this.createBoard();
  }

  selectCell(row: number, col: number): void {
    this.selectedRow = row;
    this.selectedCol = col;
  }

  updateCell(row: number, col: number, event: Event): void {

    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (!value) {
      this.board[row][col].value = 0;
      this.validateBoard();
      return;
    }

    const number = Number(value);

    if (number >= 1 && number <= 9) {

      this.board[row][col].value = number;
    } else {

      input.value =
        this.board[row][col].value === 0
          ? ''
          : this.board[row][col].value.toString();
    }

    this.validateBoard();
    this.checkCompleted();
  }

  validateBoard(): void {

    this.board.forEach(row => {
      row.forEach(cell => {
        cell.invalid = false;
      });
    });

    for (let row = 0; row < 9; row++) {

      for (let col = 0; col < 9; col++) {

        const value = this.board[row][col].value;

        if (value === 0) {
          continue;
        }

        if (!this.isValidMove(row, col, value)) {
          this.board[row][col].invalid = true;
        }
      }
    }
  }

  isValidMove( row: number, col: number, value: number): boolean {

    for (let i = 0; i < 9; i++) {

      if (i !== col &&
        this.board[row][i].value === value
      ) {
        return false;
      }

      if (i !== row &&
        this.board[i][col].value === value
      ) {
        return false;
      }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let r = startRow; r < startRow + 3; r++) {

      for (let c = startCol; c < startCol + 3; c++) {

        if (
          !(r === row && c === col) &&
          this.board[r][c].value === value
        ) {
          return false;
        }
      }
    }

    return true;
  }

  checkCompleted(): void {

    for (let row = 0; row < 9; row++) {

      for (let col = 0; col < 9; col++) {

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

  isSelected(row: number, col: number): boolean {
    
    return this.selectedRow === row && this.selectedCol === col;
  }

  isHighlighted(row: number, col: number): boolean {

    return (row === this.selectedRow || col === this.selectedCol);
  }
}