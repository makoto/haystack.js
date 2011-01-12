# haystack.js

## Basic Use

match_test.key("name")                    // match_test.any(function(k,v){return k == "name"})

match_test.val("foo")                     // match_test.any(function(k,v){return v == "foo" })
match_test.all("1")                       // match_test.any(function(k,v){return k == 1 || v == 1})

## Advanced Use

match_test.any(function(k,v){return k == "name" && v == "bob"}) 
match_test.any(function(k,v){return k.match(/age/i)})
match_test.any(function(k,v){return k > 3})
