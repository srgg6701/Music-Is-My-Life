$(() => {
    // switch language
    const $langsBlockSpans = $('#change-language span');
    let dictionary = {}; 
    // set or get vocabulary file (.json)
    const getDictionary = lang => { // event.target.dataset.lang
        if (!dictionary[lang]) $.getJSON(`contents/vocabularies/${lang}.json`, dictionaryJSON => dictionary[lang] = dictionaryJSON);
        return dictionary[lang];
    }
    const $elemsToLocale = $('[data-l]');
    const confNotChosenKey = Object.keys(config.values)[0]; // string: "notChosenYet"
    const localizeContents = activeDictionary => {
        $elemsToLocale.each((index, element) => { // index, element to be localized
            const langDataSetString = element.dataset['l'];
            //const dictKey = Object.keys(activeDictionary)[index]; // get a track name: "Baltic_march"
            // if not a container for a track name
            if (langDataSetString !== confNotChosenKey // 
                // OR if element text is like ["is not chosen yet.","не выбран."]
                || element.innerHTML === confNotChosenKey
            ) element.innerHTML = activeDictionary[langDataSetString];
        });
    }
    $langsBlockSpans.on('click', event => {
        const toLang = event.target.dataset.lang;
        $langsBlockSpans.removeClass(config.classes.hidden);
        $(event.target).addClass(config.classes.hidden);
        $('body').attr('data-lang', toLang);
        let cnt = 0, intv = setInterval(() => {
            if (getDictionary(toLang)) {
                ++cnt;
                localizeContents(dictionary[toLang]);
                clearInterval(intv);
            }
            if (cnt > 10) {
                console.warn('Cannot set an active track name...');
                clearInterval(intv);
            }
        }, 100);
    });
})