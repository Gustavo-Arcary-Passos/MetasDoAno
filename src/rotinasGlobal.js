const db = require('./database');

class Rotina {
    constructor(nome, description, frequency) {
        this.nome = nome;
        this.description = description;
        this.frequency = frequency;
    }
}

function getRotinas() {
    const stmt = db.prepare('SELECT * FROM rotinas');
    return stmt.all(); 
}

function adicionarRotina(nome, description, frequency) {
    try {
        const stmt = db.prepare("INSERT INTO rotinas (nome, description, frequency) VALUES (?, ?, ?)");
        stmt.run(nome, description, frequency);
        return true;
    } catch (err) {
        console.error('Erro ao adicionar rotina:', err.message);
        return false;
    }
}

function removerRotina(nome) {
    try {
        const stmt = db.prepare("DELETE FROM rotinas WHERE nome = ?");
        stmt.run(nome);
        return true;
    } catch (err) {
        console.error('Erro ao remover rotina:', err.message);
        return false;
    }
}

function getRotinaDatas(nome) {
    console.log("Nome da rotina:", nome);
    const stmt = db.prepare('SELECT * FROM rotinas_historico WHERE nome = ?');
    return stmt.all(nome);
}

function adicionarRotinaData(nome, data) {
    try {
        const stmt = db.prepare("INSERT INTO rotinas_historico (nome, data) VALUES (?, ?)");
        stmt.run(nome, data);
        return true;
    } catch (err) {
        console.error('Erro ao adicionar data da rotina:', err.message);
        return false;
    }
}

function removerRotinaData(nome, data) {
    try {
        const stmt = db.prepare("DELETE FROM rotinas_historico WHERE nome = ? AND data = ?");
        stmt.run(nome, data);
        return true;
    } catch (err) {
        console.error('Erro ao remover rotina:', err.message);
        return false;
    }
}

module.exports = { getRotinas, adicionarRotina, removerRotina, getRotinaDatas, adicionarRotinaData, removerRotinaData};