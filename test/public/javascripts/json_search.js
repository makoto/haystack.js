var JsonSearch = function (list) {
  this.list = list;
};
JsonSearch.prototype.val = function(keyword, query){
  var query = query ? query : {};
  var results = [];
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
      // if (selection(keyword, query.key ? i : collection[i])) {
      if (selection(keyword, collection[i])) {
        results.push(append(result, i));
      };
      if (typeof(collection[i]) == "object") {
        search(collection[i], append(result, i));
      };
    };
  };
  search(this.list, "");
  console && console.log("RESULT: " + results);
  return results;
};

JsonSearch.prototype.key = function(){
  return false;
};


