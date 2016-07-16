angular.module('app', []);

(function() {
    angular
        .module('app')
        .controller('appController', ['uiService', 'nameService', appController]);

    function appController (uiService, nameService) {

        var vm = this;
        const initDictionary = {
            name: 'Default Dictionary',
            from: 'PL',
            to: 'RU',
            words: []
        };

        angular.extend(vm, {
            appTitle: uiService.pageTitle + ' - ' + Settings.title
        });

        if(localStorage.length === 0) {
            localStorage.clear();
            localStorage[nameService.generate()] = JSON.stringify(initDictionary);
        }
    }
})();