export type V = {
  id: string;
  title: string;
  description: string;
  src: string;
  parsed?: VParsed | null;
};

export type VParsed = {
  hospedeiros: VParsedHost;
  primeiroPasso: number;
  passos: VParsedStep[];
};

export type VParsedHost = {
  [key: string]: "navegador" | "servidor";
};

export type VParsedStep = {
  nome: string;
  descricao: string;
  etapa: string;
  mostrar: { flexa: string[] } | { texto: string };
  quando: {
    [key: string]: string;
  };
};
