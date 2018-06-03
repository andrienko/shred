Shred
=====
Shred is just my snippet for organizing code into modules for usage with jQuery/Zepto

    var Checkbox = Shred.extend(
      {
        state: { value: false },
        init: function(body, component){
          body
            .addClass('control-checkbox')
            .click(function(){
            component.state('value', !component.state('value'));
          });
        },
        render: function(body){
          body
            .append($('<span class="box"/>').toggleClass('checked',this.state('value')));
        }
      }
    );

... a-and, then you add some CSS and you're good to go.

This is not a LIBRARY. This **may** and **will** change in the future. Take it or leave it.