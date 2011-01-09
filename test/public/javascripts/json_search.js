var JsonSearch = function (list) {
  this.list = list;
};
JsonSearch.prototype.all = function(query){
  var results = [];
  var keyword = query.key ? query.key : query.val;
  var equal = function(keyword, string){
    return keyword == string;
  };

  var match = function(keyword, string){
    return string.match(keyword);
  };

  var selection = query.match ? match : equal;

  var append = function(body, value){
    return body + '["' + value + '"]';
  };

  var search = function(collection, result){
    for (var i in collection){
      // console.log("i: " + i);
      // console.log("collection[i]: " + collection[i]);
      if (selection(keyword, query.key ? i : collection[i])) {
        results.push(append(result, i));
      };
      if (typeof(collection[i]) == "object") {
        search(collection[i], append(result, i));
      };
    };
  };
  search(this.list, "");
  console.log("RESULT: " + results);
  return results;
};

JsonSearch.prototype.first = function(){
  return false;
};


