(function() {
    angular
        .module('app')
        .service('settingsService', [settingsService]);

    function settingsService () {

        return {
            wordsPerList: 10,

        };
    }
})();
