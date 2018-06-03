(function(sn,w){

  var S = function(props){
    this.props = this.__xprops === undefined ? {} : this.__xprops;
    for(var prop in props) if(props.hasOwnProperty(prop)){
      this.props[prop] = props[prop];
    }
    this.__state = {};
    this.e = this.build();
    this.e[sn] = this;
    this.___t('init');
  };

  S.prototype = {
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
    S.prototype['__x'+w] = function(){this.render();}
  });

  S.extend = function(opts){
    var S = this;
    var C = function(){ S.apply(this, arguments); };
    C.prototype = Object.create(S.prototype);
    C.prototype.construtor = S;
    for(var pmn in opts) if(opts.hasOwnProperty(pmn)){
      var val = opts[pmn];
      if(~['init','render','props','state','attach', 'beforeRender','setState'].indexOf(pmn)) pmn = '__x'+pmn;
      C.prototype[pmn] = val;
    };
    C.extend = S.extend;
    return C;
  };

  w[sn] = S;
})('Shred',this);
