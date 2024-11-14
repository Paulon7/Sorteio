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
    if (players.length < 5) {
        alert("Adicione pelo menos cinco jogadores para sortear as equipes.");
        return;
    }

    let team1 = [];
    let team2 = [];
    let team3 = [];
    let remainingPlayers = [...players];

    // Jogadores forçados para a Equipe 1
    const forceTeam3 = ['Paulo', 'Rhuan', 'P.A', 'Iury', 'Paulão', 'Rian'];

    // Remover jogadores forçados das listas e adicionar à Equipe 1 até o limite de 5 jogadores
    forceTeam1.forEach(forcedPlayer => {
        const playerIndex = remainingPlayers.findIndex(player => player.toLowerCase() === forcedPlayer.toLowerCase());
        if (playerIndex !== -1 && team1.length < 5) {
            team1.push(remainingPlayers[playerIndex]);
            remainingPlayers.splice(playerIndex, 1);
        }
    });

    // Embaralhar jogadores restantes
    remainingPlayers = shuffleArray(remainingPlayers);

    // Distribuir os jogadores restantes nas equipes, limitando cada uma a 5 jogadores
    while (team1.length < 5 && remainingPlayers.length > 0) {
        team1.push(remainingPlayers.shift());
    }

    while (team2.length < 5 && remainingPlayers.length > 0) {
        team2.push(remainingPlayers.shift());
    }

    while (team3.length < 5 && remainingPlayers.length > 0) {
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

    team1.forEach(player => {
        const li = document.createElement('li');
        li.textContent = player;
        team1List.appendChild(li);
    });

    team2.forEach(player => {
        const li = document.createElement('li');
        li.textContent = player;
        team2List.appendChild(li);
    });

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
