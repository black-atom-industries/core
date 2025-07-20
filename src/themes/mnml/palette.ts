import * as Theme from "../../types/theme.ts";

export default function (primaries: Theme.Primaries): Theme.Palette {
  return {
    black: primaries.d20,
    gray: primaries.m10,

    darkRed: primaries.d40,
    red: primaries.m40,

    darkYellow: primaries.d40,
    yellow: primaries.m30,

    darkGreen: primaries.d30,
    green: primaries.m30,

    darkCyan: primaries.m10,
    cyan: primaries.m40,

    darkBlue: primaries.d40,
    blue: primaries.m20,

    darkMagenta: primaries.d30,
    magenta: primaries.m30,

    lightGray: primaries.m40,
    white: primaries.l20,
  };
}
