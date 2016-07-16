(function() {
    angular
        .module('app')
        .directive('tnwMainNavigation', [mainNavigation]);

    function mainNavigation () {

        return {
            restrict: "E",
            templateUrl: "./blocks/main-navigation/main-navigation.html",
            controller: ['$http', '$location', navController],
            controllerAs: 'nav'
        };

        function navController($http, $location) {
            var vm = this;
            var url = getUrl();

            class NavElement {
                constructor(href, name, path) {
                    this.href = href;
                    this.name = name;
                    this.path = path;
                }
            }

            vm.navElements = [new NavElement(url + 'exercises', 'Exercises', 'exercises'), new NavElement(url + 'editor', 'Editor', 'editor')];

            vm.isActive = (path) => {
                return $location.path() === path;
            };

            function getUrl() {
                var oldLocation = $location.absUrl();
                return oldLocation.slice(0, oldLocation.lastIndexOf('/') + 1);
            }
        }
    }
})();