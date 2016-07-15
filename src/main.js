angular.module('app', []);

(function() {
    angular
        .module('app')
        .controller('appController', ['uiService', appController]);

    function appController (uiService) {

        var vm = this;

        angular.extend(vm, {
            appTitle: uiService.pageTitle + ' - ' + Settings.title
        })
    }
})();