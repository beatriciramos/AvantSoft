import mockData from "@mocks/clients.json";
import { normalizeClients } from "@utils/normalize";
import React, { createContext, useContext, useState, useEffect } from "react";
import { IClient, IVenda } from "src/types/client";

interface ClienteContextData {
  clientes: IClient[];
  adicionarCliente: (cliente: IClient) => void;
  deleteClient: (email: string) => void;
  adicionarVenda: (email: string, venda: IVenda) => void;
}

const ClientContext = createContext<ClienteContextData>(
  {} as ClienteContextData
);

export const ClienteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [clientes, setClientes] = useState<IClient[]>([]);

  useEffect(() => {
    const normalized = normalizeClients(mockData);
    setClientes(normalized);
  }, []);

  const adicionarCliente = (cliente: IClient) => {
    setClientes((prev) => [...prev, cliente]);
  };

  const deleteClient = (email: string) => {
    setClientes((prev) => prev.filter((c) => c.email !== email));
  };

  const adicionarVenda = (email: string, venda: IVenda) => {
    setClientes((prev) =>
      prev.map((cliente) =>
        cliente.email === email
          ? {
              ...cliente,
              vendas: [...cliente.vendas, venda],
            }
          : cliente
      )
    );
  };

  return (
    <ClientContext.Provider
      value={{ clientes, adicionarCliente, deleteClient, adicionarVenda }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const useClients = () => useContext(ClientContext);
