# MyGPX

Uncensored and private AI for everybody

## Get started

```bash
cp .env.example .env
```
and be sure that all the variables are set as you need

```bash
# for web:
pnpm dev
# or
pnpm build

# for electron app:
pnpm electron:dev
# or
pnpm electron:build
```
> There is no server code yet (all the work with files and llm is from the main process)
> so it is impossible to use it in web

## Code style

```bash
pnpm lint
# or
pnpm lint:fix
```

## Recomended IDE settings

`.vscode/custom` includes some neccessarities and shouldn't be ignored

```json
{
  /** Set "Prettier" as the default formatter */
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  /** Enable format on save */
  "editor.codeActionsOnSave": {
    "source.fixAll": "always"
  },
  /** Add some rules for tailwind/unocss */
  "css.customData": [
    ".vscode/tailwind.json"
  ],
}
```
