var JsonSearch = function (list) {
  this.list = list;
}
JsonSearch.prototype.all = function(query){
  var results = []

  var search = function(keyword, collection){
    for (var i in collection){
      if (keyword == collection[i]) {
        results.push([i])
      };
      // if (typeof(this.list[i]) == "object") {
      // };
    };
  };
  
  search(query.val, this.list);

  return results;
}

JsonSearch.prototype.first = function(){
  return false;
}


