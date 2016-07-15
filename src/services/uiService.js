(function() {
    angular
        .module('app')
        .service('uiService', [uiService]);

    function uiService () {

        return {
            pageTitle: "Main"
        }

    }
})();