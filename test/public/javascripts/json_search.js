JsonSearch = (function () {
  var append = function(body, value){
    return body + '["' + value + '"]';
  };

  function search(searchFunction, collection, prefix){
    var prefix = prefix || "";
    var results = [];
    for(var key in collection){
      var value = collection[key];
      if(typeof value == 'object'){
        results = results.concat(search(searchFunction, value, append(prefix, key)));
      } else {
        console.log(searchFunction);
        if(searchFunction(key, value)) results.push(append(prefix, key));
      };
    }
    console && console.log("RESULT: " + results);
    return results;
  }

  var klass = function(list){
    this.list = list;
  }

  klass.prototype.key = function(key, query){
    return search(function(k, v){ return k == key}, this.list)
  };

  klass.prototype.val = function(key, query){
    return search(function(k, v){ return v == key}, this.list)
  };

  klass.prototype.any = function(matcher){
    return search(matcher, this.list)
  };

  return klass;
})();
