import express from "express";

import database from "./db.js";
import Aluno from "./aluno.js";

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

//Informa que o express deve converter automaticamente 
//  o corpo requisições e respostas para JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.status(200).send('Curso de Node');
});

app.get('/alunos', async (req, res) => {
    res.render('alunos.ejs', {alunos: await Aluno.findAll()});
});

app.get('/alunos/remover/:id', async (req, res) => {
    Aluno.destroy({where: {id: req.params.id}});

    res.redirect('/alunos');
})

app.get('/alteracao/:id', async (req, res) => {
    if (req.params.id == 0) {
        res.render('alteracao.ejs', {aluno: {id: 0}});
    }

    else {
        res.render('alteracao.ejs', {aluno: await Aluno.findByPk(req.params.id)});
    }
});

app.post('/alteracao/:id', async (req, res) => {
    try {
        if (req.params.id == 0) {
            await Aluno.create({
                matricula: req.body.Matricula,
                nome: req.body.Nome,
                dataDeNascimento: req.body.DataDeNascimento,
                email: req.body.Email,
                status: req.body.Status
            });
        }

        else {
            await Aluno.update({
                matricula: req.body.Matricula,
                nome: req.body.Nome,
                dataDeNascimento: req.body.DataDeNascimento,
                email: req.body.Email,
                status: req.body.Status,
            },

            {where: {id: req.params.id}});
        }
    }

    catch (erro) {
        console.log(erro);
    }

    finally {
        res.redirect('/alunos');
    }
});

export default app;
