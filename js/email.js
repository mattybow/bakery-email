$(document).ready(function(){

	$('#resume-submit').on('click',function(e){
		e.stopPropagation();
		e.preventDefault();

		var files = document.getElementById('resume-file-input').files;
		var fd = new FormData();    
		fd.append( 'resume', files[0] );
		fd.append( 'firstName',$('#resume-first').val());
		fd.append( 'lastName',$('#resume-last').val());
		fd.append( 'email',$('#resume-email').val());
		fd.append( 'text',$('#resume-textbox').val());
		$.ajax( {
	      url: 'email',
	      type: 'POST',
	      data: fd,
	      processData: false,
	      contentType: false,
	      success:function(){
	      	alert('success');
	      }
	    } );
	});
});