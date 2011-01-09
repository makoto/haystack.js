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
}
test("hash seach all by value returns from first depth", function() {
  var test = new JsonSearch(hash);
  deepEqual(test.all({val:"A"}), ['["a"]']);
})

test("hash seach all by value returns from nested", function() {
  var test = new JsonSearch(hash);
  deepEqual(test.all({val:"bob"}), ['["c"]["name"]']);
})

test("hash seach all by value returns multiple", function() {
  var test = new JsonSearch(hash);
  deepEqual(test.all({val:10}), ['["c"]["age"]', '["d"]["age"]']);
})

var array = [
  "A",
  "B",
  ["bob", 10],
  ["mark",10]
]

test("array seach all by value returns from first depth", function() {
  var test = new JsonSearch(array);
  deepEqual(test.all({val:"A"}), ['["0"]']);
})

test("array seach all by value returns from nested", function() {
  var test = new JsonSearch(array);
  deepEqual(test.all({val:"bob"}), ['["2"]["0"]']);
})

test("array seach all by value returns multiple", function() {
  var test = new JsonSearch(array);
  deepEqual(test.all({val:10}), ['["2"]["1"]', '["3"]["1"]']);
})

// test("combo"), function () {
//   return false;
// }
// 
// test("key"), function () {
//   return false;
// }

// test("hash seach first by value returns one", function() {
//   var test = new JsonSearch(hash);
//   deepEqual(test.first({val:10}),  ['["c"]["age"]']);
// })
// 
