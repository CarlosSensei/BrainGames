import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Game } from '../../models/game-model';
import { GameCardComponent } from '../../shared/component/game-card/game-card';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, GameCardComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {

  games: Game[] = [
    {
      title: 'Ahorcado',
      description: 'Adivina la palabra antes de quedarte sin vidas.',
      icon: '🎯',
      route: '/hangman',
      available: true
    },
    {
      title: 'Mastermind',
      description: 'Descifra la combinación secreta.',
      icon: '🔢',
      route: '/mastermind',
      available: true
    },
    {
      title: 'Memoria Numérica',
      description: 'Recuerda secuencias cada vez más largas.',
      icon: '🧠',
      route: '/memory',
      available: true
    },
    {
      title: 'Sudoku',
      description: 'Completa el tablero usando lógica.',
      icon: '🔲',
      route: '/sudoku',
      available: true
    },
    {
      title: 'Wordle',
      description: 'Adivina la palabra oculta en seis intentos.',
      icon: '🔤',
      route: '/wordle',
      available: true
    },
    {
      title: 'Anagramas',
      description: 'Reordena las letras para descubrir la palabra oculta.',
      icon: '🔀',
      route: '/anagram',
      available: true
    },
    {
      title: 'Calculadora Mental',
      description: 'Resuelve operaciones antes de que se acabe el tiempo.',
      icon: '➕',
      route: '/mental-math',
      available: true
    },
    {
      title: 'Secuencias Lógicas',
      description: 'Descubre el patrón y encuentra el siguiente elemento.',
      icon: '📈',
      route: '/sequence',
      available: true
    }
  ];

}
