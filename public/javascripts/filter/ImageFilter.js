myApp.filter("image", function ($sce, translationService) {
    return function (input) {
        if(input!=null && input!=undefined) {
            return "https://s3.amazonaws.com/lynk-test/" + input.storedName;
        }
        return null;
    };
});