// Dados simulados dos estados, cidades e bairros para o prototipo RadarBairro

const dadosEstados = {
  "SP": {
    nome: "São Paulo (SP)",
    centroTexto: "São Paulo · Zona Oeste, Sul, Norte e Leste",
    bairros: [
      {
        id: "santana",
        nome: "Santana",
        cidade: "São Paulo - SP",
        regiao: "Zona Norte",
        avaliacoes: 245,
        notas: {
          geral: 3.8,
          agua: 4.3,
          energia: 3.5,
          alagamento: 3.6,
          seguranca: 3.9,
          calcadas: 3.7
        },
        poligono: "120,142 245,138 240,192 115,196",
        centroX: 180,
        centroY: 168,
        resumoIA: "Bairro tradicional com boa rede de água e comércio próximo. A principal atenção apontada pelos moradores fica na parte baixa próxima à Marginal Tietê em dias de chuva forte e quedas pontuais de energia.",
        problemasComuns: [
          "Retenção de água da chuva na parte baixa próxima à Cruzeiro do Sul",
          "Quedas rápidas de energia no fim da tarde no verão",
          "Degraus altos nas calçadas antigas dificultando idosos"
        ]
      },
      {
        id: "pinheiros",
        nome: "Pinheiros",
        cidade: "São Paulo - SP",
        regiao: "Zona Oeste",
        avaliacoes: 318,
        notas: {
          geral: 4.1,
          agua: 4.7,
          energia: 3.1,
          alagamento: 3.8,
          seguranca: 4.2,
          calcadas: 4.5
        },
        poligono: "18,205 132,200 138,266 22,272",
        centroX: 78,
        centroY: 236,
        resumoIA: "Bairro com abastecimento de água estável e boas calçadas nas vias principais. O ponto fraco mais citado pelos moradores nos últimos 60 dias é a queda de energia elétrica quando chove forte, por conta da fiação aérea antiga próxima às árvores.",
        problemasComuns: [
          "Queda de luz em dias de vento forte (Ruas dos Pinheiros e Simão Álvares)",
          "Barulho noturno próximo aos bares de quinta a sábado",
          "Trânsito lento nos horários de pico perto da Faria Lima"
        ]
      },
      {
        id: "mooca",
        nome: "Mooca",
        cidade: "São Paulo - SP",
        regiao: "Zona Leste",
        avaliacoes: 289,
        notas: {
          geral: 3.4,
          agua: 3.9,
          energia: 3.6,
          alagamento: 2.2,
          seguranca: 3.8,
          calcadas: 3.5
        },
        poligono: "148,205 255,202 258,266 145,270",
        centroX: 202,
        centroY: 236,
        resumoIA: "Parte alta do bairro é tranquila e bem atendida, mas a região baixa próxima à Avenida Alcântara Machado e Rua da Mooca sofre com alagamentos severos no verão. Moradores também relatam redução de pressão de água nos fins de semana.",
        problemasComuns: [
          "Alagamento recorrente nas baixadas perto da Av. Paes de Barros",
          "Pressão baixa de água aos sábados e domingos à noite",
          "Iluminação fraca em trechos próximos à linha do trem"
        ]
      },
      {
        id: "itaquera",
        nome: "Itaquera",
        cidade: "São Paulo - SP",
        regiao: "Zona Leste",
        avaliacoes: 524,
        notas: {
          geral: 2.4,
          agua: 2.1,
          energia: 2.5,
          alagamento: 2.3,
          seguranca: 2.6,
          calcadas: 2.5
        },
        poligono: "266,196 366,192 370,274 268,278",
        centroX: 318,
        centroY: 236,
        resumoIA: "Moradores registram alto volume de reclamações sobre interrupção no abastecimento de água durante a madrugada e início da manhã. Em dias de temporal, há relatos frequentes de oscilação de fase elétrica.",
        problemasComuns: [
          "Falta de água recorrente após as 21h em ruas mais altas",
          "Demora da concessionária para religar energia após temporais",
          "Calçadas estreitas e sem rampa de acessibilidade fora do centro"
        ]
      },
      {
        id: "vila_mariana",
        nome: "Vila Mariana",
        cidade: "São Paulo - SP",
        regiao: "Zona Sul",
        avaliacoes: 412,
        notas: {
          geral: 4.6,
          agua: 4.8,
          energia: 4.4,
          alagamento: 4.7,
          seguranca: 4.5,
          calcadas: 4.6
        },
        poligono: "145,278 268,274 272,340 148,344",
        centroX: 208,
        centroY: 310,
        resumoIA: "Região alta com baixíssimo índice de alagamentos e fornecimento de água muito regular. Moradores destacam boa iluminação pública perto das estações de metrô, com queixas pontuais sobre raízes nas calçadas.",
        problemasComuns: [
          "Calçadas irregulares por raízes de árvores na Rua Pelotas",
          "Falta de vagas na rua durante horário comercial",
          "Obras frequentes de redes de gás e fibra óptica"
        ]
      },
      {
        id: "santo_amaro",
        nome: "Santo Amaro",
        cidade: "São Paulo - SP",
        regiao: "Zona Sul",
        avaliacoes: 367,
        notas: {
          geral: 2.7,
          agua: 3.4,
          energia: 2.2,
          alagamento: 2.4,
          seguranca: 2.8,
          calcadas: 2.9
        },
        poligono: "18,280 136,276 140,342 22,346",
        centroX: 79,
        centroY: 312,
        resumoIA: "Região com histórico crítico de apagões prolongados após chuvas com vento devido à fiação aérea sobrecarregada. Moradores recomendam verificar se o condomínio possui gerador e boa reserva de água.",
        problemasComuns: [
          "Quedas de energia que podem durar mais de 6 horas após temporais",
          "Pontos de alagamento próximos ao Largo Treze e Marginal",
          "Postes com lâmpadas queimadas demorando para manutenção"
        ]
      }
    ]
  },
  "RJ": {
    nome: "Rio de Janeiro (RJ)",
    centroTexto: "Rio de Janeiro · Zona Norte, Sul e Oeste",
    bairros: [
      {
        id: "tijuca",
        nome: "Tijuca",
        cidade: "Rio de Janeiro - RJ",
        regiao: "Zona Norte",
        avaliacoes: 390,
        notas: {
          geral: 3.5,
          agua: 4.1,
          energia: 3.6,
          alagamento: 2.1,
          seguranca: 3.4,
          calcadas: 4.2
        },
        poligono: "130,135 255,130 260,210 135,215",
        centroX: 195,
        centroY: 172,
        resumoIA: "Excelente oferta de transporte e calçadas largas perto da Praça Saens Peña, porém a bacia hidrográfica local favorece bolsões d'água rápidos em dias de chuva forte perto da Rua Conde de Bonfim.",
        problemasComuns: [
          "Bolsões de alagamento em dias de chuva de verão",
          "Oscilação de luz no verão pelo alto uso de ar-condicionado",
          "Barulho intenso nas avenidas principais"
        ]
      },
      {
        id: "laranjeiras",
        nome: "Laranjeiras",
        cidade: "Rio de Janeiro - RJ",
        regiao: "Zona Sul",
        avaliacoes: 275,
        notas: {
          geral: 4.4,
          agua: 4.6,
          energia: 4.3,
          alagamento: 4.1,
          seguranca: 4.5,
          calcadas: 4.4
        },
        poligono: "205,225 345,220 350,305 210,310",
        centroX: 278,
        centroY: 265,
        resumoIA: "Bairro residencial arborizado com fornecimento estável de água e energia. Relatos dos moradores concentram-se apenas em drenagem lenta em trechos específicos da Rua das Laranjeiras durante chuvas fortes.",
        problemasComuns: [
          "Trânsito travado nos horários de entrada e saída escolar",
          "Folhas entupindo bueiros no verão",
          "Calçadas estreitas nas ruas em ladeira"
        ]
      },
      {
        id: "campo_grande",
        nome: "Campo Grande",
        cidade: "Rio de Janeiro - RJ",
        regiao: "Zona Oeste",
        avaliacoes: 480,
        notas: {
          geral: 2.5,
          agua: 2.0,
          energia: 2.4,
          alagamento: 2.7,
          seguranca: 2.8,
          calcadas: 2.6
        },
        poligono: "25,215 175,210 180,300 30,305",
        centroX: 102,
        centroY: 257,
        resumoIA: "A maior queixa da comunidade é a intermitência no abastecimento de água em ondas de calor e quedas de fase elétrica no verão. Moradores aconselham cisterna ou segunda caixa d'água.",
        problemasComuns: [
          "Manobras na rede deixando ruas sem água por até 2 dias",
          "Queda de tensão elétrica nas noites mais quentes",
          "Falta de calçamento padronizado em loteamentos mais afastados"
        ]
      }
    ]
  },
  "MG": {
    nome: "Minas Gerais (MG)",
    centroTexto: "Belo Horizonte · Centro-Sul e Norte",
    bairros: [
      {
        id: "savassi",
        nome: "Savassi",
        cidade: "Belo Horizonte - MG",
        regiao: "Centro-Sul",
        avaliacoes: 295,
        notas: {
          geral: 4.5,
          agua: 4.8,
          energia: 4.5,
          alagamento: 4.2,
          seguranca: 4.6,
          calcadas: 4.5
        },
        poligono: "165,205 320,198 325,290 170,295",
        centroX: 245,
        centroY: 246,
        resumoIA: "Infraestrutura urbana muito bem avaliada pelos moradores, com rede de água da Copasa estável e calçadas planas. Pontos de atenção ficam apenas no barulho noturno aos fins de semana.",
        problemasComuns: [
          "Movimento intenso e ruído de bares na sexta e sábado",
          "Poucas vagas para estacionar na rua",
          "Obras de recapeamento causando lentidão"
        ]
      },
      {
        id: "venda_nova",
        nome: "Venda Nova",
        cidade: "Belo Horizonte - MG",
        regiao: "Norte",
        avaliacoes: 340,
        notas: {
          geral: 2.6,
          agua: 3.5,
          energia: 2.9,
          alagamento: 1.8,
          seguranca: 2.6,
          calcadas: 2.4
        },
        poligono: "35,125 190,120 195,210 40,215",
        centroX: 115,
        centroY: 167,
        resumoIA: "Moradores alertam para histórico severo de alagamentos nas proximidades da Avenida Vilarinho no período chuvoso (novembro a março). Nas ruas mais altas o problema não ocorre.",
        problemasComuns: [
          "Risco alto de enchente na baixada da Av. Vilarinho",
          "Picos de energia durante tempestades",
          "Buracos no asfalto após a temporada de chuvas"
        ]
      }
    ]
  }
};

// Feed de relatos estilo Colab (com botao de Apoiar)
const relatosIniciais = [
  {
    id: 101,
    bairroId: "itaquera",
    bairroNome: "Itaquera · São Paulo, SP",
    endereco: "Rua Flores do Piauí, altura do nº 420",
    morador: "Carlos Eduardo M.",
    tempoMoradia: "Mora há 8 anos no bairro",
    horario: "Há 25 min",
    categoria: "agua",
    tituloCategoria: "Falta de Água",
    corCategoria: "#0284c7",
    texto: "Terceira noite seguida que a água some depois das 21h30 e só volta lá pelas 6h da manhã. Quem tem caixa pequena fica sem nada cedo.",
    apoios: 47,
    apoiadoPorMim: false,
    status: "Protocolo coletivo na Sabesp"
  },
  {
    id: 102,
    bairroId: "santo_amaro",
    bairroNome: "Santo Amaro · São Paulo, SP",
    endereco: "Rua Barão do Rio Branco, nº 310",
    morador: "Fernanda Costa",
    tempoMoradia: "Mora há 4 anos no bairro",
    horario: "Há 1 hora",
    categoria: "energia",
    tituloCategoria: "Queda de Energia",
    corCategoria: "#d97706",
    texto: "Bateu vento forte hoje à tarde e um galho encostou na rede. A rua inteira está no escuro e a previsão de retorno já mudou duas vezes.",
    apoios: 63,
    apoiadoPorMim: true,
    status: "63 moradores afetados agora"
  },
  {
    id: 103,
    bairroId: "mooca",
    bairroNome: "Mooca · São Paulo, SP",
    endereco: "Rua Taquari com Av. Paes de Barros",
    morador: "Roberto Tavares",
    tempoMoradia: "Mora há 12 anos no bairro",
    horario: "Há 3 horas",
    categoria: "alagamento",
    tituloCategoria: "Alagamento na Via",
    corCategoria: "#7c3aed",
    texto: "Bueiros entupidos de novo na parte baixa. Bastou 20 minutos de chuva forte para a água subir na guia da calçada.",
    apoios: 38,
    apoiadoPorMim: false,
    status: "Subprefeitura acionada"
  },
  {
    id: 104,
    bairroId: "pinheiros",
    bairroNome: "Pinheiros · São Paulo, SP",
    endereco: "Rua Simão Álvares, altura do nº 700",
    morador: "Juliana Ribeiro",
    tempoMoradia: "Mora há 3 anos no bairro",
    horario: "Ontem",
    categoria: "energia",
    tituloCategoria: "Oscilação de Luz",
    corCategoria: "#d97706",
    texto: "Para quem trabalha de home office: a região é ótima de morar, mas tenham nobreak. Toda chuva de verão dá pico de luz por causa das árvores nos fios.",
    apoios: 29,
    apoiadoPorMim: false,
    status: "Alerta recorrente no histórico"
  }
];
