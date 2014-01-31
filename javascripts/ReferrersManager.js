$(document).ready(function () {

    $('#checkurl').bind('click', function(){
        var ajaxHandler = new ajaxHelper();
        ajaxHandler.addParams({
            module: 'ReferrersManager',
            action: 'checkUrl',
            url: $('#urlToCheck').val()
        }, 'GET');
        ajaxHandler.setCallback(function(response){
            console.log(response);

            if (response.searchengine && response.searchengine.name) {

                $('.detectionresult .engine').text(response.searchengine.name);
                $('.detectionresult .keywords').html(response.searchengine.keywords);
                $('.detectionresult img').attr('src', response.searchengine.image);

            } else {
                $('.detectionresult .engine').text('');
                $('.detectionresult .keywords').text('');
                $('.detectionresult img').attr('src', 'plugins/Referrers/images/searchEngines/xx.png');
            }

            if (response.social && response.social.name) {

                $('.socialresult .social').text(response.social.name);
                $('.socialresult img').attr('src', response.social.image);

            } else {
                $('.socialresult .social').text('');
                $('.socialresult img').attr('src', 'plugins/Referrers/images/socials/xx.png');
            }
        });
        ajaxHandler.send(true);
    });

    $('#tabs').tabs();

    $('[role="addSocial"]').click(function() {
        $('[role="addSocialForm"]').dialog({
            modal: true,
            width: '75%'
        });
    });

    $('[role="submitAddSocial"]').click(function(e) {
        $('[role="addSocialError"]').fadeOut({time: 0});
        var ajaxHandler = new ajaxHelper();
        ajaxHandler.addParams({
            module: 'ReferrersManager',
            action: 'addSocial',
            name: $('#socialName').val(),
            host: $('#socialHost').val()
        }, 'GET');
        ajaxHandler.setCallback(function(response){
            if (response == 1) {

            } else {
                $('[role="addSocialError"]').show();
                setTimeout(function(){$('[role="addSocialError"]').fadeOut()}, 10000);
            }
        });
        ajaxHandler.send(true);
    });

    $('[role="removeSocial"]').click(function(e) {
        var host = $(this).attr('host');
        $('#removeDataConfirm').find('h2 .name').text(host);
        piwikHelper.modalConfirm('#removeDataConfirm', {yes: function () {
            var ajaxHandler = new ajaxHelper();
            ajaxHandler.addParams({
                module: 'ReferrersManager',
                action: 'removeSocial',
                host: host
            }, 'GET');
            ajaxHandler.redirectOnSuccess({});
            ajaxHandler.send(true);
        }});
    });

    $('[role="noDefaultSocials"]').click(function(){
        var ajaxHandler = new ajaxHelper();
        ajaxHandler.addParams({
            module: 'ReferrersManager',
            action: 'setDefaultSocialsDisabled',
            state: $(this).attr('state')
        }, 'GET');
        ajaxHandler.redirectOnSuccess({});
        ajaxHandler.send(true);
    });
});
