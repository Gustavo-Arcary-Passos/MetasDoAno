// const db = require('./database');
// const { format, eachDayOfInterval, startOfYear } = require('date-fns');

// function preencherRotinaDesdeInicioAno(nome) {
//     const hoje = new Date();
//     const primeiroDiaAno = startOfYear(hoje);

//     const datas = eachDayOfInterval({ start: primeiroDiaAno, end: hoje });

//     const stmt = db.prepare("INSERT INTO rotinas_historico (nome, data) VALUES (?, ?)");

//     const insert = db.transaction(() => {
//         for (const data of datas) {
//             const dataFormatada = format(data, 'yyyy-MM-dd');
//             try {
//                 stmt.run(nome, dataFormatada);
//             } catch (err) {
//                 console.error(`Erro ao inserir ${nome} para a data ${dataFormatada}:`, err.message);
//             }
//         }
//     });

//     insert();
//     console.log(`Rotina '${nome}' preenchida de ${format(primeiroDiaAno, 'yyyy-MM-dd')} até ${format(hoje, 'yyyy-MM-dd')}`);
// }

// const nomeRotina = 'Musculacao';
// preencherRotinaDesdeInicioAno(nomeRotina);
