# This is a comment.
say Hello World
tell @a Hello everyone
tell @a[r=10] Psst, don't tell anyone...
tell Steve What's up? []
replaceitem entity @s slot.armor.head 0 netherite_helmet
execute in nether run say Hello World
execute unless nether run /say Hello World
execute if score Alex bar matches 1..10 if score @r baz > @r baz run say Hello
execute positioned 0 100 0 run tp @a ~ ~-42 ~42 false
execute positioned as @r run title @a actionbar Yo what's up
tellraw @a {"rawtext": [{"text": "Hello World"}]}
function foo/bar
