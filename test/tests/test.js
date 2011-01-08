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
  console.log(test.all({val:"A"}));
  deepEqual(test.all({val:"A"}), [["a"]]);
})

test("hash seach all by value returns from nested", function() {
  var test = new JsonSearch(hash);
  deepEqual(test.all({val:"bob"}), [["c"]["name"]]);
})

test("hash seach all by value returns multiple", function() {
  var test = new JsonSearch(hash);
  deepEqual(test.all({val:10}), [["c"]["age"],["d"]["age"]]);
})

test("hash seach first by value returns one", function() {
  var test = new JsonSearch(hash);
  deepEqual(test.first({val:10}), ["c"]["age"]);
})

test("array"), function () {
  return false;
}

test("combo"), function () {
  return false;
}

test("key"), function () {
  return false;
}