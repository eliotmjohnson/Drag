interface BlocksTypes {
    [blockName: string]: {
        class: string;
        color: string;
        name: string;
        img: string;
    };
}

export const blockTypes: BlocksTypes = {
    treasureChest: {
        class: '',
        color: '',
        name: 'Treasure Chest',
        img: 'icons8-treasure-chest-94.png',
    },
    blueBall: {
        class: 'blue-ball',
        color: 'blue',
        name: 'Blue Ball',
        img: '',
    },
    orangeBlock: {
        class: 'orange-block',
        color: 'orange',
        name: 'Orange Block',
        img: '',
    },
    greenTriangle: {
        class: 'green-triangle',
        color: 'rgb(13, 181, 13)',
        name: 'Green Triangle',
        img: '',
    },
    heart: {
        class: '',
        color: 'red',
        name: 'Heart',
        img: 'icons8-heart-suit-96.png',
    },
    zebra: {
        class: '',
        color: 'white',
        name: 'Zebra',
        img: 'icons8-zebra-100.png',
    },
};

export const blockTypeButtons = [
    blockTypes['blueBall'],
    blockTypes['orangeBlock'],
    blockTypes['greenTriangle'],
    blockTypes['heart'],
    blockTypes['zebra'],
];
