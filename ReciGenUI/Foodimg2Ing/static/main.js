const wrapper = document.querySelector(".wrapper");
const fileName = document.querySelector(".file-name");
const defaultBtn = document.querySelector("#default-btn");
const customBtn = document.querySelector("#custom-btn");
const cancelBtn = document.querySelector("#cancel-btn i");
const img = document.querySelector("#foodimage");
const imgform = document.querySelector("#foodimgform");
let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;

// Add animation classes to elements on page load
document.addEventListener('DOMContentLoaded', function() {
  // Add fade-in animation to main container
  const container = document.querySelector('.container');
  if (container) {
    container.classList.add('fade-in');
  }
  
  // Add pulse animation to upload button
  if (customBtn) {
    setTimeout(() => {
      customBtn.classList.add('pulse');
    }, 1000);
  }
  
  // Initialize button hover effects
  initButtonEffects();
});

// Enhanced button click animation
function defaultBtnActive() {
  defaultBtn.click();
  customBtn.classList.add('button-click');
  setTimeout(() => {
    customBtn.classList.remove('button-click');
  }, 300);
}

// Add hover effects to all buttons
function initButtonEffects() {
  const buttons = document.querySelectorAll('button, .btn');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.classList.add('btn-hover');
    });
    button.addEventListener('mouseleave', function() {
      this.classList.remove('btn-hover');
    });
  });
}

// Enhanced file upload with animations
defaultBtn.addEventListener("change", function() {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function() {
      const result = reader.result;
      
      // Fade out the current image if it exists
      if (img.src) {
        img.classList.add('fade-out');
        setTimeout(() => {
          img.src = result;
          img.classList.remove('fade-out');
          img.classList.add('fade-in');
        }, 300);
      } else {
        img.src = result;
        img.classList.add('fade-in');
      }
      
      // Add the active class with a sliding animation
      wrapper.classList.add("active", "slide-up");
      
      // Hide info and show loading with animation
      const infoElement = document.getElementById("info");
      const loadingElement = document.getElementById("loading");
      
      if (infoElement) {
        infoElement.classList.add('fade-out');
        setTimeout(() => {
          infoElement.style.display = "none";
        }, 300);
      }
      
      if (loadingElement) {
        setTimeout(() => {
          loadingElement.style.display = "block";
          loadingElement.classList.add('fade-in');
          
          // Add loading animation
          loadingElement.innerHTML += '<div class="loading-spinner"></div>';
        }, 300);
      }
      
      // Add slight delay before submitting form for better visual feedback
      setTimeout(() => {
        imgform.submit();
      }, 800);
    }
    
    // Enhanced cancel button
    cancelBtn.addEventListener("click", function() {
      img.classList.add('fade-out');
      wrapper.classList.add('slide-down');
      
      setTimeout(() => {
        img.src = "";
        wrapper.classList.remove("active", "slide-up", "slide-down");
        window.location.href = "";
      }, 400);
    });
    
    reader.readAsDataURL(file);
  }
  
  if (this.value) {
    let valueStore = this.value.match(regExp);
    
    // Animate file name appearance
    fileName.textContent = "";
    fileName.classList.add('typing-effect');
    
    // Type-writer effect for filename
    const textToType = valueStore;
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < textToType.length) {
        fileName.textContent += textToType[i];
        i++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          fileName.classList.remove('typing-effect');
        }, 500);
      }
    }, 50);
  }
});

// Enhanced tab switching with animations
function myFunctab1() {
  const tab1 = document.getElementById("tab1");
  const tab2 = document.getElementById("tab2");
  
  if (tab2 && tab2.style.display !== "none") {
    tab2.classList.add('slide-out-right');
    
    setTimeout(() => {
      tab2.style.display = "none";
      tab2.classList.remove('slide-out-right');
      
      tab1.style.display = "block";
      tab1.classList.add('slide-in-left');
      
      setTimeout(() => {
        tab1.classList.remove('slide-in-left');
      }, 500);
    }, 300);
  }
  
  document.getElementById("tabbtn2").className = "nav-link";
  document.getElementById("tabbtn1").className = "nav-link active";
}

function myFunctab2() {
  const tab1 = document.getElementById("tab1");
  const tab2 = document.getElementById("tab2");
  
  if (tab1 && tab1.style.display !== "none") {
    tab1.classList.add('slide-out-left');
    
    setTimeout(() => {
      tab1.style.display = "none";
      tab1.classList.remove('slide-out-left');
      
      tab2.style.display = "block";
      tab2.classList.add('slide-in-right');
      
      setTimeout(() => {
        tab2.classList.remove('slide-in-right');
      }, 500);
    }, 300);
  }
  
  document.getElementById("tabbtn1").className = "nav-link";
  document.getElementById("tabbtn2").className = "nav-link active";
}

// Enhanced sample image selection
function select(filename) {
  // Add zoom and fade effect when selecting sample image
  const modalImage = event.target.closest('.card').querySelector('img');
  if (modalImage) {
    modalImage.classList.add('image-selected');
  }
  
  setTimeout(() => {
    img.src = "/static/images/" + filename;
    img.classList.add('fade-in-zoom');
    
    setTimeout(() => {
      img.classList.remove('fade-in-zoom');
    }, 700);
    
    wrapper.classList.add("active", "slide-up");
    
    const infoElement = document.getElementById("info");
    const loadingElement = document.getElementById("loading");
    
    if (infoElement) {
      infoElement.classList.add('fade-out');
      setTimeout(() => {
        infoElement.style.display = "none";
      }, 300);
    }
    
    if (loadingElement) {
      setTimeout(() => {
        loadingElement.style.display = "block";
        loadingElement.classList.add('fade-in');
      }, 300);
    }
    
    document.getElementById("close").click();
  }, 400);
}

// Add pulsing animation to sample button
const sampleButton = document.getElementById("buttonsample");
if (sampleButton) {
  setInterval(() => {
    sampleButton.classList.add('subtle-pulse');
    setTimeout(() => {
      sampleButton.classList.remove('subtle-pulse');
    }, 1000);
  }, 5000);
}

// Add modal animation
const modal = document.getElementById("myModal");
if (modal) {
  modal.addEventListener('show.bs.modal', function() {
    this.classList.add('modal-fade-in');
    
    // Add staggered entrance for cards
    setTimeout(() => {
      const cards = document.querySelectorAll('.modal .card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('card-slide-in');
        }, index * 100);
      });
    }, 200);
  });
  
  modal.addEventListener('hide.bs.modal', function() {
    this.classList.add('modal-fade-out');
    setTimeout(() => {
      this.classList.remove('modal-fade-in', 'modal-fade-out');
    }, 300);
  });
}