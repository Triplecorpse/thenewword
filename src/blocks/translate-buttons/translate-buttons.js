(function() {
    angular
        .module('app')
        .directive('tnwTranslateButtons', ['storageService', translateButtons]);

    function translateButtons (storageService) {

        return {
            restrict: "E",
            templateUrl: "./blocks/translate-buttons/translate-buttons.html",
            scope: {
                index: '='
            },
            link: link
        };

        function link(scope) {
            scope.$watch(() => {
                return storageService.activeDictionary.machineName
            }, () => {
                scope.word = storageService.activeDictionary.words[scope.index].word;
                scope.from = storageService.activeDictionary.from;
                scope.to = storageService.activeDictionary.to;
                scope.google = `https://translate.google.com.ua/#${scope.from}/${scope.to}/${scope.word}`;
                scope.yandex = `https://translate.yandex.com/?text=${scope.word}&lang=${scope.from}-${scope.to}`;
                scope.lingvo = `http://www.lingvo.ua/uk/Translate/${scope.from}-${scope.to}/${scope.word}`;
            });

        }
    }
})();