angular.module('app', ['ui.router']);

(function() {
    angular.module('app')
        .config(['$stateProvider', '$urlRouterProvider', config]);

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/exercises");

        $stateProvider
            .state('exercises', {
                url: "/exercises",
                templateUrl: "./blocks/exercises/exercises.html",
                controller: 'exercisesController',
                controllerAs: 'exercises'
            })
            .state('editor', {
                url: "/editor",
                templateUrl: "./blocks/dictionary/dictionary.html",
                controller: 'dictionaryController',
                controllerAs: 'dictionary'
            });
    }
})();

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