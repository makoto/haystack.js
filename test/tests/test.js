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
  deepEqual(hash_test.all({val:"A"}), ['["a"]']);
});

test("hash seach all by value returns from nested", function() {
  deepEqual(hash_test.all({val:"bob"}), ['["c"]["name"]']);
});

test("hash seach all by value returns multiple", function() {
  deepEqual(hash_test.all({val:10}), ['["c"]["age"]', '["d"]["age"]']);
});

var array = [
  "A",
  "B",
  ["bob", 10],
  ["mark",10]
];
var array_test = new JsonSearch(array);

test("array seach all by value returns from first depth", function() {
  deepEqual(array_test.all({val:"A"}), ['["0"]']);
});

test("array seach all by value returns from nested", function() {
  deepEqual(array_test.all({val:"bob"}), ['["2"]["0"]']);
});

test("array seach all by value returns multiple", function() {
  deepEqual(array_test.all({val:10}), ['["2"]["1"]', '["3"]["1"]']);
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
test("combo seach all by value returns from first depth", function() {
  deepEqual(combo_test.all({val:"A"}), ['["0"]["a"]']);
});

test("combo seach all by value returns from nested", function() {
  deepEqual(combo_test.all({val:"bob"}), ['["2"]["c"]["name"]']);
});

test("combo seach all by value returns multiple", function() {
  deepEqual(combo_test.all({val:10}), ['["2"]["c"]["age"]', '["3"]["d"]["age"]']);
});

test("combo seach all by key returns multiple", function() {
  deepEqual(combo_test.all({key:"age"}), ['["2"]["c"]["age"]', '["3"]["d"]["age"]']);
});


var match = {
  a:"foo",
  b:"foos",
  c:"bar"
};
var match_test = new JsonSearch(match);

test("match option works if set to true", function () {
  deepEqual(match_test.all({val:"foo", match:true}), ['["a"]', '["b"]']);
});

test("match option does not work if set to false", function () {
  deepEqual(match_test.all({val:"foo"}), ['["a"]']);
});

test("match option does not work by default", function () {
  deepEqual(match_test.all({val:"foo"}), ['["a"]']);
});

var func = {
  a:"hello",
  b:function(){},
  c:"world"
};
var function_test = new JsonSearch(func);
test("function is ignored", function(){
  deepEqual(function_test.all({val:"world"}), ['["c"]']);
})

// 


// test("ignore function or prototype methods"), function () {
//   return false;
// }

// test("hash seach first by value returns one", function() {
//   var test = new JsonSearch(hash);
//   deepEqual(test.first({val:10}),  ['["c"]["age"]']);
// })
// 
