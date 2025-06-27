export interface IClient {
  nomeCompleto: string;
  email: string;
  nascimento: string;
  vendas: IVenda[];
}

export interface IClientResponse {
  data: {
    clientes: {
      info: {
        nomeCompleto: string;
        detalhes: {
          email: string;
          nascimento: string;
        };
      };
      estatisticas: {
        vendas?: IVenda[];
      };
    }[];
  };
}

export interface IVenda {
  data: string;
  valor: number;
}
