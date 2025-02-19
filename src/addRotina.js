formRotina.addEventListener("submit", async function(event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value.trim();
    let descricao = document.getElementById("descricao").value.trim();
    let frequencia = document.getElementById("frequencia").value;
    let color = paraRGB(document.getElementById("color").value);


    if (nome === "" || descricao === "" || frequencia === "") {
        alert("Por favor, preencha todos os campos antes de adicionar a rotina.");
        return;
    }

    try {
        await window.api.addRotina(nome, descricao, frequencia, color);

        window.location.href = "rotina.html";
    } catch (error) {
        console.error("Erro ao adicionar rotina:", error);
        alert("Ocorreu um erro ao adicionar a rotina.");
    }
});
