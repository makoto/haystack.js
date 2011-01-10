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
        if(searchFunction(key, value)) results.push(append(prefix, key));
      };
    }
    return results;
  }

  var klass = function(list){
    this.list = list;
  }

  var setSerachFunctions = function(list, query, callback){
    var query = query || {};
    selections = callback();
    if (query.match) {
      var select = selections.match;
    }else if(query.func){
      var select = query.func;
    }else{
      var select = selections.equal;
    };

    r = search(select, list);
    console && console.log("RESULT: " + r);
    return r;
  }

  klass.prototype.key = function(key, query){
    return setSerachFunctions(
      this.list, query, function(){
        return {
          equal:function(k, v){ return k == key}, 
          match:function(k, v){ return k.match(key)}
        }
      }
    );
  };

  klass.prototype.val = function(key, query){
    return  setSerachFunctions(
      this.list, query, function(){
        return {
          equal:function(k, v){ return v == key}, 
          match:function(k, v){ return v.match(key)}
        }
      }
    );
  };
  return klass;
})();
