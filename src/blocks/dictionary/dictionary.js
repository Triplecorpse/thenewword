(function() {
    angular
        .module('app')
        .directive('tnwAddNewWord', ['uiService', addNewWord]);

    function addNewWord (uiService) {

        return {
            restrict: "E",
            templateUrl: "./blocks/dictionary/dictionary.html",
            controller: dictionaryController,
            controllerAs: 'dictionary',
            link: link
        };

        function dictionaryController() {
            var vm = this;

            angular.extend(vm, {
                addNewWord
            });

            try {
                var rawDictionary = JSON.parse(localStorage.dictionary || "[]");
                vm.dictionary = rawDictionary.map((element) => {
                    var newElement = element;
                    newElement.translations = element.translations.join(', ');
                    return newElement;
                });
                // vm.dictionary = viewDictionary;
            } catch(e) {
                console.log(e);
            }

            function addNewWord() {

            }
        }

        function link() {
            uiService.pageTitle = 'Add New Words'
        }
    }
})();