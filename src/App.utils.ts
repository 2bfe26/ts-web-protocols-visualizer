import yaml from "yaml";
import joi from "joi";
import { VParsed } from "./App.types";

const VSchema = joi.object({
  entidades: joi
    .array()
    .items(
      joi.object({
        nome: joi.string(),
        tipo: joi.string().valid("navegador", "cliente", "servidor"),
      })
    )
    .required(),
  primeiroPasso: joi.number().required(),
  passos: joi.array().items(
    joi
      .object({
        nome: joi.string().required(),
        descricao: joi.string(),
        etapa: joi.string(),
        mostrar: joi
          .alternatives()
          .try(
            joi.object({
              flecha: joi.array().items(joi.string()).required(),
            }),
            joi.object({
              texto: joi.string(),
            })
          )
          .required(),
        ações: joi.object().pattern(joi.string(), joi.string()),
      })
      .required()
  ),
});

export function parserV(src: string): VParsed | null {
  try {
    const parsed = yaml.parse(src);

    const { error } = VSchema.validate(parsed, { allowUnknown: true });

    if (error) {
      throw new Error(String(error));
    }

    return parsed;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export function cyrb53(str: string, seed = 0) {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;

  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }

  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return String(4294967296 * (2097151 & h2) + (h1 >>> 0));
}
