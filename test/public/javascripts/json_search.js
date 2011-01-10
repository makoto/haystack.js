JsonSearch = (function () {
  var append = function(body, value){
    return body + '["' + value + '"]';
  };

  function search(searchFunction, collection, prefix){
    prefix = prefix || "";
    var results = [];
    for(var key in collection){
      var value = collection[key];
      if(typeof value == 'object'){
        results = results.concat(search(searchFunction, value, append(prefix, key)));
      } else {
        if(searchFunction(key, value)) results.push(append(prefix, key));
      };
    }
    return results;
  }

  var klass = function(list){
    this.list = list;
  }

  klass.prototype.key = function(key, query){
    var query = query ? query : {};

    var equal = function(k, v){ return k == key};
    var match = function(k, v){ return k.match(key)};

    var select = query.match ? match : equal;
    r = search(select, this.list);
    console && console.log("RESULT: " + r);
    return r;
  };

  klass.prototype.val = function(key, query){
    var query = query ? query : {};

    var equal = function(k, v){ return v == key};
    var match = function(k, v){ return v.match(key)};

    var select = query.match ? match : equal;
    r = search(select, this.list);
    console && console.log("RESULT: " + r);
    return r;
  };
  return klass;
})();
