# tree-sitter-mcfunction

`mcfunction` grammar for [tree-sitter][].

## Editor Integration

> [!IMPORTANT]
> For full compability, also make sure to have Tree-sitter grammar installed for
> JSON.

### Neovim

> [!NOTE]
> See also: <https://github.com/nvim-treesitter/nvim-treesitter?tab=readme-ov-file#adding-parsers>

```lua
local parsers = require("nvim-treesitter.parsers").get_parser_configs()

parsers.mcfunction = {
  install_info = {
    url = "https://github.com/phoenixr-codes/tree-sitter-mcfunction.git",
    files = { "src/parser.c" },
    branch = "main",
  },
}
```

```sh
git clone https://github.com/phoenixr-codes/tree-sitter-mcfunction.git
cd tree-sitter-mcfunction
mkdir -p ~/.config/nvim/queries/mcfunction
ln queries/*.scm ~/.config/nvim/queries/mcfunction
```

## References

- [Official list of commands and their syntax](https://github.com/MicrosoftDocs/minecraft-creator/tree/main/creator/Commands/commands)

## TODO

- Highlight selectors (like `@a`) and emojis (like `:heart:`) in message strings

[tree-sitter]: https://github.com/tree-sitter/tree-sitter
