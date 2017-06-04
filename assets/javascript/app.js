//
// An array of Giphy API search objects
// By default, the set of searches is famous B list actors
//
var defaultGiphySearches = [

    {
        query: 'willem+dafoe',
        rating: 'r',
        limit: 5,
        button: {},
        data: {},
        url: "",
    },
    {
        query: 'forest+whitaker',
        rating: 'r',
        limit: 5,
        button: {},
        data: {},
        url: "",
    },
    {
        query: 'nick+nolte',
        rating: 'r',
        limit: 5,
        button: {},
        data: {},
        url: "",
    },
    {
        query: 'john+turturro',
        rating: 'r',
        limit: 5,
        button: {},
        data: {},
        url: "",
    },
    {
        query: 'adrien+brody',
        rating: 'r',
        limit: 5,
        button: {},
        data: {},
        url: "",
    },
    {
        query: 'colin+farrell',
        rating: 'r',
        limit: 5,
        button: {},
        data: {},
        url: "",
    },
    {
        query: 'kevin+bacon',
        rating: 'r',
        limit: 5,
        button: {},
        data: {},
        url: "",
    },
    {
        query: 'john+goodman',
        rating: 'r',
        limit: 5,
        button: {},
        data: {},
        url: "",
    },
    {
        query: 'danny+glover',
        rating: 'r',
        limit: 5,
        button: {},
        data: {},
        url: "",
    },
    {
        query: 'rutger+hauer',
        rating: 'r',
        limit: 5,
        button: {},
        data: {},
        url: "",
    },
];

//
// Returns the Giphy API URL
//
function getApiUrl() {
    return  "http://api.giphy.com/v1/gifs/search";
}

//
// Returns the  Giphy Web API key
//
function getKey() {
    return 'dc6zaTOxFJmzC';
}

//
// Get an image from the Giphy API
//
function getImage(giphySearch) {

    var url = getApiUrl();

    url += '?' + $.param({
            'api_key': getKey(),
            'q' : giphySearch.query,
            'limit' : giphySearch.limit,
            'rating' : giphySearch.rating,
            'sort' : "relevant",
    });
    giphySearch.url = url;

    console.log(url);

    $.ajax({
        url: url,
        method: "GET"
    }).done(function (response) {
        // Step 1: Run this file, click a button, and see what the response object looks like in the browser's console.
        // Open up the data key, then open up the 0th, element. Study the keys and how the JSON is structured.
        console.log(response);

        // Step 2: since the image information is inside of the data key,
        // make a variable named results and set it equal to response.data

        // =============== put step 2 in between these dashes ==================

        giphySearch.data = response.data[0];

        console.log(giphySearch.data.url);

        var image = $("<img " +
            "class=\"giphy\" " +
            "id=\"" + giphySearch.data.id + "\" " +
            "data-src=\"static\" " +
            "url-static=" + giphySearch.data.images.fixed_height_still.url + " " +
            "url-animated=" + giphySearch.data.images.fixed_height.url + " " +
            "src=" + giphySearch.data.images.fixed_height_still.url + ">");

        image.css("border-radius", "25px");

        $("#searchResults").prepend(image);

        // ========================
    });
}

//
// A page can't be manipulated safely until the document is "ready." jQuery detects this state of readiness
// for you. Code included inside $( document ).ready() will only run once the page Document Object Model (DOM)
// is ready for JavaScript code to execute.
//
function main() {

    // Attach a delegated click event to all giphy images
    $("#searchResults").on("click", ".giphy", function() {

        // Look up both the animated and static images in the DOM using JQuery selectors
        // Each image contains a unique ID provided by the giphy API
        // The data source indicates whether the image is static or animated
        var dataId = $(this).attr("id");
        var dataSrc = $(this).attr("data-src");
        var urlStatic = $(this).attr("url-static");
        var urlAnimated = $(this).attr("url-animated");

        // If the clicked imaged is static, hide the static image and show the animated image
        if (dataSrc === "static") {
            $(this).attr("src", urlAnimated);
            $(this).attr("data-src", "animated");
        }
        // Else if the clicked image is animated, hide the animated image and show the static image
        else if (dataSrc === "animated") {
            $(this).attr("src", urlStatic);
            $(this).attr("data-src", "static");
        }
        // Else hide the animated image, and show and place holder image to indicate an error
        else {
            $(this).attr("src", "http://via.placeholder.com/350x150");
        }
    });

    for (var i = 0; i < defaultGiphySearches.length; i++) {

        getImage(defaultGiphySearches[i]);

    }

}
$( document ).ready( main );