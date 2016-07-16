(function() {
    angular
        .module('app')
        .service('nameService', [nameService]);

    function nameService () {

        return {
            generate,
            getKeys
        };

        function generate() {
            var text = "";
            var possible = "abcdefghijklmnopqrstuvwxyz";

            for( var i=0; i < 16; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }

        function getKeys() {
            return Object.keys(localStorage);
        }
    }
})();