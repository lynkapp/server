angular.module('app').run(['$templateCache', function($templateCache) {
  "use strict";
  $templateCache.put("js/directive/town/publicationListForTown/template.html",
    "<div class=town-business-publication-list><div class=town-business-publication-list-element ng-repeat=\"publication in publications\"><div class=title>{{publication.title}} <span ng-show=\"publication.type === 'PROMOTION'\">{{publication.endDate | date:'medium'}}</span></div><table class=body><tr><td>{{publication.description}}</td><td ng-show=\"publication.pictures.length > 0\"><img ng-click=openGallery(publication.pictures[0],publication) ng-src=\"{{publication.pictures[0] | image}}\"></td></tr></table><div class=publicationDate>{{publication.endDate | date:'medium'}}</div></div></div>");
  $templateCache.put("js/directive/town/townBusiness/template.html",
    "<div><div class=town-business-list ng-show=\"elementToDisplay === 'list'\"><h3>Les commerces de votre commune.</h3><div class=search-box><div class=input-group><span class=\"input-group-addon glyphicon glyphicon-search\" id=basic-addon1></span> <input ng-model=search class=form-control placeholder=\"Par nom, adresse, type,...\" aria-describedby=basic-addon1> <span class=\"glyphicon glyphicon-remove form-control-feedback\" aria-hidden=true style=\"pointer-events: visible;cursor: pointer\" ng-show=\"search.length > 0\" ng-click=\"search = ''\"></span></div></div>Cliquer sur les images pour obtenir plus d'information<br><div><div class=town-business-list-element ng-hide=\"business.visible === false\" ng-repeat=\"business in businesses\" ng-click=selectBusiness(business)><img ng-src=\"{{business.illustration | image}}\"><div class=town-business-list-element-data><div class=business-name>{{business.name}}</div><div class=address>{{business.address.street}}</div></div></div></div><div ng-show=\"loading === true\"><img src=https://www.gling.be/assets/images/modal-loading.gif ng-show=\"loading\"></div><div ng-show=\"loading == false && emptyResult()\">Aucun résultat ne correspond à votre recherche</div></div><div ng-show=\"elementToDisplay === 'businessDetails'\"><div><button ng-click=backToList() class=\"btn gling-button-dark glyphicon glyphicon-chevron-left\">Retourner à la liste des commerces</button></div><div class=town-business-details><div class=town-business-details-left><div class=town-business-details-header><img ng-src=\"{{selectedBusiness.illustration | image}}\"><div><div class=business-header-name>{{selectedBusiness.name}}</div><div class=business-header-details>{{selectedBusiness.address.street}}<br>{{selectedBusiness.phone}}<br><a href=mailto:{{selectedBusiness.email}}>{{selectedBusiness.email}}</a></div></div></div><category-line-ctrl></category-line-ctrl><div class=business-description>{{selectedBusiness.description}}</div></div><div class=town-business-details-right>Dernières actualités<schedule-ctrl ng-info={dto:selectedBusiness.schedules}></schedule-ctrl><publication-list-for-town-ctrl ng-info={businessId:selectedBusiness.id}></publication-list-for-town-ctrl></div></div></div></div>");
  $templateCache.put("js/directive/town/newsFeedForTown/template.html",
    "<div class=news-feed-list><h3 style=\"text-align: center\">Suivez les nouveautés des commerces de votre commune</h3><div><h4 style=\"text-align: center\">Les dernières actualités</h4><a class=publication ng-repeat=\"notification in notifications\" href=http://www.shops1160.be/index.php/commerces/#/business/{{notification.businessId}}><table><tr><td rowspan=2><img ng-src=\"{{notification.businessIllustration | image}}\"></td><td class=title>{{notification.businessName}}</td></tr><tr><td>{{notification.title}}</td></tr></table></a><div ng-show=\"loading === true\"><img src=https://www.gling.be/assets/images/modal-loading.gif ng-show=\"loading\"></div></div><div><h4 style=\"text-align: center\">Les dernières promotions</h4><a class=promotion ng-repeat=\"promotion in promotions\" href=http://www.shops1160.be/index.php/commerces/#/business/{{promotion.businessId}}><table><tr><td rowspan=2><img ng-src=\"{{promotion.businessIllustration | image}}\"></td><td><span class=title>{{promotion.businessName}}</span> - {{promotion.endDate | date:'dd MMM yyyy hh:mm'}}</td></tr><tr><td>{{promotion.title}}<span style=\"float: right\" class=title>- {{(promotion.offPercent * 100) | number:0}} %</span></td></tr></table></a><div ng-show=\"loading === true\"><img src=https://www.gling.be/assets/images/modal-loading.gif ng-show=\"loading\"></div></div></div>");
  $templateCache.put("js/modal/GalleryModal/view.html",
    "<div class=\"modal-body gallery-modal\"><div><img class=gallery-picture ng-src=\"{{image | image}}\"></div><div class=comment-container><button class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button> {{image.comment}}</div><table ng-show=\"images.length > 1\" style=\"width: 100%\"><tr><td><button type=button&quot; id=gallery-modal-btn-previous class=\"btn gling-button-dark\" ng-click=previous()>{{'--.gallery.modal.previous' | translateText}}</button></td><td><span id=gallery-modal-span-number-page>{{imageNb}} / {{images.length}}</span></td><td><button type=button&quot; id=gallery-modal-btn-next style=\"float: right\" class=\"btn gling-button-dark\" ng-click=next()>{{'--.gallery.modal.next' | translateText}}</button></td></tr></table></div>");
}]);