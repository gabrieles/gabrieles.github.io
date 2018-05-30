(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 56
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Hide navbar when modals trigger
  $('.portfolio-modal').on('show.bs.modal', function(e) {
    $(".navbar").addClass("d-none");
  })
  $('.portfolio-modal').on('hidden.bs.modal', function(e) {
    $(".navbar").removeClass("d-none");
  })

})(jQuery); // End of use strict


function addProjectThumbs(){
$.getJSON("/projects/projects.json", function(data) {
	//create section header
	var html = '<div class="container">' +
				'<div class="row">' +
					'<div class="col-lg-12 text-center">' +
						'<h2 class="section-heading text-uppercase">Projects</h2>' +
						'<h3 class="section-subheading text-muted">The latest projects from our amazing community:</h3>' +
					'</div>' +
				'</div>';
	//open first row
	html += '<div class="row">';		
	$.each(data, function(key, proj){
		if (key>0 && key % 3 == 0) {
			html += '</div><div class="row">';	
		}
		html += '<div class="col-md-4 col-sm-6 project-item">' +
				'<a class="project-link" href="' + proj.url + '">' +
				'<div class="project-hover">' +
                '<div class="project-hover-content">' +
					'<i class="fa fa-plus fa-3x"></i>' +
                '</div>' +
				'</div>' +
				'<img class="img-fluid" src="' + proj.img_thumb + '" alt="">' +
				'</a>' +
				'<div class="project-caption">' +
				'<h4>' + proj.short_title + '</h4>' +
				'<p class="text-muted">' + proj.headline + '</p>' +
				'</div>' +
				'</div>';
	});
	//close last row and container
	html += '</div></div>';	
    $('#project').html(html);
});
}