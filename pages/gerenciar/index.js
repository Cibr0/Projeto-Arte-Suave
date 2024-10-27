function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
}

findUsers();

// Função para buscar usuários do Firestore
function findUsers() {
    firebase.firestore()
        .collection('usuarios')
        .get()
        .then(snapshot => {
            const users = snapshot.docs.map(doc => doc.data());
            addUsersToScreen(users); // Exibe todos os usuários inicialmente
            setupSearch(users); // Configura a barra de pesquisa
        })
        .catch(error => {
            console.error("Erro ao buscar usuários: ", error);
        });
}

// Função para configurar a barra de pesquisa
function setupSearch(users) {
    const searchInput = document.getElementById('searchInput');

    
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredUsers = users.filter(user => {
            const nomeMatch = user.nome && user.nome.toLowerCase().includes(searchTerm);
            const cpfMatch = user.cpf && user.cpf.toLowerCase().includes(searchTerm);
            return nomeMatch || cpfMatch; 
        });
        addUsersToScreen(filteredUsers); 
    });
}


function addUsersToScreen(users) {
    const orderedList = document.getElementById('users');
    const userCount = document.getElementById('userCount');

    
    orderedList.innerHTML = '';
    userCount.innerHTML = `Total de usuários: ${users.length}`;

    users.forEach(user => {
        const li = document.createElement('li');
        li.classList.add('user');

        
        const userInfo = document.createElement('p');
        userInfo.innerHTML = `Nome: ${user.nome} | CPF: ${user.cpf}`; 
        userInfo.style.cursor = 'pointer';

        
        const infoDiv = document.createElement('div');
        infoDiv.style.display = 'none';

        
        infoDiv.innerHTML = `
            <p>Emergência: ${user.emergencia}</p>
            <p>Endereço: ${user.endereco}</p>
            <p>Histórico: ${user.historico}</p>
            <p>Idade: ${user.idade}</p>
            <p>Telefone: ${user.telefone}</p>
            <p>Vencimento: ${user.vencimento}</p>
        `;

        
        userInfo.addEventListener('click', () => {
            infoDiv.style.display = infoDiv.style.display === 'none' ? 'block' : 'none'; 
        });

        li.appendChild(userInfo); 
        li.appendChild(infoDiv); 
        orderedList.appendChild(li);
    });
}


window.onload = findUsers;
