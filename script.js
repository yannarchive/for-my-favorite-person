function startJourney(){

  if(!playing){
    toggleMusic();
  }
  
    const loading = document.getElementById("loading");

    loading.classList.add("show");
    
    document.body.style.overflowY = "auto";

    setTimeout(()=>{

        loading.classList.remove("show");

        document.getElementById("landing").style.display = "none";

        document.getElementById("website").style.display = "block";
 
        document.getElementById("welcome").scrollIntoView({

            behavior:"smooth"

        });

    },2300);

}

const cards = document.querySelectorAll(".reveal");

function revealCards(){

    const trigger = window.innerHeight * .85;

    cards.forEach(card=>{

        const top = card.getBoundingClientRect().top;

        if(top < trigger){

            card.classList.add("show");

        }

    });

}

window.addEventListener("scroll",revealCards);

revealCards();

// ===========================
// PART 9
// ===========================

function openEnding(){

document
.getElementById("endingLetter")
.classList.add("show");

setTimeout(()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

},50000);

}

// ===========================
// MUSIC
// ===========================

const music=document.getElementById("bgMusic");

const musicBtn=document.getElementById("musicBtn");

let playing=false;

function toggleMusic(){

if(playing){

music.pause();

musicBtn.classList.remove("playing");

playing=false;

}

else{

music.play();

musicBtn.classList.add("playing");

playing=true;

}

}

const photos = document.querySelectorAll(".photo-card img");

const lightbox = document.getElementById("lightbox");

const lightboxImg = document.getElementById("lightbox-img");

const nextBtn = document.querySelector(".next-photo");

const prevBtn = document.querySelector(".prev-photo");

const closePhotoBtn = document.querySelector(".close-lightbox");

closePhotoBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    lightbox.classList.remove("show");
});

let currentPhoto = 0;

photos.forEach((photo,index)=>{

    photo.addEventListener("click",()=>{

        currentPhoto = index;

        showPhoto();

        lightbox.classList.add("show");

    });

});

function showPhoto(){

    lightboxImg.src = photos[currentPhoto].src;

}

nextBtn.addEventListener("click",(e)=>{

    e.stopPropagation();

    currentPhoto++;

    if(currentPhoto>=photos.length){

        currentPhoto=0;

    }

    showPhoto();

});

prevBtn.addEventListener("click",(e)=>{

    e.stopPropagation();

    currentPhoto--;

    if(currentPhoto<0){

        currentPhoto=photos.length-1;

    }

    showPhoto();

});

let startX = 0;

lightbox.addEventListener("touchstart",(e)=>{

    startX = e.touches[0].clientX;

});

lightbox.addEventListener("touchend",(e)=>{

    let endX = e.changedTouches[0].clientX;

    let distance = startX - endX;

    if(distance > 50){

        currentPhoto++;

        if(currentPhoto >= photos.length){

            currentPhoto = 0;

        }

        showPhoto();

    }

    else if(distance < -50){

        currentPhoto--;

        if(currentPhoto < 0){

            currentPhoto = photos.length - 1;

        }

        showPhoto();

    }

});

lightbox.addEventListener("click",(e)=>{

    if(e.target === lightbox){

        lightbox.classList.remove("show");

    }

});

// =====================
// LETTER V3
// =====================

const envelope = document.getElementById("envelope");
const overlay = document.getElementById("letterOverlay");
const letterPaper = document.getElementById("letterPaper");
const closeLetter = document.getElementById("closeLetter");

envelope.addEventListener("click", () => {

    envelope.classList.add("open");

    overlay.classList.add("show");

    letterPaper.classList.add("show");

    document.body.style.overflow = "hidden";
  
    startLetter();

});

closeLetter.addEventListener("click",()=>{

    envelope.classList.remove("open");

    overlay.classList.remove("show");

    letterPaper.classList.remove("show");

    document.body.style.overflow="auto";

    paragraphs.forEach(p=>{

        p.classList.remove("show");

    });

});

// ======================
// TYPEWRITER
// ======================

const paragraphs = document.querySelectorAll(".typewriter");

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startLetter(){

    for(const p of paragraphs){

        const originalText = p.textContent.trim();

        p.textContent = "";
        p.classList.add("show");

        for(let i=0;i<originalText.length;i++){

            p.textContent += originalText[i];

            await sleep(25);

        }

        await sleep(2500);

    }

}
// =====================
// FULL PAGE SWIPE
// =====================

const sections = Array.from(
    document.querySelectorAll("#website > section")
);

let currentSection = 0;
let touchStartY = 0;
let touchStartTime = 0;
let isSwiping = false;

function goToSection(index) {

    if (index < 0 || index >= sections.length) return;

    currentSection = index;

    sections[index].scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// =====================
// TOUCH SWIPE
// =====================

document.addEventListener("touchstart", (e) => {

    if (e.touches.length !== 1) return;

    touchStartY = e.touches[0].clientY;
    touchStartTime = Date.now();

    isSwiping = true;

}, { passive: true });


document.addEventListener("touchend", (e) => {

    if (!isSwiping) return;

    isSwiping = false;

    const touchEndY = e.changedTouches[0].clientY;

    const target = e.target;

if (
    target.closest("#things") ||
    target.closest(".letter-paper") ||
    target.closest(".gallery") ||
    target.closest(".why")
) {
    return;
}
    const distance = touchStartY - touchEndY;

    const duration = Date.now() - touchStartTime;

    const screenHeight = window.innerHeight;

    // Minimal swipe
    const threshold = screenHeight * 0.20;

    // Swipe terlalu cepat/panjang tetap dianggap valid
    const isFastSwipe = duration < 500 && Math.abs(distance) > 50;

    if (Math.abs(distance) < threshold && !isFastSwipe) {
        return;
    }


    // Swipe ke atas → section berikutnya
    if (distance > 0) {

        goToSection(currentSection + 1);

    }

    // Swipe ke bawah → section sebelumnya
    else {

        goToSection(currentSection - 1);

    }

}, { passive: true });


// =====================
// SYNC SECTION POSITION
// =====================

window.addEventListener("scroll", () => {

    if (isSwiping) return;

    let closestIndex = 0;
    let closestDistance = Infinity;

    sections.forEach((section, index) => {

        const distance = Math.abs(
            section.getBoundingClientRect().top
        );

        if (distance < closestDistance) {

            closestDistance = distance;
            closestIndex = index;

        }

    });

    currentSection = closestIndex;

}, { passive: true });

// =====================
// WHY YOU - PASTEL SCRAPBOOK
// =====================

const whySection = document.querySelector(".why");

const reasonNotes = Array.from(
    document.querySelectorAll(".reason")
);

const finalNote = document.querySelector(".why-final");

// Tulisan yang terlihat sebelum note dibuka
const noteHints = [
    "A little reason... ♡",
    "Something about you...",
    "A tiny piece of my heart",
    "Tap to discover ♡"
];

reasonNotes.forEach((note, index) => {

    // Buat tulisan pengantar otomatis
    const hint = document.createElement("div");
    hint.className = "note-hint";
    hint.textContent = noteHints[index] || "Tap to discover ♡";

    note.appendChild(hint);

    note.addEventListener("click", () => {

        // Buka atau tutup isi note
        note.classList.toggle("is-open");

        // Tandai bahwa note ini sudah pernah dibuka
        note.dataset.opened = "true";

        // Final Note muncul setelah semua pernah dibuka
        const allOpened = reasonNotes.every(
            item => item.dataset.opened === "true"
        );

        if (allOpened && whySection) {
            setTimeout(() => {
                whySection.classList.add("show-final");
            }, 350);
        }
    });
});

// Final Note bisa diketuk untuk mengulang
if (finalNote) {
    finalNote.addEventListener("click", () => {

        finalNote.classList.add("final-used");

        setTimeout(() => {

            reasonNotes.forEach(note => {
                note.classList.remove("is-open");
                delete note.dataset.opened;
            });

            whySection.classList.remove("show-final");
            finalNote.classList.remove("final-used");

        }, 650);
    });
}

//disinii

const cardsScroller = document.querySelector(".cards-scroll");

if (cardsScroller) {
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                cardsScroller.querySelectorAll(".card").forEach(card => {
                    card.classList.remove("is-active");
                });

                entry.target.classList.add("is-active");
            }
        });
    }, {
        root: cardsScroller,
        threshold: 0.55
    });

    cardsScroller.querySelectorAll(".card").forEach(card => {
        cardObserver.observe(card);
    });
}

