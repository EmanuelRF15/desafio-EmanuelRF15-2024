class RecintosZoo {
    constructor (){
        this.recintos = [
            { numero: 1, bioma: "savana", capacidade: 10, animais: [{especie: "MACACO", quantidade: 3, tamnaho: 1}] },
            { numero: 2, bioma: "floresta", capacidade: 5, animais: [] },
            { numero: 3, bioma: "savana e rio", capacidade: 7, animais: [{especie: "GAZELA", quantidade: 1, tamanho: 2}] },
            { numero: 4, bioma: "rio", capacidade: 8, animais: [] },
            { numero: 5, bioma: "savana", capacidade: 9, animais: [{especie: "LEAO", quantidade: 1, tamnaho: 3}] },
        ];
    }

    analisaRecintos(animal, quantidade) {
    }

}

export { RecintosZoo as RecintosZoo };
