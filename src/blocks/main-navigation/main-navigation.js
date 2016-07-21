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
                constructor(href, name, path, invisible) {
                    this.href = href;
                    this.name = name;
                    this.path = path;
                    this.invisible = invisible;
                }
            }

            vm.navElements = [
                new NavElement(url + 'exercises', 'Exercises', 'exercises'),
                new NavElement(url + 'editor', 'Editor', 'editor'),
                new NavElement(url + 'statistics', 'Statistics', 'statistics', true),
                new NavElement(url + 'settings', 'Settings', 'settings', true),
                new NavElement(url + 'help', 'Help', 'help', true),
            ];

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