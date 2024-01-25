import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DraggableDirective } from './directives/draggable.directive';
import { blockTypeButtons, blockTypes } from './models/blockTypes';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, DraggableDirective],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    treasureChestCoordinates = { left: 150, top: 700 };
    blocks = [
        {
            id: 1,
            class: blockTypes['treasureChest'].class,
            img: blockTypes['treasureChest'].img,
            left: this.treasureChestCoordinates.left,
            top: this.treasureChestCoordinates.top,
        },
    ];
    blockTypesData = blockTypes;
    blockTypeButtonsData = blockTypeButtons;
    whatObject = blockTypes['orangeBlock'];
    animateTreasureChest = false;
    isMovingTreasureChest = false;

    addNewItem(event: MouseEvent) {
        this.animateTreasureChest = false;

        const index = +(event.target as any).id;
        const lastBlock = this.blocks[this.blocks.length - 1];

        if (index === lastBlock.id && !this.isMovingTreasureChest) {
            lastBlock.class = this.whatObject.class;
            lastBlock.img = this.whatObject.img;

            this.blocks.push({
                id: lastBlock.id + 1,
                class: blockTypes['treasureChest'].class,
                img: blockTypes['treasureChest'].img,
                left: this.treasureChestCoordinates.left,
                top: this.treasureChestCoordinates.top,
            });
        }
    }

    changeBlock(event: MouseEvent) {
        const blockData = (event.target as HTMLButtonElement).id;
        const foundBlock = Object.values(blockTypes).find((block) => {
            return block.name === blockData;
        });

        this.whatObject = foundBlock || blockTypes['orangeBlock'];
    }

    putBackInChest(data: any, id: number) {
        const elData = (
            data.event.target as HTMLDivElement
        ).getBoundingClientRect();

        if (
            Math.abs(elData.left - this.treasureChestCoordinates.left) < 50 &&
            Math.abs(elData.top - this.treasureChestCoordinates.top) < 50
        ) {
            const index = this.blocks.findIndex((block) => {
                return block.id === id;
            });

            this.animateTreasureChest = true;
            this.blocks.splice(index, 1);
        }
    }

    moveTC() {
        this.isMovingTreasureChest = !this.isMovingTreasureChest;
    }

    updateTreasureChestPos(data: any) {
        const elData = (
            data.event.target as HTMLDivElement
        ).getBoundingClientRect();

        this.treasureChestCoordinates.top = elData.top + 8;
        this.treasureChestCoordinates.left = elData.left + 8;
    }
}
