// Não mexe pfvvvvvvvv (O registro e login tá no mesmo arquivo sim, dane-se tá 100% operacional!)
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Função para navegar da tela login para tela de home, somente se o user estiver no firebase
function login() {
    firebase.auth().signInWithEmailAndPassword(
        form.email().value, form.password().value
    ).then(response => {
        window.location.href = "../load/index.html";
    }).catch(error => {
        alert(getErrorMessage(error));
    });
}

function getErrorMessage(error) {
    if (error.code == "auth/invalid-credential") {
        return "Usuário não encontrado.";
    }
    if (error.code === "auth/invalid-email") {
        return "O e-mail fornecido não é válido.";
    } else if (error.code === "auth/user-disabled") {
        return "A conta do usuário foi desativada.";
    } else if (error.code === "auth/user-not-found") {
        return "Não há usuário cadastrado com o e-mail fornecido.";
    } else if (error.code === "auth/wrong-password") {
        return "A senha fornecida está incorreta.";
    } else if (error.code === "auth/email-already-in-use") {
        return "O e-mail já está sendo utilizado por outra conta.";
    } else if (error.code === "auth/operation-not-allowed") {
        return "O tipo de autenticação não está habilitado.";
    } else if (error.code === "auth/weak-password") {
        return "A senha fornecida é muito fraca.";
    } else if (error.code === "auth/too-many-requests") {
        return "O acesso foi temporariamente bloqueado devido a muitas tentativas de login falhas.";
    } else if (error.code === "auth/requires-recent-login") {
        return "Operação sensível, faça login novamente.";
    } else if (error.code === "auth/invalid-verification-code") {
        return "O código de verificação é inválido ou expirou.";
    } else if (error.code === "auth/invalid-verification-id") {
        return "O ID de verificação não é válido.";
    } else if (error.code === "auth/invalid-credential") {
        return "Usuário não encontrado.";
    }
    return error.message; 
}

const form = {
    email: () => document.getElementById("email"),
    password: () => document.getElementById("password"),
};

// Acaba aqui

// Função registro
function register() {
    const emailInput = document.getElementById('email_register');
    const passwordInput = document.getElementById('password_register');
    const codeInput = document.getElementById('code');

    const email = emailInput.value;
    const password = passwordInput.value;
    const code = codeInput.value;

    const correctCode = "123456"; // Substitua pela senha correta

    // Verifica se o código está correto
    if (code === correctCode) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                window.location.href = "../cadastro/cadastro.html";
            }).catch(error => {
                alert(getErrorMessage(error));
            });
    } else {
        alert("Código incorreto. Tente novamente.");
    }
}

// Atualiza o estado do botão de registro
function checkCode() {
    const codeInput = document.getElementById("code");
    const registerButton = document.getElementById("registerButton");

    // Habilita o botão se o campo 'code' não estiver vazio
    registerButton.disabled = codeInput.value.trim() === "";
}

// Acaba aqui

function recoverPassword() {
    firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
        alert('Email enviado com sucesso');
    }).catch(error => {
        alert(getErrorMessage(error));
    });
}
