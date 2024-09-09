class RecintosZoo {
    constructor (){
        this.animaisPermitidos = [
            {especie: 'LEAO', tamanho: 3, biomas: ['savana'], carnivoro: true},
            {especie: 'LEOPARDO', tamanho: 2, biomas: ['savana'], carnivoro: true},
            {especie: 'CROCODILO', tamanho: 3, biomas: ['rio'], carnivoro: true},
            {especie: 'MACACO', tamanho: 1, biomas: ['floresta', 'savana'], carnivoro: false},
            {especie: 'GAZELA', tamanho: 2, biomas: ['savana'], carnivoro: false},
            {especie: 'HIPOPOTAMO', tamanho: 4, biomas: ['rio', 'savana'], carnivoro: false},
        ];

        this.recintos = [
            { numero: 1, bioma: ['savana'], capacidade: 10, animais: [{especie: this.animaisPermitidos.find(a => a.especie === 'MACACO'), quantidade: 3}] },
            { numero: 2, bioma: ['floresta'], capacidade: 5, animais: [] },
            { numero: 3, bioma: ['rio', 'savana'], capacidade: 7, animais: [{especie: this.animaisPermitidos.find(a => a.especie === 'GAZELA'), quantidade: 1}] },
            { numero: 4, bioma: ['rio'], capacidade: 8, animais: [] },
            { numero: 5, bioma: ['savana'], capacidade: 9, animais: [{especie: this.animaisPermitidos.find(a => a.especie === 'LEAO'), quantidade: 1}] },
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

        const infoAnimal = this.animaisPermitidos.find(a => a.especie === animal);
        const recintosViaveis = [];
        const espacosNecessarios = quantidade * infoAnimal.tamanho;

        for(const recinto of this.recintos) {
            let espacoOcupado = recinto.animais.reduce((total, a) => total + (a.especie.tamanho * a.quantidade), 0);
            let espacoExtra = 0;
            if (recinto.animais.some(a => a.especie.especie !== infoAnimal.especie)) {
                espacoExtra = 1;
            }
            if(!recinto.bioma.some(b => infoAnimal.biomas.includes(b)) || (recinto.animais.some(a => a.especie.especie !== infoAnimal.especie) && infoAnimal.carnivoro) || (recinto.animais.some(a => a.especie.carnivoro) && !infoAnimal.carnivoro) || (infoAnimal.especie === "HIPOPOTAMO" && !(recinto.bioma.includes('savana') && recinto.bioma.includes('rio')) && recinto.animais.some(a => a.especie.especie !== 'HIPOPOTAMO'))) {
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
