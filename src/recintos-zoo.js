class RecintosZoo {
    constructor (){
        this.animaisPermitidos = [
            {especie: 'LEAO', tamanho: 3, biomas: ['savana'], carnivoro: true},
            {especie: 'LEOPARDO', tamanho: 2, biomas: ['savana'], carnivoro: true},
            {especie: 'CROCODILO', tamanho: 3, biomas: ['rio'], carnivoro: true},
            {especie: 'MACACO', tamanho: 1, biomas: ['floresta', 'savana'], carnivoro: false},
            {especie: 'GAZELA', tamanho: 2, biomas: ['savana'], carnivoro: false},
            {especie: 'HIPOPOTAMO', tamanho: 3, biomas: ['rio', 'savana'], carnivoro: false},
        ];

        this.recintos = [
            { numero: 1, bioma: ['savana'], capacidade: 10, animais: [{especie: this.animaisPermitidos.filter(a => a.especie === 'MACACO'), quantidade: 3}] },
            { numero: 2, bioma: ['floresta'], capacidade: 5, animais: [] },
            { numero: 3, bioma: ['rio', 'savana'], capacidade: 7, animais: [{especie: this.animaisPermitidos.filter(a => a.especie === 'GAZELA'), quantidade: 1}] },
            { numero: 4, bioma: ['rio'], capacidade: 8, animais: [] },
            { numero: 5, bioma: ['savana'], capacidade: 9, animais: [{especie: this.animaisPermitidos.filter(a => a.especie === 'LEAO'), quantidade: 1}] },
        ];
    }

    analisaRecintos(animal, quantidade) {
        animal = animal.toUpperCase();
        if(!this.animaisPermitidos.some(a => a.especie === animal)) {
            return { erro: "Animal inválido", recintosViaveis: null };
        }

        if(quantidade < 1) {
            return { erro: "Quantidade inválida", recintosViaveis: null };
        }

        const infoAnimal = this.animaisPermitidos.filter(a => a.especie === animal);
        const recintosViaveis = [];
        const espacosNecessarios = quantidade * infoAnimal[0].tamanho;

        for(const recinto of this.recintos) {
            let espacoOcupado = recinto.animais.reduce((total, a) => total + (a.especie[0].tamanho * a.quantidade), 0);
            let espacoExtra = 0;
            if (recinto.animais.some(a => a.especie[0].especie !== infoAnimal[0].especie)) {
                espacoExtra = 1;
            }
            if(!recinto.bioma.some(b => infoAnimal[0].biomas.includes(b)) || (recinto.animais.some(a => a.especie[0].especie !== infoAnimal[0].especie) && infoAnimal[0].carnivoro) || (recinto.animais.some(a => a.especie[0].carnivoro) && !infoAnimal[0].carnivoro) || (infoAnimal[0].especie === "HIPOPOTAMO" && !recinto.bioma.every(b => ['savana', 'rio'].includes(b)))) {
                continue;
            }
        
            const espacoDisponivel = recinto.capacidade - espacoOcupado - espacoExtra;
            if(espacoDisponivel >= espacosNecessarios) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel - espacosNecessarios} total: ${recinto.capacidade})`);
            }
        }

        if(recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável", recintosViaveis: null };
        }
        return { erro: null, recintosViaveis: recintosViaveis.sort() };
    }

}

export { RecintosZoo as RecintosZoo };
