// Array.map from  https://github.com/olivernn/davis.js/blob/master/src/davis.utils.js
if (Array.prototype.map) {
  var map = function (array, fn) {
    return array.map(fn, arguments[2])
  }
} else {
  var map = function(array, fn) {
    if (array === void 0 || array === null) throw new TypeError();
    var t = Object(array);
    var len = t.length >>> 0;
    if (typeof fn !== "function") throw new TypeError();
    

    var res = new Array(len);
    var thisp = arguments[2];
    for (var i = 0; i < len; i++) {
      if (i in t) res[i] = fn.call(thisp, t[i], i, t);
    }

    return res;
  };
};

// Haystack
Haystack = (function () {
  var append = function(body, value){
    return body + '["' + value + '"]';
  };

  var search = function(searchFunction, collection, prefix){
    var prefix = prefix || "";
    var results = [];
    for(var key in collection){
      var value = collection[key];
      if(searchFunction(key, value)) {
        results.push(append(prefix, key));
      }
      if(typeof value == 'object'){
        results = results.concat(search(searchFunction, value, append(prefix, key)));
      };
    }
    // console && console.log("RESULT: " + results);
    results.matched = function(idx){
      return this.map(
        function(result){
          return eval("collection" + result);
        }
      )
    }
    return results;
  }

  var klass = function(list){
    this.list = list;
  }

  klass.prototype.key = function(key){
    return search(function(k, v){ return k == key}, this.list)
  };

  klass.prototype.val = function(key){
    return search(function(k, v){ return v == key}, this.list)
  };

  klass.prototype.all = function(key){
    return search(function(k, v){ return (v == key || k == key)}, this.list)
  };

  klass.prototype.any = function(matcher){
    return search(matcher, this.list)
  };

  klass.prototype.reg = function(reg){
    return search(function(k, v){
      if(typeof(v) == 'string'){
        result = k.match(reg) || v.match(reg)
      }else{
        result = k.match(reg)
      }
      return result
    }, this.list)
  };
  return klass;
})();

H = function(obj){ return new Haystack(obj) };