myApp.directive('followWidgetCtrl', function (accountService,modalService,followService,directiveService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/component/followWidget/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);


                    scope.follow = function () {
                        if (accountService.getMyself() != null) {
                            scope.followed();
                        }
                        else {
                            modalService.openLoginModal(scope.followed);
                        }
                    };

                    scope.followed = function () {
                        var followed = scope.getInfo().business.following;
                        followService.addFollow(!followed, scope.getInfo().business.id, function () {
                            scope.getInfo().business.following = !followed;
                            if (scope.getInfo().business.following) {
                                scope.getInfo().business.totalFollowers++;
                            }
                            else {
                                scope.getInfo().business.totalFollowers--;
                            }
                        });
                    };
                }
            }
        }
    }
});