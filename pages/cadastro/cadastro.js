// Verificar se os campos estão preenchidos e habilitar/desabilitar o botão "Próximo"
const formulario = document.getElementById('cadastro');
const botaoProximo = document.getElementById('botao-proximo');

function verificarCampos() {
    let todosPreenchidos = true;
    const inputs = formulario.querySelectorAll('input[required]');

    inputs.forEach(input => {
        if (!input.value || (input.pattern && !new RegExp(input.pattern).test(input.value))) {
            todosPreenchidos = false;
        }
    });

    botaoProximo.disabled = !todosPreenchidos; 
}

formulario.addEventListener('input', verificarCampos);

// Obter referências aos elementos do formulário
const form = {
    nome: () => document.getElementById('nome'),
    cpf: () => document.getElementById('cpf'),
    idade: () => document.getElementById('idade'),
    telefone: () => document.getElementById('telefone'),
    endereco: () => document.getElementById('endereco'),
    historico: () => document.getElementById('historico'),
    emergencia: () => document.getElementById('emergencia'),
    vencimento: () => document.getElementById('vencimento'),
}

// Função para cadastrar o cliente usando o UID já criado no Firebase Authentication
function cadastro_cliente() {
    // Monitorar o estado da autenticação para garantir que o usuário está logado
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // O usuário está logado, usar o UID para salvar os dados no Firestore
            const usuarios = {
                nome: form.nome().value,
                cpf: form.cpf().value,
                idade: parseFloat(form.idade().value),
                telefone: parseFloat(form.telefone().value),
                endereco: form.endereco().value,
                historico: form.historico().value,
                emergencia: parseFloat(form.emergencia().value),
                vencimento: form.vencimento().value,
                uid: user.uid // Usar o UID do usuário autenticado
            };

            // Salvar os dados no Firestore usando o UID como chave
            firebase.firestore().collection('usuarios').doc(user.uid).set(usuarios)
            .then(() => {
                // Redirecionar após salvar os dados com sucesso
                window.location.href = "../load/index.html";
            })
            .catch((error) => {
                console.error("Erro ao salvar os dados no Firestore:", error);
                alert("Erro ao salvar o cadastro.");
            });
        } else {
            // Se o usuário não estiver logado, exibe um alerta
            alert("Usuário não autenticado. Por favor, faça login primeiro.");
        }
    });
}

// Verificar se o formulário está válido antes de enviar
document.getElementById('cadastro').addEventListener('submit', function(event) {
    if (!this.checkValidity()) {
        event.preventDefault(); // Impede o envio se não for válido
        alert('Por favor, preencha todos os campos obrigatórios corretamente!');
    } else {
        event.preventDefault(); // Impede o envio para chamar a função de cadastro manualmente
        cadastro_cliente();
    }
});
