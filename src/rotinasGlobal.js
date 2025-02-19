const db = require('./database');
const { data, day, week, month, groupDatesBy } = require('./data');

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

function adicionarRotina(nome, description, frequency, color) {
    try {
        const stmt = db.prepare("INSERT INTO rotinas (nome, description, frequency, color) VALUES (?, ?, ?, ?)");
        stmt.run(nome, description, frequency, color);
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

function getRotinaHoje(data) {
    const primeiroDomingo = week.getSundayOfWeek(data); // Obtém o primeiro domingo da semana
    const primeiroDiaMes = month.getFirstDayOfMonth(data); // Obtém o primeiro dia do mês

    const stmtDiaria = db.prepare(`
        SELECT r.nome 
        FROM rotinas_historico rh 
        JOIN rotinas r ON rh.nome = r.nome 
        WHERE rh.data = ? AND r.frequency = 'Diária'
    `);
    const rotinasDiarias = stmtDiaria.all(data);

    const stmtSemanal = db.prepare(`
        SELECT r.nome 
        FROM rotinas_historico rh 
        JOIN rotinas r ON rh.nome = r.nome 
        WHERE rh.data = ? AND r.frequency = 'Semanal'
    `);
    const rotinasSemanais = stmtSemanal.all(primeiroDomingo);

    const stmtMensal = db.prepare(`
        SELECT r.nome 
        FROM rotinas_historico rh 
        JOIN rotinas r ON rh.nome = r.nome 
        WHERE rh.data = ? AND r.frequency = 'Mensal'
    `);
    const rotinasMensais = stmtMensal.all(primeiroDiaMes);

    const rotinasHoje = [...rotinasDiarias, ...rotinasSemanais, ...rotinasMensais];

    console.log("Rotinas marcadas hoje:", rotinasHoje);
    return rotinasHoje;
}

function getRotinaDatas(nome) {
    const stmt = db.prepare('SELECT data FROM rotinas_historico WHERE nome = ?');
    const dayRotinaChecked = stmt.all(nome);
    console.log("Rotina dias realizados:", dayRotinaChecked);
    return dayRotinaChecked;
}

function adicionarRotinaData(nome, data) {
    try {
        const stmtCheck = db.prepare("SELECT COUNT(*) AS count FROM rotinas_historico WHERE nome = ? AND data = ?");
        const row = stmtCheck.get(nome, data);

        if (row.count > 0) {
            console.log(`A rotina ${nome} para a data ${data} já existe.`);
            return false;
        }
        
        const stmt = db.prepare("INSERT INTO rotinas_historico (nome, data) VALUES (?, ?)");
        stmt.run(nome, data);

        if (stmt.changes > 0) {
            console.log(`Rotina ${nome} adicionada para a data ${data}`);
            return true;
        }

        return false;
    } catch (err) {
        console.error(`Erro ao adicionar data da rotina: ${nome} e ${data}`, err.message);
        return false;
    }
}

function removerRotinaData(nome, data) {
    try {
        const stmt = db.prepare("DELETE FROM rotinas_historico WHERE nome = ? AND data = ?");
        stmt.run(nome, data);
        if (stmt.changes > 0) {
            console.log(`Rotina ${nome} removida para a data ${data}`);
            return true;
        }
        return false;
    } catch (err) {
        console.error('Erro ao remover rotina:', err.message);
        return false;
    }
}

module.exports = { getRotinas, adicionarRotina, removerRotina, getRotinaHoje, getRotinaDatas, adicionarRotinaData, removerRotinaData};