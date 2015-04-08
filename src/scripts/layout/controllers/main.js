'use strict';
var controllername = 'main';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = ['$rootScope', '$mdMedia', '$famous', '$timeline', '$window', '$log'];

  function controller($rootScope, $mdMedia, $famous, $timeline, $window, $log) {
    var vm = this;

    //famous
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Easing = $famous['famous/transitions/Easing'];
    var EventHandler = $famous['famous/core/EventHandler'];

    // tests
    vm.message = 'Hello World';
    vm.opacityTest = 0.1;
    //$log.log('window inner width: ', $window.innerWidth);
    vm.test = function() {
      $log.log('test button');
    }

    vm.layout = new Transitionable(0);
    vm.getLayout = $timeline([
      [0, [0, 100, 0], Easing.inOutQuad],
      [1, [15, 85, 0], Easing.inOutQuad],
      [2, [15, 30, 55], Easing.inOutQuad]
    ]);

    //init state - all surfaces off screen
    //top nav
    vm.topnavTranslate = new Transitionable([0, 0, 300]);
    vm.topnavSize = new Transitionable([undefined, 64]);
    //
    // vm.topnavTranslate.set([0, 0, 300], {
    //   duration: 800,
    //   curve: Easing.outExpo
    // });

    //sidenav
    var sidenavMobileSize = $window.innerWidth - 64;
    var sidenavMobileSizeNegative = sidenavMobileSize * -1;
    vm.sidenavTranslate = new Transitionable([sidenavMobileSizeNegative, 0, 299]);
    vm.sidenavSize = new Transitionable([sidenavMobileSize, undefined]);

    //main content
    vm.mainContentTranslate = new Transitionable([0, 0, 270]);
    vm.mainContentSize = new Transitionable([undefined, undefined]);
    vm.mainContentAlign = new Transitionable([0, 0]);

    //content view
    vm.contentViewTranslate = new Transitionable([0, 0, 299]);
    vm.contentViewSize = new Transitionable([undefined, undefined]);
    vm.contentViewAlign = new Transitionable([1, 0]);

    //toggles
    vm.sidenavExpanded = false;
    vm.expandSidenav = function() {
      $log.log('menu expand');
      if($mdMedia('sm') || $mdMedia('md')) {

        vm.sidenavTranslate.set([0, 0, 500], {
          duration: 300,
          curve: Easing.outExpo
        });
        vm.sidenavSize.set([sidenavMobileSize, undefined], {
          duration: 300,
          curve: Easing.outExpo
        });
      } else {
        vm.sidenavExpanded = true;
        vm.sidenavTranslate.set([0, 0, 299], {
          duration: 300,
          curve: Easing.outExpo
        });
        vm.sidenavSize.set([320, undefined], {
          duration: 300,
          curve: Easing.outExpo
        });
        vm.mainContentTranslate.set([320, 0, 299], {
          duration: 300,
          curve: Easing.outExpo
        });
        //content view
        vm.contentViewTranslate.set([720, 0, 270], {
          duration: 300,
          curve: Easing.outExpo
        });
        vm.contentViewSize.set([$window.innerWidth - 720, undefined], {
          duration: 300,
          curve: Easing.outExpo
        });

      }

    }
    vm.sidenavClose = function() {
      $log.log('mobile sidenav close button');
      if($mdMedia('sm') || $mdMedia('md')) {
        vm.sidenavTranslate.set([sidenavMobileSizeNegative, 0, 299], {
          duration: 500,
          curve: Easing.outQuad
        });
        vm.sidenavSize.set([sidenavMobileSize, undefined], {
          duration: 500,
          curve: Easing.outQuad
        });
      } else {
        vm.sidenavExpanded = false;
        vm.sidenavTranslate.set([0, 0, 299], {
          duration: 300,
          curve: Easing.outExpo
        });
        vm.sidenavSize.set([100, undefined], {
          duration: 300,
          curve: Easing.outExpo
        });
        vm.mainContentTranslate.set([100, 0, 270], {
          duration: 300,
          curve: Easing.outExpo
        });
        //content view
        vm.contentViewTranslate.set([500, 0, 270], {
          duration: 300,
          curve: Easing.outExpo
        });
        vm.contentViewSize.set([$window.innerWidth - 500, undefined], {
          duration: 300,
          curve: Easing.outExpo
        });
      }

      if($mdMedia('gt-md')) {

        $log.log('greater than mobile sidenav close button');

      }
    }

    vm.backgroundOptions = {
      translate: [0, 0, 10]
    };
    vm.navSize = 56;
    vm.navOptions = {
      translate: [0, 0, 200],
      size: [$window.innerWidth, 56]
    };
    vm.sidenavOptions = {
      translate: [0, 0, 180] //,
        //size: [250, undefined]
    };

    vm.mainContentOptions = {
      translate: [0, 0, 0],
      align: [0.15, 0],
      origin: [0, 0],
      size: [$window.innerWidth, undefined],
      proportions: [0.3, 1]
    };
    vm.mainLayoutOptions = {
      translate: [0, 0, 25] //,

    };
    vm.lgContentOptions = {
      translate: [0, 0, 30] //,
        //size: [1000, undefined]
    };
    vm.actionOptions = {
      align: [0, 0.86],
      translate: [600, 0, 0],
      size: [60, 60]
    };

    function getScreenSize(screen) {
      $log.log('fetching Screen size', screen);
      vm.layout = new Transitionable(screen);
    }

    //activate functions
    var activate = function() {

      $rootScope.$watch(function() {
        if(vm.windowInnerWidth != $window.innerWidth) {
          $log.log('no width set');

          $rootScope.smScreen = $mdMedia('sm');
          $rootScope.gtSmScreen = $mdMedia('gt-sm');
          $rootScope.mdScreen = $mdMedia('md');
          $rootScope.gtMdScreen = $mdMedia('gt-md');
          $rootScope.lgScreen = $mdMedia('lg');
          $rootScope.gtLgScreen = $mdMedia('gt-lg');

          //**mobile
          if($mdMedia('sm')) {
            $log.log('sm');

            //sidenav
            vm.sidenavTranslate.set([sidenavMobileSizeNegative, 0, 299], {
              duration: 300,
              curve: Easing.outExpo
            });
            vm.sidenavSize.set([sidenavMobileSize, undefined], {
              duration: 300,
              curve: Easing.outExpo
            });
            //main content
            vm.mainContentTranslate.set([0, 0, 270], {
              duration: 800,
              curve: Easing.outExpo
            });
            vm.mainContentSize.set([$window.innerWidth, undefined], {
              duration: 800,
              curve: Easing.outExpo
            });
            vm.mainContentAlign.set([0, 0], {
              duration: 800,
              curve: Easing.outExpo
            });
            //content view
            vm.contentViewTranslate.set([0, 0, 270], {
              duration: 300,
              curve: Easing.outExpo
            });
            vm.contentViewSize.set([$window.innerWidth, undefined], {
              duration: 300,
              curve: Easing.outExpo
            });
            vm.contentViewAlign.set([1, 0], {
              duration: 300,
              curve: Easing.outExpo
            });

          } else if($mdMedia('md')) {
            $log.log('md');
            //sidenav
            vm.sidenavTranslate.set([0, 0, 299], {
              duration: 300,
              curve: Easing.outExpo
            });
            vm.sidenavSize.set([64, undefined], {
              duration: 300,
              curve: Easing.outExpo
            });
            //main content
            vm.mainContentTranslate.set([64, 0, 270], {
              duration: 300,
              curve: Easing.outExpo
            });
            vm.mainContentSize.set([300, undefined], {
              duration: 300,
              curve: Easing.outExpo
            });
            vm.mainContentAlign.set([0, 0], {
              duration: 300,
              curve: Easing.outExpo
            });
            //content view
            vm.contentViewTranslate.set([364, 0, 270], {
              duration: 300,
              curve: Easing.outExpo
            });
            var tabletViewSize = $window.innerWidth
            vm.contentViewSize.set([$window.innerWidth - 364, undefined], {
              duration: 300,
              curve: Easing.outExpo
            });
            vm.contentViewAlign.set([0, 0], {
              duration: 300,
              curve: Easing.outExpo
            });

          } else if($mdMedia('lg')) {
            $log.log('lg');
            //sidenav
            vm.sidenavTranslate.set([0, 0, 299], {
              duration: 300,
              curve: Easing.outExpo
            });
            vm.sidenavSize.set([100, undefined], {
              duration: 300,
              curve: Easing.outExpo
            });
            //main content
            vm.mainContentTranslate.set([100, 0, 270], {
              duration: 300,
              curve: Easing.outExpo
            });
            vm.mainContentSize.set([400, undefined], {
              duration: 300,
              curve: Easing.outExpo
            });
            //content view
            vm.contentViewTranslate.set([500, 0, 270], {
              duration: 300,
              curve: Easing.outExpo
            });
            vm.contentViewSize.set([$window.innerWidth - 500, undefined], {
              duration: 300,
              curve: Easing.outExpo
            });
            vm.contentViewAlign.set([0, 0], {
              duration: 300,
              curve: Easing.outExpo
            });

          }
          if($mdMedia('gt-sm')) {
            $log.log('gt-sm');
          }

          if($mdMedia('gt-md')) {

            $log.log('Greater than md');

          }

          if($mdMedia('gt-lg')) {
            $log.log('gt-lg');
            //sidenav
            vm.sidenavTranslate.set([0, 0, 299], {
              duration: 300,
              curve: Easing.outExpo
            });
            vm.sidenavSize.set([320, undefined], {
              duration: 300,
              curve: Easing.outExpo
            });
            //main content
            vm.mainContentTranslate.set([320, 0, 270], {
              duration: 300,
              curve: Easing.outExpo
            });
            vm.mainContentSize.set([500, undefined], {
              duration: 300,
              curve: Easing.outExpo
            });
            //content view
            vm.contentViewTranslate.set([820, 0, 270], {
              duration: 300,
              curve: Easing.outExpo
            });
            vm.contentViewSize.set([$window.innerWidth - 820, undefined], {
              duration: 300,
              curve: Easing.outExpo
            });
            vm.contentViewAlign.set([0, 0], {
              duration: 300,
              curve: Easing.outExpo
            });
          }
          vm.windowInnerWidth = $window.innerWidth;
          $log.log('width set', vm.windowInnerWidth);
        } else {
          $log.log('width same', vm.windowInnerWidth);

        }

      });

    };
    activate();
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};