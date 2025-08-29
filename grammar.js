/**
 * @file MCBE mcfunction syntax
 * @author Jonas da Silva
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const commands = require("./data/commands.cjs")

module.exports = grammar({
  name: "mcfunction",

  rules: {
    source_file: $ => repeat(choice($.comment, $.command)),

    ...commands,

    // types
    _blockproperties: _ => "TODO",
    _codebuilderargs: $ => $.command,
    _compareoperator: _ => "TODO",
    _default: _ => "default",
    _executechainedoption_0: _ => "TODO",
    _filepath: _ => "TODO",
    _float: _ => /[0-9]+(\.[0-9]+)?/,
    _fullintegerrange: _ => "TODO",
    _game_test_name: _ => "TODO",
    _game_test_tag: _ => "TODO",
    _int: _ => /[0-9]+/,
    _json: $ => $.json,
    _message: $ => $.message,
    _scoreboard_objectives: _ => "TODO",
    _string: _ => /\S+/,
    _target: $ => $.selector,
    _xyz: $ => seq($._float, $._float, $._float),

    // other
    comment: _ => token(seq("#", /.*/)),

    selector: $ => choice(
      seq($.selector_variable, optional($.selector_arguments)),
      $.player_selector,
    ),

    player_selector: _ => /[a-zA-Z0-9]+/, // TODO: improve

    selector_variable: $ => choice(
      $.selector_var_nearest_player,
      $.selector_var_nearest_entity,
      $.selector_var_random_player,
      $.selector_var_all_players,
      $.selector_var_all_entities,
      $.selector_var_self,
      $.selector_var_initiator,
    ),

    selector_arguments: $ => seq(
      "[",
      $.selector_argument,
      repeat(seq(",", $.selector_argument)),
      "]"
    ),

    selector_argument: $ => seq(
      $.selector_arg_key,
      "=",
      $.selector_arg_value,
    ),

    selector_arg_key: _ => choice(
      "name",
      "r",
      "rx",
      // TODO: ...
    ),

    selector_arg_value: $ => seq(
      optional($.negation),
      choice(
        $.integer,
        $.text,
        // TODO: ...
      )
    ),

    negation: _ => "!",

    integer: _ => /[0-9]+/,
    text: _ => /[a-zA-Z][a-zA-Z0-9]*/,

    selector_var_nearest_player: _ => "@p",
    selector_var_nearest_entity: _ => "@n",
    selector_var_random_player: _ => "@r",
    selector_var_all_players: _ => "@a",
    selector_var_all_entities: _ => "@e",
    selector_var_self: _ => "@s",
    selector_var_initiator: _ => "@initiator",

    command: $ => choice(
      $.execute_command,
      $.replaceitem_command,
      $.say_command,
      $.tell_command,
      $.tellraw_command,
    ),

    execute_command: $ => seq(
      $.execute_keyword,
      choice(
        $.execute_if_subcommand,
        $.execute_in_subcommand,
        $.execute_unless_subcommand,
      ),
      $.run_keyword,
      optional("/"),
      $.command,
    ),

    execute_if_subcommand: $ => seq(
      $.if_keyword,
      // TODO
    ),

    execute_in_subcommand: $ => seq(
      $.in_keyword,
      choice("nether", "overworld", "the_end"),
    ),

    execute_unless_subcommand: $ => seq(
      $.unless_keyword,
      // TODO
    ),

    replaceitem_command: $ => seq(
      $.replaceitem_keyword,
      $.entity_keyword, // TODO: block
      $.selector,
      $.replacitem_slot,
      $.integer,
      $.item,
    ),

    say_command: $ => seq(
      $.say_keyword,
      $._ws,
      $.message,
    ),

    tell_command: $ => seq(
      $.tell_keyword,
      $.selector,
      $._ws,
      $.message,
    ),

    tellraw_command: $ => seq(
      $.tellraw_keyword,
      $.selector,
      $._ws,
      $.json,
    ),

    entity_keyword: _ => "entity",
    execute_keyword: _ => "execute",
    if_keyword: _ => "if",
    in_keyword: _ => "in",
    replaceitem_keyword: _ => "replaceitem",
    run_keyword: _ => "run",
    say_keyword: _ => "say",
    tell_keyword: _ => "tell",
    tellraw_keyword: _ => "tellraw",
    unless_keyword: _ => "unless",

    message: _ => /.+/,
    json: _ => /.+/,

    _ws: _ => /\s+/,

    replacitem_slot: _ => /slot\.[.a-zA-Z]+/, // TODO: enum

    item: _ => /[a-zA-Z_]+/, // TODO
  }
});
