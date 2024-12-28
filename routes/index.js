var express = require('express');
var router = express.Router();

var MersenneTwister = require('mersenne-twister');
var generator = new MersenneTwister();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


// import { LoremIpsum } from 'lorem-ipsum';
const LoremIpsum = require('lorem-ipsum').LoremIpsum;

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

function randomArticle() {
  var articles = ['a', 'the'];
  return articles[Math.floor(generator.random() * articles.length)];
}

function randomNoun() {
  var nouns = [
    'desperdício', 'aumento', 'céu', 'chifre', 'suéter', 'cabeça', 'empurrão',
    'sino', 'passageiro', 'meia', 'boca', 'formiga', 'zoológico', 'feriado',
    'ramo', 'cobra', 'tordo', 'faca', 'parte', 'trono', 'distribuição',
    'mulheres', 'cuidado', 'pão', 'ângulo', 'sono', 'mangueira', 'vapor',
    'calendário', 'banheira', 'véu', 'reflexão', 'queda', 'exército', 'filha',
    'lugar', 'iniciante', 'anúncio', 'córrego', 'caminhão', 'pá', 'título',
    'uso', 'início', 'grau', 'névoa', 'treinador', 'anel', 'intervalo',
    'chama', 'ralo', 'refeição', 'pergunta', 'rocha', 'bandeira', 'ação',
    'fio', 'guarda-chuva', 'crença', 'sujeira', 'sabor', 'sal', 'seda', 'queixo',
    'estrada', 'canalha', 'substância', 'posição', 'mosca', 'mágica',
    'direção', 'efeito', 'design', 'menina', 'doutor', 'quartzo', 'marmelo',
    'copo', 'riqueza', 'ideia', 'agulha', 'alarme', 'biblioteca', 'carro',
    'declive', 'chance', 'máquina', 'alcance', 'pera', 'navio', 'alfinete',
    'atração', 'erro', 'parede', 'planta', 'creme dental', 'temperamento',
    'veia', 'tipo', 'detalhe', 'sabão', 'bomba', 'vaca', 'interesse', 'fim',
    'luva', 'preço', 'tarde', 'trama', 'repolho', 'carne', 'história',
    'beisebol', 'filhote', 'propósito', 'sala', 'movimento', 'prisão', 'tamanho',
    'van', 'arroz', 'educação', 'costas', 'chaleira', 'dente', 'bebê', 'pano',
    'sol', 'quintal', 'irmã', 'ensino', 'medida', 'janela', 'pensamento',
    'plantação', 'quadro', 'aritmética', 'teoria', 'atrito', 'rato', 'vento',
    'primavera', 'crescimento', 'boné', 'lâmpada', 'avião', 'frente', 'ataque',
    'harmonia', 'beijo', 'emoção', 'inverno', 'oferta', 'cheiro', 'zinco',
    'criatura', 'cabelo', 'barco', 'caderno', 'desejo', 'conexão', 'aperto',
    'fada', 'cor', 'linha', 'vôlei', 'caracol', 'homem', 'território', 'oceano',
    'aço', 'morte', 'servo', 'fantasma', 'estrutura', 'ouro', 'trava', 'gansos',
    'pacote', 'distância', 'forma', 'garganta', 'mercado', 'quantidade', 'trilho',
    'veado', 'macaco', 'dedo', 'poeira', 'ferida', 'toque', 'topo', 'governador',
    'animal', 'martelo', 'sociedade', 'recompensa', 'comida', 'dia', 'prata',
    'ódio', 'punição', 'pássaro', 'gancho', 'amor', 'avião', 'peso',
    'seleção', 'chave inglesa', 'morcego', 'telhado', 'urso', 'ministro',
    'prateleira', 'bola', 'bolo', 'acordo', 'autoridade', 'equilíbrio', 'jarra',
    'olhar', 'xadrez', 'atividade', 'pingente', 'braço', 'olho', 'parafuso',
    'rato', 'queijo', 'ritmo', 'existência', 'golpe', 'escola', 'voo', 'escritório',
    'nota', 'onda', 'costa', 'meio', 'mulher', 'balde', 'invenção', 'sabor',
    'água-viva', 'lucro', 'sangue', 'salto', 'textura', 'acampamento',
    'corrida', 'férias', 'arma', 'nome', 'semana', 'bobina', 'propriedade',
    'exemplo', 'unidade', 'fio', 'praia', 'espantalho', 'protesto', 'filho',
    'junção', 'metal', 'vista', 'casaco', 'polegar', 'jogo', 'mar', 'mingau',
    'imposto', 'chapéu', 'sentido', 'bolsa', 'comparação', 'cereja', 'trem',
    'carrinho', 'amigo', 'ordem', 'almoço', 'areia movediça', 'bicicleta',
    'ilha', 'prosa', 'mesa', 'diversão', 'raio', 'distintivo', 'mudança', 'corvo',
    'guitarra', 'competição', 'palavra', 'roda', 'troca', 'cena', 'névoa',
    'laranja', 'gemada', 'vara', 'fumaça', 'chão', 'pó', 'empresa', 'geleia',
    'molusco', 'lâmina', 'giz de cera', 'água', 'prato', 'mina', 'medo',
    'fazenda', 'pato', 'biscoito', 'panela', 'peru', 'verso', 'aparelho',
    'tela', 'animal de estimação', 'perda', 'hora', 'cano', 'pedra', 'chute',
    'apoio', 'respiração', 'flor', 'gota', 'carne', 'multidão', 'ator',
    'arado', 'dinossauro', 'eu', 'puxão', 'arco', 'juiz', 'luva', 'sapato',
    'ovelha', 'moeda', 'governo', 'coisa', 'quadrado', 'crédito', 'observação',
    'crença', 'ano', 'transporte', 'açúcar', 'dentes', 'indústria', 'natureza',
    'balde', 'lavagem', 'estanho', 'botão', 'eletrodoméstico', 'decisão',
    'truque', 'bolha', 'terremoto', 'produção', 'fósforo', 'evento', 'espirro',
    'cavalo', 'descoberta', 'registro', 'vaso', 'trilha', 'dobra', 'recibo',
    'viagem', 'grupo', 'montanha', 'canção', 'trimestre', 'caixa', 'avó',
    'borda', 'homens', 'língua', 'cozinheiro', 'suco', 'cortina', 'fronteira',
    'pulso', 'madeira', 'divisão', 'escrivaninha', 'chuva', 'coelho', 'ponte',
    'trovão', 'terno', 'pai', 'comportamento', 'show', 'mente', 'inhame',
    'paz', 'mês', 'imagem', 'valor', 'aipo', 'rota', 'colher', 'lata', 'tio',
    'refrigerante', 'esticada', 'voz', 'choque', 'mãe', 'porto', 'vestido',
    'deslizamento', 'inseto', 'cais', 'gatinho', 'aniversário', 'líquido',
    'areia', 'menino', 'chicote', 'surpresa', 'cesta', 'rebanho', 'secretário',
    'experiência', 'controle', 'colcha', 'colina', 'elenco', 'milho', 'esfregar',
    'ato', 'tratamento', 'bit', 'vegetal', 'escrita', 'galinha', 'mamãe',
    'sistema', 'saúde', 'rosto', 'coroa', 'gatinho', 'gado', 'galho', 'problema',
    'igreja', 'alface', 'empregada', 'desejo', 'balanço', 'tremor', 'portão',
    'reunião', 'nascimento', 'pedido', 'neve', 'mel', 'aranha', 'necessidade',
    'zebra', 'cama', 'madeira', 'uva', 'noite', 'bandeja', 'rifle', 'ferro',
    'jóia', 'criador', 'estranho', 'carvão', 'legenda', 'círculo', 'silêncio',
    'renda', 'caixa', 'guia', 'teia de aranha', 'lado', 'orelha', 'cachecol',
    'plástico', 'galinha', 'esponja', 'meia-calça', 'isca', 'casa', 'móveis',
    'gato', 'afirmação', 'cheiro', 'tijolo', 'camisa', 'trincar', 'mordida',
    'ferrovia', 'país', 'tomate', 'espião', 'ninho', 'girar', 'número', 'renda',
    'realizador', 'sequência', 'jantar', 'papel', 'força', 'grama', 'calçada',
    'árvore', 'taxa', 'iaque', 'teste', 'girafa', 'tempo', 'humor', 'comércio',
    'aprovação', 'carta', 'guerra', 'nadar', 'trabalho', 'visitante', 'ponto',
    'medalhão', 'dedo do pé', 'roupa íntima', 'forma', 'riso', 'dívida', 'cotovelo',
    'cauda', 'relógio', 'creme', 'folha', 'estação', 'carruagem', 'rio',
    'rua', 'adição', 'tia', 'casa', 'livro', 'representante', 'motor',
    'hidrante', 'bebida', 'bilhete', 'cobre', 'colarinho', 'bombeiro', 'ensopado',
    'grau', 'navio', 'caneta', 'desenvolvimento', 'poder', 'batata', 'carne de boi',
    'fato', 'patinação', 'lã', 'sopa', 'respeito', 'comitê', 'poluição',
    'talo', 'sorriso', 'fogão', 'avô', 'campo', 'religião', 'causa', 'cartão',
    'praga', 'conta', 'som', 'tanque', 'quente', 'porco', 'calor', 'fio',
    'minuto', 'gelo', 'palha', 'raiva', 'presa', 'brisa', 'pagamento', 'pé',
    'cidade', 'gigante', 'verão', 'vinho', 'ar', 'estômago', 'terra', 'torção',
    'razão', 'base', 'almofada', 'panqueca', 'garfo', 'manteiga', 'corda',
    'tinta', 'veneno', 'vela', 'crime', 'raiz', 'enigma', 'ruído', 'caminhada',
    'centavo', 'página', 'bastão', 'descanso', 'zíper', 'especialista', 'tendência',
    'lâmpada', 'destruição', 'joelho', 'semente', 'hortelã', 'ovo', 'quarto',
    'memória', 'pizza', 'corrente', 'espaço', 'sofá', 'buraco', 'basquete',
    'lábio', 'dinheiro', 'parceiro', 'giz', 'marca', 'passo', 'berço',
    'apito', 'parada', 'pescoço', 'rosa', 'vergonha', 'instrumento', 'nível',
    'pena', 'escala', 'sentimento', 'conselho', 'couro', 'expansão', 'pipoca',
    'relação', 'cemitério', 'cabo', 'porteiro', 'rolo', 'canal', 'baixo',
    'viagem', 'perna', 'impulso', 'clima', 'tentilhão', 'verme', 'assento',
    'irmão', 'sapo', 'caverna', 'rainha', 'porta', 'limite', 'história',
    'salão', 'joaninha', 'corte de cabelo', 'ciência', 'arbusto', 'osso',
    'gaveta', 'loja', 'esperança', 'discussão', 'nariz', 'escova de dentes',
    'pia', 'saco', 'mármore', 'palco', 'canhão', 'adega', 'batalha', 'faísca',
    'centro da cidade', 'arte', 'conhecimento', 'nervo', 'lago', 'picles',
    'câmera', 'ancinho', 'fala', 'caminho', 'esmagar', 'idioma', 'sugestão',
    'estrela', 'hobby', 'peixe', 'conta', 'costura', 'caixa de correio',
    'andarilho', 'calculadora', 'esquilo', 'cera', 'tosse', 'trabalhador',
    'tabuleta', 'colete', 'combustível', 'cachorro', 'banho', 'latão', 'músculo',
    'nação', 'aeroporto', 'carpinteiro', 'seguro', 'panela', 'freio', 'burro',
    'leitura', 'linho', 'massa', 'explosão', 'mancha', 'trevo', 'chave',
    'edifício', 'sinal', 'capa', 'boneca', 'dedo', 'terra', 'máscara', 'norte',
    'negócio', 'abelha', 'noz', 'chão', 'hospital', 'escritor', 'classe',
    'fogo', 'discussão', 'loja', 'leite', 'vidro', 'sapo', 'curva', 'limite',
    'bacia', 'refeitório', 'regra', 'ajuste', 'torta', 'tigre', 'bota', 'geleia',
    'sombra', 'fruta', 'bomba', 'lua', 'lápis', 'bolso', 'reação', 'condição',
    'tempestade', 'roupa', 'arrependimento', 'prazer', 'asa', 'cacto',
    'crianças', 'saia', 'pessoa', 'selo', 'nó', 'óleo', 'forno', 'fruta',
    'brinquedo', 'festa', 'bebê', 'equipe', 'movimento', 'digestão', 'neve',
    'grão', 'condução', 'clube', 'pele', 'tenda', 'vulcão', 'manhã', 'garrafa',
    'tremor'
  ];
  return nouns[Math.floor(generator.random() * nouns.length)];
}

function randomVerb() {
  var verbs = ['reza', 'brota', 'abre', 'planta', 'sombra', 'sinaliza', 'treme',
  'fisga', 'mente', 'empresta', 'perfura', 'deseja', 'chega', 'observa', 'entrega',
  'cumprimenta', 'informa', 'assedia', 'esmaga', 'quer', 'chora', 'pisca', 'engana',
  'repara', 'numera', 'despe', 'ajoelha', 'admite', 'combina', 'contém', 'ri',
  'sente falta', 'cansa', 'vive', 'goteja', 'admira', 'ancora', 'compete',
  'rabisca', 'convida', 'examina', 'estoura', 'lustra', 'verifica', 'aterra',
  'amarra', 'chove', 'cobre', 'encara', 'bate', 'anuncia', 'marca', 'interrompe',
  'borrifa', 'decai', 'pregoa', 'estraga', 'aquece', 'compartilha', 'engana',
  'ferve', 'satisfaz', 'precede', 'compra', 'tosse', 'descasca', 'fecha',
  'respira', 'esfrega', 'casa', 'estende', 'suga', 'explode', 'prepara',
  'amarra', 'reboca', 'anseia', 'organiza', 'cuida', 'arrisca', 'explica',
  'tenta', 'rejubila', 'corre', 'salta', 'tropeça', 'confia', 'ajuda', 'flui',
  'ordena', 'escava', 'grava', 'afaga', 'corado', 'deseja', 'emoldura', 'torce',
  'possui', 'faz cócegas', 'mata', 'aumenta', 'aparece', 'percebe', 'localiza',
  'bomba', 'reúne', 'descolore', 'guarda', 'observa', 'treme', 'imprime', 'agarra',
  'sufoca', 'engana', 'constrange', 'entretém', 'devolve', 'levanta', 'esquia',
  'filma', 'gosta', 'sussurra', 'pinta', 'geme', 'afaga', 'aprecia', 'paira',
  'telefona', 'rima', 'unge', 'dobra', 'liga', 'sugere', 'apressa', 'une',
  'percebe', 'anseia', 'reflete', 'arruina', 'evita', 'tricota', 'limpa', 'tranca',
  'introduz', 'captura', 'pedala', 'bate', 'freia', 'choca', 'arquiva', 'oferece',
  'brilha', 'bagunça', 'grita', 'soa', 'fala', 'amplia', 'escorrega', 'segue',
  'banha', 'dura', 'aplaude', 'licencia', 'ordena', 'divide', 'despeja', 'instrui',
  'comunica', 'prefere', 'rega', 'assa', 'acena', 'vagueia', 'pregueia', 'cerca',
  'consiste', 'seca', 'olha', 'importa', 'ignora', 'enrola', 'inclui', 'espera',
  'gira', 'reproduz', 'curva', 'reserva', 'nicha', 'ilumina', 'colide', 'garante',
  'irradia', 'anexa', 'suspira', 'fax', 'mistura', 'corrige', 'grita', 'desculpa',
  'resolve', 'boceja', 'desgosta', 'espreita', 'toca', 'ataca', 'treina', 'esmagada',
  'impressiona', 'rege', 'aparafusa', 'resgata', 'proíbe', 'entedia', 'bate',
  'chuta', 'pasta', 'marcha', 'se arrepende', 'concorda', 'soletra', 'conecta',
  'lambe', 'cheira', 'saca', 'roda', 'provê', 'ofende', 'limpa', 'copia',
  'acolhe', 'acontece', 'move', 'pretende', 'serve', 'tenta', 'apodrece', 'enche',
  'treina', 'dispara', 'desarma', 'peca', 'se aposenta', 'apresenta', 'entope',
  'adivinha', 'dá dano', 'destrói', 'interrompe', 'espera', 'aceita', 'sorri',
  'transforma', 'liga', 'alcança', 'esquece'];
}

function randomAjective() {
  var adjectives = [
    'silencioso', 'pequenino', 'decisivo', 'duradouro', 'alcoólico',
    'alegado', 'esfarrapado', 'discreto', 'doente', 'diabólico',
    'brilhante', 'furtivo', 'incapaz', 'honrado', 'valioso',
    'ansioso', 'parcial', 'esmagado', 'divertido', 'tolo', 'militar',
    'imponente', 'engraçado', 'domado', 'maldoso', 'racial', 'sufocante',
    'rápido', 'espumoso', 'máximo', 'usado', 'vivo', 'doce',
    'manco', 'horrível', 'robusto', 'luxuoso', 'azul',
    'vitorioso', 'pretensioso', 'imparcial', 'hipnótico', 'sórdido',
    'comestível', 'enigmático', 'não escrito', 'aspirante', 'hilário',
    'acessível', 'mero', 'maciço', 'oposto', 'educado', 'empoeirado',
    'dolorido', 'zeloso', 'mudo', 'quebrado', 'pacífico', 'requintado',
    'indelicado', 'humorístico', 'espaçoso', 'irado', 'elegante', 
    'deslumbrante', 'adaptável', 'suave', 'volátil', 'capaz', 'caótico',
    'melancólico', 'insípido', 'industrioso', 'profuso', 'infernal',
    'utópico', 'panorâmico', 'danoso', 'maduro', 'grande',
    'espetacular', 'magnífico', 'atrás', 'insano', 'diário', 'dez',
    'conhecido', 'adjacente', 'torpe', 'nebuloso', 'adiantado',
    'grátis', 'abrupto', 'econômico', 'escasso', 'certo',
    'desbotado', 'evasivo', 'não natural', 'mal-humorado', 'animado',
    'enganoso', 'sorrateiro', 'ereto', 'desconhecido', 'assustador',
    'bagunçado', 'desafiante', 'quente', 'gelado', 'imaginário',
    'azarado', 'passado', 'variado', 'amável', 'distante', 'charmoso'
    // Lista pode continuar traduzindo os outros...
  ];
  return adjectives[Math.floor(generator.random() * adjectives.length)];
}

function randomAdverb() {
  var adverbs = ['vagamente', 'acidulamente', 'potencialmente', 'criticamente', 'fervorosamente',
  'vivazmente', 'profundamente', 'belamente', 'devotadamente', 'ontem', 'ternamente',
  'tensamente', 'presunçosamente', 'cuidadosamente', 'para cima', 'enjoadamente', 'basicamente',
  'brincalhonamente', 'alegremente', 'dolorosamente', 'bem', 'então', 'geralmente', 'firmemente',
  'famintamente', 'verdadeiramente', 'sombrio', 'assustadoramente', 'às vezes', 'recentemente', 'rigidamente',
  'automaticamente', 'ciumentamente', 'energeticamente', 'cruelmente', 'loucamente', 'irritadamente',
  'nunca', 'calmamente', 'bondosamente', 'solenemente', 'carinhosamente', 'elegantemente', 'primariamente',
  'amplamente', 'cansadamente', 'justamente', 'brevemente', 'suavemente', 'semelhantemente', 'mesmo',
  'estranhamente', 'constantemente', 'de qualquer forma', 'voluntariamente', 'zangadamente', 'grandemente', 'sonolentamente',
  'levemente', 'poderosamente', 'loucamente', 'freneticamente', 'amorosamente', 'prontamente', 'totalmente',
  'tolamente', 'arrogantemente', 'freneticamente', 'esquisitamente', 'lentamente', 'timidamente', 'semanalmente',
  'jubilantemente', 'anteriormente', 'corajosamente', 'apressadamente', 'surpreendentemente', 'pontualmente',
  'fracamente', 'assim', 'barulhentamente', 'entusiasmadamente', 'enormemente', 'interessantemente', 'ligeiramente',
  'envergonhadamente', 'maravilhosamente', 'cegamente', 'desamparadamente', 'além disso', 'triunfantemente',
  'gentilmente', 'valentemente', 'amanhã', 'normalmente', 'questionavelmente', 'mais', 'carinhosamente',
  'brigosamente', 'imprudentemente', 'à frente', 'seguramente', 'enganosamente', 'alto',
  'violentamente', 'desnecessariamente', 'amargamente', 'usualmente', 'nervosamente', 'obedientemente',
  'curiosamente', 'preocupadamente', 'famosamente', 'longe', 'deliciosamente', 'zelosamente',
  'mal-humoradamente', 'diretamente', 'antinaturalmente', 'infelizmente', 'diariamente', 'frequentemente', 'entretanto',
  'anualmente', 'possivelmente', 'duas vezes', 'juvenilmente', 'completamente', 'intensamente', 'ferozmente',
  'necessitado', 'alegremente', 'outro', 'calorosamente', 'meramente', 'investigativamente', 'muito',
  'bocejando', 'parcialmente', 'suavemente', 'simpateticamente', 'separadamente', 'alegremente',
  'desinibidamente', 'bruscamente', 'um pouco', 'reconfortantemente', 'com entusiasmo', 'grosseiramente',
  'vagamente', 'repentinamente', 'pessoalmente', 'inexplicavelmente', 'perguntando', 'mecanicamente',
  'liberamente', 'mortamente', 'abaixo', 'rigorosamente', 'ordenadamente', 'pesadamente', 'lealmente',
  'jaggedly', 'tecnicamente', 'descuidamente', 'cedo', 'novamente', 'aventurosamente', 'rapidamente',
  'verbalmente', 'provavelmente', 'corretamente', 'fortemente', 'jovialmente', 'seriamente', 'desejosamente',
  'francamente', 'totalmente', 'educadamente', 'normalmente', 'sempre', 'adicionalmente'];
  return advérbios[Math.floor(Math.random() * advérbios.length)];
  return adverbs[Math.floor(generator.random() * adverbs.length)];
}

function aToAnIfNeeded(sentence) {
  if (sentence.match(/^a [aeiou]/) || sentence.match(/^a hour/)) {
    return sentence.replace(/^a/, 'an');
  }
  return sentence
}

function sentenceA(seed) {
  return aToAnIfNeeded([randomArticle(seed++),randomNoun(seed++),randomVerb(seed++)].join(' '));
}

function sentenceB(seed) {
  return aToAnIfNeeded([randomArticle(seed++),randomAjective(seed++),randomNoun(seed++),randomVerb(seed++)].join(' '));
}

function sentenceC(seed) {
  return aToAnIfNeeded([randomArticle(seed++),randomNoun(seed++),randomAdverb(seed++),randomVerb(seed++)].join(' '));
}

function sentenceD(seed) {
  return aToAnIfNeeded([randomArticle(seed++),randomAjective(seed++),randomNoun(seed++),randomAdverb(seed++),randomVerb(seed++)].join(' '));
}

function sentenceE(seed) {
  sentences = [sentenceA, sentenceB, sentenceC, sentenceD];
  return sentences[Math.floor(generator.random() * sentences.length)](seed++) +
  ' because ' + sentences[Math.floor(generator.random() * sentences.length)](10 + seed++);
}

function sentenceF(seed) {
  sentences = [sentenceA, sentenceB, sentenceC, sentenceD];
  return sentences[Math.floor(generator.random() * sentences.length)](seed++) +
  ' when ' + sentences[Math.floor(generator.random() * sentences.length)](10 + seed++);
}

function sentenceG(seed) {
  sentences = [sentenceA, sentenceB, sentenceC, sentenceD];
  return sentences[Math.floor(generator.random() * sentences.length)](seed++) +
  ' though ' + sentences[Math.floor(generator.random() * sentences.length)](10 + seed++);
}

function sentenceH(seed) {
  sentences = [sentenceA, sentenceB, sentenceC, sentenceD];
  return sentences[Math.floor(generator.random() * sentences.length)](seed++) +
  ' while ' + sentences[Math.floor(generator.random() * sentences.length)](10 + seed++);
}

function sentenceI(seed) {
  sentences = [sentenceA, sentenceB, sentenceC, sentenceD];
  return sentences[Math.floor(generator.random() * sentences.length)](seed++) +
  ', and ' + sentences[Math.floor(generator.random() * sentences.length)](10 + seed++);
}

function sentenceJ(seed) {
  sentences = [sentenceA, sentenceB, sentenceC, sentenceD];
  return sentences[Math.floor(generator.random() * sentences.length)](seed++) +
  ', but ' + sentences[Math.floor(generator.random() * sentences.length)](10 + seed++);
}

function sentenceK(seed) {
  sentences = [sentenceA, sentenceB, sentenceC, sentenceD];
  return sentences[Math.floor(generator.random() * sentences.length)](seed++) +
  ', so ' + sentences[Math.floor(generator.random() * sentences.length)](10 + seed++);
}

function sentenceL(seed) {
  sentences = [sentenceA, sentenceB, sentenceC, sentenceD];
  return sentences[Math.floor(generator.random() * sentences.length)](seed++) +
  ', after ' + sentences[Math.floor(generator.random() * sentences.length)](10 + seed++);
}

function sentenceM(seed) {
  sentences = [sentenceA, sentenceB, sentenceC, sentenceD];
  return sentences[Math.floor(generator.random() * sentences.length)](seed++) +
  ', before ' + sentences[Math.floor(generator.random() * sentences.length)](10 + seed++);
}

function randomSentence(seed) {
  sentences = [sentenceA, sentenceB, sentenceC, sentenceD, sentenceE, sentenceF,
     sentenceG, sentenceH, sentenceI, sentenceJ, sentenceK, sentenceL, sentenceM];
  sentence = sentences[Math.floor(generator.random() * sentences.length)](seed++);
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
  // return 'seed: ' + seed + '.';
}

function randomTitle(seed) {
  return randomSentence(seed);
}

function randomParagraph(seed) {
  var sentences = 4 + Math.floor(generator.random() * 5);
  var paragraph = [];
  for (var i = 0; i < sentences; i++) {
    paragraph[i] = randomSentence(seed + i * 100);
  }
  return paragraph.join('. ') + '.';
}

function randomParagraphs(seed) {
  var paragraphs = 5 + Math.floor(generator.random() * 100);
  var article = [];
  for (var i = 0; i < paragraphs; i++) {
    article[i] = randomParagraph(seed + i * 1000);
  }
  return article;
}

function randomLink(seed, hostname) {
  var link = [];
  link['href'] = '/' + randomSentence(seed).replace(/ /g, '/').replace(/,/g, '');
  var linkSeed = generateSeed(hostname + link['href']);
  link['title'] = randomTitle(linkSeed);
  return link;
}

function randomLinks(seed, hostname) {
  var generator = new MersenneTwister(seed+10000);
  var linkCount = 5 + Math.floor(generator.random() * 10);
  var links = [];
  for (var i = 0; i < linkCount; i++) {
    links[i] = randomLink(seed + i * 10000, hostname);
  }
  return links;
}

function generateSeed(path) {
  var md5 = require('md5');
  var sum = md5(path);
  var seed = parseInt(sum.slice(0,7),16) + parseInt(sum.slice(8,15),16) + parseInt(sum.slice(16,23),16) + parseInt(sum.slice(24,31),16);
  return seed;
}

function randomPage(req, res) {
  var seed = generateSeed(req.hostname + req.path);

  var title = randomTitle(seed);
  var paragraphs = randomParagraphs(seed);
  var links = randomLinks(seed, req.hostname);

  res.render('random', {title: title, paragraphs: paragraphs, links: links});
}

router.all('*', randomPage);

// console.log(lorem.generateParagraphs(7));

// var paragraphs = [];
// for (var i = 0; i < 7; i++) {
//   paragraphs[i] = lorem.generateParagraphs(1);
// }
//
// var title = lorem.generateSentences(1);

// router.all('*', (req, res) => res.render('random', {title: title, paragraphs: paragraphs} ) )

// router.get('/', (req, res) => res.send(lorem.generateParagraphs(7)))

module.exports = router;
