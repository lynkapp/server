myApp.directive 'searchBarCtrl', ($rootScope, businessService, geolocationService, directiveService, searchService, searchBarService, $timeout, $location, modalService) ->
    restrict: 'E'
    scope: directiveService.autoScope(ngInfo: '=')
    templateUrl: '/assets/js/directive/component/searchBar/template.html'
    replace: true
    transclude: true
    compile: ->
        post: (scope) ->
            directiveService.autoScopeImpl scope

            #params
            scope.advancedSearch = false
            scope.searchBarService = searchBarService
            scope.searchResultParam =
                mobile: scope.getInfo().mobile
                display: false
                cleanSearch: ->
                    searchBarService.currentSearch = ''

            #run little search
            scope.$watch 'searchBarService.currentSearch', (o, n) ->
                if searchBarService.displaySearchResult and o != n and searchBarService.currentSearch != '' and searchBarService.currentSearch.length >= 2
                    searchS = angular.copy(searchBarService.currentSearch)
                    if scope.promise?
                        $timeout.cancel(scope.promise)
                    scope.promise = $timeout ->
                        if searchBarService.currentSearch.indexOf(':') != -1 and searchBarService.currentSearch.split(':')[1].length > 0 or searchBarService.currentSearch.indexOf(':') == -1 and searchBarService.currentSearch.length > 0
                            scope.searchResultParam.promise = searchService.searchByStringLittle(searchBarService.currentSearch, (result) ->
                                scope.searchResultParam.result = result
                                scope.searchResultParam.display = true
                            )
                    , 500

            #go to search
            scope.search = ->
                scope.searchResultParam.display=false
                if !scope.searchResultParam.indexSelected?
                    $location.path 'search/' + searchBarService.currentSearch

            #navigate to target
            scope.navigateTo = (target) ->
                $rootScope.$broadcast 'SEARCH_CLEAN'
                $timeout (->
                    $location.path target
                ), 1