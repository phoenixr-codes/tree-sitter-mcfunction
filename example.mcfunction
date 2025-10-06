# This is a comment.
say Hello World
tell @a Hello everyone (@a)
tell @s Players @a[r=20] are nearby
tell @a[r=10] Psst, don't tell anyone...
tell Steve What's §lup§r? []
replaceitem entity @s slot.armor.head 0 netherite_helmet
execute in nether run say I :heart: you
execute unless entity @e[name=jeb_] run /say Hello World :this_is_not_an_emoji:
execute if score Alex bar matches 1..10 if score @r baz > @r baz run say Hello
execute positioned 0 100 0 run tp @a ~ ~-42 ~42 false
execute positioned as @r run title @a actionbar Yo what's up
tellraw @a {"rawtext": [{"text": "Hello World"}]}
setblock ~ ~ ~ cake [bite_counter=3]
setblock ~1~2~3 stone
function foo/bar
