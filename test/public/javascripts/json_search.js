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
      // console.log(i + ":" + collection[i]);
      if (keyword == collection[i]) {
        results.push(append(result, i));
      };
      if (typeof(collection[i]) == "object") {
        result = append(result, i);
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


