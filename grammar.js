/**
 * @file MCBE mcfunction syntax
 * @author Jonas da Silva
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const commands = require("./data/commands.cjs");
const emojis = require("./data/emojis.json");
const selectorProps = require("./data/selector_properties.json");

const commandNames = Object.keys(commands).filter((key) => !key.startsWith("_"));

module.exports = grammar({
  name: "mcfunction",

  extras: _ => [
    /\s|\n/,
  ],

  word: $ => $.identifier,

  rules: {
    source_file: $ => repeat(choice($.comment, seq($.command, "\n"))),

    command: $ => choice(...commandNames.map(key => $[key])),

    ...commands,

    // patches
    // Some things are not restricted to the predefined vanilla options
    // especially when adding custom things through behavior packs.
    _block: $ => $.identifier,
    _entity_events: $ => $.identifier,
    _entity_type: $ => $.identifier,
    _item: $ => $.identifier,
    _biome: $ => $.identifier,
    _tool: $ => $.identifier,
    _feature_rules: $ => $.identifier,
    _unlockable_recipe_values: $ => $.identifier,

    // We overwrite the grammar for execute in favor of efficiency.
    execute: $ => seq("execute", $._execute_chained_option),
    _execute_chained_option: $ => choice(
      seq("align", $._string, $._execute_chained_option),
      seq("anchored", $._actor_location, $._execute_chained_option),
      seq("as", $._target, $._execute_chained_option),
      seq("at", $._target, $._execute_chained_option),
      seq(
        "rotated",
        choice(
          seq($._rotation, $._rotation, $._execute_chained_option),
          seq("at", $._target, $._execute_chained_option),
        ),
      ),
      seq(
        "facing",
        choice(
          $._xyz, $._execute_chained_option,
          "entity", $._target, $._actor_location, $._execute_chained_option,
        ),
      ),
      seq(
        "positioned",
        choice(
          $._xyz,
          seq("as", $._target),
        ),
        $._execute_chained_option
      ),
      seq("in", $._dimension, $._execute_chained_option),
      seq(
        choice("if", "unless"),
        choice(
          seq("block", $._xyz, $._block, optional($._blockproperties)),
          seq("blocks", $._xyz, $._xyz, $._xyz, $._blocks_scan_mode),
          seq("entity", $._target),
          seq("score", $._target, $._scoreboard_objectives, choice(
            seq($._compareoperator, $._target, $._scoreboard_objectives),
            seq("matches", $._fullintegerrange)
          ))
        ),
        optional($._execute_chained_option)
      ),
      seq("run", optional("/"), $.command),
    ),

    // types
    _all_dimensions: _ => "all-dimensions",
    _blockproperties: $ => $.block_properties,
    _compareoperator: _ => choice("<", "<=", "=", ">", ">="),
    _default: _ => "default",
    _filepath: $ => $.filepath,
    _float: $ => $.float,
    _fullintegerrange: $ => $.int_range,
    _game_test_name: $ => $.string,
    _game_test_tag: $ => $.string,
    _int: $ => $.int,
    _json: $ => $.json,
    _message: $ => seq($._ws, $.message),
    _operator: _ => choice("=", "+=", "-=", "*=", "/=", "*/", "<>", "<", ">"),
    _scoreboard_objectives: $ => $.score,
    _string: $ => $.string,
    _tag_values: $ => $.string,
    _target: $ => $.selector,
    _text: $ => $.string,
    _time: $ => seq($._int, choice("D", "S", "T")),
    _wildcardint: $ => choice("*", $._int),
    _xyz: $ => seq($.coord, $.coord, $.coord),

    // unwrapped types & other
    // We do want some values to be present in the parse tree
    coord: $ => prec.right(choice(seq(choice("^", "~"), optional($.float)), $.float)),
    filepath: _ => prec(1, /\S+/),
    float: _ => prec(1, /-?[0-9]+(\.[0-9]+)?/),
    int: _ => prec(1, /-?[0-9]+/),
    int_range: $ => seq($.int, "..", $.int),
    score: $ => alias($.string, $.score),
    string: _ => prec(1, /\S+/),
    emoji: $ => seq(":", $._emoji_name, ":"),
    style: _ => /§./,

    _emoji_name: _ => token(choice(...emojis)),

    // comment
    comment: _ => token(seq("#", /.*/)),

    // block properties
    // reference: https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/intrinsicblockstateslist?view=minecraft-bedrock-stable
    block_properties: $ => seq(
      $.block_property,
      repeat(seq(",", $.selector_argument)),
    ),

    block_property: $ => seq(
      "[",
      $.block_state,
      "=",
      $.block_state_value,
    ),

    block_state: $ => $.identifier, // TODO: gets highlighted as identifier,
                                    //       not block_state

    block_state_value: $ => choice(
      $._boolean,
      $.int,
      $.quoted_string
    ),

    // target selector
    selector: $ => choice(
      seq($.selector_variable, optional($.selector_arguments)),
      $.player_selector,
    ),

    player_selector: _ => /[a-zA-Z0-9]+/, // TODO: improve

    selector_variable: $ => choice(
      $._selector_var_nearest_player,
      $._selector_var_nearest_entity,
      $._selector_var_random_player,
      $._selector_var_all_players,
      $._selector_var_all_entities,
      $._selector_var_self,
      $._selector_var_initiator,
    ),

    _selector_var_nearest_player: _ => "@p",
    _selector_var_nearest_entity: _ => "@n",
    _selector_var_random_player: _ => "@r",
    _selector_var_all_players: _ => "@a",
    _selector_var_all_entities: _ => "@e",
    _selector_var_self: _ => "@s",
    _selector_var_initiator: _ => "@initiator",


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

    selector_arg_key: _ => choice(...selectorProps),

    selector_arg_value: $ => seq(
      optional($._negation),
      choice(
        $._int,
        //$._string,
        // TODO: ...
      )
    ),

    // misc
    _negation: _ => "!",
    _message_char: _ => /[^:]/,
    _message_colon: _ => token(":"),
    message: $ => repeat1(choice(
      $.style,
      $.emoji,
      seq($.selector_variable, optional($.selector_arguments)),
      $._message_char,
      $._message_colon,
    )),
    quoted_string: _ => /"[^\n"]*"/,
    json: _ => /.+/,
    identifier: _ => /[:a-zA-Z0-9_.]+/, // TODO
    _ws: _ => /[ ]+/,
  }
});
