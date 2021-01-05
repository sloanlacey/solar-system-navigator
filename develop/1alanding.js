$('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators: true
  });
  setInterval(function(){
    $('.carousel.carousel-slider').carousel('next')
  },4000);

  $(document).ready(function() {
    $('.sidenav').sidenav();
    });

