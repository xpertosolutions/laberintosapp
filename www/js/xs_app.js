// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var xs_url_lista = "http://www.laberintos.com.ec/web/index.php/galeria/lista_ajax/?output=ajax";
var xs_url_item = "http://www.laberintos.com.ec/web/index.php/galeria/item_ajax/?output=ajax";

//window.open = cordova.InAppBrowser.open;

var GALERIAS = {};
// Initialize app
var app = new Framework7({
    root: '#app', // App root element
    id: 'ec.com.laberintos.appx', // App bundle ID
    name: 'LaberintosApp', // App name
    theme: 'auto', // Automatic theme detection
    routes:[
			{
        path: '/',
        url: './index.html',
        options: {
            history:true,
            animate:true
        }
      },
        {
        path: '/about/',
        url: './about.html',
        options: {
            history:true,
            animate:true
        }
      },
        {
        path: '/galerias/',
        url: './galerias.html',
        options: {
            history:true,
            animate:true
        }
      },
			{
        path: '/contacto/',
        url: './contacto.html',
        options: {
            history:true,
            animate:true
        }
      }
		],
		data: function () {

		},
		methods: {
			getGalerias: function(){

				/*

				*/
			}
		},
		on: {
			init: function () {

			}
		}
});



// Init/Create views
var homeView = app.views.create('#view-home', {
  url: '/'
});
var galeriasView = app.views.create('#view-galerias', {
  url: '/galerias/'
});
var aboutView = app.views.create('#view-about', {
  url: '/about/'
});
var contactoView = app.views.create('#view-contacto', {
  url: '/contacto/'
});


$$('img.lazy').trigger('lazy');

$$(document).on('page:init', function (e, page) {
  //console.log(page.name);
	if(page.name=="galerias"){

		app.preloader.show();
		app.request.json(xs_url_lista, function (data) {

            GALERIAS = data.items;
			jQuery.each(data.items, function(i, galeria){
				//$('#xs_lista_galerias_div').append('<li><a href="#" class="item-link item-content link popup-open" data-popup=".popup-galeria-item" data-id="'+galeria.galeria_id+'"><div class="item-media" style="max-width:50px;">'+galeria.galeria_imagen_intro+'</div><div class="item-inner"><div class="item-title-row"><div class="item-title">' + galeria.galeria_titulo + '</div></div></div></a></li>');

                $('#xs_lista_galerias_div').append('<li><a href="#" class="item-link item-content link popup-open" data-popup=".popup-galeria-item" data-id="'+galeria.galeria_id+'"><div class="card"><div class="card-header">' + galeria.galeria_nombre + '</div><div class="card-content card-content-padding">'+galeria.galeria_imagen_intro + galeria.galeria_descripcion_intro + '</div><div class="card-footer">' + galeria.galeria_fecha_creacion + '</div></div></a></li>');

			});

            $$(".link.popup-open").on("click", function(ev){
                ev.stopImmediatePropagation();
                app.preloader.show();
                var galeria_id = $$(this).attr("data-id");
                $$("#xs_galeria_item_titulo").html("");
                $$("#xs_galeria_item_detalle").html("");

                xs_url_item = xs_url_item + '&galeria_id='+galeria_id;

                app.request.json(xs_url_item, function (data) {
                    $$("#xs_galeria_item_titulo").html(data.galeria_nombre);
                    $$("#xs_galeria_item_detalle").html(data.galeria_descripcion_intro);
                    app.preloader.hide();
                });


            });

            app.preloader.hide();

		});

	}






});

$$(document).on('backbutton', function (e) {
    var this_view = app.views.current;
    this_view.router.back();

});

$$('.toolbar .tab-link').on('click', function(e){
    //e.preventDefault();
    $$('.toolbar .tab-link').removeClass("tab-link-active");
    $$(this).addClass("tab-link-active");
    app.toolbar.setHighlight('.toolbar');
});

$$('a.panel-close').on('click', function(e){
    //e.preventDefault();
    var link_id = $$(this).attr("id");
    var name_arr = link_id.split("-");
    var name_componente = name_arr[1];
    //app.dialog.alert(name_componente);
    $$('#tablink-' + name_componente ).click();
    app.toolbar.setHighlight('.toolbar');
});




$(document).on('click', 'a[href^="http"]', function (e) {
    if (e.target.tagName === 'A' &&
        e.target.href.match(/^https?:\/\//)) {
        e.preventDefault();
        window.open(e.target.href, '_system');
    }
});
