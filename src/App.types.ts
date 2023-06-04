export type V = {
  id: string;
  title: string;
  description: string;
  src: string;
  parsed?: VParsed | null;
};

export type VParsed = {
  entidades: VParsedHost[];
  primeiroPasso: number;
  passos: VParsedStep[];
};

export type VParsedHost = {
  nome: string;
  tipo: "navegador" | "servidor";
};

export type VParsedStep = {
  nome: string;
  descricao: string;
  etapa: string;
  mostrar: { flecha: string[] } | { texto: string };
  ações: {
    [key: string]: string;
  };
};
