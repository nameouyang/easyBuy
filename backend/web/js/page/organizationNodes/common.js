$(function () {
    $.extend({
        initThirdPlugins: function () {
            var userSuggestion = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: '/user/get-suggestion?q=%QUERY',
                    wildcard: '%QUERY'
                }
            });

            $('#rep_user_id').typeahead(null, {
                name: 'user-suggestion',
                display: 'id',
                limit: 20,
                source: userSuggestion,
                templates: {
                    suggestion: Handlebars.compile('<div><strong>{{name}}</strong> – {{id}}</div>')
                }
            })
        }});
});