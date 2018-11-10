// set Html
const setHtml = (path, view, field, selector) => {
    if(!selector) selector = '#template-main';
    if(!field) field = 'contents';
    $.get(`contents/views/${path}.html`, data => {
        const content = {};
        content[field] = data;
        view.$el.html(_.template($(selector).html())(content));
        setPageTitle(path);
    });
    return view;
}
// change title
const setPageTitle = title => {
    $('#page-title').text(`${title[0].toUpperCase()}${title.substr(1)}`);
}
// change background
const setPageBackgroundImage = (img, settings) => {
    $('#page-palette').css('background-image', `url('images/${img}.jpg')`).css(settings);
}

//---------------------------------
(() => {
    new AppRouter();
    Backbone.history.start();
})();