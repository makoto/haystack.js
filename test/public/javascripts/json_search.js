var JsonSearch = function (list) {
  this.list = list;
}
JsonSearch.prototype.all = function(query){
  var results = []
  var keyword = query.val;

  var search = function(collection, result){
    for (var i in collection){
      // console.log(i + ":" + collection[i]);
      if (keyword == collection[i]) {
        results.push(result + '["' + i + '"]')
      };
      if (typeof(collection[i]) == "object") {
        result = result + '["' + i + '"]'
        search(collection[i], result);
      };
    };
  };
  search(this.list, "");
  return results;
}

JsonSearch.prototype.first = function(){
  return false;
}


