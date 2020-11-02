// Config
const express = require('express');
const app = express();
const port = process.env.PORT || "1337";
app.set("port", port);
const mongoose = require('mongoose');
const cors = require('cors');
// Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://TesteUser:CZuPsm8VTFWOaMb3@cluster0.iojn0.mongodb.net/Teste?retryWrites=true&w=majority', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB conectado"))
.catch((err) => console.error("Erro ao conectar com o MongoDB "+err))
// Models
const Servico = require('./models/servicos')
// Midleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
// POST Servico
app.post('/Servico', function (req, res) {
    const data = req.body
    if(!data) {
        res.sendStatus(400)
    }
    new Servico(data).save()
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(400))
});
// GET all Servicos
app.get('/Servicos', function (req, res) {
    Servico.find()
         .then((Servicos) => res.send(Servicos))
         .catch(() => res.sendStatus(400));
});
// GET one Servico
app.get('/Servico/:ServicoId', function (req, res) {
    const ServicoId = req.params.ServicoId;
    Servico.findById(ServicoId)
         .then((Servico) => res.send(Servico))
         .catch(() => res.sendStatus(400));
});
// PUT Servicos
app.put('/Servico/:ServicoId', function (req, res) {
    const ServicoId = req.params.ServicoId;
    const data = req.body;
    if(!data || !ServicoId) {
        res.sendStatus(400)
    }
    
    Servico.findByIdAndUpdate(ServicoId, data)
         .then(() => res.sendStatus(200))
         .catch(() => res.sendStatus(400));
});
// DELETE Servicos
app.delete('/Servico/:ServicoId', function (req, res) {
    const ServicoId = req.params.ServicoId;
    Servico.findByIdAndRemove(ServicoId)
         .then(() => res.sendStatus(200))
         .catch(() => res.sendStatus(400));
});
// Subindo Server
app.listen(port, () => {
    console.log(`Servidor rodando em localhost:${port}`)
});
