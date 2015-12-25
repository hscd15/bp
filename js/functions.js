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
        },

        //get user height/width
        clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
        clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    $('.BOD, .MOD').css('height', clientHeight + 'px');

    //get menuItems through ajax
    $('.menuBtn').click(function (ev) {
        ev.preventDefault;
        $('menuCategories').toggleClass('hideScroll');

        gui.categoryChosen = $(this).parents('section').addBack().first().attr('id');

        //console.log(categoryChosen);

        dynamicImage = 'images/jpg&png/' + gui.categoryChosen + '.jpg) no-repeat center center';
        gui.htmlToDom('ajax', gui.categoryChosen, function () {
            if (gui.categoryChosen = "twoPizzaSpecial") {
                $('.header h2').css({
                    'font-size': '1.5rem',
                    'padding-top': '1.75rem'
                })
            }
            $('.BOD').css('overflow', 'hidden');
            $('.MOD').attr('data-state', 'fromBottom');
        });
    });

    //show specials modal
    $('body').on('click', '#specialsBtn', function () {

        $('#specialsModal').css('height', clientHeight + 'px');
        $('.specialsList').css('height', clientHeight - 56 + 'px')
        $('#specialsModal').attr('data-state', 'fromBottom');
    })

    //hide modals
    $('body').on('click', '.backBTn', function () {
        $('.BOD').css('overflow', 'auto');
        $('.MOD').attr('data-state', 'toBottom');

        setTimeout(function () {
            $('.menuItems').empty();
        }, 750);
    });

    //add items to shopping cart
    $('body').on('click', '.addToCart', function (ev) {
        ev.preventDefault;
        gui.productChosen = $(this).parent('div').addBack().attr('id'),
            gui.productSize = $('#' + gui.productChosen).find(":selected").attr('value');

        //design by using like 7 tags and each tag shares a common class
        console.log(gui.categoryChosen);
        var url = 'ajax/json/' + gui.categoryChosen + '.json';

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

            $.each(data[gui.categoryChosen], function () {
                var categoryObject = this; //categoryObject key = categoryChosen from event

                $.each(categoryObject[gui.productChosen], function () {
                    var productObject = this; //productObject key = productChosen from event

                    $.each(productObject[gui.productSize], function () {
                        var sizeObject = this; //sizeObject key = productSize from event                        

                        console.log(sizeObject);

                        //gui.writeLocal(sizeObject);
                        sizeObjectKey: [];
                        //console.log(gui.getLocal());
                        console.log(categoryObject);
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

});