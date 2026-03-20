const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Helper para transformar rl.question em Promise
const question = (query) => new Promise((resolve) => rl.question(query, resolve));

let elementos = [];

// --- NOVA FUNÇÃO DE VALIDAÇÃO ---
async function pedirEstadoValido() {
    while (true) {
        const entrada = await question("Estado (livre/ocupado): ");
        const formatado = entrada.toLowerCase().trim();

        if (formatado === "livre" || formatado === "ocupado") {
            return formatado;
        }

        console.log("❌ Erro: Entrada inválida! Por favor, escreva apenas 'livre' ou 'ocupado'.");
    }
}

async function menu() {
    while (true) {
        console.log("\n========= MENU =========");
        console.log("1. Adicionar elemento");
        console.log("2. Listar elementos");
        console.log("3. Alterar estado");
        console.log("6. Sair");

        const opcao = await question("Escolha uma opção: ");

        switch (opcao) {
            case "1": await adicionarElemento(); break;
            case "2": listarElementos(); break;
            case "3": await alterarEstado(); break;
            case "6":
                console.log("Saindo...");
                rl.close();
                return;
            default:
                console.log("⚠️ Opção inválida!");
        }
    }
}

async function adicionarElemento() {
    const idInput = await question("ID (número): ");
    const id = parseInt(idInput);
    
    if (isNaN(id)) {
        console.log("❌ ID precisa de ser um número!");
        return;
    }

    const capacidade = parseInt(await question("Capacidade: "));
    
    // Chamada da nova função de validação
    const estado = await pedirEstadoValido();

    elementos.push({ id, capacidade, estado });
    console.log("✅ Elemento adicionado com sucesso!");
}

async function alterarEstado() {
    const id = await question("ID do elemento: ");
    const elemento = elementos.find(e => e.id == id);

    if (elemento) {
        console.log(`Estado atual: ${elemento.estado}`);
        // Reutilizamos a mesma lógica de validação aqui
        elemento.estado = await pedirEstadoValido();
        console.log("✅ Estado atualizado!");
    } else {
        console.log("❌ Elemento não encontrado.");
    }
}

function listarElementos() {
    elementos.length ? console.table(elementos) : console.log("Sem dados.");
}

menu();