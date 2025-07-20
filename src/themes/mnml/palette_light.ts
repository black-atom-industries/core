import * as Theme from "../../types/theme.ts";

export default function (primaries: Theme.Primaries, accents?: Theme.MnmlAccents): Theme.Palette {
    return {
        black: primaries.d20,
        gray: primaries.m10,

        darkRed: primaries.d40,
        red: primaries.m40,

        darkYellow: primaries.m20,
        yellow: primaries.l10,

        darkGreen: primaries.d30,
        green: primaries.m30,

        darkCyan: primaries.m10,
        cyan: primaries.m40,

        darkBlue: accents?.a20 || primaries.d40,
        blue: accents?.a10 || primaries.m20,

        darkMagenta: primaries.d40,
        magenta: primaries.m20,

        lightGray: primaries.l10,
        white: primaries.l20,
    };
}
