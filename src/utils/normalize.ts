import { IClient, IClientResponse } from "src/types/client";

export const normalizeClients = (response: IClientResponse): IClient[] => {
  return response.data.clientes.map((client) => ({
    nomeCompleto: client.info.nomeCompleto,
    email: client.info.detalhes.email,
    nascimento: client.info.detalhes.nascimento,
    vendas: client.estatisticas.vendas || [],
  }));
};
