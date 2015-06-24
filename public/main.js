$(document).ready(function(){

    $(".btn-group-vertical:eq(0)").click(function(){
        $(".list-item:eq(0)").slideToggle("fast");
    });
      $(".btn-group-vertical:eq(1)").click(function(){
        $(".list-item:eq(1)").slideToggle("fast");
    });
    $(".btn-group-vertical:eq(2)").click(function(){
        $(".list-item:eq(2)").slideToggle("fast");
    });

    $(".btn-group-vertical:eq(3)").click(function(){
        $(".list-item:eq(3)").slideToggle("fast");
    });

    //PRODUCTS PAGE ONLOAD ANIMATION
    $('#backOpts').animate({marginLeft:'250px'})
    $('#show').animate({left:'50px'})

    //LOAD EXIT BUTTON
        //for now its still invisible
    $('#exit').css({visibility:'hidden',
                    color:'red',
                    fontSize:'2em',
                    width:'2%',
                    height:'2%',
                    position:'absolute',
                    marginLeft:'20%',
                    background:'black',
                    padding:'2em',
                    border: '2px solid white',
                    borderRadius:'20px'
                    })
    $('#exit span').css({

    })
    /////////////////////////////////////////////


    $(".table tr td").focusin(function(){
            $(this).find('div').css('visibility','hidden')
            $(this).find('span').css('visibility','visible')
    })
    $(".table tr td").focusout(function(){
       
            $(this).find('span').css('visibility','hidden')
    })


    $(".table tr td").mouseenter(function(){
            if($(this).find('span').css('visibility')=='visible'){
                
                $(this).find('div').css('visibility','hidden')
            }
            else{

                $(this).find('div').css('visibility','visible')
            }
            
    })
    $(".table tr td").mouseleave(function(){
            
            $(this).find('div').css('visibility','hidden')
    })
  
    $(".table tr td").find('div').click(function(){
       
       $(this).parent().find('input').css({transform :'scale(1.1)'})
        $(this).parent().find('input').trigger('click');
       $(this).parent().find('input').focus();
       $(this).css('visibility','hidden')
    })
    $(".table tr td input").mouseenter(function(){
        $(this).parent().find('input').css({transform :'scale(1.1)'})

    })
    $(".table tr td").mouseleave(function(){
        $(this).parent().find('input').css({transform :'scale(1)'})
    })

    
    $('#prods').css({opacity :'0'})
    $('#prods').css({transform :'scale(0.9)'})
    $("#show").click(function(){
        $(this).css('visibility','hidden');
        $('#prods').animate({opacity:'1'})
        $('#prods').css('visibility','visible');
        $('#prods').css({transform :'scale(1)'})
        $('#backOpts').animate({marginLeft:'-1px'})
    })
});