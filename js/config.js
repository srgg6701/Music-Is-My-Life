var config = {
    routes: [
        ['', homeView, modelApp],
        ['home', homeView, modelApp],
        ['tracks', tracksView, new tracksModel()],
        ['about', aboutView, modelApp],
        ['contact', contactView, modelApp]
    ],
    handlers:{} // will be filled in the loop bellow
};
