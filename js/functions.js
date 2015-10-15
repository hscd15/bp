$(function () {
    var gui = {
        addToCart: function (ev) {},
        loopJson: function (dynamicObjectKey, dynamicIndexFromEvent, numberofLoops, callback) {
            //work on me
            $.each(dynamicObjectKey[dynamicIndexFromEvent], function () {
                var currentObject = this;
                callback(currentObject);
            });
        },
        ifBoxItem: function () {

        },
        writeToJson: function (fileLocation, fileName) {},
        getLocal: function () {
            var obj = JSON.parse(localStorage["getInfo"]);
            return obj;
        },
        categoryChosen: "",
        productChosen: "",
        productSize: "",
        htmlToDom: function (fileLocation, fileName, callBack) {
            $.get('' + fileLocation + '/html/' + fileName + 'Info.html', function (data) {
                $('.menuItems').html(data);
                callBack();
            });
        }
    };

    //get menuItems through ajax
    $('.menuBtn').click(function (ev) {
        ev.preventDefault;
        $('menuCategories').toggleClass('hideScroll');

        categoryChosen = $(this).parents('section').addBack().first().attr('id');
        dynamicImage = 'images/jpg&png/' + categoryChosen + '.jpg';
        gui.htmlToDom('ajax', categoryChosen, function () {
            $('.menuCategoryBkr').attr('src', dynamicImage);
            $('.menuCategoryBkr').attr('alt', dynamicImage);

            $('.menuItems').attr('data-state', 'fromLeft');
        });
        return false;
    });

    $('body').on('click', '.addToCart', function (ev) {
        ev.preventDefault;

        productChosen = $(this).parent('div').addBack().attr('id');
        productSize = $('#' + productChosen).find(":selected").attr('value');
        //figure out how to choose dynamic tags of html make basic
        //design by using like 7 tags and each tag shares a common class
        var url = 'ajax/json/' + categoryChosen + '.json';
        $.getJSON(url, function (data) {}).done(function (data) {
            /*gui = {
                //make a universal loop for cms

                jQeach: function (dynamicObject, dynamicData) {
                    $.each(dynamicObject[dynamicData], function () {
                        var foo = this;
                        return foo;
                    });
                }
            };*/

            $.each(data[categoryChosen], function () {
                var categoryObject = this; //categoryObject key = categoryChosen from event

                $.each(categoryObject[productChosen], function () {
                    var productObject = this; //productObject key = productChosen from event

                    $.each(productObject[productSize], function () {
                        var sizeObject = this; //sizeObject key = productSize from event                        


                        console.log(sizeObject);

                        //gui.writeLocal(sizeObject);
                        sizeObjectKey: [];
                        //gui.writeLocal("" + sizeObjectKey + "" , sizeObject)
                        //console.log(gui.getLocal());
                        //console.log(categoryChosen);
                        console.log(sizeObject.name);
                        console.log(sizeObject.description);
                        console.log(sizeObject.price);
                    });
                });
            });
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });
    });

    $('body').on('click', '.backBtn', function () {

        $('.menuItems').attr('data-state', 'hideLeft');

        setTimeout(function () {
            $('.menuItems').empty();
        }, 750);

        return false;
    });



    function onSignIn(googleUser) {
        var id_token = googleUser.getAuthResponse().id_token;

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://localhost:8888/tokensignin');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
            console.log('Signed in as: ' + xhr.responseText);
        };
        xhr.send('idtoken=' + id_token);
    }


});