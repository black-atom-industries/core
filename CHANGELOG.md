# Changelog

## [0.4.0](https://github.com/black-atom-industries/core/compare/v0.3.2...v0.4.0) (2026-03-22)


### Features

* add optional postGenerate hook to adapter config schema ([2fda6d9](https://github.com/black-atom-industries/core/commit/2fda6d937b62c9235f752cee169ebb39de668d69))
* **meta:** add label as computed property on ThemeMeta DEV-338 ([68aa2cf](https://github.com/black-atom-industries/core/commit/68aa2cf8e2a198a4045a51844b83cef664199204))
* **monitor:** add ContrastSwatch component to contrast pairs ([df9503d](https://github.com/black-atom-industries/core/commit/df9503d79766c0e08c64c80efb4e55353f8aa903))
* **monitor:** add data-* role attributes to all React components ([f9df3f1](https://github.com/black-atom-industries/core/commit/f9df3f1de047a0cdf2234d627fc31fbd6845b205))
* **monitor:** add TanStack Router plugin for file-based routing ([95ff64f](https://github.com/black-atom-industries/core/commit/95ff64fcf6d8dff6dbb558e428009f5ca24ec538))
* **monitor:** bg/fg swatch variants; side-by-side UI token layout [DEV-302] ([01a9351](https://github.com/black-atom-industries/core/commit/01a9351e9d0d7616719c6e85b75e4c053cb33737))
* **monitor:** bundle TX-02 font with [@font-face](https://github.com/font-face) declarations [DEV-316] ([43f9a97](https://github.com/black-atom-industries/core/commit/43f9a975d6138c088da11559d5b248e70ebec844))
* **monitor:** click color swatch to copy hex value [DEV-302] ([42e067f](https://github.com/black-atom-industries/core/commit/42e067f5402d0f430a749283a0b0e9b9769c3414))
* **monitor:** contrast analysis & layout redesign [DEV-312] ([#44](https://github.com/black-atom-industries/core/issues/44)) ([bb6ac5f](https://github.com/black-atom-industries/core/commit/bb6ac5f79b27246ec797eda2ee214e3be307213f))
* **monitor:** set TX-02 as primary mono font via OpenProps --font-mono [DEV-316] ([25c96bc](https://github.com/black-atom-industries/core/commit/25c96bc3906122c646465f50b5b2ac21ab2fc3f1))
* **monitor:** syntax preview page [DEV-309] ([73f9946](https://github.com/black-atom-industries/core/commit/73f9946b76c4c3bf304853071a4d8e856ad2a587))
* **monitor:** theme dashboard, stats bar, API cleanup & LLM project config [DEV-311] ([#43](https://github.com/black-atom-industries/core/issues/43)) ([f759ef6](https://github.com/black-atom-industries/core/commit/f759ef68f961d9dd4e50b2d24838c0a5fae4b5f8))
* **monitor:** two-column layout for color token section [DEV-302] ([452cf87](https://github.com/black-atom-industries/core/commit/452cf8776a72099bdc71b4f1c8ccf29bb92640aa))
* **monitor:** update app title to "Black Atom Monitor ([23ee8e1](https://github.com/black-atom-industries/core/commit/23ee8e177f68a2e9ee3aea959c168f29c1bdad6e))
* **preview:** add AppContainer with three-column layout and CSS var injection ([2d131ee](https://github.com/black-atom-industries/core/commit/2d131ee43fc5b6eb5ec869157d52ddb0448fbb26))
* **preview:** add CodePreviewContainer placeholder ([995e60d](https://github.com/black-atom-industries/core/commit/995e60d3bf5f89fc90dd452a9cb7960af0b5b5b3))
* **preview:** add ColorTokenGroup partial ([6705bca](https://github.com/black-atom-industries/core/commit/6705bcac12afe29b02936a6c242e425c21085c52))
* **preview:** add dumb components (badge, nav-item, theme-list-item, color-swatch, stat-card) ([54e0b86](https://github.com/black-atom-industries/core/commit/54e0b86d5726bfe18564361fc283b62137f90877))
* **preview:** add preview API server and theme dump helper ([98a6a77](https://github.com/black-atom-industries/core/commit/98a6a774c5e993ada6fad7c48ab7a26f1e598661))
* **preview:** add StatsRow partial ([1ec8e00](https://github.com/black-atom-industries/core/commit/1ec8e00c692152de442ef75cf5bcca70e6891ee7))
* **preview:** add UI tab partials (token-group, stats-row, ui-examples) ([1c1710d](https://github.com/black-atom-industries/core/commit/1c1710d6d99adb0d80b569e1710b3bcbaef69c81))
* **preview:** add UiPreviewContainer with color tokens, stats, and UI examples ([b2d18fc](https://github.com/black-atom-industries/core/commit/b2d18fc1ecea706d3bbef798ee7827a956b11404))
* **preview:** add WCAG contrast ratio utility ([b1d54d9](https://github.com/black-atom-industries/core/commit/b1d54d958dcf04ee94f422f2aa29e701702b0b3a))
* **preview:** set up TanStack Router with search param state ([9a949d4](https://github.com/black-atom-industries/core/commit/9a949d48527ab538907495951eca9e852a229933))
* run postGenerate hook after adapter generation ([60dfc94](https://github.com/black-atom-industries/core/commit/60dfc9424111e92dd5fea134c860e72ca5820c80))
* **tasks:** add parseTaskArgs utility for flag separation ([75b2c26](https://github.com/black-atom-industries/core/commit/75b2c2696f94eb95066422a8aacba8d2f5da3308))
* **tasks:** add unified dev task; remove adapters:dev; clean up watch shutdown ([117d84c](https://github.com/black-atom-industries/core/commit/117d84cd8087a2b9b1bd9623ce0c861e1182176b))


### Refactors

* **monitor:** consolidate OpenProps imports to style [DEV-316] ([31196d8](https://github.com/black-atom-industries/core/commit/31196d8833c8957b0708f8ea590f4e36c921d4f7))
* **monitor:** extract all font declarations to fonts.css [DEV-316] ([524f07a](https://github.com/black-atom-industries/core/commit/524f07ac30ba369ba4c8fdf5f618cc1bb03b4bcf))
* **monitor:** extract AppLayout dumb component; unify scrollbar suppression ([81aee4d](https://github.com/black-atom-industries/core/commit/81aee4d46ae89d1aad1874a147e4dd3a5d05eae0))
* **monitor:** extract dumb/layout components from partials and containers ([3da8686](https://github.com/black-atom-industries/core/commit/3da8686a037f948504a09a66b403dfc30f1bb157))
* **monitor:** migrate from query-param to route-based navigation [DEV-305] ([af20397](https://github.com/black-atom-industries/core/commit/af20397b498e8755a408d51e10fe9da98bb0d9d0))
* **monitor:** rename index.tsx/index.module.css to named component files ([ff32ad7](https://github.com/black-atom-industries/core/commit/ff32ad7df308f8cf24ea96dbe6151a742eb636f4))
* **monitor:** replace magic numbers with OpenProps [DEV-316] ([906913a](https://github.com/black-atom-industries/core/commit/906913a488ba5928389027ab6d381213f164ef7b))
* **monitor:** use 50ch for left sidebar width [DEV-316] ([91910a9](https://github.com/black-atom-industries/core/commit/91910a9f779bac9109ce538ef222ddc82be0dbaf))
* **preview:** extract hooks into dedicated files ([1f2cd83](https://github.com/black-atom-industries/core/commit/1f2cd83a2add10b8a7927d2a544a50de30c507e9))
* rename preview to monitor ([2e4a835](https://github.com/black-atom-industries/core/commit/2e4a83587c2b629ef09e1b922fd44f6c562070de))
* reorganize deno task definitions and add CI checks ([83a2b0a](https://github.com/black-atom-industries/core/commit/83a2b0ab887f694dbff0b527188de42ec1eb4380))
* **themes/jpn:** refine koyo-hiru palette and align koyo-yoru values ([29ebfe9](https://github.com/black-atom-industries/core/commit/29ebfe9c9c0a7cd9882f0a7c7a24fe1790a1af9e))
* **themes/jpn:** refine koyo-yoru palette and primary values ([0cc12a3](https://github.com/black-atom-industries/core/commit/0cc12a30b2aada6570336399a7c8b2b7080682ec))
* **themes/jpn:** tune murasaki-yoru primaries and palette colors ([c8642bb](https://github.com/black-atom-industries/core/commit/c8642bb7faf81b785d939f8fef5f37551e9fe04b))
* **themes:** adjust black-atom-jpn-koyo-yoru palette ([199b69d](https://github.com/black-atom-industries/core/commit/199b69d85ddfe50279a793225c56fb055994589d))


### Bug Fixes

* **monitor:** add Vite build to checks pipeline to catch asset import errors ([4fbe538](https://github.com/black-atom-industries/core/commit/4fbe5385bb227adb0e30382b5d133f2607da688c))
* **monitor:** bypass Vite proxy for SSE to prevent Deno crash on reload ([346e7a8](https://github.com/black-atom-industries/core/commit/346e7a8c4bc59f9d50cce0a28bdd6bf193165dcf))
* **monitor:** deduplicate hue strip keys; add color-as-text to swatch [DEV-302] ([e371192](https://github.com/black-atom-industries/core/commit/e37119267142d45cc119d4da36ffca6380b99349))
* **monitor:** handle SSE stream cancellation to prevent server crash [DEV-302] ([f3afd82](https://github.com/black-atom-industries/core/commit/f3afd82bbb8e8b6813abf4652f3f2aeaf41594f2))
* **monitor:** indent theme list items under collection labels ([7db500e](https://github.com/black-atom-industries/core/commit/7db500eab50854dcff7cd20ccddd2a117aa18bec))
* **monitor:** pass AbortSignal to fetch for proper query cancellation [DEV-302] ([d819577](https://github.com/black-atom-industries/core/commit/d819577e946f607e8822a4cfdd95a9f7d88fee70))
* **monitor:** restore missing styles import in AppContainer ([81aee4d](https://github.com/black-atom-industries/core/commit/81aee4d46ae89d1aad1874a147e4dd3a5d05eae0))
* **monitor:** use --font-mono in index.html code/pre reset [DEV-316] ([f07c3ae](https://github.com/black-atom-industries/core/commit/f07c3ae7815ee77de8c769a5aa6eb0f237e29c50))
* **monitor:** vary pass rate color by threshold [DEV-312] ([9964560](https://github.com/black-atom-industries/core/commit/9964560dad5d1f475a00724a38807573014c91b9))
* **preview:** fix key prop, link behavior, and disabled button styling ([6344f24](https://github.com/black-atom-industries/core/commit/6344f245a2d664786242d237db30c9a65e4797f7))
* **preview:** use CSS var for color swatch border instead of hardcoded rgba ([e87aaf8](https://github.com/black-atom-industries/core/commit/e87aaf8f0382f3c3581d748960aefe93c7861521))
* **preview:** use entries tuple API for ColorTokenGroup; revert index signatures from core types ([7d3ff90](https://github.com/black-atom-industries/core/commit/7d3ff90a564e78f55f7f69f7ac9f832a1d7d79a0))
* **scripts:** watch generated Ghostty configs instead of theme sources ([24b41c3](https://github.com/black-atom-industries/core/commit/24b41c31e90517c1d4d8298d117b75856ea22898))
* **types:** add index signatures to palette and ui color interfaces ([ea00084](https://github.com/black-atom-industries/core/commit/ea000840bdd7aa4db96149e6f60303a94d5a8bf5))


### Documentation

* add theme preview redesign implementation plan (DEV-302) ([c60cbb5](https://github.com/black-atom-industries/core/commit/c60cbb543f94ac4c9622f12ab715285cb939d808))
* add theme preview redesign spec (DEV-302) ([f49644e](https://github.com/black-atom-industries/core/commit/f49644ecbdc28c8bcf3b54c39ae900811a05913f))
* **monitor:** add contrast analysis design spec [DEV-312] ([d657e55](https://github.com/black-atom-industries/core/commit/d657e556e52fdfafeda45447deef0f22a250396b))
* **monitor:** add dashboard design spec [DEV-311] ([652d6a2](https://github.com/black-atom-industries/core/commit/652d6a27a7a35af41427210f073d0c5eaf06ec3a))
* **monitor:** add dashboard implementation plan [DEV-311] ([e9c1766](https://github.com/black-atom-industries/core/commit/e9c1766fe84762ce444a6fc5dceb5dbca1422376))
* **monitor:** add implementation plan for contrast analysis [DEV-312] ([0afa5a8](https://github.com/black-atom-industries/core/commit/0afa5a8a17828b4b2535e1ef399acf99af3770e1))
* **monitor:** normalize formatting and whitespace in plan/spec ([dcdeff9](https://github.com/black-atom-industries/core/commit/dcdeff91e7c051cd572b8f6017cf8021ddafba0d))
* **monitor:** update dashboard spec — bottom stats bar, container/partial pattern [DEV-311] ([9b5b736](https://github.com/black-atom-industries/core/commit/9b5b7360210bcacd382cd460852f353d74c74c06))
* remove implemented plan and spec documents ([21732b7](https://github.com/black-atom-industries/core/commit/21732b75ea38a3aa62c047ee2719132e2dbd0736))
* **scripts:** update comment to reference deno task dev ([5d42120](https://github.com/black-atom-industries/core/commit/5d42120d5d8b9bf9767a6737a6a46a89916f3e3a))
* **spec:** add TanStack Router for URL-based view/theme state ([dfd5b2c](https://github.com/black-atom-industries/core/commit/dfd5b2c61dbe0f7438c3eee975baddd286fe3ddb))
* **spec:** expand CSS vars to full ui token set with consistent naming ([cbfd6c0](https://github.com/black-atom-industries/core/commit/cbfd6c089b23952a76cfbb9cf88fbc07e5e150f2))

## [0.3.2](https://github.com/black-atom-industries/core/compare/v0.3.1...v0.3.2) (2026-02-26)


### Refactors

* remove unnecessary theme-loader indirection ([dbfb7bd](https://github.com/black-atom-industries/core/commit/dbfb7bd7bfed1ccb37bf3422615d6efb7ad809fc))
* **themes:** adjust black-atom-default-light palette ([00f972e](https://github.com/black-atom-industries/core/commit/00f972e8fb11b06b4feab66287178ffd705cafd7))
* **themes:** adjust black-atom-jpn-koyo-hiru palette ([1f7789b](https://github.com/black-atom-industries/core/commit/1f7789bc9efdb7f4f902a8a683d68a241abc3367))
* **themes:** adjust koyo-hiru palette color values ([4907001](https://github.com/black-atom-industries/core/commit/490700128a32c578cf5912d30e25b94474a528aa))
* **themes:** align structure across all collections (DEV-293) ([d969be0](https://github.com/black-atom-industries/core/commit/d969be02132424afdcaa8f71943643d22b053a63))


### Bug Fixes

* correct meta key reference in default-dark-dimmed theme ([4b4fa70](https://github.com/black-atom-industries/core/commit/4b4fa704211204ef5ec3d3ae7f5cb6635913ea78))

## [0.3.1](https://github.com/black-atom-industries/core/compare/v0.3.0...v0.3.1) (2026-02-26)


### Bug Fixes

* type ThemeCollectionMeta.key as ThemeCollectionKey instead of string ([8e450f7](https://github.com/black-atom-industries/core/commit/8e450f7908e57b21d44a2789fc91dcc954e160e8))

## [0.3.0](https://github.com/black-atom-industries/core/compare/v0.2.0...v0.3.0) (2026-02-26)


### ⚠ BREAKING CHANGES

* All type exports prefixed with Theme (Key→ThemeKey, Meta→ThemeMeta, Definition→ThemeDefinition, etc). ThemeMeta.label removed — use ThemeMeta.name + formatThemeLabel(). themeBundle renamed to themeMap. New exports: collectionOrder, collectionLabels, formatThemeLabel. release-please configured with bump-minor-pre-major to prevent premature 1.0.0.

### Features

* add terminal color test watch mode ([47af464](https://github.com/black-atom-industries/core/commit/47af4645c3a7e342b729cd27c599c904f187a380))
* rename type exports, replace meta.label with meta.name [DEV-279] [DEV-283] ([225519b](https://github.com/black-atom-industries/core/commit/225519bfe3b38bfdc605cd2d64d53b28a611ce23))
* **themes/default:** separate palette creation for light and dark ([ec1503a](https://github.com/black-atom-industries/core/commit/ec1503a645a03419cddbf0604e33fe21d345c3c4))


### Refactors

* **claude:** migrate commands and agents to skills, slim CLAUDE.md ([6baa3ef](https://github.com/black-atom-industries/core/commit/6baa3ef9d4fc7e5373888648c649b408f136f4af))
* **deno:** publish task and JSR type checking requirements ([28faabc](https://github.com/black-atom-industries/core/commit/28faabce5b5632d25eb971ec360da59709fb7418))


### Bug Fixes

* align border and always clear screen in terminal color test ([714b378](https://github.com/black-atom-industries/core/commit/714b3785032c45e055f8b5a3e951eb23819ac014))
* **ci:** include docs commits in release changelog ([e66dfd8](https://github.com/black-atom-industries/core/commit/e66dfd8050805dd253b1a15490be9eb7fa04b7ad))
* **ci:** move JSR publish into release workflow ([45587da](https://github.com/black-atom-industries/core/commit/45587da0669ff97105179fd66d64772f67a2f45c))


### Documentation

* standardize documentation file naming conventions ([88d2104](https://github.com/black-atom-industries/core/commit/88d21048736b32bed03fced4d75d9e4a5e74c6a2))

## [0.2.0](https://github.com/black-atom-industries/core/compare/v0.1.3...v0.2.0) (2026-02-21)


### Features

* add adapter enabled flag and dynamic discovery with proper validation ([deacc0d](https://github.com/black-atom-industries/core/commit/deacc0df4b07900ab48af84c599d8d8812248d31))
* add adapter schema ([9dcb251](https://github.com/black-atom-industries/core/commit/9dcb251e5ce20ea06f0e0578eb63ea3ad83b2d8a))
* add blue variants to mnml collection ([3ac46d4](https://github.com/black-atom-industries/core/commit/3ac46d471103747d5a1701263422119063fb846e))
* add collection-based template system ([6e9debf](https://github.com/black-atom-industries/core/commit/6e9debf3a2fa758553ed32ea5b51e1cb4b46585a))
* add generate-all command to update all adapter repositories ([e304068](https://github.com/black-atom-industries/core/commit/e30406899e0c3fdd9a7b65a077e90e84887bcda4))
* **agents:** add theme designer and taste profile documentation ([4c3fff2](https://github.com/black-atom-industries/core/commit/4c3fff2649be42862143ad606e5ac1d362da7b73))
* **beads:** initialize AI-native issue tracking system ([b565cdd](https://github.com/black-atom-industries/core/commit/b565cddb67dcef58347e2b8a100e5e4b24919c3c))
* **cli:** add --watch flag to adapt command ([2054f19](https://github.com/black-atom-industries/core/commit/2054f199eda28a9818508a905e1af38723953009))
* **cli:** add --watch flag to adapt command ([46ef060](https://github.com/black-atom-industries/core/commit/46ef06071fc444bfb8b8332694539b4594711e4d))
* **cli:** add help commands ([28f7db1](https://github.com/black-atom-industries/core/commit/28f7db18e606315200c04114cb79ffdcd20e0260))
* **cli:** enhance error messages with colored output ([11a62e9](https://github.com/black-atom-industries/core/commit/11a62e946f14a3640b80791fd94aca4cba0a9fb7))
* **cli:** find and parse adapter config file ([4181fe4](https://github.com/black-atom-industries/core/commit/4181fe4259c32b61b03f343f161ecd9bd9c113df))
* **cli:** implement template processing with Eta engine ([33b4243](https://github.com/black-atom-industries/core/commit/33b4243a58d215d12d1fb092cbe57864666f7105))
* **cli:** improve Zod validation error formatting for adapter config ([315c79a](https://github.com/black-atom-industries/core/commit/315c79a5375012dd1c393b70b51be308f0c64877))
* **cli:** warn if no theme keys are defined ([24ee354](https://github.com/black-atom-industries/core/commit/24ee354c8f7645ed6687facb4e3442b07dad4646))
* collection templates ([46b923b](https://github.com/black-atom-industries/core/commit/46b923b1175dcb07a6834054e9968013b73abdc6))
* **config:** add wezterm adapter ([23b4df7](https://github.com/black-atom-industries/core/commit/23b4df77d3d388c2b5b47f93caa1119e15b30141))
* **deno:** add compile command ([be65e53](https://github.com/black-atom-industries/core/commit/be65e539487ee28150012894829738f2ee3a4b5e))
* **deno:** add tasks ([4b8ad65](https://github.com/black-atom-industries/core/commit/4b8ad65a093397f2ad65a74baa1b1596f4a75d74))
* **deno:** allow write for installation ([eae9db5](https://github.com/black-atom-industries/core/commit/eae9db5595692e65aa4e6725d7f7d8bfa277f545))
* **deno:** improve CLI installation and import management ([49eb707](https://github.com/black-atom-industries/core/commit/49eb707eb96cdaf68a6d263e93b270701f0113dc))
* **deno:** setup deno runtime and configuration ([397cbdb](https://github.com/black-atom-industries/core/commit/397cbdb416efc5ab5e477768c8c9b185f2cdec97))
* first working state ([43bb4dc](https://github.com/black-atom-industries/core/commit/43bb4dcbbd89f8830aebfe27cfc4a959daee79a3))
* implement accent abstraction system for mnml collection ([4a7e48b](https://github.com/black-atom-industries/core/commit/4a7e48b5ca9082776b9aafac7bbe0f9eff2d921b))
* Implement recursive theme file discovery for dynamic imports ([f62ac56](https://github.com/black-atom-industries/core/commit/f62ac5643a24118dabb17cd8d3c8767c04e57644))
* improve logging ([3f03d2d](https://github.com/black-atom-industries/core/commit/3f03d2d866cb0642c75725c3bf8bc68331064da1))
* improve theme development workflow ([c4194d8](https://github.com/black-atom-industries/core/commit/c4194d874431a9a41f3d59756e04f0b44707fecf))
* **index:** aggregate file types dynamically ([8cfbb0d](https://github.com/black-atom-industries/core/commit/8cfbb0d7f5a632bd074f9e4e46e37618747f767d))
* **index:** dynamically import theme definitions ([1168abf](https://github.com/black-atom-industries/core/commit/1168abff908ef86523c55701250af35505e8fa82))
* **index:** make output nicer ([1c9b08c](https://github.com/black-atom-industries/core/commit/1c9b08c5af75e0c462ca9dcfb634c8c3c5366563))
* **lib/log:** extract menu logging to dedicated function ([20b2be2](https://github.com/black-atom-industries/core/commit/20b2be243f9a164c5482fe2ba4f9be3b4e54b27e))
* **log:** enhance logging with icons and improved message formatting ([54ee946](https://github.com/black-atom-industries/core/commit/54ee946b138e004415993daaf4f107c5c65ce46a))
* make index output a little nicer ([b037eef](https://github.com/black-atom-industries/core/commit/b037eef66236e39fbf6f16c2fac01b27dbf6c045))
* **mnml:** add e-ink theme with pure grayscale palette ([9a5eddd](https://github.com/black-atom-industries/core/commit/9a5edddfd67ae924b2991d3888a045f5be9d46bc))
* **mnml:** add ITA light theme ([f103ef2](https://github.com/black-atom-industries/core/commit/f103ef23954bae529111745252cdec56af92316a))
* **mnml:** add mono theme ([ce32ce5](https://github.com/black-atom-industries/core/commit/ce32ce51ea60709511a214758b48be271ad998d5))
* **mnml:** add osman light theme ([19cc03c](https://github.com/black-atom-industries/core/commit/19cc03cb7ab74f5a70265d3b27011c2732affac3))
* **mnml:** add osman light theme ([6d2cb0e](https://github.com/black-atom-industries/core/commit/6d2cb0e5f524e9fd50079acc93a4483640d6710a))
* more concise logging ([2b1a951](https://github.com/black-atom-industries/core/commit/2b1a9510dda703045f44945753392f08e1780b6c))
* move adapt-all from CLI to Deno tasks (DEV-173) ([3f03d2d](https://github.com/black-atom-industries/core/commit/3f03d2d866cb0642c75725c3bf8bc68331064da1))
* new default collection (dark, dark-dimmed, light, light-dimmed) ([230ed02](https://github.com/black-atom-industries/core/commit/230ed020bb6c834429d603012aac62de47d7b063))
* prepare core for JSR publishing as @black-atom/core [DEV-240] ([726306f](https://github.com/black-atom-industries/core/commit/726306f93b766f8fb0c09dbb5677d61db0f3435c))
* rename Nord theme collection to North ([1cc5a28](https://github.com/black-atom-industries/core/commit/1cc5a28e32b286ef6f98e71a8cf39afa2c587fe2))
* **schema:** automate schema generation with theme keys from config ([fa2c065](https://github.com/black-atom-industries/core/commit/fa2c065b310130f0e02cc46b376ad9d22016adc6))
* **schema:** require at least one theme key ([bd8ca87](https://github.com/black-atom-industries/core/commit/bd8ca874b076f02cc80f7bae9411ebd23d4e7823))
* **schemas:** implement adapter config validation with Zod ([3c13668](https://github.com/black-atom-industries/core/commit/3c1366887627ce036090362c2178c4760f960bfe))
* **schema:** simplify adapter config and enforce required themes ([7fc65c8](https://github.com/black-atom-industries/core/commit/7fc65c8902b0e3ea04152fada31bd81050d56225))
* **schemas:** simplify adapter config schema and consolidate types ([e1e7570](https://github.com/black-atom-industries/core/commit/e1e7570d3f918a82d27ace283021536764df4743))
* **scripts:** enhance repository label standardization script ([4d0240e](https://github.com/black-atom-industries/core/commit/4d0240e8bd84bebb008ead943fad14c7a99468b4))
* **scripts:** improve labels ([52b9e0f](https://github.com/black-atom-industries/core/commit/52b9e0f93593ad97aa6d63b2310e3b52c576a4e8))
* **scripts:** improve labels ([8a1dbe4](https://github.com/black-atom-industries/core/commit/8a1dbe40d238673edccbbca212527e3a61fbb45e))
* **scripts:** script to standardize labels ([1e64914](https://github.com/black-atom-industries/core/commit/1e64914b18693944c98dfb7c1d9b4e4766050e7f))
* setup format & prettier ([e0e6322](https://github.com/black-atom-industries/core/commit/e0e63229dd601a7a09b8cc489bbceb0533371d0a))
* **skill:** add nik:link-themes-to-dots for dotfiles integration ([2b563bb](https://github.com/black-atom-industries/core/commit/2b563bb2865ba45c43702058d9201e8770ecd077))
* **skill:** add waybar to new-theme adapter list ([285e921](https://github.com/black-atom-industries/core/commit/285e921b2fe095837935ab5942836f6390e7ad02))
* **skills:** add new-adapter skill for creating platform adapters ([f416bc8](https://github.com/black-atom-industries/core/commit/f416bc806858fb7771577cc3c03bb3ebdd0f70cc))
* **tasks:** add -y flag to adapters:commit to skip confirmation ([ba14517](https://github.com/black-atom-industries/core/commit/ba14517fe94beb7f4090b8dad25a10ece290af1d))
* **tasks:** add adapters:tui beta ([8ce0e40](https://github.com/black-atom-industries/core/commit/8ce0e40134ef6a6d0165c54a34d555f73b7521d0))
* **tasks:** add custom message support to adapters:commit ([9a68f21](https://github.com/black-atom-industries/core/commit/9a68f21717cdb6533c1eab5d45b67a79036e04da))
* **tasks:** add dev:adapter:push task ([1a56e7d](https://github.com/black-atom-industries/core/commit/1a56e7d6bef3ebb27c95bbed0560e1a78f62ec3e))
* **tasks:** add dev:adapter:status task ([e9e1f36](https://github.com/black-atom-industries/core/commit/e9e1f3663ded9ab03f72ded98bbc965d0db7062f))
* **tasks:** add dev:adapters:reset task ([6e3b9da](https://github.com/black-atom-industries/core/commit/6e3b9da5ffad1fd65008006371fb22ab9324d1a6))
* **tasks:** improve theme watch reliability and UX ([8bed562](https://github.com/black-atom-industries/core/commit/8bed56251498e3fe90e2db9eea6372153e030fe0))
* **tasks:** include core repository in the status overview ([b16af88](https://github.com/black-atom-industries/core/commit/b16af8889e816b586b512fca30fab4779c36f248))
* **template:** expanded templates for css & scss ([930dbff](https://github.com/black-atom-industries/core/commit/930dbffb6eeb9d261af717ce140f846da82a37a0))
* **templates:** add type to lua ([49fea21](https://github.com/black-atom-industries/core/commit/49fea219edc474494efe8e8e914c01eef3d971c0))
* **templates:** added template for json & yml ([843a6dc](https://github.com/black-atom-industries/core/commit/843a6dcecc70b189613855cf187054dfd2b57dcf))
* **theme:** add default to syntax ([6453a6a](https://github.com/black-atom-industries/core/commit/6453a6a8ba475cfa31b9e54dc407d97ff5bb273e))
* **themes/corp:** remove corporate theme files ([bea7bca](https://github.com/black-atom-industries/core/commit/bea7bcaafd5349a7122d6e04083bd18ac42e271f))
* **themes/crbn:** adjust dark primaries in crbn-null theme ([531717e](https://github.com/black-atom-industries/core/commit/531717e8a4872b3494d2aee759e1148f66ba57d7))
* **themes/crbn:** migrate crbn theme collection ([04a9e46](https://github.com/black-atom-industries/core/commit/04a9e464dac2851b1057cb5bd0ed08cb36f9a64d))
* **themes/crbn:** refine color values for improved contrast ([3e5ccde](https://github.com/black-atom-industries/core/commit/3e5ccde5eee5d8228a41cc3575e867b237566961))
* **themes/crbn:** refine dark theme colors for improved readability ([3e5ccde](https://github.com/black-atom-industries/core/commit/3e5ccde5eee5d8228a41cc3575e867b237566961))
* **themes/crbn:** update colors for supr ([e180e62](https://github.com/black-atom-industries/core/commit/e180e621deb530fc9f5eb1d57db64d353db5aa37))
* **themes/jpn/koyo-hiru:** adjust lightGray/white ([e5f6c28](https://github.com/black-atom-industries/core/commit/e5f6c2863724f1540135e404c3a24b2b471a0822))
* **themes/jpn:** add Japanese theme collection with Koyo and Tsuki variants ([54b3792](https://github.com/black-atom-industries/core/commit/54b379234802ba56596790a7d6e8b982632c0bca))
* **themes/jpn:** add murasaki theme ([966cec6](https://github.com/black-atom-industries/core/commit/966cec6b28c65ec669dd6364906e5035550e9604))
* **themes/jpn:** adjust code bg in syntax dark ([799b411](https://github.com/black-atom-industries/core/commit/799b411624190415e4991861a6388d617b55d970))
* **themes/jpn:** adjust markdown syntax colors and code blocks ([3e82d57](https://github.com/black-atom-industries/core/commit/3e82d5763ace77834d8207678002372eeebf919f))
* **themes/jpn:** darken koyo yoru ([e977a0e](https://github.com/black-atom-industries/core/commit/e977a0e230f39f3fc6b0dfdd3ea606491be822d0))
* **themes/jpn:** refine color palette for `koyo-yoru` and `murasaki-yoru` ([46fc79e](https://github.com/black-atom-industries/core/commit/46fc79e74df6c97f43aa4f69fff458159ffb5a52))
* **themes/jpn:** refine color values for improved visual harmony ([3ab1fe5](https://github.com/black-atom-industries/core/commit/3ab1fe5961f65e8904d64b4e8ba7186fce58485b))
* **themes/jpn:** small contrast improvements ([82e468b](https://github.com/black-atom-industries/core/commit/82e468b81b60634bbdaf4b7c05f1f7dddd2f4d42))
* **themes/mnml:** adjust syntax dark theme keyword colors ([d422573](https://github.com/black-atom-industries/core/commit/d4225731418ec3f8514ac0119d29da7b5e5b33b0))
* **themes/mnml:** rename blue theme to mikado ([71828a9](https://github.com/black-atom-industries/core/commit/71828a9a102a48b9234dc6992021ce78ba2a59ef))
* **themes/mnml:** update mikado light theme colors ([b1f0374](https://github.com/black-atom-industries/core/commit/b1f037499e597589799058010000de2722dfd8a4))
* **themes/stations:** migrate stations theme collection ([083d78a](https://github.com/black-atom-industries/core/commit/083d78a0a467bed46db21860ae5702a9d1dfd53a))
* **themes/stations:** update colors ([03fa982](https://github.com/black-atom-industries/core/commit/03fa982aff0e2934258ee3f848e0d23d8d21a171))
* **themes/terra:** migrate terra theme collection ([853e9f8](https://github.com/black-atom-industries/core/commit/853e9f8c29b988ef6f70559966860da588f0ec6c))
* **themes:** add black-atom-engineering ([1bfefa8](https://github.com/black-atom-industries/core/commit/1bfefa8db6cadaabff75a587b43fba0a0e5146d8))
* **themes:** add black-atom-medical ([3b47de5](https://github.com/black-atom-industries/core/commit/3b47de55d225e35c7a1a3b3b3ceaeb4a3cf3054e))
* **themes:** add black-atom-operations ([70f69f7](https://github.com/black-atom-industries/core/commit/70f69f74376b887aa0166fe516e6df1ff07f0ebb))
* **themes:** add black-atom-research ([426b6b6](https://github.com/black-atom-industries/core/commit/426b6b663a2ce594157130460ec34131b77d0061))
* **themes:** add terminal (term) theme collection ([02b8790](https://github.com/black-atom-industries/core/commit/02b87908020b6fc3aa7ad336081f516d59df9637))
* **themes:** refine primary colors in crbn-supr and koyo-hiru themes ([6cfb8e7](https://github.com/black-atom-industries/core/commit/6cfb8e7d8ce53b7c25250b92d15143d4e019f15a))
* **themes:** update primaries for stations ([46431e2](https://github.com/black-atom-industries/core/commit/46431e220d7a2a8917d073bbdcfe2433a5f2cb4a))
* **types/theme:** expand theme labels ([3826c12](https://github.com/black-atom-industries/core/commit/3826c12b5e68c379f70df26fb71b4481cedc4b47))
* **types:** add theme types ([1d620b2](https://github.com/black-atom-industries/core/commit/1d620b256d2b1dc47f41aa03f8059cb2788727fe))
* **types:** define adapter configuration types and refine theme exports ([5d20404](https://github.com/black-atom-industries/core/commit/5d204046f3f2b618bd5028a80c628f59053c64e3))
* Update TypeScript theme types to match Lua definitions ([4144e76](https://github.com/black-atom-industries/core/commit/4144e7614035a3957325e3671cdc5f29f680657c))
* use oklch for theme definitions ([4ff5f86](https://github.com/black-atom-industries/core/commit/4ff5f8600395b9cb3092fe5a8e9d6d5ffa733481))
* **utils:** add color manipulation utilities and update UI themes ([4fe3e33](https://github.com/black-atom-industries/core/commit/4fe3e331f8252234ff0b09996ffb562040bed6fe))


### Bug Fixes

* add extensions ([6c1c396](https://github.com/black-atom-industries/core/commit/6c1c396494ec0a90ade21710db821c815f1d2338))
* **ci:** remove release-type from action to use config file properly ([030da7e](https://github.com/black-atom-industries/core/commit/030da7ecf6d4a26bfa4e8262cabb861ddf79a501))
* **config:** disable obsidian until ready ([1717f32](https://github.com/black-atom-industries/core/commit/1717f323eb7a53c7e12f98105cad0267c5d82fd8))
* **default/light:** correct bg.active to use l40 instead of l10 ([c48d592](https://github.com/black-atom-industries/core/commit/c48d592a2714e587b80cd4ac2e58a7602b7ec706))
* improve log output formatting and separators (DEV-173) ([a4cc499](https://github.com/black-atom-industries/core/commit/a4cc49925e288d3fcd0c7a8a4a96661592eaa239))
* **lib/template:** disable auto-trimming in template engine configuration ([a765334](https://github.com/black-atom-industries/core/commit/a765334bf913a9377126904e733496f1735626f9))
* **mnml/ita:** adjust primaries ([ca8444c](https://github.com/black-atom-industries/core/commit/ca8444cceb228dc79a81a1042afb5dc8c022707a))
* **mnml/ita:** adjust primaries ([136dd36](https://github.com/black-atom-industries/core/commit/136dd365673defd9778c12a62f3c128b87f8dc8c))
* **mnml/mono:** adjust primaries ([1298a0a](https://github.com/black-atom-industries/core/commit/1298a0ac06c8a446e8852b961b4a081b69baed33))
* **mnml:** darken eink-dark background and increase accent visibility ([a0ce1dc](https://github.com/black-atom-industries/core/commit/a0ce1dc26fb9e0684541dee26acd8744781d61be))
* **schema:** add missing "default" collection to adapter schema ([406ccac](https://github.com/black-atom-industries/core/commit/406ccac259a0b0eb639ae5ba0822a35064ced794))
* **skill:** ask before running dotfiles linking ([f98a9d4](https://github.com/black-atom-industries/core/commit/f98a9d40c99b5f0ad2bbcd5eabebdc265abaf672))
* **tasks:** always show staged files in theme:commit before confirmation ([1e54a64](https://github.com/black-atom-industries/core/commit/1e54a64a2ea90d189a4de1ba9d605f7228c21d22))
* **tasks:** improve status task display and adapter detection ([e9e1f36](https://github.com/black-atom-industries/core/commit/e9e1f3663ded9ab03f72ded98bbc965d0db7062f))
* **templates:** add semicolon for css ([5d38dbe](https://github.com/black-atom-industries/core/commit/5d38dbe8e93f5c69a295d7550dc39b47fddc031b))
* **themes/crbn:** adjust darkYellow color in crbn-null theme ([173893e](https://github.com/black-atom-industries/core/commit/173893e1b1c18208c641971c23c982fcb090358e))
* **themes/crbn:** refine color palette for crbn themes ([31727f4](https://github.com/black-atom-industries/core/commit/31727f4f8324a81e87de288206fb44c73555d2bb))
* **themes/default:** darken light primaries in default-light-dimmed theme ([3c74765](https://github.com/black-atom-industries/core/commit/3c747651888ca7cd30cd51fd3b98d60d24a43cc4))
* **themes/default:** refine accent colors and syntax highlighting for func/param ([c944c3e](https://github.com/black-atom-industries/core/commit/c944c3e5b907c064a11e434d63d3ee361914fdb2))
* **themes/default:** update feedback imports to kebab-case ([44b94dd](https://github.com/black-atom-industries/core/commit/44b94dd4bbd5c3fcbadcd70763adfdafd56d0281))
* **themes/jpn:** update yellow for murasaki ([db8d2fa](https://github.com/black-atom-industries/core/commit/db8d2fab8f2845b9d0273a9e3442665c870db339))
* **themes:** fix typings and strings ([c816549](https://github.com/black-atom-industries/core/commit/c8165490ab5440de54b22e5659d2cbb53792d579))
* **themes:** update labels for station themes ([258dc84](https://github.com/black-atom-industries/core/commit/258dc84778209273af58fc653d224e64d8ca8a6f))
* use import type for type-only imports across codebase ([01a0c18](https://github.com/black-atom-industries/core/commit/01a0c18b193aacba5306e99466debec60a344b28))
* use JSON.parse ([9bc8818](https://github.com/black-atom-industries/core/commit/9bc881860fdc62c4d33e891da05bfaca0d20170c))
* **watch:** correctly identify adapter for template changes ([29b0a79](https://github.com/black-atom-industries/core/commit/29b0a79b26761c2dfadfc0ecd1132b880a739c5b))


### Reverts

* remove terra themes for now ([780156b](https://github.com/black-atom-industries/core/commit/780156ba0c0e747f95051a9fbefb28dbe0559a83))
* use only one theme right now until the flow works ([3fb419c](https://github.com/black-atom-industries/core/commit/3fb419c10f90f0f44fd3d2b7ef0ec322dc2d775b))
