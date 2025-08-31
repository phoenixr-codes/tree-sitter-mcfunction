; TODO: see `:h treesitter-highlight-groups` for useful rules

; TODO: apply @markup.heading.? for headings as described in
;       https://wiki.bedrock.dev/commands/mcfunctions#comments-style-guide

(comment) @comment

(int) @number
(float) @number.float

(negation) @operator
("/") @operator
(",") @punctuation.delimiter
("=") @punctuation.delimiter
("[") @punctuation.bracket
("]") @punctuation.bracket

(string)  @string
(string)  @spell
(message) @string
(message) @spell

[
 "say"
 "tell"
] @keyword

(selector_arg_key) @property
(selector_variable) @constant.builtin
(player_selector) @string.special
