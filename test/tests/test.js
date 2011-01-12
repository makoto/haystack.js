var hash = {
  a:"A",
  b:"B",
  c:{
    name:"bob",
    age:10
  },
  d:{
    name:"mark",
    age:10
  }
};
var hash_test = new Haystack(hash);

test("hash seach all by value returns from first depth", function() {
  deepEqual(hash_test.val("A"), ['["a"]']);
});

test("hash seach all by any returns from first depth", function () {
  deepEqual(hash_test.any(function(k,v){return v == "A"}), ['["a"]']);
});


test("hash seach all by value returns from nested", function() {
  deepEqual(hash_test.val("bob"), ['["c"]["name"]']);
});

test("hash seach all by value returns multiple", function() {
  deepEqual(hash_test.val(10), ['["c"]["age"]', '["d"]["age"]']);
});

var array = [
  "A",
  "B",
  ["bob", 10],
  ["mark",10]
];
var array_test = new Haystack(array);

test("array seach all by value returns multiple", function() {
  deepEqual(array_test.val(10), ['["2"]["1"]', '["3"]["1"]']);
});

var combo = [
  {a:"A"},
  {b:"B"},
  {c:{
    name:"bob",
    age:10
  }},
  {d:{
    name:"mark",
    age:10
  }}
];
var combo_test = new Haystack(combo);

test("combo seach all by value returns multiple", function() {
  deepEqual(combo_test.val(10), ['["2"]["c"]["age"]', '["3"]["d"]["age"]']);
});

test("combo seach all by key returns multiple", function() {
  deepEqual(combo_test.key("age"), ['["2"]["c"]["age"]', '["3"]["d"]["age"]']);
});


var match = {
  a:"foo",
  b:"foos",
  c:"bar"
};
var match_test = new Haystack(match);

test("any function works for regex", function () {
  deepEqual(match_test.any(function(k,v){return v.match(/foo/)}), ['["a"]', '["b"]']);
});

var smaller = {
  a:1,
  b:2,
  c:3
};
var sumaller_test = new Haystack(smaller);
test("any function works for smaller than", function () {
  deepEqual(sumaller_test.any(function(k,v){return v < 3}), ['["a"]', '["b"]']);
});

var all = {
  a:1,
  b:2,
  c:3,
  d:"a"
};
var all_test = new Haystack(all);
test("all function works for smaller than", function () {
  deepEqual(all_test.all("a"), ['["a"]', '["d"]']);
});

test("match option does not work if set to false", function () {
  deepEqual(match_test.val("foo"), ['["a"]']);
});

test("match option does not work by default", function () {
  deepEqual(match_test.val("foo"), ['["a"]']);
});

var func = {
  a:"hello",
  b:function(){},
  c:"world"
};
var function_test = new Haystack(func);
test("function is ignored", function(){
  deepEqual(function_test.val("world"), ['["c"]']);
});
