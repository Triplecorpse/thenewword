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
            let keys = Object.keys(localStorage).filter((element) => {
                return element !== 'settings';
            });

            return keys;
        }
    }
})();