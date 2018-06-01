function createProjectsTable(jsonPath,elementId) {
  
  var html = '';

  $.getJSON(jsonPath, function(data) {
    $.each(data, function(key, proj){
      html += '<tr>' +
                '<td class="proj-title"><a href="/projects/' + proj.id + '">' + proj.title + '</a></td>' +
                '<td class="proj-theme">' + proj.theme + '</td>' +
                '<td class="proj-country">' + proj.country + '</td>' +
                '<td class="proj-donate">';
                if (proj.money_url || proj.equipment_text || proj.service_text) {
                  
                    if (proj.money_url) { html += '<i class="fa fa-donate"></i>'; }
                    if (proj.equipment_text) { html += '<i class="fa fa-gift"></i>'; }
                    if (proj.service_text) { html += '<i class="fa fa-user-circle"></i>'; }
                 }   
                 html += '</td>';
      html += '</tr>';          
    });
  
    elementId = "#" + elementId;
    $( elementId ).html(html);
  });
}



function addProjectThumbs(jsonPath, title, headline, elementId){

$.getJSON(jsonPath, function(data) {
    
    //filter the data tu see only the entries marked for inclusion in the homepage
    var homepageData = data.filter(function (entry) {
      return entry.on_homepage === 1;
    });
    
	//create section header
	var html = '<div class="container">' +
				'<div class="row">' +
					'<div class="col-lg-12 text-center">' +
						'<h2 class="section-heading text-uppercase">' + title + '</h2>' +
						'<h3 class="section-subheading text-muted">' + headline + '</h3>' +
					'</div>' +
				'</div>';
	//open first row
	html += '<div class="row">';
    
	$.each(homepageData, function(key, proj){
		if (key>0 && key % 3 == 0) {
			html += '</div><div class="row">';	
		}
		html += '<div class="col-md-4 col-sm-12 project-item">' +
				  '<a class="project-link" href="/projects/' + proj.id + '">' +
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
	//close last row, add button, and close the container
	html += '</div>' +
            '<div class="row">' +
              '<div class="col-lg-12 text-center">' +
		        '<a class="btn btn-primary btn-xl text-uppercase js-scroll-trigger" href="projects">Show Me More</a>' +
		      '</div>' +
		    '</div>' +
          '</div>';	
    elementId = "#" + elementId;
    $( elementId ).html(html);
});
}


      
function addTeam(jsonPath, title, headline, elementId, message){
$.getJSON("/team.json", function(data) {
	//create section header
	var html = '<div class="container">' +
				'<div class="row">' +
					'<div class="col-lg-12 text-center">' +
						'<h2 class="section-heading text-uppercase">' + title + '</h2>' +
						'<h3 class="section-subheading text-muted">' + headline + '</h3>' +
					'</div>' +
				'</div>';
    //open first row
	html += '<div class="row">';		
	$.each(data, function(key, member){
		if (key>0 && key % 3 == 0) {
			html += '</div><div class="row">';	
		}
		html += '<div class="col-sm-4">' +
            '<div class="team-member">' +
              '<img class="mx-auto rounded-circle" src="' + member.img_thumb + '" alt="">' +
              '<h4>' + member.name + '</h4>' +
              '<p class="text-muted">' + member.title + '</p>' +
              '<ul class="list-inline social-buttons">';
        if (member.twitter) {
			html += '<li class="list-inline-item">' +
                      '<a href="' + member.twitter + '">' +
                        '<i class="fab fa-twitter"></i>' +
                      '</a>' +
                     '</li>';
		}	
		if (member.facebook) {
            html += '<li class="list-inline-item">' +
                       '<a href="' + member.facebook + '">' +
						  '<i class="fab fa-facebook-f"></i>' +
                       '</a>' +
					'</li>';
		}
        if (member.linkedin) {			
            html += '<li class="list-inline-item">' +
                      '<a href="' + member.linkedin + '">' +
                        '<i class="fab fa-linkedin"></i>' +
                      '</a>' +
                    '</li>';
		}
        html += '</ul>' +
            '</div>' +
          '</div>';
	});
	//close last row and container
	html += '</div>' +
          '</div>' +
          '<div class="row">' +
          '<div class="col-lg-8 mx-auto text-center">' +
            '<p class="large text-muted">' + message + '</p>' +
          '</div>' +
        '</div>';
    elementId = '#' + elementId;
    $(elementId).html(html);
});
}

