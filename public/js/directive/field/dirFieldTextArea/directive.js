myApp.directive("dirFieldTextArea", function (directiveService, $timeout,modalService,$timeout) {
    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/js/directive/field/dirFieldTextArea/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                    return directiveService.autoScopeImpl(scope);
                },
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    if (scope.getInfo().autoCompleteValue == undefined) {
                        scope.getInfo().autoCompleteValue = [];
                    }

                    scope.isActive = function () {
                        return !(scope.getInfo().active != null && scope.getInfo().active != undefined && scope.getInfo().active() == false);
                    };

                    scope.errorMessage = "";
                    scope.isValidationDefined = (scope.getInfo().validationRegex != null) || (scope.getInfo().validationFct != null);
                    scope.hideIsValidIcon = !!scope.getInfo().hideIsValidIcon;
                    scope.fieldType = (scope.getInfo().fieldType != null) ? scope.getInfo().fieldType : "text";

                    if (scope.getInfo().field[scope.getInfo().fieldName] == null) {
                        scope.getInfo().field[scope.getInfo().fieldName] = "";
                    }
                    if (scope.getInfo().isValid == null) {
                        scope.getInfo().isValid = !scope.isValidationDefined;
                    }
                    if (scope.isValidationDefined) {
                        scope.$watch('getInfo().field[getInfo().fieldName]', function (n, o) {
                            return scope.isValid();
                        });
                    }

                    scope.$watch('getInfo().active()', function (o, n) {
                        if (o != n) {
                            scope.isValid();
                        }
                    }, true);

                    scope.isValid = function () {

                        var isValid;
                        if (scope.getInfo().disabled === true || scope.isActive() === false) {
                            scope.getInfo().isValid = true;
                            return;
                        }
                        if (scope.getInfo().field[scope.getInfo().fieldName] == null) {
                            scope.getInfo().field[scope.getInfo().fieldName] = "";
                        }

                        isValid = true;
                        if (typeof scope.getInfo().field[scope.getInfo().fieldName] !== 'string') {
                            scope.getInfo().field[scope.getInfo().fieldName] += "";
                        }
                        if (scope.getInfo().validationRegex != null) {
                            isValid = scope.getInfo().field[scope.getInfo().fieldName].match(scope.getInfo().validationRegex) != null;
                        }
                        if (scope.getInfo().validationFct != null) {
                            isValid = isValid && scope.getInfo().validationFct();
                        }
                        scope.getInfo().isValid = isValid;
                    };
                    scope.isValid();

                    scope.logField = function () {
                        return console.log(scope.getInfo());
                    };
                    scope.setErrorMessage = function (errorMessage) {
                        scope.errorMessage = errorMessage;
                        if (scope.lastTimeOut != null) {
                            $timeout.cancel(scope.lastTimeOut);
                        }
                        return scope.lastTimeOut = $timeout(function () {
                            scope.errorMessage = "";
                            return scope.lastTimeOut = null;
                        }, 2000);
                    };

                    scope.displayError = function () {
                        if (scope.getInfo().isValid == false && scope.getInfo().firstAttempt === false) {
                            return true;
                        }
                        return false;
                    };


                    scope.openCalculator = function () {
                        modalService.openCalculatorModal(new function (result) {
                            scope.getInfo().field[scope.getInfo().fieldName] = result;
                        });
                    };
                }
            };
        }
    };
});
