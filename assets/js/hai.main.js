var ACTION = 'touchstart';
$(document).ready(function () 
{
	var colorsLoaded = 0;
	var colorsLoadedFontijn = 0;
	var colorsLoadedSpiegels = 0;
	var samenstelling = "";
	console.log("READY");
	//SCREENSAVER
	$("#slick__screensaver").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: false,
        arrows: false,
        fade: true,
        infinite: true,
        dots: false,
        autoplay: true,
        autoplaySpeed: 6000,
        speed: 1000,
        pauseOnHover: false           
    });

	var s_saver;
	$('.btnStart').on(ACTION, function() {
		clearTimeout(s_saver);
		s_saver = setTimeout(function(){
			$("#slick__screensaver").slick({
		        slidesToShow: 1,
		        slidesToScroll: 1,
		        variableWidth: false,
		        arrows: false,
		        fade: true,
		        infinite: true,
		        dots: false,
		        autoplay: true,
		        autoplaySpeed: 600000, //6 mins
		        speed: 1000,
		        pauseOnHover: false           
		    });
			$(".navigation__top").hide();
			$('.screensaver').fadeIn(900);
		}, 60000);
	
		$('.screensaver').fadeOut(900);
        $(".navigation__top").show();
	});
	//NAVIGATION
	$(".navigation__top .item").on(ACTION, function()
	{	
		$(".navigation__top .item.active").removeClass('active');
		$(this).addClass('active');
		$newActive = "." + $(this).attr('data-id');
		$(".calculator__content .steps.active").fadeOut(500).removeClass('active').fadeIn(500);
		$($newActive).addClass('active');
	});

	$(".btnSamenstelilng").on(ACTION, function()
	{
        $(".navigation__top .item.active").removeClass('active');
        $newActive = ".samenstelling";
        $(".calculator__content .steps.active").fadeOut(500).removeClass('active').fadeIn(500);
        $($newActive).addClass('active');
	});
	//SLICK CONTROLS
	$(".slider__arrow__next").on(ACTION, function()
    {
        var cls = "#" + $(this).attr('data-tag');
        var slider = $(cls);
        slider[0].slick.slickNext();
    });
    $(".slider__arrow__prev").on(ACTION, function()
    {
        var cls = "#" + $(this).attr('data-tag');
        var slider = $(cls);
        slider[0].slick.slickPrev();
    });

    //MAKE IMAGES BIG

   /* $(".makeBig").on(ACTION, function()
    {
    	$(".hoverPage").toggleClass('active');
    	$(this).parent(".vergroot").toggleClass('active');
    });*/

    //SAVE SAMENSTELLINGEN
    $(".btnAdd").on(ACTION, function()
    {
    	$data1 = $(this).attr('data-id');
    	$data2 = $(this).attr('data-tag');
    	$data3 = $(this).attr('data-type');
    	addSamenstelling($data1, $data2, $data3);
    	$b = $(this);
    	$b.text("Succesvol opgeslagen");
    	setTimeout(function(){ $b.text("Opslaan"); }, 5000);
    });

    $(".reset__step1").on(ACTION, function()
    {
        $(".wastafel__voorbeeld").html('');
        $(".badmeubel__voorbeeld").html('');
        $(".step__1 .btnKiesKleur").hide();
        $(".step__1 .btnKiesBlad").hide();
        $(".placeholder__slider__meubels__materiaal").hide();
        $(".placeholder_slider__meubels__wastafel").hide();
        $(".slider__meubels").show();
        $(".slider__wastafels").html('');
        $(".slider__materiaal").html('');
        $(".step__1 .nav__step").removeClass('active');
        $(".step__1 .navstep__1").addClass('active');
        $(".step__1 .btnAdd").hide();
    });
    $(".reset__step2").on(ACTION, function()
    {
        $(".fontijn__voorbeeld").html('');

        $(".step__2 .btnKiesKleur").hide();

        //$(".placeholder__slider__fontijn").hide();
        $(".placeholder__slider__fontijntje__materiaal").hide();
        $(".placeholder__slider__fontijn").show();
        $(".slider__materiaal__fontijntje").html('');

        $(".step__2 .nav__step").removeClass('active');
        $(".step__2 .navstep__1").addClass('active');
        $(".step__2 .btnAdd").hide();
    });
    $(".reset__step5").on(ACTION, function()
    {
        $(".spiegel__voorbeeld").html('');

        $(".step__5 .btnKiesAfmeting").hide();

        //$(".placeholder__slider__fontijn").hide();
        $(".placeholder__slider__spiegel__afmeting").hide();
        $(".placeholder__slider__spiegel").show();
        $(".slider__spiegel__afmeting").html('');

        $(".step__5 .nav__step").removeClass('active');
        $(".step__5 .navstep__1").addClass('active');
        $(".step__5 .btnAdd").hide();
    });
	//STEP 1 MEUBELS
	$("#slider__meubels").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: true,
        arrows: false,
        fade: false,
        infinite: true,
        centerMode: true,
        dots: false,
        autoplay: false
    });
	$meubelsID = 0;
	$meubelsDataNames = '';
    $(".slider__meubels .item").on(ACTION, function()
	{

		$(".step__1 .btnKiesKleur").show();
        $(".wastafel__voorbeeld").html('');
        $(".slider__meubels .item").removeClass('selected');
        $(".slider__wastafels .item").removeClass('selected');
        $(this).addClass('selected');
        $(".badmeubel__voorbeeld").html('<img class="badmeubel" src="' + $(this).attr('data-item') + '">')
		$meubelsID = $(this).attr('data-id');
        $meubelsDataNames = $(this).attr('data-names');
	});

	$(".step__1 .btnKiesKleur").on(ACTION, function()
	{
        $("#slider__meubels").hide();
        $(".step__1 .nav__step").removeClass('active');
        $(".step__1 .navstep__2").addClass('active');
        //loadWastafels($(this).attr('data-id'), $(this).attr('data-names'));
        loadColors($meubelsID, $meubelsDataNames, colorsLoaded);
        colorsLoaded = 1;
	});


    //STEP 1 Fontijnje
	$("#slider__fontijn").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        arrows: false,
        fade: false,
        infinite: false,
        centerMode: true,
        dots: false,
        autoplay: false
    });

	$fontijnIDs = '';
	$fontijnNames = '';
    $(".slider__fontijn .item").on(ACTION, function()
	{
		$(".fontijntje__voorbeeld").html('');
		$(".step__2 .btnKiesKleur").show();
		$(".slider__fontijn .item").removeClass('selected');
		$//(".slider__wastafels .item").removeClass('selected');
		$(this).addClass('selected');
		$(".fontijn__voorbeeld").html('<img class="badmeubel" src="' + $(this).attr('data-item') + '">')
		//loadWastafels($(this).attr('data-id'), $(this).attr('data-names'));
        $fontijnIDs = $(this).attr('data-id');
		$fontijnNames = $(this).attr('data-names');

	});
    $(".step__2 .btnKiesKleur").on(ACTION, function()
	{
		$(".placeholder__slider__fontijn").hide();
        $(".step__2 .nav__step").removeClass('active');
        $(".step__2 .navstep__2").addClass('active');
        loadColorsFontijn($fontijnIDs, $fontijnNames, colorsLoadedFontijn);
        colorsLoadedFontijn = 1;
	});


    //STEP 1 spiegels
	$("#slider__spiegel").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: true,
        arrows: false,
        fade: false,
        infinite: true,
        centerMode: true,
        dots: false,
        autoplay: false
    });
	$spiegelIDs = '';
	$spiegelNames = '';
    $(".slider__spiegel .item").on(ACTION, function()
	{
		$("#btn__5").hide();

		$(".spiegel__voorbeeld").html('');
        $(".step__5 .btnKiesAfmeting").show();
		$(".slider__spiegel .item").removeClass('selected');
		$//(".slider__wastafels .item").removeClass('selected');
		$(this).addClass('selected');
		$(".spiegel__voorbeeld").html('<img class="badmeubel" src="' + $(this).attr('data-item') + '">')
		//loadWastafels($(this).attr('data-id'), $(this).attr('data-names'));
        $spiegelIDs = $(this).attr('data-id');
        $spiegelNames = $(this).attr('data-names');


	});
	$(".step__5 .btnKiesAfmeting").on(ACTION, function()
	{
		$(".placeholder__slider__spiegel").hide();
        $(".step__5 .nav__step").removeClass('active');
        $(".step__5 .navstep__2").addClass('active');
        loadColorsSpiegels($spiegelIDs, $spiegelNames, colorsLoadedSpiegels);
        colorsLoadedSpiegels = 1;
	})

	
});

$step1_sm_dataRange = '';
$step1_sm_dataDescr = '';
$(document).on(ACTION,".slider__materiaal .item", function()
{
    $(".step__1 .btnKiesKleur").hide();
    $(".step__1 .btnKiesBlad").show();
    $(".wastafel__voorbeeld").html('');
    $(".slider__materiaal .item").removeClass('selected');
    $(this).addClass('selected');
    $("#btn__1").hide();
    $id = $(this).attr('data-range').split("{}");
    $color = $(this).attr('data-color');
    //console.log($var);
    $step1_sm_dataDescr = $(this).attr('data-description');
    $step1_sm_dataRange = $(this).attr('data-range');

    $(".badmeubel__voorbeeld").html('<img class="badmeubel" src="assets/img/badmeubel/meubels-colored/' + $color  + '/' + $id[0]  + '.png">')
    //$(".wastafel__voorbeeld").append('<img class="wastafel" src="' + $(this).attr('data-item') + '">')
    //loadColors($(this).attr('data-artikel'));

});
$(document).on(ACTION, ".step__1 .btnKiesBlad", function()
{
    $(".step__1 .nav__step").removeClass('active');
    $(".step__1 .navstep__3").addClass('active');
	$(".placeholder__slider__meubels__materiaal").hide();
    loadWastafels($step1_sm_dataRange, $step1_sm_dataDescr);
});

/*
$(".step__1 .btnKiesKleur").show();
        $(".wastafel__voorbeeld").html('');
        $(".slider__meubels .item").removeClass('selected');
        $(".slider__wastafels .item").removeClass('selected');
        $(this).addClass('selected');
        $(".badmeubel__voorbeeld").html('<img class="badmeubel" src="' + $(this).attr('data-item') + '">')
		$meubelsID = $(this).attr('data-id');
        $meubelsDataNames = $(this).attr('data-names');
 */




$(document).on(ACTION,".slider__wastafels .item", function()
{
    $(".wastafel__voorbeeld").html('');
    $(".step__1 .btnKiesBlad").hide();
    $("#btn__2").hide();
    $(".slider__wastafels .item").removeClass('selected');
    $(this).addClass('selected');

    $(".wastafel__voorbeeld").append('<img class="wastafel" src="' + $(this).attr('data-item') + '">')

    $id = $(this).attr('data-artikel');
    $color = $(".slider__materiaal .item.selected").attr('data-color');
    $dataID = $id + '.' + $color;
    $data2 = $(".badmeubel__voorbeeld").html() + "{}" + $(".wastafel__voorbeeld").html();
    $("#btn__1").attr('data-id',$dataID).attr('data-tag', $data2).attr('data-type','meubel').fadeIn(300);
    //loadColors($(this).attr('data-artikel'));
    //loadWastafels($(this).attr('data-id'));
});

function addSamenstelling($data1, $data2, $type)
{
	if($type == 'meubel')
	{
		$ex = $data2.split("{}");
		$(".imageOverview .meubel").html($ex[0] + $ex[1]);
	
	}
	else if($type == 'spiegel')
	{
		$(".imageOverview .spiegel").html($data2);
	}
	else if($type == 'fontein')
	{
		$(".imageOverview .fontein").html($data2);
	}
	else
	{
		$img = "<div class=\"overig\">" + $data2 + "</div>";
		$(".imageOverview .overig").html($img);
	}
	
	
	

	$(".tbl__samenstelling").append("<tr><td>" + $data1 + "</td><td>Prijs</td></tr>")
	return true;	
}
/*$(document).on(ACTION,".slider__spiegel .item", function()
{
	$(".fontijn__voorbeeld").html('');
	$(".spiegel__voorbeeld .item").removeClass('selected');
	$(this).addClass('selected');
	$id = $(this).attr('data-range').split("{}");
	$color = $(this).attr('data-color');
	//console.log($var);
	$(".spiegel__voorbeeld").html('<img class="badmeubel" src="assets/img/spiegels/' + $id[0]  + '.png">')
	//$(".wastafel__voorbeeld").append('<img class="wastafel" src="' + $(this).attr('data-item') + '">')
	//loadColors($(this).attr('data-artikel'));		
	//loadWastafels($(this).attr('data-range'), $(this).attr('data-description'));
});*/
$(document).on(ACTION,".slider__materiaal__fontijntje .item", function()
{
	$(".fontijn__voorbeeld").html('');
	$(".step__2 .btnKiesKleur").hide();
	$(".slider__materiaal .item").removeClass('selected');
	$(this).addClass('selected');
	$id = $(this).attr('data-range').split("{}");
	$color = $(this).attr('data-color');
	//console.log($var);

	
	$artikel = $(".slider__fontijn .item.selected").attr('data-id');
	$dataID = $artikel + '.' + $color;
	$("#btn__2").attr('data-id',$dataID).attr('data-tag','<img src="assets/img/fontijntje/meubels-colored/' + $color  + '/' + $id[0]  + '.png">').attr('data-type', 'fontein').fadeIn(300);

	$(".fontijn__voorbeeld").html('<img class="badmeubel" src="assets/img/fontijntje/meubels-colored/' + $color  + '/' + $id[0]  + '.png">')
	//$(".wastafel__voorbeeld").append('<img class="wastafel" src="' + $(this).attr('data-item') + '">')
	//loadColors($(this).attr('data-artikel'));		
	//loadWastafels($(this).attr('data-range'), $(this).attr('data-description'));
});
$(document).on(ACTION,".slider__spiegel__afmeting .item", function()
{
	$(".spiegel__voorbeeld").html('');
	$(".step__5 .btnKiesAfmeting").hide();
	$(".slider__spiegel__afmeting .item").removeClass('selected');
	$(this).addClass('selected');
	$id = $(this).attr('data-id');
	$("#btn__5").attr('data-id',$id).attr('data-tag', '<img class="badmeubel" src="assets/img/spiegels/' + $id  + '.png">').attr('data-type', 'spiegel').fadeIn(300);
	//console.log($var);
	$(".spiegel__voorbeeld").html('<img class="badmeubel" src="assets/img/spiegels/' + $id  + '.png">')
	//$(".wastafel__voorbeeld").append('<img class="wastafel" src="' + $(this).attr('data-item') + '">')
	//loadColors($(this).attr('data-artikel'));		
	//loadWastafels($(this).attr('data-range'), $(this).attr('data-description'));
});


function loadColors($range, $description, $colorsLoaded)
{
	
	//$(".placeholder_slider__meubels__wastafel").fadeOut(500);
	$('.placeholder__slider__meubels__materiaal').fadeOut(0, function()
	{
		

		if($colorsLoaded == 1)
		{
			console.log("UNSET");
			$("#slider__materiaal").slick("unslick");
			$('#slider__materiaal').html('');
		}
		for(i=0;i<$array_colors.length;i++)
		{
			$("#slider__materiaal").append('<div class="item" data-color="' + $array_colors[i] + '" data-range="'+$range + '"  data-description="'+$description + '"><img src="assets/img/badmeubel/colors/' + $array_colors[i] + '.jpg"><p class="txt">' + $array_colors_names[i] + '</p></div>');
		}
		$("#slider__materiaal").slick({
	        slidesToShow: 3,
	        slidesToScroll: 1,
	        variableWidth: true,
	        arrows: false,
	        fade: false,
	        infinite: true,
	        centerMode: true,
	        dots: false,
	        autoplay: false
	    });
	});
	$('.placeholder__slider__meubels__materiaal').fadeIn(500);
}
function loadColorsFontijn($range, $description, $colorsLoaded)
{
	
	//$(".placeholder_slider__meubels__wastafel").fadeOut(500);
	$(".step__2 .nav__step").removeClass('active');
	$(".step__2 .navstep__2").addClass('active');
	$('.placeholder__slider__fontijntje__materiaal').fadeOut(0, function()
	{
		if($colorsLoaded == 1)
		{
			console.log("UNSET");
			$("#slider__materiaal__fontijntje").slick("unslick");
			$('#slider__materiaal__fontijntje').html('');
		}
		for(i=0;i<$array_colors.length;i++)
		{
			$("#slider__materiaal__fontijntje").append('<div class="item" data-color="' + $array_colors[i] + '" data-range="'+$range + '"  data-description="'+$description + '"><img src="assets/img/fontijntje/colors/' + $array_colors[i] + '.jpg"><p class="txt">' + $array_colors_names[i] + '</p></div>');
		}
		$("#slider__materiaal__fontijntje").slick({
	        slidesToShow: 3,
	        slidesToScroll: 1,
	        variableWidth: true,
	        arrows: false,
	        fade: false,
	        infinite: true,
	        centerMode: true,
	        dots: false,
	        autoplay: false
	    });
	});
	$('.placeholder__slider__fontijntje__materiaal').fadeIn(500);
}
function loadColorsSpiegels($ids, $description, $colorsLoaded)
{
	
	//$(".placeholder_slider__meubels__wastafel").fadeOut(500);
    $(".step__5 .nav__step").removeClass('active');
    $(".step__5 .navstep__2").addClass('active');
	$('.placeholder__slider__spiegel__afmeting').fadeOut(0, function()
	{
		$ids = $ids.split("{}");
		$names = $description.split("{}");
		if($colorsLoaded == 1)
		{
			console.log("UNSET");
			$("#slider__spiegel__afmeting").slick("unslick");
			$('#slider__spiegel__afmeting').html('');
		}
		for(i=0;i<$ids.length;i++)
		{
			$("#slider__spiegel__afmeting").append('<div class="item" data-id="'+$ids[i] + '"  data-description="'+$names[i] + '"><img src="assets/img/spiegels/' + $ids[i] + '.png"><p class="txt">' + $names[i] + '</p></div>');
		}
		$("#slider__spiegel__afmeting").slick({
	        slidesToShow: 1,
	        slidesToScroll: 1,
	        variableWidth: true,
	        arrows: false,
	        fade: false,
	        infinite: true,
	        centerMode: true,
	        dots: false,
	        autoplay: false
	    });
	});
	$('.placeholder__slider__spiegel__afmeting').fadeIn(500);
}
function loadWastafels($range, $description)
{
	$('.placeholder_slider__meubels__wastafel').fadeOut(0, function()
	{
		$(".slider__wastafels").html('');
		$split = $range.split("{}");
		$splitDescr = $description.split("{}");
		for(i=0;i<$split.length;i++)
		{
			//console.log($split[i]);
			$(".slider__wastafels").append('<div class="item" data-artikel="MM'+$split[i]+'" data-item="assets/img/badmeubel/wastafels-cropped/' + $split[i] + '.png"><img src="assets/img/badmeubel/wastafels/' + $split[i] + '.png"><p class="txt">' + $splitDescr[i] + '</p></div>');
		}	
    	$('.placeholder_slider__meubels__wastafel').fadeIn(500);
    });
}