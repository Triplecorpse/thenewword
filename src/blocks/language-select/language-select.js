(function() {
    angular
        .module('app')
        .directive('tnwLanguageSelect', ['storageService', languageSelect]);

    function languageSelect (storageService) {

        return {
            restrict: "E",
            templateUrl: "./blocks/language-select/language-select.html",
            scope: {
                direction: "=",
                language: "="
            },
            link: link
        };

        function link(scope) {

            class Language {
                constructor(code, name) {
                    this.code = code;
                    this.name = name;
                }
            }
            scope.possibleLanguages = [new Language('en', 'English'),
                new Language('pl', 'Polish'),
                new Language('ru', 'Russian'),
                new Language('it', 'Italian'),
                new Language('fr', 'French')];

            scope.setActiveLanguage = function (code) {
                var activeLanguage = _.find(scope.possibleLanguages, (elem) => {
                    return elem.code == code.toLowerCase();
                });

                storageService.activeDictionary[scope.direction] = activeLanguage.code;
                storageService.saveDictionary(storageService.activeDictionary);
            };
            scope.setActiveLanguage(scope.language);
        }
    }
})();