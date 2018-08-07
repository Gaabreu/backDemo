const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressMongoDb = require('express-mongo-db');

const app = express();

app.use(expressMongoDb('mongodb://localhost/cadastros'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('static'));


app.get('/cadastros', (req, res) =>{
    req.db.collection('cadastros').find({}).toArray(erro, cadastro =>{
        res.send(cadastros);
    });
});

app.get('/cadastro/:nome', (req,res)=>{
    if (!req.params.nome){
        return res.status(400).send({mensagem: "Nome é obrigatório"});
    }
    req.db.colletion('cadastros').findOne({nome: req.params.nome}, (erro,cadastro) =>{
        if(erro){
            console.log('erro:${erro}')
        }
        if(cadastro){
            return res.send(cadastro);
        }
        else{
            return res.send({});
        }
    });
});


app.post('/cadastro/cadastrar', (req,res) =>{
    if(!req.body.nome || !req.body.email || !req.body.senha){
        return res.status(400).send({mensagem: "Nome, email e senha são obrigatórios"});
    }
    req.db.collection('cadastros').insert(req.body, erro =>{
        if(erro){
            console.log(erro);
        }
        else{
            res.send({mensagem: 'Cadastro realizado com sucesso!'});
        }
    });
});

app.listen(3000, () => console.log('Aplicação iniciada.'));