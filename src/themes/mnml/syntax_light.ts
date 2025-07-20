import { MnmlAccents, Palette, Primaries, Syntax } from "../../types/theme.ts";
import feedback from "./feedback_light.ts";

export default function (
  primaries: Primaries,
  palette: Palette,
  accents: MnmlAccents,
): Syntax {
  return {
    variable: {
      default: primaries.d40,
      builtin: primaries.d40,
      member: accents.a20,
      parameter: accents.a10,
    },
    property: {
      default: accents.a20,
    },
    string: {
      default: accents.a20,
      doc: accents.a20,
      regexp: accents.a10,
      escape: accents.a10,
    },
    constant: {
      default: primaries.d20,
      builtin: primaries.d10,
    },
    module: {
      default: primaries.d30,
    },
    boolean: {
      default: primaries.m10,
    },
    number: {
      default: primaries.d40,
    },
    type: {
      default: primaries.d10,
      builtin: primaries.d40,
    },
    attribute: {
      default: accents.a20,
      builtin: accents.a20,
    },
    func: {
      default: accents.a10,
      builtin: accents.a20,
      method: accents.a20,
    },
    constructor: {
      default: accents.a10,
    },
    keyword: {
      default: primaries.d20,
      import: primaries.d30,
      export: primaries.d30,
    },
    operator: {
      default: primaries.d20,
    },
    punctuation: {
      default: primaries.d40,
      delimiter: primaries.d40,
      bracket: primaries.d40,
      special: primaries.d40,
    },
    comment: {
      default: primaries.m20,
      doc: primaries.m20,
      todo: feedback.green,
      error: feedback.red,
      warn: feedback.yellow,
      info: feedback.blue,
      hint: accents.a20,
    },
    markup: {
      heading: {
        h1: accents.a10,
        h2: accents.a10,
        h3: accents.a10,
        h4: primaries.m10,
        h5: primaries.m10,
        h6: primaries.m10,
      },
      list: {
        default: primaries.m10,
        checked: feedback.green,
        unchecked: primaries.m10,
      },
      strong: accents.a10,
      italic: accents.a10,
      strikethrough: accents.a10,
      quote: primaries.m30,
      math: primaries.m20,
      link: accents.a20,
      code: {
        fg: primaries.d40,
        bg: primaries.l30,
      },
    },
    tag: {
      default: accents.a20,
      builtin: accents.a10,
      delimiter: primaries.m30,
      attribute: primaries.m20,
    },
  };
}
