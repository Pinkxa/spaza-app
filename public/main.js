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
            $('.showButton').animate({right:'38%'})




        //-------- create close button for products table ----------//

             $('.exitButton').css({visibility:'hidden',
                            color:'orange',
                            fontSize:'1em',
                            fontWeight:'300',
                            width:'auto',
                            height:'auto',
                            position:'absolute',
                            marginLeft:'90%',
                            background:'black',
                            border:'2px solid orange',
                            zIndex:'1',
                            padding:'1%',
                            marginTop:'1%',
                            borderRadius:'30px',
                            textAlign:'center',
                            
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
            $('#dialog').mousedown(function(e){ 
                        if( e.button == 2 ) { 

                                if($('div').css('webkitFilter') !='blur(0px)sepia(0)'){
                                    $('div').css({'webkitFilter':'blur(0px)sepia(0)'})
                                    $('#dialog').css('visibility','hidden')
                                }                        
                                $('#dialog').css({'visibility':'hidden'})
                    }


               });
            
            
        



        //------- extra Styling the products table --------------------------//

            $('#prods').css({opacity :'0'})

            $('#prods').css({transform :'scale(0.9)'})






        //------- click event for view products table button --------------//

            function showScreen(buttonId, target){
                
                $(buttonId).click(function(){
                    $(this).css('visibility','hidden');
                    $(target).animate({opacity:'1'})
                    $(target).css('visibility','visible');
                    $(target).css({transform :'scale(1)'})
                    $(target).animate({left:'1%'})
                    $('#backOpts').animate({marginLeft:'5%'})
                    $('#backOptsProfits').animate({marginRight:'8%'})
                    $('.exitButton').css('visibility','visible')
                });

                $(".exitButton").click(function(){

                    $(target).animate({opacity:'0'},100)  
                    $(target).css('visibility','hidden');
                    $('#backOpts').animate({marginLeft:'3%'})
                    $('#backOptsProfits').animate({marginRight:'3%'})
                    $(".showButton").css('visibility','visible')
                    $('.exitButton').css('visibility','hidden');

                })                

            }

            showScreen("#showProducts", "#prods");
            showScreen("#showPurchases", "#purchases");
            showScreen("#showSales", "#sales");
            showScreen("#showSuppliers", "#suppliers");


            /*
            $("#showButton").click(function(){

                    $(this).css('visibility','hidden');
                    $('#prods').animate({opacity:'1'})
                    $('#prods').css('visibility','visible');
                    $('#prods').css({transform :'scale(1)'})
                    $('#prods').animate({left:'1%'})
                    $('#backOpts').animate({marginLeft:'5%'})
                    $('#backOptsProfits').animate({marginRight:'8%'})
                    $('#exit').css('visibility','visible')

            })
            */

            $('#home').css({background:'orange',
                            borderRadius:'50px',
                            padding:'30%',
                            marginLeft:'20%',
                            marginTop:'2%',
                            overflow:'hidden',
                            
                            boxShadow:'1px 1px 3px 1px black',
                            border:'5px solid black',
                            animation:'bounce 1s infinite alternate'})
             $('#home tr ').css({padding:'50%',
                                 fontWeight:'900'
                                 })
             $('#home tr td').css({fontFamily:'Orbitron',
                                 fontWeight:'900'
                                 })


        });
