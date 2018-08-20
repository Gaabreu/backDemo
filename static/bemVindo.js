function montarTela(cadastro){
    let entrada = document.createElement('li');
    let texto = document.createElement('span');
    texto.innerHTML = `Bem-vindo ${cadastro.nome}`;
    let botao = document.createElement('button');
    botao.innerHTML = "Apagar";
    botao.addEventListener('click', apagarItem);
    
    entrada.appendChild(texto);
    entrada.appendChild(botao);
    lista.appendChild(entrada);
}