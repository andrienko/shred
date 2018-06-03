(function($){

  if(!$)return;

  var Control = function(props){
    this.__props = props || {};
    this.__state = this.__xstate || {};
    this.__container = $('<span/>').addClass('control');
    this.__trigger('init');
  };

  Control.prototype = {
    __trigger: function(what, thisArg, args){
      if(typeof this['__x'+what] === 'function') this['__x'+what].apply(thisArg || this, args || [this.__container, this]);
      return this;
    },
    __xbeforeRender: function(){
      this.__container.html('');
    },
    prop: function(propValue){
      if(this.__props[propValue]) return this.__props[propValue];
      else if(this.__xprops && this.__xprops[propValue]) return this.__xprops[propValue];
      else return '';
    },
    state: function(a,b){
      var l = arguments.length;
      if(l == 1){
        return this.__state[a] || this.__xstate[a] || '';
      } else if(l == 2){
        var o = this.__state[a];
        this.__state[a] = b;
        return this.__trigger('setState', this, [a,b,o]);;
      }
      else return this.__state;
    },
    render: function(){
      return this.__trigger('beforeRender').__trigger('render');
    },
    attach: function(element, render){
      var target = this.target = $(element);
      this.__container.appendTo(target);
      return this.__trigger('attach');
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

})(this.jQuery || this.Zepto || false);