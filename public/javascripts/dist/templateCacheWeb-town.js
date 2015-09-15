angular.module('app').run(['$templateCache', function($templateCache) {
  "use strict";
  $templateCache.put("/assets/javascripts/directive/town/publicationListForTown/template.html",
    "<div class=town-business-publication-list><div class=town-business-publication-list-element ng-repeat=\"publication in publications\"><div class=title>{{publication.title}} <span ng-show=\"publication.type === 'PROMOTION'\">{{publication.endDate | date:'medium'}}</span></div><table class=body><tr><td>{{publication.description}}</td><td ng-show=\"publication.pictures.length > 0\"><img ng-click=openGallery(publication.pictures[0],publication) ng-src=\"{{publication.pictures[0] | image}}\"></td></tr></table><div class=publicationDate>{{publication.endDate | date:'medium'}}</div></div></div>");
  $templateCache.put("/assets/javascripts/directive/town/townBusiness/template.html",
    "<div><div class=town-business-list ng-show=\"elementToDisplay === 'list'\"><div class=town-business-list-element ng-repeat=\"business in businesses\" ng-click=selectBusiness(business)><img ng-src=\"{{business.illustration | image}}\"><div class=town-business-list-element-data><div class=business-name>{{business.name}}</div><div class=address>{{business.address.street}}</div></div></div></div><div ng-show=\"elementToDisplay === 'businessDetails'\"><div><button ng-click=backToList() class=\"btn btn-primary glyphicon glyphicon-chevron-left\">Retourner à la liste des commerces</button></div><div class=town-business-details><div class=town-business-details-left><div class=town-business-details-header><img ng-src=\"{{selectedBusiness.illustration | image}}\"><div><div class=business-header-name>{{selectedBusiness.name}}</div><div class=business-header-details>{{selectedBusiness.address.street}}<br>{{selectedBusiness.phone}}<br><a href=mailto:{{selectedBusiness.email}}>{{selectedBusiness.email}}</a></div></div></div><div class=business-description>{{selectedBusiness.description}}</div></div><div class=town-business-details-right><schedule-ctrl ng-info={dto:selectedBusiness.schedules}></schedule-ctrl><publication-list-for-town-ctrl ng-info={businessId:selectedBusiness.id}></publication-list-for-town-ctrl></div></div></div></div>");
  $templateCache.put("/assets/javascripts/modal/GalleryModal/view.html",
    "<div class=modal-header><button name=modal-btn-close class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button><h4 class=modal-title>{{'--.gallery.title' | translateText}}</h4></div><div class=\"modal-body gallery-modal\"><div><img class=gallery-picture ng-src=\"{{image | image}}\"></div><div class=comment-container>{{image.comment}}</div><table ng-show=\"images.length > 1\" style=\"width: 100%\"><tr><td><button type=button&quot; id=gallery-modal-btn-previous class=\"btn btn-primary\" ng-click=previous()>{{'--.gallery.modal.previous' | translateText}}</button></td><td><span id=gallery-modal-span-number-page>{{imageNb}} / {{images.length}}</span></td><td><button type=button&quot; id=gallery-modal-btn-next style=\"float: right\" class=\"btn btn-primary\" ng-click=next()>{{'--.gallery.modal.next' | translateText}}</button></td></tr></table></div>");
}]);
