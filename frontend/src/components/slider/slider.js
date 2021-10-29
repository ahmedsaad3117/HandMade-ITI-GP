import sliderImgOne from '../../images/sliderImages/sliderImage1.jpg'
import sliderImgTwo from '../../images/sliderImages/sliderImage2.jpg'
import sliderImgThree from '../../images/sliderImages/sliderImage3.jpg'

import './slider.css'
export function Slider(){
    return(
        <>
            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={sliderImgOne} class="d-block w-100" alt="Slider Image"></img>
      
    </div>
    <div class="carousel-item">
        <img src={sliderImgTwo} class="d-block w-100" alt="Slider Image"></img>
    </div>
    <div class="carousel-item">
        <img src={sliderImgThree} class="d-block w-100" alt="Slider Image"></img>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
        
        </>
    )
}