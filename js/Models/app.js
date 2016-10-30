var appModel = Backbone.Model.extend({
        defaults: {
            contents: 'Some contents model'
        },
        initialize: function () {}
    }),
    modelApp = new appModel();