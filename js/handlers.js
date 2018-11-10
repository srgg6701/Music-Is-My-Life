$(() => {
    // switch language
    const $langsBlockSpans = $('#change-language span');
    $langsBlockSpans.on('click', event => {
        $langsBlockSpans.removeClass(config.classes.hidden);
        $(event.target).addClass(config.classes.hidden);
        $('body').attr('data-lang', event.target.dataset.lang)
        $.getJSON(`contents/vocabularies/${event.target.dataset.lang}.json`, dictionary => {
            console.log('dictionary', dictionary);
            $('[data-l]').each((index, element) => {
                console.log('element', {index, element});
                element.innerText = dictionary[element.dataset['l']];
            });
        });
    });
})