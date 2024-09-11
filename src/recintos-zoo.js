class RecintosZoo {
    constructor (){
        this.animaisPermitidos = [//create a list of animals that can be in the zoo
            {especie: 'LEAO', tamanho: 3, biomas: ['savana'], carnivoro: true},
            {especie: 'LEOPARDO', tamanho: 2, biomas: ['savana'], carnivoro: true},
            {especie: 'CROCODILO', tamanho: 3, biomas: ['rio'], carnivoro: true},
            {especie: 'MACACO', tamanho: 1, biomas: ['floresta', 'savana'], carnivoro: false},
            {especie: 'GAZELA', tamanho: 2, biomas: ['savana'], carnivoro: false},
            {especie: 'HIPOPOTAMO', tamanho: 4, biomas: ['rio', 'savana'], carnivoro: false},
        ];

        this.recintos = [//create a list of enclosures in the zoo with the animals that are already in them
            { numero: 1, bioma: ['savana'], capacidade: 10, animais: [{especie: this.animaisPermitidos.find(animalPermitido => animalPermitido.especie === 'MACACO'), quantidade: 3}] },
            { numero: 2, bioma: ['floresta'], capacidade: 5, animais: [] },
            { numero: 3, bioma: ['rio', 'savana'], capacidade: 7, animais: [{especie: this.animaisPermitidos.find(animalPermitido => animalPermitido.especie === 'GAZELA'), quantidade: 1}] },
            { numero: 4, bioma: ['rio'], capacidade: 8, animais: [] },
            { numero: 5, bioma: ['savana'], capacidade: 9, animais: [{especie: this.animaisPermitidos.find(animalPermitido => animalPermitido.especie === 'LEAO'), quantidade: 1}] },
        ];
    }

    analisaRecintos(animal, quantidade) {

        animal = animal.toUpperCase();//convert the animal name to uppercase

        //check if the animal is in the list of animals that can be in the zoo
        if(!this.animaisPermitidos.some(animalPermitido => animalPermitido.especie === animal)) {
            return { erro: "Animal inválido", recintosViaveis: null };
        }

        //check if the quantity is valid
        if(quantidade < 1) {
            return { erro: "Quantidade inválida", recintosViaveis: null };
        }

        //create a array with the information of the animal using the name of the animal
        const infoAnimal = this.animaisPermitidos.find(animalPermitido => animalPermitido.especie === animal);

        //create a array to store the enclosures that are viable for the animal
        const recintosViaveis = [];

        //calculate the space needed for the animal
        const espacosNecessarios = quantidade * infoAnimal.tamanho;

        //check if the enclosures are viable for the animal
        for(const recinto of this.recintos) {
            //calculate the space occupied by the animals in the enclosure
            let espacoOcupado = recinto.animais.reduce((total, animalPermitido) => total + (animalPermitido.especie.tamanho * animalPermitido.quantidade), 0);
            
            //check if the enclosure has animals of another species
            let espacoExtra = 0;
            if (recinto.animais.some(animalPermitido => animalPermitido.especie.especie !== infoAnimal.especie)) {
                espacoExtra = 1;
            }
            
            //check if the enclosure biomes are compatible with the animal biomes
            if(!recinto.bioma.some(biomaPermitido => infoAnimal.biomas.includes(biomaPermitido))) {
                continue;
            }

            //check if the enclosure has carnivorous animals and the animal is not carnivorous
            else if (recinto.animais.some(animalPermitido => animalPermitido.especie.especie !== infoAnimal.especie) && infoAnimal.carnivoro) {
                continue;
            }

            //check if the enclosure has herbivorous animals and the animal is carnivorous
            else if(recinto.animais.some(animalPermitido => animalPermitido.especie.carnivoro) && !infoAnimal.carnivoro){
                continue;
            }

            //check if the enclosure has a hippopotamus and the biomes are not savanna and river and if there are other animals species in the enclosure
            else if(infoAnimal.especie === "HIPOPOTAMO" && !(recinto.bioma.includes('savana') && recinto.bioma.includes('rio')) && recinto.animais.some(animalPermitido => animalPermitido.especie.especie !== 'HIPOPOTAMO')){
                continue;
            }

            //check if the enclosure has a monkey and the quantity is less than 2 and if there are no other animals in the enclosure
            else if(infoAnimal.especie === "MACACO" && (quantidade < 2 && recinto.animais.length === 0)){
                continue;
            }
        
            //calculate the available space in the enclosure
            const espacoDisponivel = recinto.capacidade - espacoOcupado - espacoExtra;
            
            //check if the enclosure has enough space for the animal
            if(espacoDisponivel >= espacosNecessarios) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel - espacosNecessarios} total: ${recinto.capacidade})`);
            }
        }

        //check if there are no viable enclosures
        if(recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável", recintosViaveis: null };
        }
        
        //return the viable enclosures
        return { erro: null, recintosViaveis: recintosViaveis.sort() };
    }

}

export { RecintosZoo as RecintosZoo };
