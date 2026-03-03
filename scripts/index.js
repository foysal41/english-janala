const createElement = (arr) =>{
    const htmlElements = arr.map((el)=> `<span class="btn"> ${el}</span>`)
    return(htmlElements.join(" "))
}

const manageSpinner=(status)=>{
    if(status == true){
        document.getElementById("spinner").classList.remove('hidden')
        document.getElementById("word-container").classList.add('hidden')
    }else{
         document.getElementById("word-container").classList.remove('hidden')
        document.getElementById("spinner").classList.add('hidden')
    }
}


const leadLessons=()=>{
    url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url)
    .then(res=>res.json())
    .then(json=>displayLesson(json.data))
}

const loadLevelWord=(id)=>{
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res=>res.json())
    .then(words=>{ 
        removeActive(); // remove all active class
        const clickBtn = document.getElementById(`lesson-btn-${id}`)
        // console.log(clickBtn)
        clickBtn.classList.add('active');// add active class
        displayLevelWord(words.data)})
}

const removeActive=()=>{
    const lessionButtons = document.querySelectorAll(".lesson-btn")
    // console.log(lessionButtons)
    lessionButtons.forEach(btn=>btn.classList.remove('active'))
}

const loadWordDetails=async (id)=>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    
    const res = await fetch(url);
    const details = await res.json();
displayWordDetails(details.data)
}


const displayWordDetails=(details)=>{
    console.log(details);
    const detailsBox = document.getElementById('details-container');
    detailsBox.innerHTML = `
                <div class="">
            <h2 class="text-2xl font-bold">${details.word} ( <i class="fa-solid fa-microphone-lines"></i> :${details.pronunciation})</h2>

        </div>

         <div class="">
            <h2 class="text-2xl font-bold">Meaning </h2>
            <p class="font-bangla">${details.meaning}}</p>
        </div>

         <div class="">
            <h2 class="text-2xl font-bold">Example </h2>
            <p>${details.sentence}</p>
        </div>

        <div class="">
            <h2 class="text-2xl font-bold font-bangla">সমার্থক শব্দ গুলো </h2>
            <div class="" >${createElement(details.synonyms)}</div>
        </div>
    `

    document.getElementById('my_modal_5').showModal();
}

const displayLevelWord=(words)=>{

    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    if(words.length === 0){
        wordContainer.innerHTML = `
     <div class="text-center  col-span-full rounded-xl py-10 space-y-6 bangla-font">
     <img class="mx-auto" src="../assets/alert-error.png" alt="" />
        <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
    </div>       

        `
        manageSpinner(false)
        return;
    }

    words.forEach(word=>{
        const card = document.createElement('div');
        card.innerHTML = `
                    <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl ">${word.word ? word.word : "শব্দ পাওয়া জায়নি" }</h2>
            <p class="font-semibold">${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া জায়নি " }</p>
            <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "আরথ পাওয়া জায়নি"}"</div>

            <div class="flex justify-between items-center">
                <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80] "><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `

        wordContainer.appendChild(card)
    });
    manageSpinner(false)
}



const displayLesson=(lessons)=>{
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';

    for(let lesson of lessons){
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `
                    <button id="lesson-btn-${lesson.level_no}"  onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
                    <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
        `

          levelContainer.appendChild(btnDiv);

    }


      


}

leadLessons()


