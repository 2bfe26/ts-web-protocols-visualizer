import { V } from "./App.types";
import { parserV } from "./App.utils";

const TLS_1_2_CONN = {
  id: "1",
  title: "Fluxo de conexão TLS 1.2",
  description:
    "Transport Layer Security (TLS) 1.2 é um protocolo criptográfico amplamente utilizado para estabelecer comunicações seguras pela Internet.",
  src: `
    entidades:
      - nome: c
        tipo: cliente
      - nome: s
        tipo: servidor
    
    primeiroPasso: 1
    
    passos:
      - nome: TCP SYN
        etapa: TCP Handshake 🤝
        mostrar:
          flecha: [c, s]
        ações:
          continuar: proximo()
        descricao: O cliente envia uma solicitação inicial (SYN) para iniciar o handshake TCP.
    
      - nome: TCP SYN + ACK
        etapa: TCP Handshake 🤝
        mostrar:
          flecha: [s, c]
        ações:
          continuar: proximo()
        descricao: O servidor recebe a solicitação do cliente (SYN), confirma a conexão (ACK) e envia uma resposta de confirmação ao cliente.
    
      - nome: TCP ACK
        etapa: TCP Handshake 🤝
        mostrar:
          flecha: [c, s]
        ações:
          continuar: proximo()
        descricao: O cliente recebe a confirmação do servidor (ACK) e a conexão TCP é estabelecida.
    
      - nome: Connection established
        etapa: Certificate Check 🔏
        mostrar:
          texto: 🥳 Conexão estabelecida 🥳
        ações:
          continuar: proximo()
        descricao: A conexão TCP foi estabelecida e agora o processo de verificação do certificado começa.
    
      - nome: Client Hello
        etapa: Certificate Check 🔏
        mostrar:
          flecha: [c, s]
        ações:
          continuar: proximo()
        descricao: O cliente envia uma mensagem "Client Hello" ao servidor, incluindo informações criptográficas e preferências de criptografia.
    
      - nome: Server Hello
        etapa: Certificate Check 🔏
        mostrar:
          flecha: [s, c]
        ações:
          continuar: proximo()
        descricao: O servidor responde com uma mensagem "Server Hello", selecionando uma suíte de criptografia apropriada e enviando seu certificado digital.
    
      - nome: Certificate
        etapa: Certificate Check 🔏
        mostrar:
          flecha: [s, c]
        ações:
          continuar: proximo()
        descricao: O cliente recebe o certificado do servidor e verifica sua autenticidade e validade.
    
      - nome: Server Hello Done
        etapa: Certificate Check 🔏
        mostrar:
          flecha: [s, c]
        ações:
          continuar: proximo()
        descricao: O servidor indica que concluiu as negociações e está pronto para receber a chave de criptografia.
    
      - nome: Client Key Exchange
        etapa: Key Exchange 🔐
        mostrar:
          flecha: [c, s]
        ações:
          continuar: proximo()
        descricao: O cliente gera uma chave de sessão e a criptografa usando a chave pública do servidor, enviando-a de volta ao servidor.
    
      - nome: Change Cipher Spec
        etapa: Key Exchange 🔐
        mostrar:
          flecha: [c, s]
        ações:
          continuar: proximo()
        descricao: O cliente notifica ao servidor que futuras mensagens serão criptografadas com a nova chave.
    
      - nome: Finished
        etapa: Key Exchange 🔐
        mostrar:
          flecha: [c, s]
        ações:
          finalizar: fim()
        descricao: O servidor envia uma mensagem "Finished" criptografada, confirmando que a troca de chaves e a negociação foram concluídas com sucesso. A conexão está pronta para ser usada de forma segura.

  `,
};

const TLS_1_3_CONN = {
  id: "2",
  title: "Fluxo de conexão TLS 1.3",
  description:
    "Transport Layer Security (TLS) 1.3 é a versão mais recente do protocolo criptográfico TLS, projetado para fornecer uma comunicação segura e eficiente na Internet.",
  src: `
    entidades:
      - nome: c
        tipo: cliente
      - nome: s
        tipo: servidor
    
    primeiroPasso: 1
    
    passos:
      - nome: Client Hello + Supported Cipher Suites + Guesses Key Agreement Protocol + Key Share
        mostrar:
          flecha: [c, s]
        ações:
          continuar: proximo()
          continuar_com_versão_não_suportada: irPara(4)
        descricao: O cliente inicia a comunicação enviando uma mensagem "Client Hello" ao servidor. Essa mensagem contém as suítes de criptografia suportadas, possíveis protocolos de acordo de chave e uma chave compartilhada para adivinhar o acordo de chave.
    
      - nome: Server Hello + Key Agreement Protocol + Key Share + Server finished
        mostrar:
          flecha: [s, c]
        ações:
          continuar: proximo()
        descricao: O servidor responde ao cliente com uma mensagem "Server Hello", selecionando uma suíte de criptografia, um protocolo de acordo de chave e compartilhando uma chave. O servidor também envia uma mensagem "Server finished" indicando que a negociação está concluída no lado do servidor.

      - nome: Checks Certificate + Generates Keys + Client finished
        mostrar:
          flecha: [c, s]
        ações:
          finalizar: fim()
        descricao: O cliente verifica o certificado recebido do servidor, verifica sua autenticidade e gera chaves de criptografia. Em seguida, o cliente envia uma mensagem "Client finished" indicando que a negociação está concluída no lado do cliente.
  
      - nome: TLS Version is not supported
        mostrar:
          flecha: [s, c]
        ações:
          continuar: proximo()
        
      - nome: TLS connection closed
        mostrar:
          texto: Conexão fechada
        ações:
          finalizar: fim()
        
  `,
};

const EXAMPLE = {
  id: "3",
  title: "Fluxo de exemplo",
  description: "Demonstrativo de capacidades do projeto",
  src: `
    entidades:
      - nome: c1
        tipo: cliente
      - nome: c2
        tipo: cliente

    primeiroPasso: 1

    passos:
      - nome: Passo 1
        mostrar:
          flecha: [c1, c2]
        ações:
          continuar: proximo()
          continuar_de_outra_forma: proximo()

      - nome: Passo 2
        mostrar:
          texto: hmmmmmm ....
        ações:
          continuar: >
            quando(anterior.acao, [
              ["continuar", irPara!(4)],
              ["continuar_de_outra_forma", irPara!(3)]
            ])

      - nome: Passo 3
        mostrar:
          texto: Você está vendo esse passo por que escolheu "continuar_de_outra_forma"
        ações:
          continuar: proximo()
          mostrar_anterior: alerta("O passo anterior foi ", anterior.nome)

      - nome: Passo 4
        mostrar:
          texto: fim do exemplo
        ações:
          finalizar: fim()
`,
};

export const DEFAULT_VISUALIZATIONS: V[] = [
  { ...TLS_1_2_CONN, parsed: parserV(TLS_1_2_CONN.src) },
  { ...TLS_1_3_CONN, parsed: parserV(TLS_1_3_CONN.src) },
  { ...EXAMPLE, parsed: parserV(EXAMPLE.src) },
];
