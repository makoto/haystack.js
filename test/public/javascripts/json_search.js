var JsonSearch = function (list) {
  this.list = list;
}
JsonSearch.prototype.all = function(query){
  var results = []
  for (var i in this.list){
    if (query.val == this.list[i]) {
      results.push([i])
    };
  };
  return results;
}

JsonSearch.prototype.first = function(){
  return false;
}


