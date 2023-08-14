const cardapio = [
  {
    codigo: "cafe",
    descricao: "Café",
    valor: 3.0,
    codigoItemPrincipal: null,
    quantidade: 0,
  },
  {
    codigo: "chantily",
    descricao: "Chantily (extra do Café)",
    valor: 1.5,
    codigoItemPrincipal: "cafe",
    quantidade: 0,
  },
  {
    codigo: "suco",
    descricao: "Suco Natural",
    valor: 6.2,
    codigoItemPrincipal: null,
    quantidade: 0,
  },
  {
    codigo: "sanduiche",
    descricao: "Sanduíche",
    valor: 6.5,
    codigoItemPrincipal: null,
    quantidade: 0,
  },
  {
    codigo: "queijo",
    descricao: "Queijo (extra do Sanduíche)",
    valor: 2.0,
    codigoItemPrincipal: "sanduiche",
    quantidade: 0,
  },
  {
    codigo: "salgado",
    descricao: "Salgado",
    valor: 7.25,
    codigoItemPrincipal: null,
    quantidade: 0,
  },
  {
    codigo: "combo1",
    descricao: "1 Suco e 1 Sanduíche",
    valor: 9.5,
    codigoItemPrincipal: null,
    quantidade: 0,
  },
  {
    codigo: "combo2",
    descricao: "1 Café e 1 Sanduíche",
    valor: 7.5,
    codigoItemPrincipal: null,
    quantidade: 0,
  },
];

class Cardapio {
  constructor() {}
  itemExiste(codigo) {
    let retorno = cardapio.find(function (item) {
      return item.codigo == codigo;
    });
    return retorno != null;
  }
  obterItensPorCodigos(codigos) {
    let retorno = [];
    for (let i = 0; i < codigos.length; i++) {
      retorno.push(cardapio.find(function (item){
        return item.codigo == codigos[i];
      }));
    }
    return retorno;
  }
}

export default Cardapio;