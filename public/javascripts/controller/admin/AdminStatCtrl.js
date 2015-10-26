myApp.controller('AdminStatCtrl', function ($scope, superAdminService, $timeout) {

    $scope.refreshStat = function () {
        superAdminService.getStat(function (data) {
            $scope.stats = data;
        });
    };

    $scope.details = [];

    $scope.refreshDetails = function () {
        $scope.details = [];
        superAdminService.getUserDetails(function (data) {
            $scope.completeObj('Aujourd\'hui', data.today);
            $scope.completeObj('7 derniers jours', data.week);
            $scope.completeObj('Tout', data.all);

        });
    };

    $scope.completeObj = function (title, data) {

        $scope.details.push({
                title: title,
                nbSessionChartParam: {
                    title: 'Nombre de session par utilisateur',
                    data: data.nbSessions
                }
                ,
                nbFollowChartParam: {
                    title: 'Nombre de suivit par utilisateur',
                    data: data.nbFollows
                }, nbAddressChartParam: {
                    title: 'Nombre d\'adresse par utilisateur',
                    data: data.nbAddresses
                }
            }
        )
    }

    $scope.refreshStat();

    $timeout(function () {
        $scope.refreshDetails();
    }, 100);

})
;