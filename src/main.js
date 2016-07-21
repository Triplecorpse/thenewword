angular.module('app', ['ui.router']);

(function() {
    angular.module('app')
        .config(['$stateProvider', '$urlRouterProvider', config]);

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/exercises");
        var states = ['exercises', 'editor', 'settings', 'help', 'statistics'];

        // _.each(states, (state) => {
        //     $stateProvider.state.push({
        //         name: `${state}`,
        //         url: `/${state}`,
        //         templateUrl: `./blocks/${state}/${state}.html`,
        //         controller: `${state}Controller`,
        //         controllerAs: `${state}`
        //     })
        // });

        $stateProvider
            .state('exercises', {
                url: "/exercises",
                templateUrl: "states/exercises/exercises.html",
                controller: 'exercisesController',
                controllerAs: 'exercises'
            })
            .state('editor', {
                url: "/editor",
                templateUrl: "states/editor/editor.html",
                controller: 'editorController',
                controllerAs: 'editor'
            })
            .state('statistics', {
                url: "/statistics",
                templateUrl: "states/statistics/statistics.html",
                controller: 'statisticsController',
                controllerAs: 'statistics'
            })
            .state('settings', {
                url: "/settings",
                templateUrl: "states/settings/settings.html",
                controller: 'settingsController',
                controllerAs: 'settings'
            })
            .state('help', {
                url: "/help",
                templateUrl: "states/help/help.html",
                controller: 'helpController',
                controllerAs: 'help'
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
            words: [],
            v: Settings.v
        };
        const defaultSettings = {
            v: Settings.v
        };

        angular.extend(vm, {
            appTitle: uiService.pageTitle + ' - ' + Settings.title
        });

        if(localStorage.length === 0) {
            localStorage[nameService.generate()] = JSON.stringify(initDictionary);
        }

        if(!localStorage.settings) {
            localStorage.settings = JSON.stringify(defaultSettings);
        }

        unVersionedTo012();

        //Add version, store translations as string
        function unVersionedTo012() {
            var settings = JSON.parse(localStorage.settings);
            for(let key in localStorage) {
                if(localStorage.hasOwnProperty(key)) {
                    var curDic = JSON.parse(localStorage[key]);
                    if(curDic.v === '0.1.2') {
                        continue;
                    }
                    curDic.v = '0.1.2';

                    if(key !== 'settings') {
                        curDic.words.map((word) => {
                            if(typeof word.translations === 'object')
                                word.translations = word.translations.join(', ');
                        });
                    }
                    localStorage[key] = JSON.stringify(curDic);
                }
            }
        }
    }
})();