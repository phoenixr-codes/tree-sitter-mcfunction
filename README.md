# tree-sitter-mcfunction

`mcfunction` grammar for [tree-sitter][].

## Editor Integration

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

```console
git clone https://github.com/phoenixr-codes/tree-sitter-mcfunction.git
cd tree-sitter-mcfunction
ln queries/highlights.scm ~/.config/nvim/queries/mcfunction/highlights.scm
```

[tree-sitter]: https://github.com/tree-sitter/tree-sitter
