import { V } from "./App.types";

export const DEFAULT_VISUALIZATIONS: V[] = [
  {
    id: "1",
    title: "Fluxo de conexão TLS 1.2",
    description: "",
    src: `
      hospedeiros:
        c: cliente
        s: servidor
      
      primeiroPasso: 1
      
      passos:
        - nome: TCP SYN
          mostrar:
            flexa: [n, s]
          quando:
            continuar: proximo()

        - nome: TCP SYN + ACK
          mostrar:
            flexa: [s, n]
          quando:
            continuar: proximo()

        - nome: TCP ACK
          mostrar:
            flexa: [n, s]
          quando:
            continuar: proximo()

        - nome: TCP ACK
          mostrar:
            texto: Conexão estabelecida
          quando:
            continuar: proximo()

        - nome: Client Hello
          mostrar:
            flexa: [n, s]
          quando:
            continuar: proximo()

        - nome: Server Hello
          mostrar:
            flexa: [s, n]
          quando:
            continuar: proximo()

        - nome: Certificate
          mostrar:
            flexa: [s, n]
          quando:
            continuar: proximo()

        - nome: Server Hello Done
          mostrar:
            flexa: [s, n]
          quando:
            continuar: proximo()

        - nome: Client Key Exchange
          mostrar:
            flexa: [n, s]
          quando:
            continuar: proximo()

        - nome: Change Cipher Spec
          mostrar:
            flexa: [n, s]
          quando:
            continuar: proximo()
        
        - nome: Finished
          mostrar:
            flexa: [n, s]
          quando:
            continuar: proximo()

        - nome: Change Cipher Spec
          mostrar:
            flexa: [s, n]
          quando:
            continuar: proximo()
        
        - nome: Finished
          mostrar:
            flexa: [s, n]
          quando:
            continuar: fim()
    `,
  },
];

// - nome: SYNC
// descricao: Passo 1
// mostrar:
//   flexa: [n, s]
// quando:
//   continuar: irPara(2)
