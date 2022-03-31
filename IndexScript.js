$(function(){
    $('#Gender').selectmenu();
});

$(function(){
    $("#style").selectmenu();
});

$(function(){
    $("#spinner").spinner({
        min: 4,
        max: 15,
        spin: function(event, ui) {
			$(this).change();
		}
    });
});

// $(function(){
//     $("#spinner2").spinner({
//         min: 2,
//         max: 15,
//         spin: function(event, ui) {
// 			$(this).change();
// 		}
//     });
// });

$(function(){
    $("#slider-range").slider({
        range:true,
        min: 0,
        max: 90,
        values: [0, 90],
        slide: function(event, ui){
            $("#amount").val("£" + ui.values[0] + " - £" + ui.values[1]);
        }
    });
    $("#amount").val("£" + $("#slider-range").slider("values", 0) + " - £" + $("#slider-range").slider( "values", 1 ));
});

$(function(){
    $("#Size-slider-range").slider({
        range:true,
        min: 0,
        max: 15,
        values: [0, 15],
        slide: function(event, ui){
            $("#sizeRng").val( ui.values[0] + " - " + ui.values[1]);
        }
    });
    $("#sizeRng").val( $("#Size-slider-range").slider("values", 0) + " - " + $("#Size-slider-range").slider( "values", 1 ));
});

$(function(){
    $("#colour").selectmenu();
});

$(function(){
    $("#searchbtn").on("click", function(){
        var typeGender = $("#Gender").val();
        var styleType = $("#style").val();
        var colour = $("#colour").val();
        var priceMin = $("#slider-range").slider("option", "values")[0];
        var priceMax = $("#slider-range").slider("option", "values")[1];
        var size =  $("#spinner").val();
        // var maxSize =  $("#spinner2").val();

        // var content ='<div class="item">'
        var content= "<ul id='item'>";
        var v = 1;
        for (var i in data.shoes){
            if(( typeGender == data.shoes[i].gender) || (typeGender=="Any"))
            if(( styleType == data.shoes[i].style) || (styleType=="Any"))
            if(( colour == data.shoes[i].colour) || (colour=="Any"))
            if ((size == data.shoes[i].sizes )|| (size == "All"))
            if(( data.shoes[i].price >= priceMin && data.shoes[i].price <= priceMax ))       
            {
                {
                    {
                        {
                            {
                                var c = v++;
                                console.log(c);
                                // content+=  "<div class = print>" + "<div class = 'printImg'><img src =" + data.shoes[i].picture + "></div>" + "<div class= 'printName'><h2>" + data.shoes[i].name +"</h2><h3>"+data.shoes[i].gender+"&nbsp;|&nbsp;"+ data.shoes[i].style +"</h3><h3>Color &nbsp;" + data.shoes[i].colour + "</h3><h3>&nbsp;£" + data.shoes[i].price +".00" + "</h3><a href='" + data.shoes[i].url + "' target='blank'><button>Watch</button></a>" +"</div>" +"</div>";
                                content += "<li data-id='"+ c +"'>"                                   
                                    +"<div class = print>" 

                                        +"<div class = 'printImg'>"
                                            +"<img src =" + data.shoes[i].picture + ">"
                                        +"</div>" 

                                        +"<div class= 'printName'>"

                                            +"<h2>" + data.shoes[i].name +"</h2>"
                                            +"<h3>"+data.shoes[i].gender+"&nbsp;|&nbsp;"+ data.shoes[i].style +"</h3>"
                                            +"<h3>Color &nbsp;" + data.shoes[i].colour + "</h3>"
                                            +"<h3>&nbsp;£" + data.shoes[i].price +".00 </h3>"

                                            +"<div class='buttns'>"

                                                +"<a href='" + data.shoes[i].url + "' target='blank'>"
                                                    +"<button>Watch</button>"
                                                +"</a>"

                                                +'<input type="checkbox" name="'+ data.shoes[i].id +'" id="'+ data.shoes[i].id +'"><span></span>'
                                                console.log(data.shoes[i].id)
                                                // +"<div class='heartBtn'></div>"

                                            +"</div>" 
                                        +"</div>" 
                                    +"</div>"
                                +"</li>";
                            }
                        }
                    }
                }
            }
            // for(var x in data.shoes[i].sizes){
            // } 
        }


        content += "</ul>";
        document.getElementById("custom").innerHTML = content;

        // $(function() {
        //     $( ".heartBtn" ).on("click",function() {
        //       $( ".heartBtn" ).hoverClass();
        //     });
        // });

        //***********************
        //  Adding to Favourites
        //  Drag and Drop

        $(" li").draggable({
            revert: true,
            drag: function(){
                $(this).addClass("active");
                $(this).closest("li ").addClass("active");
            },
            stop:function(){
                $(this).removeClass("active").closest("li").removeClass("active");
            }
        });

        $(".basket").droppable({
            actvieClass: "active",
            hoverClass: "hover",
            tolerance: "touch",
            drop: function(event,ui){
                var basket = $(this),
                move = ui.draggable,
                itemID = basket.find("#item li[data-id='" + move.attr("data-id") + "']");

                if (itemID.html() != null){
                    itemID.find("input").val(parseInt(itemID.find("input").val()) +1 );
                }else{
                    addBasket(basket,move);

                    move.find("input").val(parseInt(move.find("input").val()) +1);
                }
            }
        });

        function addBasket(basket,move){
            basket.find("ul").append('<li class="drgClass" data-id="' + move.attr("data-id") + '">'
                + '<span class="name">' + move.find(".printName h2").html() + '</span>'
                + '<input class="count" value="1" type="text">'
                + '<button class="delete">&#10005;</button>');
        }

        $(".basket ul li button.delete").live("click", function () {
            $(this).closest("li").remove();
        });
    });
});

$(function(){
    $("ul li").draggable({
        revert: true,
        drag: function(){
            $(this).addClass("active");
            $(this).closest("li ").addClass("active");
        },
        stop:function(){
            $(this).removeClass("active").closest("li");
        }
    });
 
})


$(function(){
    
    $(".rem").attr('hidden', true);

    $(".addFav").on("click", function(){
        console.log("");
        console.log("Add button pressed");
        
        try{
            $(this).attr('hidden', true);
            $(".rem").attr('hidden', false)
            var shoeAdd = $(this).closest('p').attr("id");
            var favList = JSON.parse(localStorage.getItem("fav"));

            if (favList == null) {
                favList = [];
                console.log("fav List null")
            }else{
                
                console.log("fav List not null")

                for(var x = 0; x < favList.length; x++){
                    if (shoeAdd == favList[x]) {
                    
                        console.log("CREATING ALERT")

                        alert("This shoe is already in your fav list");
                        favList = [];

                    }
                }
            }

            favList.push(shoeAdd);
            console.log("favList pushed");
            localStorage.setItem("fav", JSON.stringify(favList));
            console.log("item added - Local storage");


        }catch(e){

            console.log(" Local Storage Error ")

        }

    });
});

$(function(){
    $(".rem").on("click", function(){
        console.log("");
        console.log("Remove Button pressed");
        $(this).attr('hidden', true);
        $(".addFav").attr('hidden', false);

        var remShoe = $(this).closest("p").attr("id");
        
        console.log("Getting FavList arry Data.");
        favList=JSON.parse(localStorage.getItem("fav"));

        if(favList != null) {
            
            console.log("favList not null");

            for ( var j = 0; j < favList.length; j++) {
        
                if ( remShoe == favList[j]) {
                    console.log("checking the RemShoe");
                    
                    alert("This Shoe has been removed");
                    delete favList[j];
                    
                    console.log("Setting FavList arry Data.");
                    localStorage.setItem("fav", JSON.stringify(favList));
                    favList[j] = [];
        
                }
            }
        
        }else{

            alert("You have no favourite items");
        
        }
    });
});

$(function(){
    $(".showLst").on("click", function(){
        
        console.log("View btn pressed");

        console.log("Getting FavList arry Data.");
        favList = JSON.parse(localStorage.getItem("fav"))

        var content = "<ul>"

        if (favList != null) {
            for (var x in data.shoes) {
                for (let v = 0; v < favList.length; v++) {
                    
                    if (data.shoes[x].id == favList[v]) {
                        content += '<li id="' + data.shoes[x].id + '">'
                        + '<span class="name">' + data.shoes[x].name + '</span>'
                        + '<input class="count" value="1" type="text">'
                        + '<button class="delete">&#10005;</button>';
                    }
                    
                }
                
            }
        }

        content += "</ul>";
        document.getElementById("FavList").innerHTML = content;
    });
});

$(function() {
    favList = JSON.parse(localStorage.getItem("fav"));

    $(".clearLst").attr("hidden", false)
       
        $( ".clearLst" ).on("click", function(){
       
            $(this).attr("hidden", true)
       
            $("#FavList").remove();
            console.log("FavList removed");
       
            favList = JSON.parse(localStorage.getItem("fav"));
       
            console.log("localStorage clearing");
            localStorage.clear();
            console.log("localStorage cleared");
       
        });

    // if (favList == null) {

    //     $(".clearLst").attr("hidden", false)
       
    //     $( ".clearLst" ).on("click", function(){
       
    //         $(this).attr("hidden", true)
       
    //         $("#FavList").remove();
    //         console.log("FavList removed");
       
    //         favList = JSON.parse(localStorage.getItem("fav"));
       
    //         console.log("localStorage clearing");
    //         localStorage.clear();
    //         console.log("localStorage cleared");
       
    //     });
       
        
    
    // }else{
    //     $(".clearLst").attr("hidden", true)
        
    // }
});