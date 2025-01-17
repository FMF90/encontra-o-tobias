// Bem-vindo ao Encontra o Tobias!

console.log("Bem-vindo ao Encontra o Tobias!");

// Estado inicial do jogo
let encontrados = 0;

const gatos = [
    { src: "./assets/gato1.png", left: "10%", top: "35%" }, // Próximo da fonte, no limite inferior
    { src: "./assets/gato2.png", left: "25%", top: "30%" }, // Próximo da árvore central
    { src: "./assets/gato3.png", left: "36%", top: "37,6%" }, // Canto inferior direito
    { src: "./assets/gato4.png", left: "15%", top: "10%" }, // No telhado à esquerda
    { src: "./assets/gato5.png", left: "30%", top: "28%" }, // Próximo ao caminho na base
    { src: "./assets/gato6.png", left: "5%", top: "15%" }, // Próximo do arbusto esquerdo
    { src: "./assets/gato7.png", left: "12%", top: "22%" }, // Ao pé dos pintos
    { src: "./assets/gato8.png", left: "20%", top: "20%" }, // Ao pé do pneu
    { src: "./assets/gato9.png", left: "8%", top: "18%" },  // No banco
    { src: "./assets/gato10-tobias.png", left: "25%", top: "12%" } // Perto do centro superior
];

document.getElementById("jogar").addEventListener("click", () => {
    document.getElementById("menu-inicial").style.display = "none";
    const container = document.getElementById("nivel-container");
    container.style.display = "block";
    carregarNivel();
});

document.getElementById("instrucoes").addEventListener("click", () => {
    document.getElementById("modal-instrucoes").style.display = "block";
});

document.getElementById("fechar-instrucoes").addEventListener("click", () => {
    document.getElementById("modal-instrucoes").style.display = "none";
});

function carregarNivel() {
    const container = document.getElementById("nivel-container");
    container.innerHTML = ""; // Limpa o container antes de adicionar os elementos

    // Adicionar background
    const background = document.createElement("img");
    background.src = "./assets/nivel1.png"; // Certifica-te de que o caminho está correto
    background.classList.add("background");

    // Verificar se o background é carregado corretamente
    background.onload = () => {
        console.log("Background carregado:", background.src, background.naturalWidth, background.naturalHeight);
        container.style.height = `${background.naturalHeight}px`; // Ajusta a altura do container ao tamanho do background

        // Adicionar os gatos após o carregamento do background
        gatos.forEach(gato => {
            if (gato.src.includes("tobias")) {
                criarGatoTobias(gato, container, background);
            } else {
                criarGato(gato, container, background);
            }
        });
    };

    background.onerror = () => {
        console.error("Erro ao carregar o background:", background.src);
    };

    container.appendChild(background);

    // Adicionar o contador
    const contador = document.createElement("div");
    contador.id = "contador";
    contador.textContent = `Encontrados: 0/${gatos.length}`;
    container.appendChild(contador);
}

function criarGato(gato, container, background) {
    const img = document.createElement("img");
    img.src = gato.src;
    img.classList.add("gato");
    img.style.position = "absolute";

    // Ajustar as posições relativas ao tamanho do background
    img.style.left = `${(parseFloat(gato.left) / 100) * background.naturalWidth}px`;
    img.style.top = `${(parseFloat(gato.top) / 100) * background.naturalHeight}px`;

    img.style.width = "15%";
    img.style.transform = "translate(-50%, -50%)";

    img.addEventListener("click", () => {
        img.style.display = "none";
        encontrados++;
        atualizarContador();
    });

    container.appendChild(img);

    console.log(`Gato adicionado: ${gato.src}, Pos: ${img.style.left}, ${img.style.top}`);
}

function criarGatoTobias(gato, container, background) {
    const img = document.createElement("img");
    img.src = gato.src;
    img.classList.add("gato");
    img.style.position = "absolute";

    // Ajustar as posições relativas ao tamanho do background
    img.style.left = `${(parseFloat(gato.left) / 100) * background.naturalWidth}px`;
    img.style.top = `${(parseFloat(gato.top) / 100) * background.naturalHeight}px`;

    img.style.width = "15%";
    img.style.transform = "translate(-50%, -50%)";

    img.addEventListener("click", () => {
        if (!img.classList.contains("clicked")) {
            img.classList.add("clicked");
            img.style.display = "none";
            encontrados++;
            atualizarContador();

            // Criar o balão "Miau!"
            const balao = document.createElement("div");
            balao.textContent = "Miau!";
            balao.style.position = "absolute";
            balao.style.left = img.style.left;
            balao.style.top = `${parseFloat(img.style.top) - 50}px`;
            balao.style.padding = "10px";
            balao.style.backgroundColor = "white";
            balao.style.border = "2px solid black";
            balao.style.borderRadius = "15px";
            balao.style.zIndex = "10";
            balao.style.transform = "translate(-50%, -50%)";
            container.appendChild(balao);

            // Remover o balão após 1 segundo
            setTimeout(() => {
                container.removeChild(balao);
            }, 1000);
        }
    });

    container.appendChild(img);

    console.log(`Tobias adicionado: ${gato.src}, Pos: ${img.style.left}, ${img.style.top}`);
}

function atualizarContador() {
    const contador = document.getElementById("contador");
    contador.textContent = `Encontrados: ${encontrados}/${gatos.length}`;

    if (encontrados === gatos.length) {
        setTimeout(() => {
            alert("Parabéns, encontrou todos os gatos!");
        }, 500);
    }
}

// Inicializar o menu
mostrarMenuInicial();
