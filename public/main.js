        $(document).ready(function(){




        //------- Set up slide toggle for products options------------//

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



        //-------- animating the products page on load ------------//

            $('#backOpts').animate({marginLeft:'160px'})
            $('#backOptsProfits').animate({marginRight:'14%'})
            $('#show').animate({right:'38%'})




        //-------- create close button for products table ----------//

             $('#exit').css({visibility:'hidden',
                            color:'orange',
                            fontSize:'1em',
                            fontWeight:'300',
                            width:'1%',
                            height:'1%',
                            position:'absolute',
                            marginLeft:'65%',
                            zIndex:'1',
                            padding:'1%',
                            marginTop:'-1.5%',
                            textAlign:'center',
                            opacity:'.4'
                            })
            $('#exit span').css({

            })
           



        //-------- when user uses textbox for edit ---------//

            $(".table tr td").focusin(function(){
                    $(this).find('div').css('visibility','hidden')
                    $(this).find('span').css('visibility','visible')
            })


            $(".table tr td").focusout(function(){
               
                    $(this).find('span').css('visibility','hidden')
            })


            $(".table tr td").mouseenter(function(){
                    if($(this).find('span').css('visibility')=='visible')
                    {                
                        
                        $(this).find('div').css('visibility','hidden')

                    }
                    else
                    {

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



            




        //--------------  when  editing  ---------------------//
            $('body').click(function(){

                        if($('div').css('webkitFilter') !='blur(0px)sepia(0)'){
                            $('div').css({'webkitFilter':'blur(0px)sepia(0)'})
                            $('#dialog').css('visibility','hidden')
                        }                        
                        $('#dialog').css({'visibility':'hidden'})



               })
            
            
        



        //------- extra Styling the products table --------------------------//

            $('#prods').css({opacity :'0'})

            $('#prods').css({transform :'scale(0.9)'})






        //------- click event for view products table button --------------//

            $("#show").click(function(){

                    $(this).css('visibility','hidden');
                    $('#prods').animate({opacity:'1'})
                    $('#prods').css('visibility','visible');
                    $('#prods').css({transform :'scale(1)'})
                    $('#prods').animate({left:'1%'})
                    $('#backOpts').animate({marginLeft:'5%'})
                    $('#backOptsProfits').animate({marginRight:'8%'})
                    $('#exit').css('visibility','visible')

            })




            $("#exit").click(function(){

                    $('#prods').animate({opacity:'0'},100)  
                    $('#prods').css('visibility','hidden');
                    $('#backOpts').animate({marginLeft:'3%'})
                    $('#backOptsProfits').animate({marginRight:'3%'})
                    $("#show").css('visibility','visible')
                    $('#exit').css('visibility','hidden');

            })
        });