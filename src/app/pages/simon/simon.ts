import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-simon',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './simon.html',
    styleUrl: './simon.scss'
})

export class SimonComponent {

    colors = [
    'red',
    'blue',
    'green',
    'yellow'
    ];

    constructor( private cdr: ChangeDetectorRef) {}

    sequence: string[] = [];
    playerSequence: string[] = [];

    level = 0;
    gameStarted = false;
    gameOver = false;
    activeColor = '';
    isShowingSequence = false;

    sounds: Record<string, HTMLAudioElement> = {
        red: new Audio('do.mp3'),
        blue: new Audio('re.mp3'),
        green: new Audio('mi.mp3'),
        yellow: new Audio('fa.mp3')
    };

    startGame(): void {

        this.sequence = [];
        this.playerSequence = [];
        this.level = 0;
        this.gameOver = false;
        this.gameStarted = true;

        this.nextLevel();
    }

    playSound(color: string): void {

        const sound = this.sounds[color];

        if (!sound) { return; }

        sound.currentTime = 0;
        sound.play();
    }

    nextLevel(): void {

        this.playerSequence = [];

        const randomColor = this.colors[
            Math.floor(Math.random() * this.colors.length)];

        this.sequence.push(randomColor);
        this.level++;
        setTimeout(() => { this.playSequence(); }, 500);
    }

    async playSequence(): Promise<void> {
        this.isShowingSequence = true;

        for (const color of this.sequence) {
            // 1. Encendemos el color y forzamos a Angular a pintar el DOM
            this.activeColor = color;
            this.cdr.detectChanges(); 
            this.playSound(color);

            // 2. Esperamos el tiempo que el color debe estar brillando
            await this.delay(700);

            // 3. Apagamos el color y volvemos a forzar el pintado
            this.activeColor = '';
            this.cdr.detectChanges();

            // 4. Pequeña pausa entre colores de la secuencia
            await this.delay(250);
        }

        this.isShowingSequence = false;
        this.cdr.detectChanges();
    }


    playerClick(color: string): void {
        if (
            this.gameOver ||
            !this.gameStarted ||
            this.isShowingSequence
        ) {
            return;
        }

        this.playSound(color);
        this.activeColor = color;

        // CORRECCIÓN: Forzamos la detección de cambios al apagar el color
        setTimeout(() => { 
            this.activeColor = ''; 
            this.cdr.detectChanges(); // <--- Avisa a Angular de que el color ya se apagó
        }, 150);

        this.playerSequence.push(color);
        const currentIndex = this.playerSequence.length - 1;

        if (this.playerSequence[currentIndex] !== this.sequence[currentIndex]) {
            this.gameOver = true;
            this.gameStarted = false;
            return;
        }

        if (this.playerSequence.length === this.sequence.length) {
            setTimeout(() => { this.nextLevel(); }, 1000);
        }
    }


    delay(ms: number): Promise<void> {

        return new Promise(resolve => setTimeout(resolve, ms));
    }
}