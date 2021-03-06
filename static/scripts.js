let campoNome = document.querySelector('#nome');
let campoEmail = document.querySelector('#email');
let campoSenha = document.querySelector('#senha');
let botao = document.querySelector('button');
let lista = document.querySelector('ul');


function alterarCadastro(cadastro, atualizar=false){
    let endpoint;
    if(atualizar){
        endpoint = 'http://localhost:3000/email/atualizar'
    }
    else{
        endpoint = 'http://localhost:3000/email/cadastrar'
    }
    fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(cadastro),
        headers: {
            'Content-type': 'application/json'
        }
    }).then(() => {
        carregar();
    });
}

botao.addEventListener('click', () => {
    let cadastro = {
        nome: campoNome.value,
        email: campoEmail.value,
        senha: campoSenha.value
    }
    
    campoNome.value = '';
    campoEmail.value = '';
    campoSenha.value = '';
    
    fetch(`http://localhost:3000/email/${cadastro.nome}`).then(resposta => {
        return resposta.json();
    }).then(dados => {
        if(dados.nome){
            alterarCadastro(cadastro, true);
        }
        else{
            alterarCadastro(cadastro);
        }
    });

});

function carregar(){
    fetch('http://localhost:3000/emails').then(resposta => {
    return resposta.json();
}).then(cadastros => {
    lista.innerHTML = '';
    for(let cadastro of cadastros){
        montarTela(cadastro);
    }
});
}

carregar();