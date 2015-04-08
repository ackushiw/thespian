'use strict';
/*eslint consistent-this:[2,  "menuButtonCtrl"] */
var directivename = 'menuButton';

module.exports = function(app) {

  // controller
  var controllerDeps = ['$famous', '$timeline', '$log'];
  var controller = function($famous, $timeline, $log) {
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Easing = $famous['famous/transitions/Easing'];

    var menuButtonCtrl = this;

    menuButtonCtrl.active = menuButtonCtrl.state || false;
    $log.log(menuButtonCtrl.state);
    menuButtonCtrl.iconHeight = menuButtonCtrl.height || '24px';
    menuButtonCtrl.iconWidth = menuButtonCtrl.width || '24px';
    menuButtonCtrl.iconTranslate = [menuButtonCtrl.translateX || 0, menuButtonCtrl.translateY || 0, menuButtonCtrl.translateZ || 1];
    menuButtonCtrl.animationDuration = menuButtonCtrl.speed || 450;
    $log.log(menuButtonCtrl.iconTranslate);
    menuButtonCtrl.iconColor = menuButtonCtrl.color || 'white';
    menuButtonCtrl.iconScale = menuButtonCtrl.scale || [1];
    menuButtonCtrl.container = {
      translate: [0, 0, 1],
      scale: [0],
      rotateZ: new Transitionable(0),
      rotateZTimeline: $timeline([
        [0, [0], Easing.inOutExpo],
        [1, Math.PI]
      ])
    };

    // menuButtonCtrl.backgroundColor = {
    //   color: new Transitionable(0),
    //   colorTimeline: $timeline([
    //     [0, 'grey', Easing.inOutExpo],
    //     [1, 'grey']
    //   ])
    // };

    menuButtonCtrl.topLine = {
      translate: new Transitionable(0),
      translateTimeline: $timeline([
        [0, [3, 6, 5], Easing.inOutExpo],
        [1, [22.5, -4.1, 5]]
      ]),
      size: new Transitionable(0),
      sizeTimeline: $timeline([
        [0, [18, 2], Easing.inOutExpo],
        [1, [9.6, 2]]
      ]),
      align: new Transitionable(0),
      alignTimeline: $timeline([
        [0, [0, 0], Easing.inOutExpo],
        [1, [0, 0]]
      ]),
      origin: new Transitionable(0),
      originTimeline: $timeline([
        [0, [0, 0], Easing.inOutExpo],
        [1, [1, 1]]
      ]),
      rotateZ: new Transitionable(0),
      rotateZTimeline: $timeline([
        [0, [0], Easing.inOutExpo],
        [1, 0.25 * Math.PI]
      ])
    };
    menuButtonCtrl.midLine = {
      translate: new Transitionable(0),
      translateTimeline: $timeline([
        [0, [3, 11, 5], Easing.inOutExpo],
        [1, [5, 11, 5]]
      ]),
      size: new Transitionable(0),
      sizeTimeline: $timeline([
        [0, [18, 2], Easing.inOutExpo],
        [1, [14, 2]]
      ]),
      align: new Transitionable(0),
      alignTimeline: $timeline([
        [0, [0, 0], Easing.inOutExpo],
        [1, [0, 0]]
      ]),
      origin: new Transitionable(0),
      originTimeline: $timeline([
        [0, [0, 0], Easing.inOutExpo],
        [1, [0, 0]]
      ]),
      rotateZ: new Transitionable(0),
      rotateZTimeline: $timeline([
        [0, [0], Easing.inOutExpo],
        [1, [0]]
      ])
    };
    menuButtonCtrl.bottomLine = {
      translate: new Transitionable(0),
      translateTimeline: $timeline([
        [0, [3, 16, 5], Easing.inOutExpo],
        [1, [6, 19, 5]]
      ]),
      size: new Transitionable(0),
      sizeTimeline: $timeline([
        [0, [18, 2], Easing.inOutExpo],
        [1, [10, 2]]
      ]),
      align: new Transitionable(0),
      alignTimeline: $timeline([
        [0, [0, 0], Easing.inOutExpo],
        [1, [0.0, 0.0]]
      ]),
      origin: new Transitionable(0),
      originTimeline: $timeline([
        [0, [0, 0], Easing.inOutExpo],
        [1, [1.0, -1]]
      ]),
      rotateZ: new Transitionable(0),
      rotateZTimeline: $timeline([
        [0, [0], Easing.inOutExpo],
        [1, -0.25 * Math.PI]
      ])
    };

    menuButtonCtrl.updateState = function() {

      if(menuButtonCtrl.state) {
        //container
        menuButtonCtrl.container.rotateZ.set(1);
        //color
        //menuButtonCtrl.backgroundColor.color.set(0)

        //topline
        menuButtonCtrl.topLine.translate.set(1);
        menuButtonCtrl.topLine.size.set(1);
        menuButtonCtrl.topLine.align.set(1);
        menuButtonCtrl.topLine.origin.set(1);
        menuButtonCtrl.topLine.rotateZ.set(1);
        //midLine
        menuButtonCtrl.midLine.translate.set(1);
        menuButtonCtrl.midLine.size.set(1);
        menuButtonCtrl.midLine.align.set(1);
        menuButtonCtrl.midLine.origin.set(1);
        menuButtonCtrl.midLine.rotateZ.set(1);
        //bottomLine
        menuButtonCtrl.bottomLine.translate.set(1);
        menuButtonCtrl.bottomLine.size.set(1);
        menuButtonCtrl.bottomLine.align.set(1);
        menuButtonCtrl.bottomLine.origin.set(1);
        menuButtonCtrl.bottomLine.rotateZ.set(1);

      } else {
        //container
        menuButtonCtrl.container.rotateZ.set(0);
        //color
        //menuButtonCtrl.backgroundColor.color.set(0)

        //topline
        menuButtonCtrl.topLine.translate.set(0);
        menuButtonCtrl.topLine.size.set(0);
        menuButtonCtrl.topLine.align.set(0);
        menuButtonCtrl.topLine.origin.set(0);
        menuButtonCtrl.topLine.rotateZ.set(0);
        //midLine
        menuButtonCtrl.midLine.translate.set(0);
        menuButtonCtrl.midLine.size.set(0);
        menuButtonCtrl.midLine.align.set(0);
        menuButtonCtrl.midLine.origin.set(0);
        menuButtonCtrl.midLine.rotateZ.set(0);
        //bottomLine
        menuButtonCtrl.bottomLine.translate.set(0);
        menuButtonCtrl.bottomLine.size.set(0);
        menuButtonCtrl.bottomLine.align.set(0);
        menuButtonCtrl.bottomLine.origin.set(0);
        menuButtonCtrl.bottomLine.rotateZ.set(0);
      }
    };

    //action
    function trigger(value) {

      menuButtonCtrl.state = !value;
      menuButtonCtrl.action({
        state: value
      });
      $log.log('button state', menuButtonCtrl.state);
    }

    menuButtonCtrl.toggle = function() {
      if(menuButtonCtrl.active) {
        //container
        menuButtonCtrl.container.rotateZ.set(0, {
          duration: menuButtonCtrl.animationDuration
        });
        //color
        // menuButtonCtrl.backgroundColor.color.set(0, {
        //   duration: menuButtonCtrl.animationDuration
        // })

        //topline
        menuButtonCtrl.topLine.translate.set(0, {
          duration: menuButtonCtrl.animationDuration
        });
        menuButtonCtrl.topLine.size.set(0, {
          duration: menuButtonCtrl.animationDuration
        });
        menuButtonCtrl.topLine.align.set(0, {
          duration: menuButtonCtrl.animationDuration
        });
        menuButtonCtrl.topLine.origin.set(0, {
          duration: menuButtonCtrl.animationDuration
        });
        menuButtonCtrl.topLine.rotateZ.set(0, {
          duration: menuButtonCtrl.animationDuration
        });
        //midLine
        menuButtonCtrl.midLine.translate.set(0, {
          duration: menuButtonCtrl.animationDuration
        });
        menuButtonCtrl.midLine.size.set(0, {
          duration: menuButtonCtrl.animationDuration
        });
        menuButtonCtrl.midLine.align.set(0, {
          duration: menuButtonCtrl.animationDuration
        });
        menuButtonCtrl.midLine.origin.set(0, {
          duration: menuButtonCtrl.animationDuration
        });
        menuButtonCtrl.midLine.rotateZ.set(0, {
          duration: menuButtonCtrl.animationDuration
        });
        //bottomLine
        menuButtonCtrl.bottomLine.translate.set(0, {
          duration: menuButtonCtrl.animationDuration
        });
        menuButtonCtrl.bottomLine.size.set(0, {
          duration: menuButtonCtrl.animationDuration
        });
        menuButtonCtrl.bottomLine.align.set(0, {
          duration: menuButtonCtrl.animationDuration
        });
        menuButtonCtrl.bottomLine.origin.set(0, {
          duration: menuButtonCtrl.animationDuration
        });
        menuButtonCtrl.bottomLine.rotateZ.set(0, {
          duration: menuButtonCtrl.animationDuration
        });

        menuButtonCtrl.active = false;
        trigger(false);
      } else {
        //container
        menuButtonCtrl.container.rotateZ.set(1, {
          duration: menuButtonCtrl.animationDuration
        });
        // //color
        // menuButtonCtrl.backgroundColor.color.set(1, {
        //   duration: menuButtonCtrl.animationDuration
        // });
        //topline
        menuButtonCtrl.topLine.translate.set(1, {
          duration: menuButtonCtrl.animationDuration
        });
        menuButtonCtrl.topLine.size.set(1, {
          duration: menuButtonCtrl.animationDuration
        });
        menuButtonCtrl.topLine.align.set(1, {
          duration: menuButtonCtrl.animationDuration
        });
        menuButtonCtrl.topLine.origin.set(1, {
          duration: menuButtonCtrl.animationDuration
        });
        menuButtonCtrl.topLine.rotateZ.set(1, {
          duration: menuButtonCtrl.animationDuration
        });
        //midLine
        menuButtonCtrl.midLine.translate.set(1, {
          duration: menuButtonCtrl.animationDuration
        });
        menuButtonCtrl.midLine.size.set(1, {
          duration: menuButtonCtrl.animationDuration
        });
        menuButtonCtrl.midLine.align.set(1, {
          duration: menuButtonCtrl.animationDuration
        });
        menuButtonCtrl.midLine.origin.set(1, {
          duration: menuButtonCtrl.animationDuration
        });
        menuButtonCtrl.midLine.rotateZ.set(1, {
          duration: menuButtonCtrl.animationDuration
        });
        //bottomLine
        menuButtonCtrl.bottomLine.translate.set(1, {
          duration: menuButtonCtrl.animationDuration
        });
        menuButtonCtrl.bottomLine.size.set(1, {
          duration: menuButtonCtrl.animationDuration
        });
        menuButtonCtrl.bottomLine.align.set(1, {
          duration: menuButtonCtrl.animationDuration
        });
        menuButtonCtrl.bottomLine.origin.set(1, {
          duration: menuButtonCtrl.animationDuration
        });
        menuButtonCtrl.bottomLine.rotateZ.set(1, {
          duration: menuButtonCtrl.animationDuration
        });
        menuButtonCtrl.active = true;
        trigger(true);

      }
    };
    menuButtonCtrl.updateState();

    menuButtonCtrl.directivename = directivename;
  };
  controller.$inject = controllerDeps;

  /*eslint-disable consistent-this */

  // directive
  var directiveDeps = [];
  var directive = function() {
    return {
      restrict: 'AE',
      scope: {
        //title: '@', // '@' reads attribute value, '=' provides 2-way binding, '&" works with functions
        color: '@',
        speed: '@',
        scale: '@',
        translateX: '@',
        translateY: '@',
        translateZ: '@',
        duration: '@',
        action: '&',
        state: '='
      },
      controller: controller,
      controllerAs: 'menuButtonCtrl',
      bindToController: true,
      template: require('./menuButton.html'),
      compile: function(tElement, tAttrs) {
        return {
          pre: function(scope, element, attrs) {

          },
          post: function(scope, element, attrs) {
            // scope.$watch('menuButtonCtrl.state', function(newValue, oldValue) {
            //   $log.log('watcher', newValue);
            //   scope.menuButtonCtrl.updateState(newValue);
            // });
          }
        };
      }
    };
  };
  directive.$inject = directiveDeps;

  app.directive(directivename, directive);
};