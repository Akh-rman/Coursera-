$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});

$(document).ready(function(){
    $("#mycarousel").carousel({interval: 2000});
    $("#carousel-pause").click(function(){
        $("#mycarousel").carousel("pause");
    });
    $("#carousel-play").click(function(){
        $("#mycarousel").carousel("cycle");
    });
    $("[href='#loginModal']").click(function(){
        $("#loginModal").modal("show");    
    });
    $("[href='#reserveformModal']").click(function(){
        $("#reserveformModal").modal("show");    
    });
});