$(document).ready(function() {
    //grabs the hash tag from the url
    var hash = window.location.hash;
    //checks whether or not the hash tag is set
    if (hash != "") {
        //removes all active classes from tabs
        $('#tabs li').each(function() {
            $(this).find('a').removeClass('active').attr("aria-selected","false");

        });
        $('#tab-content div').each(function() {
            $(this).removeClass('active').removeClass('show');
        });
        //this will add the active class on the hashtagged value
        var link = "";
        $('#tabs li').each(function() {
            link = $(this).find('a').attr('href');
            if (link == hash) {
                $(this).find('a').addClass('active').attr("aria-selected","true");
            }
        });
        $('#tab-content div').each(function() {
            link = $(this).attr('id');
            if ('#'+link == hash) {
                $(this).addClass('active').addClass('show');
            }
        });
    }
});