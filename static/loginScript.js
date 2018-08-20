let campoNome = document.querySelector('#nome');
let campoEmail = document.querySelector('#email');
let campoSenha = document.querySelector('#senha');
let botao = document.querySelector('button');
let lista = document.querySelector('ul');


function login(cadastro, logar=false){
    let endpoint;
    if(logar){
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

fetch(`http://localhost:3000/email/${cadastro.nome}`).then(resposta => {
return resposta.json();
}).then(dados => {
    if(dados.nome&&dados.email&&dados.senha){
        login(cadastro, true);
        
    }
    else{
        alert("Usuario não existe");
    }
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