import Cardapio from './cardapio'

class CaixaDaLanchonete {
  constructor(){
    this.cardapio = new Cardapio();
  }
  calcularValorDaCompra(metodoDePagamento, itens) {
    let retornoValidacao = this.validaCompra(metodoDePagamento, itens);
    if (retornoValidacao != null && retornoValidacao.mensagemDeErro != null)
      return retornoValidacao.mensagemDeErro;
    let valor = 0;
    retornoValidacao.itensCompletos.forEach(item => {
      valor += item.valor*item.quantidade;
    });
    valor = this.calculaDescontosOuTaxas(metodoDePagamento, valor);
    return this.formataValorFinal(valor);
  }

  validaCompra(metodoDePagamento, itens) {
    let mensagemDeErro = null;
    let itensCompletos = [];
    let codigos = [];
    let quantidades = [];

    if (itens.length == 0)
      mensagemDeErro = "Não há itens no carrinho de compra!";
    if (!this.metodoDePagamentoValido(metodoDePagamento))
      mensagemDeErro = "Forma de pagamento inválida!";

    itens.forEach(item => {
      let auxiliar = item.split(",");
      let codigo = auxiliar[0] ?? null;
      codigos.push(codigo);
      let quantidade = auxiliar[1] ?? null;
      quantidades.push(quantidade);
    });
    if (!this.quantidadesValidas(quantidades))
      mensagemDeErro = "Quantidade inválida!";
    if (!this.itensExistem(codigos))
      mensagemDeErro = "Item inválido!";
    if (mensagemDeErro == null) {
      itensCompletos = this.cardapio.obterItensPorCodigos(codigos);
      if (itensCompletos.length > 0) {
        for (let i = 0; i < itensCompletos.length; i++) {
          itensCompletos[i].quantidade = quantidades[i];
        }
        if (!this.itensExtrasValidos(itensCompletos))
          mensagemDeErro = 'Item extra não pode ser pedido sem o principal';
      }
    }
    return { mensagemDeErro, itensCompletos };
  }

  metodoDePagamentoValido(metodoDePagamento) {
    return (
      metodoDePagamento == "dinheiro" ||
      metodoDePagamento == "debito" ||
      metodoDePagamento == "credito"
    );
  }
  quantidadesValidas(quantidades) {
    let resultado = true;
    quantidades.forEach(quantidade => {
      if (quantidade == null || quantidade == 0) resultado = false;
    });
    return resultado;
  }
  itensExistem(codigos) {
    let resultado = true;
    codigos.forEach(codigo => {
      if (codigo == null || !this.cardapio.itemExiste(codigo)) resultado = false;
    });
    return resultado; 
  }

  itensExtrasValidos(itens) {
    let itensExtras = [];
    for (let i = 0; i < itens.length; i++) {
      if (itens[i].codigoItemPrincipal != null)
        itensExtras.push(itens[i]);
    }
    if (itensExtras.length > 0) {
      for (let i = 0; i < itensExtras.length; i++) {
        for (let j = 0; j < itens.length; j++) {
          if (itensExtras[i].codigoItemPrincipal == itens[j].codigo) {
            itensExtras.splice(i,1);
              if (itensExtras.length == 0)
                break;          
          }
        }
      }
    }
    return itensExtras.length == 0;
  }
  calculaDescontoDinheiro(valor) {
    return valor - (5*valor/100);
  }

  calculaAcrescimoCredito(valor) {
    return valor + (3*valor/100);
  }

  calculaDescontosOuTaxas(metodoDePagamento, valor) {
    switch(metodoDePagamento) {
      case "dinheiro":
        return this.calculaDescontoDinheiro(valor);
      case "credito":
        return this.calculaAcrescimoCredito(valor);
      default:
        return valor;
    } 
  }
  formataValorFinal(valor) {
    return "R$ " + Number.parseFloat(valor).toFixed(2).replace(".",",");
  }

}

export { CaixaDaLanchonete };
