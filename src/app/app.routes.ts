import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home')
        .then(m => m.HomeComponent)
  },
  {
    path: 'hangman',
    loadComponent: () =>
      import('./pages/hangman/hangman')
        .then(m => m.HangmanComponent)
  },
  {
    path: 'mastermind',
    loadComponent: () =>
      import('./pages/mastermind/mastermind')
        .then(m => m.MastermindComponent)
  },
  {
    path: 'memory',
    loadComponent: () =>
      import('./pages/memory/memory')
        .then(m => m.MemoryComponent)
  },
  {
    path: 'wordle',
    loadComponent: () =>
      import('./pages/wordle/wordle')
        .then(m => m.WordleComponent)
  },
  {
    path: 'sudoku',
    loadComponent: () =>
      import('./pages/sudoku/sudoku')
        .then(m => m.SudokuComponent)
  },
  {
    path: 'anagram',
    loadComponent: () =>
      import('./pages/anagram/anagram')
        .then(m => m.AnagramComponent)
  },
  {
    path: 'mental-math',
    loadComponent: () =>
      import('./pages/mental-math/mental-math')
        .then(m => m.MentalMathComponent)
  },
  {
    path: 'sequence',
    loadComponent: () =>
      import('./pages/sequence/sequence')
        .then(m => m.SequenceComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];