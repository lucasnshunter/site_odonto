
jQuery.preloadImages = function()
{
	for(var i = 0; i<arguments.length; i++)
	{
		jQuery("<img>").attr("src", arguments[i]);
	}
}

function getLogoLeftCoord($j) {
  return $j('#logo').offset().left;
}

function setLeftCoords($j) {
    var leftCoord = Math.round(parseFloat(getLogoLeftCoord($j)));
    var bonecoCoord = leftCoord + 770;
    var planosCoord = leftCoord + 20;
    $j('#boneco_home').css('left', bonecoCoord + 'px');
    $j('#planos').css('left', planosCoord + 'px');
    $j('.flutuante').each(function(){
        var original_left = jQuery(this).data('left');
        var new_left = parseFloat(getLogoLeftCoord(jQuery)) + parseFloat(original_left);
        new_left = Math.round(new_left) + 'px';
        $j(this).css({left: new_left});
    });  
}

function initBannerHome($j) {
  $j('.banner_home img').each(function(){
    var hover_src = jQuery(this).attr('title');
    var image = new Image();
    image.src = hover_src;
    jQuery(this)
      .data('hover_src',hover_src)
      .data('original_src',jQuery(this).attr('src'))
      .attr('title','')
      .hover(
        function () {
          jQuery(this).attr('src',jQuery(this).data('hover_src'));
        }, 
        function () {
          jQuery(this).attr('src',jQuery(this).data('original_src'));
        });
  });
}
function initFlutuante($j) {
  $j('.flutuante').each(function(){
      var top = $j(this).css('top');
      var left = $j(this).css('left');
      var new_left = parseFloat(left) + parseFloat(getLogoLeftCoord($j));
      new_left = Math.round(new_left) + 'px';
      $j(this)
        .data('top',top)
        .data('left',left)
        .css({left: new_left, display: 'block'});
  });
}

function saveElementPosition(event, ui) {
  var left = Math.round(parseFloat(jQuery(this).offset().left));
  var top = Math.round(parseFloat(jQuery(this).offset().top));
  
  var site_left_coord = Math.round(parseFloat(getLogoLeftCoord(jQuery)));
  left = left - site_left_coord;
  var id = this.getAttribute('id').split('_');
  id = id[1];
  jQuery.ajax({
      type: "POST",
      url: "/index.php",
      data: "action=saveElementPosition&id="+id+"&left="+left+"&top="+top,
      success: function(msg) {
        //alert( "Data Saved: " + msg );
      },
      error: function(){
        alert('Não foi possível salvar esta posição pois a requisição falhou');
      }
  });

}

function valignPortifolioImg($j) {
  $j('.mod_titulo_texto_imagem.portifolio, .mod_titulo_texto_imagem.portifolio_sem_modifique').each(function(){
      var wrapper_height = parseFloat($j(this).find('.wrapper').css('height'));
      var img_height = parseFloat($j(this).find('.img').css('height'));
      var selo_margin_top = parseFloat($j(this).find('.selo').css('marginTop'));
      if (wrapper_height > img_height) {
        var margin_top = Math.round((wrapper_height - img_height) / 2);
        selo_margin_top = selo_margin_top + margin_top;
        $j(this).find('.img').css({marginTop: margin_top + 'px'});
        $j(this).find('.selo').css({marginTop: selo_margin_top + 'px'});
      }
  });
}

function enableDrag() { jQuery(".flutuante").css({cursor: 'pointer'}).draggable({stop: saveElementPosition }); }
function disableDrag() { jQuery(".flutuante").css({cursor: 'normal'}).draggable('destroy'); }

jQuery.noConflict();
jQuery(document).ready(function(){
  $j = jQuery;

//  $j('#main_banner')
//   .css({ backgroundPosition: '-10px 0px' })
//   .animate({ backgroundPosition: '(10px 0px)' }, 1000);
  
  initFlutuante($j);
  initBannerHome($j);

  setLeftCoords($j);
  $j(window).resize(function(){
      setLeftCoords(jQuery)
  });
  
  valignPortifolioImg($j);
  
  // Insere evento de click nas imagens flutuantes vHost
  jQuery('#elemento_119 img, #elemento_142 img, #elemento_162 img, #elemento_169 img').css('cursor','pointer').toggle(function(){replay(1);},function(){stopSpeech();});
  
  jQuery('#formBuscaFaq .submitBtn').hover(
      function(){jQuery(this).attr({src: '/image/site/btn_ok_verde.jpg'})}
     ,function(){jQuery(this).attr({src: '/image/site/btn_ok.jpg'})}
  );
  
  jQuery('#login_form img').click(function(){
      jQuery(this).parents('form:first').submit();
  });
  

});
