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
var hash_test = new JsonSearch(hash);

test("hash seach all by value returns from first depth", function() {
  deepEqual(hash_test.val("A"), ['["a"]']);
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
var array_test = new JsonSearch(array);

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
var combo_test = new JsonSearch(combo);

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
var match_test = new JsonSearch(match);

test("match option works if set to true", function () {
  deepEqual(match_test.val("foo", {match:true}), ['["a"]', '["b"]']);
});

var custom = {
  a:1,
  b:2,
  c:3
};
var custom_test = new JsonSearch(custom);
test("custom function works if defined", function () {
  deepEqual(custom_test.any(function(k,v){return v < 3}), ['["a"]', '["b"]']);
});


// Alternative syntax
// match_test.key("name")
// match_test.val("foo")
// match_test.all("1")                       // either key or value matches "1"
// match_test.exist("/foo/i")                // Just check whether the key/val exists by using regex.
// match_test.both("name", {}, "bob", {})    // where name = "bob"
// match_test.key("age", {limit:3})          // Limits output
// match_test.key("age", {v:false})          // Disable console.log
// match_test.key("age", {number:"ARRAY"})   // Change ["carparks"]["0"]["attr"] to ["carparks"]["ARRAY"]["attr"]
//                                           // and remove duplicates
// match_test.key("/age/i", {match:true})    // Accept regular expression
// match_test.val("3", {gt:true})            // Any value which is greater than 3

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
var function_test = new JsonSearch(func);
test("function is ignored", function(){
  deepEqual(function_test.val("world"), ['["c"]']);
});



// 


// test("ignore function or prototype methods"), function () {
//   return false;
// }

// test("hash seach first by value returns one", function() {
//   var test = new JsonSearch(hash);
//   deepEqual(test.first({val:10}),  ['["c"]["age"]']);
// })
// 
