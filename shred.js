(function(){

  var Control = function(props){
    this.props = this.__xprops === undefined ? {} : this.__xprops;
    for(var prop in props) if(props.hasOwnProperty(prop)){
      this.props[prop] = props[prop];
    }
    this.__state = {};
    this.element = this.build();
    this.___t('init');
  };

  Control.prototype = {
    ___t: function(what, thisArg, args){
      if(typeof this['__x'+what] === 'function') this['__x'+what].apply(thisArg || this, args || [this.element, this]);
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
    __xbeforeRender: function(){ this.element.innerHTML = ''; },
    attach: function(element, render){
      this.target = element;
      element.appendChild(this.element);
      return this.___t('attach');
    }
  };

  ['attach','setState'].forEach(function(w){
    Control.prototype['__x'+w] = function(){this.render();}
  });

  Control.extend = function(methods){
    var Control = this;
    var Child = function(){ Control.apply(this, arguments); };

    Child.prototype = Object.create(Control.prototype);
    Child.prototype.construtor = Control;
    for(var method in methods) if(methods.hasOwnProperty(method)){
      var pmn = method;
      if(~['init','render','props','state','attach', 'beforeRender','setState'].indexOf(method)){
        pmn = '__x'+pmn;
      }
      Child.prototype[pmn] = methods[method];
    };
    Child.extend = Control.extend;
    return Child;
  };

  window.Shred = Control;
})();
