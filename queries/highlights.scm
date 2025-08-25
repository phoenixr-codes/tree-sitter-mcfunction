; TODO: see `:h treesitter-highlight-groups` for useful rules

; TODO: apply @markup.heading.? for headings as described in
;       https://wiki.bedrock.dev/commands/mcfunctions#comments-style-guide

(execute_keyword) @function.call
(replaceitem_keyword) @function.call
(say_keyword) @function.call
(tell_keyword) @function.call
(tellraw_keyword) @function.call

(entity_keyword) @keyword
(in_keyword) @keyword
(run_keyword) @keyword

(if_keyword) @keyword.conditional
(unless_keyword) @keyword.conditional

(comment) @comment

(integer) @number

(negation) @operator
("/") @operator
(",") @punctuation.delimiter
("=") @punctuation.delimiter
("[") @punctuation.bracket
("]") @punctuation.bracket

(rest) @string
(rest) @spell

(selector_arg_key) @property
(selector_variable) @constant.builtin
(player_selector) @string.special
