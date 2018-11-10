$(() => {
    // switch language
    const $langsBlockSpans = $('#change-language span');
    $langsBlockSpans.on('click', event => {
        $langsBlockSpans.removeClass(config.classes.hidden);
        $(event.target).addClass(config.classes.hidden);
        $('body').attr('data-lang', event.target.dataset.lang);
        $.getJSON(`contents/vocabularies/${event.target.dataset.lang}.json`, dictionary => {
            //
            $('[data-l]').each((index, element) => {
                const dictKey = Object.keys(dictionary)[index];
                const confNotChosenKey = Object.keys(config.values)[0];
                // if a container for a track name
                if (dictKey===confNotChosenKey
                    // if element text like ["is not chosen yet.","не выбран."]
                    && config.values[confNotChosenKey].indexOf(element.dataset['l'].trim()) !== -1
                ) return;
                element.HTML = dictionary[element.dataset['l']];
            });
        });
    });
})