const mongoose = require('mongoose');
const ServicoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    criadoPor: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    status: {
        type: String
    },
    local: {
        type: Object,
        required: true
    },
    foto: {
      type: String
    },
    dataCriacao: {
      type: Date
    },
    dataModificacao: {
      type: Date
    }
});
mongoose.model('Servicos', ServicoSchema);
module.exports = mongoose.model('Servicos');