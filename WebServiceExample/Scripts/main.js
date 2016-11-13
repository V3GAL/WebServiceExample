$(document).ready(function () {
    var lluvioso    = "~/Content/img/lluvioso.png";
    var nublado     = "~/Content/img/nublado.png";
    var soleado     = "~/Content/img/soleado.png";

    $("#ciudades").change(function () {
        //console.log($(this).val());
        var api = "cc6bfa527998abd39564fb6dc3059449";
        var ciudad = $("#ciudades").val();
        var uri = "http://api.openweathermap.org/data/2.5/weather?id=" + ciudad + "&appid=" + api;

        $.getJSON(uri, function (data, status) {
            var t       = (data.main.temp - 273.15).toFixed(2);
            var tma     = (data.main.temp_min - 273.15).toFixed(2);
            var tmi     = (data.main.temp_max - 273.15).toFixed(2);
            var iconuri = "http://openweathermap.org/img/w/";
            $("#ciudad").text(data.name + ", " + data.sys.country);
            $("#clima").text(data.weather[0].description);
            $("#temp").text(t + "ºC");
            $("#tempMa").text(tma + "ºC");
            $("#tempMi").text(tmi+"ºC");
            $("#viento").text(data.wind.speed + "km/s");
            $("#icon").attr("src", iconuri + data.weather[0].icon + ".png");
            //console.log(status);
            //console.log(data);
        })
    })
      
    $("#btnEsconder").click(function () {
        var api = "cc6bfa527998abd39564fb6dc3059449";
        var ciudad = $("#ciudades").val();
        var uri = "http://api.openweathermap.org/data/2.5/weather?id=" + ciudad + "&appid=" + api;

        $.getJSON(uri, function (data, status) {
            $("#ciudad").text(data.name + ", " + data.sys.country);
            $("#clima").text(data.weather[0].description);
            $("#temp").text(data.main.temp + "ºF");
            $("#tempMa").text(data.main.temp_min + "ºF");
            $("#tempMi").text(data.main.temp_max + "ºF");
            $("#viento").text(data.wind.speed + "km/s");
            //console.log(status);
            //console.log(data);
        })            
    });

    $("#searchForm").submit(function (e) {
        e.preventDefault();
        $("#results").empty();
        var YTUri = "https://www.googleapis.com/youtube/v3/search";
        var q = $("#txtSearch").val();
        var apiKey = "AIzaSyDB2-8TA6laWb9fAbI-5AUOtordsrm-b30"

        $.get(
                YTUri,
                {
                    part: "snippet, id",
                    q: q,
                    type: "video",
                    key: apiKey
                },
                function (result, status) {
                    var prevPageToken = result.prevPageToken;
                    var nextPageToken = result.nextPageToken;

                    $.each(result.items, function (i, item) {
                        var output = getOutput(item);
                        $("#results").append(output);                       
                    })                 
                    var buttons = getButtons(prevPageToken, nextPageToken,q);

                    $(".buttons").empty();
                    $(".buttons").append(buttons);
                    $(".list-group-item.fancybox").fancybox();
                });
    });

    $(".list-group-item.fancybox").fancybox();
   
})

/*Create the items of the video list*/
function getOutput(item) {
    var videoId = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var videoDate = item.snippet.publishedAt;

    var output = '<a href="http://www.youtube.com/embed/' + videoId + '" class="list-group-item fancybox fancybox.iframe"><div class="row">'
                        + '<div class="col-lg-4">'
                            + '<img class="img-responsive img-center" src="' + thumb + '" alt="thumbnail"/>'
                        + '</div>'
                        + '<div class="col-lg-8 pull-right">'
                            + '<h1>' + title + '</h1>'
                            + '<small>By <span class="channel-info">' + channelTitle + '</span> on ' + videoDate + '</small>'
                            + '<p>' + description + '</p>'
                        + '</div>'
                    + '</div></a>'
    return output;
}

/*Create previous and next buttons*/
function getButtons(prevPageToken, nextPageToken, q) {
    if (!prevPageToken) {
        var btnoutput = '<div>'
                        + '<button class="btn btn-default btn-samewidth"id="btnPrev" data-token="' + prevPageToken + '"'
                        + 'data-query="' + q + '" onclick="prevPage();" disabled>Previous Page</button>'
                        + '<button class="btn btn-default btn-samewidth" id="btnNext" data-token="' + nextPageToken
                        + '" data-query="' + q + '" onclick="nextPage();">Next Page</button>'
                        + '</div>'
    } else {
        var btnoutput = '<div>'
                        + '<button class="btn btn-default btn-samewidth" id="btnPrev" data-token="' + prevPageToken + '"'
                        + 'data-query="' + q + '" onclick="prevPage();">Previous Page</button>'
                        + '<button class="btn btn-default btn-samewidth" id="btnNext" data-token="' + nextPageToken + '"'
                        + 'data-query="' + q + '" onclick="nextPage();">Next Page</button>'
                        + '</div>'
    }

    return btnoutput
}

/*Next Page ~ Previous Page*/
function nextPage() {
    var token = $("#btnNext").data("token");
    var q = $("#btnNext").data("query");
    $("#results").empty();
    var YTUri = "https://www.googleapis.com/youtube/v3/search";
    var q = $("#txtSearch").val();
    var apiKey = "AIzaSyDB2-8TA6laWb9fAbI-5AUOtordsrm-b30"

    $.get(
            YTUri,
            {
                part: "snippet, id",
                q: q,
                pageToken: token,
                type: "video",
                key: apiKey
            },
            function (result, status) {
                var prevPageToken = result.prevPageToken;
                var nextPageToken = result.nextPageToken;

                $.each(result.items, function (i, item) {
                    var output = getOutput(item);
                    $("#results").append(output);
                })

                var buttons = getButtons(prevPageToken, nextPageToken, q);

                $(".buttons").empty();
                $(".buttons").append(buttons);
                $(".list-group-item.fancybox").fancybox();
            });
}
function prevPage() {
    var token = $("#btnPrev").data("token");
    var q = $("#btnPrev").data("query");
    $("#results").empty();

    var YTUri = "https://www.googleapis.com/youtube/v3/search";
    var q = $("#txtSearch").val();
    var apiKey = "AIzaSyDB2-8TA6laWb9fAbI-5AUOtordsrm-b30"

    $.get(
            YTUri,
            {
                part: "snippet, id",
                q: q,
                pageToken: token,
                type: "video",
                key: apiKey
            },
            function (result, status) {
                var prevPageToken = result.prevPageToken;
                var nextPageToken = result.nextPageToken;

                $.each(result.items, function (i, item) {
                    var output = getOutput(item);
                    $("#results").append(output);
                })

                var buttons = getButtons(prevPageToken, nextPageToken, q);

                $(".buttons").empty();
                $(".buttons").append(buttons);
                $(".list-group-item.fancybox").fancybox();
            });  
}





