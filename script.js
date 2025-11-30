// --- 1. FUNÇÃO TEMPORAL (Requisito: Tornar dinâmico) ---
function carregarSaudacao() {
    const elementoSaudacao = document.getElementById("saudacao");
    
    // Se o elemento não existir na página (ex: paginas internas), para a função
    if (!elementoSaudacao) return;

    const dataAgora = new Date();
    const hora = dataAgora.getHours(); // Pega a hora (0 a 23)
    let texto = "";

    if (hora >= 6 && hora < 12) {
        texto = "☀️ Bom dia! Já brincou com seu pet hoje?";
    } else if (hora >= 12 && hora < 18) {
        texto = "🌤️ Boa tarde! Que tal um petisco para seu amigo?";
    } else {
        texto = "🌙 Boa noite! Hora do descanso merecido.";
    }

    elementoSaudacao.innerText = texto;
}

// Executa a saudação assim que a página carrega
window.onload = carregarSaudacao;


// --- 2. LÓGICA DO FORMULÁRIO (Requisito: Validar/Interagir) ---
function confirmarAgendamento(event) {
    // Evita que a página recarregue de verdade (comportamento padrão do form)
    event.preventDefault();

    // Captura alguns dados para mostrar no alerta
    const nomeTutor = document.getElementById("nome").value;
    const nomePet = document.getElementById("nomePet").value;
    const servico = document.getElementById("servico").value;
    const data = document.getElementById("dataAgendamento").value;
    const hora = document.getElementById("horaAgendamento").value;

    // Verifica qual transporte foi selecionado
    let transporte = "Entrega no local";
    if (document.getElementById("teleBusca").checked) {
        transporte = "Tele-busca (Buscaremos seu pet)";
    }

    // Cria uma mensagem de resumo
    const mensagem = `
    ✅ Agendamento Realizado com Sucesso!
    
    👤 Tutor: ${nomeTutor}
    🐾 Pet: ${nomePet}
    🛁 Serviço: ${servico}
    📅 Data: ${data} às ${hora}
    🚚 Transporte: ${transporte}
    
    Entraremos em contato pelo WhatsApp para confirmar!
    `;

    alert(mensagem);

    // Opcional: Limpar o formulário após o "envio"
    document.getElementById("formAgendamento").reset();
}