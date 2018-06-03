(function(){
  
  var Shred = function(props){
    this.props = this.__xprops === undefined ? {} : this.__xprops;
    for(var prop in props) if(props.hasOwnProperty(prop)){
      this.props[prop] = props[prop];
    }
    this.__state = {};
    this.e = this.build();
    this.___t('init');
  };

  Shred.prototype = {
    ___t: function(what, thisArg, args){
      if(typeof this['__x'+what] === 'function') this['__x'+what].apply(thisArg || this, args || [this.e, this]);
      return this;
    },
    __xstate: {},
    state: function(a,b){
      var l = arguments.length;
      if(l == 1){
        var defval = this.__xstate[a];
        var val = this.__state[a];
        return val === undefined ? (defval === undefined ? '' : defval) : val
      } else if(l == 2){
        var o = this.__state[a];
        this.__state[a] = b;
        return this.___t('setState', this, [a,b,o]);;
      }
      else return this.__state;
    },
    render: function(body){
      return this.___t('beforeRender').___t('render');
    },
    build: function(){ return document.createElement('span') },
    __xbeforeRender: function(){ this.e.innerHTML = ''; },
    attach: function(element, render){
      this.target = element;
      element.appendChild(this.e);
      return this.___t('attach');
    }
  };

  ['attach','setState'].forEach(function(w){
    Shred.prototype['__x'+w] = function(){this.render();}
  });

  Shred.extend = function(opts){
    var Shred = this;
    var Child = function(){ Shred.apply(this, arguments); };
    Child.prototype = Object.create(Shred.prototype);
    Child.prototype.construtor = Shred;
    for(var pmn in opts) if(opts.hasOwnProperty(pmn)){
      var val = opts[pmn];
      if(~['init','render','props','state','attach', 'beforeRender','setState'].indexOf(pmn)) pmn = '__x'+pmn;
      Child.prototype[pmn] = val;
    };
    Child.extend = Shred.extend;
    return Child;
  };

  window.Shred = Shred;
})();
