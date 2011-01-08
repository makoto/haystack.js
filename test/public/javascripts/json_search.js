var JsonSearch = function (list) {
  this.list = list;
}
JsonSearch.prototype.all = function(query){
  var results = []
  var keyword = query.val;

  var append = function(body, value){
    return body + '["' + value + '"]';
  };

  var search = function(collection, result){
    for (var i in collection){
      if (keyword == collection[i]) {
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
}

JsonSearch.prototype.first = function(){
  return false;
}


