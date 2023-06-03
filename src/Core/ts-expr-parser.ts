// EXTRACTED FROM: https://github.com/2bfe26/ts-expr-parser

export function run_expr(src: string, context?: Context) {
  const l = create_lexer(src);
  const ast = create_node(l);

  const token = l.next();
  if (token !== null) {
    throw new TypeError(`Unexpected token ${token.value}`);
  }

  return eval_ast(ast, context);
}

type Lexer = ReturnType<typeof create_lexer>;

type Token =
  | { type: "String"; value: string }
  | { type: "Symbol"; value: string }
  | { type: "Op"; value: Op }
  | { type: "ParenStart"; value: "(" }
  | { type: "ParenEnd"; value: ")" }
  | { type: "BracketStart"; value: "[" }
  | { type: "BracketEnd"; value: "]" }
  | { type: "Comma"; value: "," };

function create_lexer(input: string) {
  let src = input;

  return {
    unnext: (token: Token) => {
      const value = token.type === "String" ? `"${token.value}"` : token.value;

      src = value + src;
    },

    next: (): Token | null => {
      src = src.trimStart();

      if (!src.length) return null;

      if (src[0].startsWith('"')) {
        src = src.slice(1);
        let acc = "";

        while (src[0] && src[0] !== '"') {
          acc += src[0];
          src = src.slice(1);
        }

        if (src[0] !== '"') {
          throw new TypeError("String is not properly closed by double quote");
        }

        src = src.slice(1);

        return { type: "String", value: acc };
      }

      if (src[0] === "(") {
        src = src.slice(1);
        return { type: "ParenStart", value: "(" };
      }

      if (src[0] === ")") {
        src = src.slice(1);
        return { type: "ParenEnd", value: ")" };
      }

      if (src[0] === "[") {
        src = src.slice(1);
        return { type: "BracketStart", value: "[" };
      }

      if (src[0] === "]") {
        src = src.slice(1);
        return { type: "BracketEnd", value: "]" };
      }

      if (src[0] === ",") {
        src = src.slice(1);
        return { type: "Comma", value: "," };
      }

      if (is_operator(src[0])) {
        const value = src[0] as Op;
        src = src.slice(1);

        return { type: "Op", value };
      }

      let acc = "";

      while (is_symbol(src[0]) && !is_whitespace(src[0])) {
        acc += src[0];
        src = src.slice(1);
      }

      return { type: "Symbol", value: acc };
    },
  };
}

function is_whitespace(char: string) {
  return /\s/.test(char);
}

function is_symbol(char: string) {
  return char ? /[0-9a-zA-Z._!]/i.test(char) : false;
}

function is_operator(char: string) {
  return char in OPS_BINARY || char in OPS_UNARY;
}

export type Context = {
  vars?: Record<string, any>;
  fns?: Record<string, (...n: any[]) => any>;
};

function eval_ast(n: ASTNode, context = {} as Context): any {
  switch (n.type) {
    case "NumberLiteral":
    case "StringLiteral": {
      return n.value;
    }

    case "List": {
      return n.value.map((v) => eval_ast(v, context));
    }

    case "Variable": {
      if (typeof context?.vars?.[n.value] === "undefined") {
        throw new Error(`Unknown variable ${n.value}`);
      }

      return context.vars[n.value];
    }

    case "UnaryOp": {
      if (!(n.value.op in OPS_UNARY)) {
        throw new Error(`Unknown UnaryOp operator ${n.value.op}`);
      }

      return OPS_UNARY[n.value.op].fn(eval_ast(n.value.operand, context));
    }

    case "BinaryOp": {
      if (!(n.value.op in OPS_BINARY)) {
        throw new Error(`Unknown BinaryOp operator ${n.value.op}`);
      }

      return OPS_BINARY[n.value.op].fn(
        eval_ast(n.value.lhs, context),
        eval_ast(n.value.rhs, context)
      );
    }

    case "FunctionCall": {
      const should_bind = n.value.name.endsWith("!");

      const name = should_bind
        ? n.value.name.slice(0, n.value.name.length - 1)
        : n.value.name;

      if (!context?.fns?.[name]) {
        throw new Error(`Unknown function ${name}`);
      }

      return should_bind
        ? context.fns[name].bind(
            context.fns,
            ...n.value.params.map((p) => eval_ast(p, context))
          )
        : context.fns[name].call(
            context.fns,
            ...n.value.params.map((p) => eval_ast(p, context))
          );
    }

    default: {
      throw new Error(`Unknown ASTNode type ${(n as any).type}`);
    }
  }
}

const OPS_BINARY = {
  "+": {
    fn: (lhs: number, rhs: number) => lhs + rhs,
    prec: 0,
  },
  "-": {
    fn: (lhs: number, rhs: number) => lhs - rhs,
    prec: 0,
  },
  "*": {
    fn: (lhs: number, rhs: number) => lhs * rhs,
    prec: 1,
  },
  "/": {
    fn: (lhs: number, rhs: number) => lhs / rhs,
    prec: 1,
  },
  "%": {
    fn: (lhs: number, rhs: number) => lhs % rhs,
    prec: 1,
  },
  "**": {
    fn: (lhs: number, rhs: number) => lhs ** rhs,
    prec: 1,
  },
};

const OPS_UNARY = {
  "-": {
    fn: (lhs: number) => -lhs,
  },
};

type OpBinary = keyof typeof OPS_BINARY;

type OpUnary = keyof typeof OPS_UNARY;

type Op = OpBinary | OpUnary;

type ASTNode =
  | { type: "BinaryOp"; value: { op: OpBinary; lhs: ASTNode; rhs: ASTNode } }
  | { type: "UnaryOp"; value: { op: OpUnary; operand: ASTNode } }
  | { type: "FunctionCall"; value: { name: string; params: ASTNode[] } }
  | { type: "List"; value: ASTNode[] }
  | { type: "Variable"; value: string }
  | { type: "NumberLiteral"; value: number }
  | { type: "StringLiteral"; value: string };

function create_node(l: Lexer, prec = 0): ASTNode {
  const is_primary_expression = prec >= 2;

  if (is_primary_expression) {
    const token = l.next();

    if (!token) {
      throw new TypeError(
        "Expected primary expression but reached the end of the input"
      );
    }

    if (token.type === "ParenEnd") {
      throw new TypeError("No primary expression starts with )");
    }

    if (token.value in OPS_UNARY) {
      return {
        type: "UnaryOp",
        value: { op: token.value as OpUnary, operand: create_node(l) },
      };
    }

    if (token.type === "String") {
      return { type: "StringLiteral", value: token.value };
    }

    if (token.type === "ParenStart") {
      const node = create_node(l);
      const token_next = l.next();

      if (token_next?.type !== "ParenEnd") {
        throw new TypeError(`Expected ')' but got ${token_next?.value}`);
      }

      return node;
    }

    if (token.type === "BracketStart") {
      let token_next = l.next();
      const value = [] as ASTNode[];

      if (!token_next) {
        throw new TypeError("Unexpected end of input");
      }

      if (token_next.type === "BracketEnd") {
        return { type: "List", value };
      }

      l.unnext(token_next);

      value.push(create_node(l));

      token_next = l.next();

      while (token_next?.type === "Comma") {
        value.push(create_node(l));
        token_next = l.next();
      }

      if (token_next?.type !== "BracketEnd") {
        throw new TypeError(`Expected ']' but got ${token_next?.value}`);
      }

      return { type: "List", value };
    }

    let token_next = l.next();

    if (token_next?.type === "ParenStart") {
      const params = [] as ASTNode[];

      token_next = l.next();

      if (!token_next) {
        throw new TypeError("Unexpected end of input");
      }

      if (token_next.type === "ParenEnd") {
        return { type: "FunctionCall", value: { name: token.value, params } };
      }

      l.unnext(token_next);

      params.push(create_node(l));
      token_next = l.next();

      while (token_next?.type === "Comma") {
        params.push(create_node(l));
        token_next = l.next();
      }

      if (token_next?.type !== "ParenEnd") {
        throw new TypeError(`Expected ')' but got ${token_next?.value}`);
      }

      return { type: "FunctionCall", value: { name: token.value, params } };
    }

    if (token.type === "Symbol") {
      if (token_next !== null) {
        l.unnext(token_next);
      }

      const value = Number(token.value);

      if (isNaN(value)) {
        return { type: "Variable", value: token.value };
      }

      return { type: "NumberLiteral", value };
    }
  }

  let lhs = create_node(l, prec + 1);
  let op = l.next();

  while (
    op?.type === "Op" &&
    op.value in OPS_BINARY &&
    OPS_BINARY[op.value].prec === prec
  ) {
    lhs = {
      type: "BinaryOp",
      value: { op: op.value, lhs, rhs: create_node(l, prec + 1) },
    };
    op = l.next();
  }

  if (op) {
    l.unnext(op);
  }

  return lhs;
}
