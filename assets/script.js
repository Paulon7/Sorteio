let players = [];

function addPlayer() {
    const playerName = document.getElementById('playerName').value;
    if (playerName) {
        players.push(playerName);
        updatePlayerList();
        document.getElementById('playerName').value = '';
    }
}

function updatePlayerList() {
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = '';
    players.forEach(player => {
        const li = document.createElement('li');
        li.textContent = player;
        playerList.appendChild(li);
    });
}

function sortTeams() {
    if (players.length < 1) {
        alert("Adicione pelo menos um jogador para sortear as equipes.");
        return;
    }

    let team1 = [];
    let team2 = [];
    let team3 = [];
    let remainingPlayers = [...players];

    // Manipulação do resultado: garantir certos jogadores em cada equipe
    const forceTeam1 = ['Paulão', 'Rhuan', 'P.a', 'Iury'];  // Jogadores forçados para a Equipe 1
    const forceTeam2 = [];               // Jogadores forçados para a Equipe 2
    const forceTeam3 = [];               // Jogadores forçados para a Equipe 3

    // Remover jogadores forçados das listas e adicionar às equipes correspondentes
    forceTeam1.forEach(player => {
        if (remainingPlayers.includes(player)) {
            team1.push(player);
            remainingPlayers.splice(remainingPlayers.indexOf(player), 1);
        }
    });

    forceTeam2.forEach(player => {
        if (remainingPlayers.includes(player)) {
            team2.push(player);
            remainingPlayers.splice(remainingPlayers.indexOf(player), 1);
        }
    });

    forceTeam3.forEach(player => {
        if (remainingPlayers.includes(player)) {
            team3.push(player);
            remainingPlayers.splice(remainingPlayers.indexOf(player), 1);
        }
    });

    // Embaralhar jogadores restantes
    remainingPlayers = shuffleArray(remainingPlayers);

    // Distribuir os primeiros 6 jogadores para a Equipe 1 (se ainda faltar completar)
    while (team1.length < 6 && remainingPlayers.length > 0) {
        team1.push(remainingPlayers.shift());
    }

    // Distribuir os próximos 6 jogadores para a Equipe 2
    while (team2.length < 6 && remainingPlayers.length > 0) {
        team2.push(remainingPlayers.shift());
    }

    // O restante dos jogadores vai para a Equipe 3
    while (remainingPlayers.length > 0) {
        team3.push(remainingPlayers.shift());
    }

    displayTeams(team1, team2, team3);
}

function displayTeams(team1, team2, team3) {
    const team1List = document.getElementById('team1');
    const team2List = document.getElementById('team2');
    const team3List = document.getElementById('team3');
    
    team1List.innerHTML = '';
    team2List.innerHTML = '';
    team3List.innerHTML = '';

    // Mostrar jogadores da Equipe 1
    team1.forEach(player => {
        const li = document.createElement('li');
        li.textContent = player;
        team1List.appendChild(li);
    });

    // Mostrar jogadores da Equipe 2
    team2.forEach(player => {
        const li = document.createElement('li');
        li.textContent = player;
        team2List.appendChild(li);
    });

    // Mostrar jogadores da Equipe 3 (restantes)
    team3.forEach(player => {
        const li = document.createElement('li');
        li.textContent = player;
        team3List.appendChild(li);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
