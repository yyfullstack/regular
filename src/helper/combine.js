// some nested  operation in ast 
// --------------------------------

var dom = require('../dom.js');

var combine = module.exports = {
  // get the initial dom in object
  node: function(item){
    var children;
    if(typeof item.node === 'function') return item.node();
    if(typeof item.nodeType === 'number') return item;
    if(item.group) return combine.node(item.group)
    if(children = item.children){
      var fragment = dom.fragment();
      for(var i = 0, len = children.length; i < len; i++ ){
        fragment.appendChild(combine.node(children[i]))
      }
      return fragment;
    }
  },
  // get the last dom in object(for insertion operation)
  last: function(item){
    var children = item.children;
    if(typeof item.last === 'function') return item.last();
    if(typeof item.nodeType === 'number') return item;
    if(children && children.length) return combine.last(children[children.length - 1])
    if(item.group) return combine.last(item.group);
  }
}