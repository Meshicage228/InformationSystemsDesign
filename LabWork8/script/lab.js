class Block {
    constructor() {
        this.colors = new Map([
            ['Красный', '#FF5733'],
            ['Зеленый', '#33FF57'],
            ['Синий', '#3357FF'],
            ['Желтый', '#F3FF33'],
            ['Розовый', '#FF33A1'],
            ['Бирюзовый', '#33FFF5'],
            ['Оранжевый', '#FF8333'],
            ['Фиолетовый', '#A133FF']
        ]);
        
        this.texts = new Set(['Первый блок', 'Второй блок', 'Третий блок', 'Четвертый блок', 'Пятый блок', 'Шестой блок', 'Седьмой блок', 'Восьмой блок']);
    }

    createBlock(color, text, width) {
        const block = document.createElement('div');
        block.className = 'block';
        block.style.backgroundColor = color;
        block.style.width = width + 'px';
        block.innerText = text;
        return block;
    }

    renderBlocks() {
        const container = document.getElementById('blocksContainer');
        let topPosition = 0;

        const color1 = Array.from(this.colors.values())[0];
        const text1 = Array.from(this.texts)[0];
        const block1 = this.createBlock(color1, text1, 150);
        block1.style.top = topPosition + 'px';
        container.appendChild(block1);
        topPosition += 100;

        const color2 = Array.from(this.colors.values())[1];
        const text2 = Array.from(this.texts)[1];
        const block2 = this.createBlock(color2, text2, 150);
        block2.style.top = topPosition + 'px';
        container.appendChild(block2);
    }
}

class DynamicBlock extends Block {
    constructor() {
        super();
        this.init();
    }

    init() {
        this.populateSelects();
        document.getElementById('addBlockButton').addEventListener('click', () => this.addNewBlock());
        document.getElementById('sortBlocksButton').addEventListener('click', () => this.sortBlocks());
    }

    populateSelects() {
        const colorSelect = document.getElementById('colorSelect');
        const textSelect = document.getElementById('textSelect');

        this.colors.forEach((value, key) => {
            const option = document.createElement('option');
            option.value = value;
            option.innerText = key;
            colorSelect.appendChild(option);
        });

        this.texts.forEach(text => {
            const option = document.createElement('option');
            option.value = text;
            option.innerText = text;
            textSelect.appendChild(option);
        });
    }

    addNewBlock() {
        const color = document.getElementById('colorSelect').value;
        const text = document.getElementById('textSelect').value;
        const width = document.getElementById('widthInput').value || 150;

        const existingBlock = Array.from(document.getElementById('blocksContainer').children)
        .find(block => block.innerText === text);


        if (existingBlock) {
            existingBlock.style.backgroundColor = color;
            existingBlock.style.width = width + 'px';
        } else {
            const newBlock = this.createBlock(color, text, width);
            const container = document.getElementById('blocksContainer');
            newBlock.style.top = (container.children.length * 100) + 'px';
            container.appendChild(newBlock);
        }
    }

    sortBlocks() {
        const container = document.getElementById('blocksContainer');
        const blocks = Array.from(container.children);

        blocks.sort((a, b) => a.innerText.length - b.innerText.length);

        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        blocks.forEach((block, index) => {
            block.style.top = (index * 100) + 'px';
            container.appendChild(block);
        });
    }
}

const dynamicBlock = new DynamicBlock();
dynamicBlock.renderBlocks();