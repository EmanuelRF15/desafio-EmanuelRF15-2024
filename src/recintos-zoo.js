class RecintosZoo {
    constructor (){
        this.recintos = [
            { numero: 1, bioma: "savana", capacidade: 10, animais: [{especie: "MACACO", quantidade: 3, tamanho: 1}] },
            { numero: 2, bioma: "floresta", capacidade: 5, animais: [] },
            { numero: 3, bioma: "savana e rio", capacidade: 7, animais: [{especie: "GAZELA", quantidade: 1, tamanho: 2}] },
            { numero: 4, bioma: "rio", capacidade: 8, animais: [] },
            { numero: 5, bioma: "savana", capacidade: 9, animais: [{especie: "LEAO", quantidade: 1, tamanho: 3}] },
        ];

        this.animaisPermitidos = [
            {especie: "LEAO", tamanho: 3, biomas: ["savana"], carnivoro: true},
            {especie: "LEOPARDO", tamanho: 2, biomas: ["savana"], carnivoro: true},
            {especie: "CROCODILO", tamanho: 3, biomas: ["rio"], carnivoro: true},
            {especie: "MACACO", tamanho: 1, biomas: ["floresta", "savana"], carnivoro: false},
            {especie: "GAZELA", tamanho: 2, biomas: ["savana"], carnivoro: false},
            {especie: "HIPOPOTAMO", tamanho: 3, biomas: ["rio", "savana"], carnivoro: false},
        ];
    }

    analisaRecintos(animal, quantidade) {
        if(!this.animaisPermitidos[animal]) {
            return { erro: "Animal inválido", recintosViaveis: null };
        }

        if(quantidade < 1) {
            return { erro: "Quantidade inválida", recintosViaveis: null };
        }

        const infoAnimal = this.animaisPermitidos[animal];
        const recintosViaveis = [];
        const espacosNecessarios = quantidade * infoAnimal.tamanho;

        for(const recinto of this.recintos) {
            let espacoOcupado = recinto.animais.reduce((total, a) => total + (a.tamanho * a.quantidade), 0);
            let espacoExtra = (recinto.animais.length > 0 && infoAnimal.carnivoro===false) ? 1 : 0;
            if(!infoAnimal.biomas.includes(recinto.bioma) || recinto.animais.length > 0 && infoAnimal.carnivoro===true || infoAnimal.especie === "HIPOPOTAMO" && recinto.bioma !== "savana e rio") {
                continue;
            }

            const espacoDisponivel = recinto.capacidade - espacoOcupado - espacoExtra;
            if(espacoDisponivel >= espacosNecessarios) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel - espacosNecessarios} total: ${recinto.capacidade})`);
            }
        }

        if(recintosViaveis.length === 0) {
            return { erro: "Não há recintos viáveis", recintosViaveis: null };
        }
        return { erro: null, recintosViaveis: recintosViaveis.sort() };
    }

}

export { RecintosZoo as RecintosZoo };
