// =========================================================
// FUNÇÕES PURAS PARA MÁSCARA (MANTENHA ESTAS NO TOPO)
// =========================================================

function mascaraCPF(valor) {
    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return valor;
}

function mascaraCEP(valor) {
    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/^(\d{5})(\d)/, "$1-$2");
    return valor;
}

function mascaraTelefone(valor) {
    valor = valor.replace(/\D/g, '');
    if (valor.length > 10) {
        valor = valor.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (valor.length > 5) {
        valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else if (valor.length > 2) {
        valor = valor.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    } else {
        valor = valor.replace(/^(\d*)/, '($1');
    }
    return valor;
}


// =========================================================
// DELEGAÇÃO GLOBAL DE EVENTOS (ROBUSTA PARA SPA)
// =========================================================
document.addEventListener('input', function(e) {
    const target = e.target;

    // Máscara do Telefone
    if (target.id === 'telefone') {
        target.value = mascaraTelefone(target.value);
    }
});

document.addEventListener('keyup', function(e) {
    const target = e.target;

    // Máscara do CEP
    if (target.id === 'cep') {
        target.value = mascaraCEP(target.value);
    }

    // Máscara do CPF
    if (target.id === 'cpf') {
        target.value = mascaraCPF(target.value);
    }
});
// via cep
document.addEventListener('blur', function(e) {
    const target = e.target;

    if (target.id === 'cep') {
        console.log('Evento blur disparado! Valor:', target.value);

        const cep = target.value.replace(/\D/g, '');
        if (cep.length !== 8) return;

        const inputLogradouro = document.getElementById('logradouro');
        const inputBairro = document.getElementById('bairro');
        const inputCidade = document.getElementById('cidade');
        const inputEstado = document.getElementById('estado');

        if (!inputLogradouro || !inputCidade || !inputEstado) return;

        const url = `https://viacep.com.br/ws/${cep}/json/`;

        inputLogradouro.value = 'Buscando...';
        inputBairro.value = 'Buscando...';
        inputCidade.value = 'Buscando...';
        inputEstado.value = 'Buscando...';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (!("erro" in data)) {
                    inputLogradouro.value = data.logradouro;
                    inputBairro.value = data.bairro || '';
                    inputCidade.value = data.localidade;
                    inputEstado.value = data.uf;

                    const inputNumero = document.getElementById('numero');
                    if (inputNumero) inputNumero.focus();
                } else {
                    alert("CEP não encontrado.");
                }
            })
            .catch(error => {
                console.error('Erro na busca de CEP:', error);
            });
    }
}, true); // <<< ISSO AQUI É FUNDAMENTAL


// =========================================================
// LÓGICA DE SUBMIT (Precisa ser chamada DEPOIS da injeção do formulário)
// =========================================================

// Esta lógica precisa ser chamada pelo seu código SPA após carregar 'voluntariado.html'
// Se você está usando a estrutura que enviamos antes (loadPage), MANTENHA-A.
function initializeFormSubmitLogic() {
    const form = document.getElementById('formVoluntario');
    const mensagemSucesso = document.getElementById('mensagemSucesso');

    if (form && mensagemSucesso) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            setTimeout(() => {
                form.style.display = 'none';
                mensagemSucesso.classList.add('mostrar-mensagem');
                mensagemSucesso.style.opacity = '1'; // Para garantir a visibilidade
                mensagemSucesso.style.height = 'auto';
                mensagemSucesso.style.visibility = 'visible';
            }, 300);
        });
    } else {
        console.error("ERRO: O formulário ou a mensagem de sucesso não foram encontrados para ligar o submit.");
    }
}
// =========================================================
// VALIDAÇÃO DO FORMULÁRIO COM CPF VÁLIDO
// =========================================================

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("formVoluntario");

    if (!form) {
        console.error("Formulário não encontrado para validação!");
        return;
    }

    // Função para validar CPF oficialmente
    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, ''); // remove tudo que não for número

        if (cpf.length !== 11) return false;

        // elimina CPFs conhecidos inválidos
        if (/^(\d)\1+$/.test(cpf)) return false;

        let soma = 0,
            resto;

        // primeiro dígito verificador
        for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;

        // segundo dígito verificador
        soma = 0;
        for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    }

    form.addEventListener("submit", function(e) {
        e.preventDefault(); // Impede envio até validar

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const cpf = document.getElementById("cpf").value.trim();
        const telefone = document.getElementById("telefone").value.trim();
        const nascimento = document.getElementById("nascimento").value;
        const cep = document.getElementById("cep").value.trim();
        const logradouro = document.getElementById("logradouro").value.trim();
        const numero = document.getElementById("numero").value.trim();
        const bairro = document.getElementById("bairro").value.trim();
        const cidade = document.getElementById("cidade").value.trim();
        const estado = document.getElementById("estado").value.trim();

        // ==========================
        // REGRAS DE VALIDAÇÃO
        // ==========================

        if (nome.length < 3) {
            alert("Por favor, informe seu nome completo.");
            return;
        }

        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            alert("Informe um e-mail válido.");
            return;
        }

        // CPF válido
        if (!validarCPF(cpf)) {
            alert("Informe um CPF válido.");
            return;
        }

        // Telefone - pelo menos 10 dígitos
        const telefoneNumeros = telefone.replace(/\D/g, "");
        if (telefoneNumeros.length < 10) {
            alert("Informe um telefone válido com DDD.");
            return;
        }

        // Data de nascimento
        if (!nascimento) {
            alert("Informe sua data de nascimento.");
            return;
        }

        const dataNasc = new Date(nascimento);
        const hoje = new Date();
        const idade = hoje.getFullYear() - dataNasc.getFullYear();
        const mesDiff = hoje.getMonth() - dataNasc.getMonth();
        const diaDiff = hoje.getDate() - dataNasc.getDate();
        const idadeReal = mesDiff < 0 || (mesDiff === 0 && diaDiff < 0) ? idade - 1 : idade;

        if (dataNasc > hoje) {
            alert("A data de nascimento não pode ser no futuro.");
            return;
        }

        if (idadeReal < 18) {
            alert("Você precisa ter pelo menos 18 anos para se cadastrar.");
            return;
        }

        if (idadeReal > 100) {
            alert("A idade máxima permitida é de 100 anos.");
            return;
        }

        // CEP - precisa ter 8 dígitos
        const cepNumeros = cep.replace(/\D/g, "");
        if (cepNumeros.length !== 8) {
            alert("Informe um CEP válido com 8 dígitos.");
            return;
        }

        if (!logradouro || !numero || !bairro || !cidade || !estado) {
            alert("Preencha todos os campos do endereço.");
            return;
        }

        // Se tudo estiver OK
        Swal.fire({
            title: 'Sucesso! 🎉',
            text: 'Formulário validado com sucesso!',
            icon: 'success',
            timer: 7000,
            timerProgressBar: true,
            showConfirmButton: false
        }).then(() => {
            form.submit();
        });

    });
});
// =========================================================
// FORMULÁRIO DE CONTATO - VALIDAÇÃO E ALERTA
// =========================================================
document.addEventListener("DOMContentLoaded", function() {
    const formContato = document.getElementById("formContatoGeral");

    if (!formContato) return;

    formContato.addEventListener("submit", function(e) {
        e.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefone = document.getElementById("telefone").value.trim();
        const assunto = document.getElementById("assunto").value;
        const detalhes = document.getElementById("detalhes").value.trim();
        const msgSucesso = document.getElementById("mensagemSucesso");

        // ========== VALIDAÇÕES ==========
        if (nome.length < 3) {
            Swal.fire({
                icon: 'warning',
                title: 'Ops...',
                text: 'Por favor, informe seu nome completo.',
                confirmButtonColor: '#2F4F4F'
            });
            return;
        }

        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            Swal.fire({
                icon: 'error',
                title: 'E-mail inválido!',
                text: 'Digite um e-mail de contato válido.',
                confirmButtonColor: '#2F4F4F'
            });
            return;
        }

        if (telefone.replace(/\D/g, '').length < 10) {
            Swal.fire({
                icon: 'error',
                title: 'Telefone incorreto!',
                text: 'Informe um número válido com DDD.',
                confirmButtonColor: '#2F4F4F'
            });
            return;
        }

        if (!assunto) {
            Swal.fire({
                icon: 'info',
                title: 'Escolha um motivo',
                text: 'Selecione o motivo do seu contato.',
                confirmButtonColor: '#2F4F4F'
            });
            return;
        }

        if (detalhes.length < 10) {
            Swal.fire({
                icon: 'question',
                title: 'Mensagem muito curta!',
                text: 'Conte um pouquinho mais sobre o que você precisa 😊',
                confirmButtonColor: '#2F4F4F'
            });
            return;
        }

        // ========== SUCESSO ==========
        Swal.fire({
            icon: 'success',
            title: 'Mensagem enviada com sucesso! ☕',
            text: 'Em breve entraremos em contato.',
            showConfirmButton: false,
            timer: 6000,
            timerProgressBar: true
        });

        msgSucesso.style.display = "block";
        formContato.reset();

        setTimeout(() => {
            msgSucesso.style.display = "none";
        }, 6000);
    });
});