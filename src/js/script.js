$.ajax({
    url: "/data",
    dataType: "json",
    success: function(res) {
        render(res);
    }
});

function render(data) {
    var str = "";
    $.each(data.list, function(i, v) {
        str += "<li>" + v.title + "</li>";
    });
    $("ul").html(str);
}