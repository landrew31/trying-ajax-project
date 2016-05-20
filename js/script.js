
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    var streetviewURL = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + 
        address + '&key=AIzaSyDHz3QSBxSbvw0xhtaFJJShaWL75jwv15A';

    $body.append('<img class="bgimg" src="' + streetviewURL + '">');

    var nytimesURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + 
    cityStr + '&sort=newest&api-key=56d6196b596c46c3b3e8bffdb1f5185e';

    $.getJSON(nytimesURL, function(data) {
        $nytHeaderElem.text('New York Times Articles About ' + cityStr);

        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' + 
                '<a href="' + article.web_url + '">' +
                article.headline.main + '</a>' +
                '<p>' + article.snippet + '</p>' +
            '</li>');
        };
    }).error(function(e){
        $nytHeaderElem.text('Not Articles Loaded');
    });

    var wikiURL = 'http://en.wikiлджлedia.org/w/api.php?action=opensearch&search=' +
        cityStr + '&format=json&callback=wikiCallback';

    $.ajax({
        url: wikiURL,
        dataType: "jsonp",
        success: function( response ) {
            var articleList = response[1];

            for (var i = 0; i < articleList.length; i++){
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            };
        }
    });

    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);
