// set Html
function setHtml(path, view, field, selector){
    if(!selector) selector = '#template-main';
    if(!field) field = 'contents';
    $.get('contents/views/'+path+'.html', function(data){
        var content = {};
        content[field] = data;
        view.$el.html(_.template($(selector).html())(content));
        setPageTitle(path);
    });
    return view;
}
// change title
function setPageTitle(title){
    $('#page-title').text(title[0].toUpperCase() + title.substr(1));
}
// change background
function setPageBackgroundImage(img, settings){
    $('#page-palette').css('background-image', 'url(\'/images/'+img+'.jpg\')').css(settings);
}
(function () {
    new AppRouter();
    Backbone.history.start();
})();