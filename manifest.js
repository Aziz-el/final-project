async function GetData() {
    let data = {}
    try {
        let categories = await fetch("https://79640b006f96af9e.mokky.dev/categories")
        let foods = await fetch("https://79640b006f96af9e.mokky.dev/foods")

        let jsonOfcat = await categories.json()
        let jsonOffood = await foods.json()

        data["categories"] = jsonOfcat
        data["foods"] = jsonOffood
    } catch (error) {
        console.log("Error in MockAPi");
    }
    return data
}


function CreateAndAddCategoriesAndFoods(data) {
    let categories = data["categories"]
    let foods = data["foods"]

    let categoriesDiv = document.getElementById("categories")
    let arrayforH1 = []

    for (cat of categories) {
        let h1 = document.createElement("p")
        h1.classList.add("text-[20px]")
        h1.textContent = cat.name
        h1.id = `H1ForCategory-${cat.id}`
        arrayforH1.push(h1)
        h1.addEventListener('click', (e) => {
            window.scrollTo({
                top: document.getElementById(`category-${e.currentTarget.id.split("-")[1]}`).offsetTop - 100
            })
            e.currentTarget.classList.add("relative", "before:absolute", "before:content-['']", "before:w-[100%]", "before:h-[10%]", "before:bottom-[0px]", "before:bg-[#584213]")
            arrayforH1.filter(el => el.id != e.currentTarget.id).forEach(el => el.classList.remove("relative", "before:absolute", "before:content-['']", "before:w-[100%]", "before:h-[10%]", "before:bottom-[0px]", "before:bg-[#584213]"))
        });
        categoriesDiv.appendChild(h1)

        let menu = document.getElementById("menu")
        let choose = document.createElement("div")
        choose.innerHTML = `<h2 class="text-[26px] font-bold mb-5">${cat.name}</h2>`
        choose.classList.add("mb-[50px]")

        let foodsDiv = document.createElement("div")
        foodsDiv.id = `category-${cat.id}`
        foodsDiv.classList.add("flex", "flex-wrap", "gap-[20px]")
        for (f of foods) {
            if (f.categoryId == cat.id) {
                let food = `
                <div class="food w-[350px] h-[400px] flex flex-col items-start bg-[#FFFFFF] rounded-3xl gap-2" id = "food${f.id}">
                            <div class="imageForfood w-[350px] h-[250px] overflow-hidden relative rounded-tl-3xl rounded-tr-3xl">
                                <img src="${f.img}" style="width: 100%; height: 100%;" alt="" >
                            </div>
                            <h1 class="ml-5 font-bold text-[17px]">${f.name}</h1>
                            <span class="ml-5 text-[14px] text-[#A6A6A6]"><span>${f.mass} гр.</span> | <span>${f.kalories} ккал</span></span>
                            <h3 class="ml-5 font-bold text-[17px]">${f.price}сом</h3>
                            <div class="btns flex gap-4 justify-between w-full pb-3 px-3">
                                                                <button id="btnforFood-${f.id}" onclick="GetData().then((data)=>details(${f.id},data))" class="bg-[#584213] w-full text-[#FFFFFF] font-bold p-3 rounded-2xl px-[30px]">Подробнее</button>
                                ${f.favorite ? `<button id="FaveriteforFood-${f.id}" onclick="GetData().then((data)=>addFavorite(${f.id},data))"  class="border-[2px] bg-[#584213] rounded-3xl p-4 "><img src="./images/heard.svg" alt="" width="20" height="20"></button>` : `<button id="FaveriteforFood-${f.id}" onclick="GetData().then((data)=>addFavorite(${f.id},data))"  class="border-[2px] border-[#584213] rounded-3xl p-4 "><img src="./images/like.svg" alt="" width="20" height="20"></button>`}
                            </div>
                        </div>`
                foodsDiv.innerHTML += food
            }
        }

        choose.appendChild(foodsDiv)
        menu.appendChild(choose)
    }

}
function Update(searching,data) {

    if (searching != "") {
        var foods = data["foods"].filter(el => el.name.includes(`${searching[0].toUpperCase()}${searching.slice(1, -1)}`))
        var categories = data["categories"].filter(el => foods.find(food => food.categoryId == el.id))
    } else {
        var categories = data["categories"]
        var foods = data["foods"]
    }
    let categoriesDiv = document.getElementById("categories")
    categoriesDiv.innerHTML = ""
    let arrayforH1 = []

    let menu = document.getElementById("menu")

    menu.innerHTML = ""
    for (cat of categories) {

        let h1 = document.createElement("p")
        h1.classList.add("text-[20px]")
        h1.textContent = cat.name
        h1.id = `H1ForCategory-${cat.id}`
        arrayforH1.push(h1)

        h1.addEventListener('click', (e) => {
            window.scrollTo({
                top: document.getElementById(`category-${e.currentTarget.id.split("-")[1]}`).offsetTop - 100
            })
            e.currentTarget.classList.add("relative", "before:absolute", "before:content-['']", "before:w-[100%]", "before:h-[10%]", "before:bottom-[0px]", "before:bg-[#584213]")
            arrayforH1.filter(el => el.id != e.currentTarget.id).forEach(el => el.classList.remove("relative", "before:absolute", "before:content-['']", "before:w-[100%]", "before:h-[10%]", "before:bottom-[0px]", "before:bg-[#584213]"))
        });

        categoriesDiv.appendChild(h1)


        let choose = document.createElement("div")

        choose.innerHTML = `<h1 class="text-[26px] font-bold mb-5">${cat.name}</h1>`
        choose.classList.add("mb-[50px]")

        let foodsDiv = document.createElement("div")
        foodsDiv.id = `category-${cat.id}`
        foodsDiv.classList.add("flex", "flex-wrap", "gap-[20px]")
        for (f of foods) {
            if (f.categoryId == cat.id) {
                let food = `
                <div class="food w-[350px] h-[400px] flex flex-col items-start bg-[#FFFFFF] rounded-3xl gap-2" id = "food${f.id}">
                            <div class="imageForfood w-[350px] h-[250px] overflow-hidden relative rounded-tl-3xl rounded-tr-3xl">
                                <img src="${f.img}" alt="" class="absolute bottom-[-40px]">
                            </div>
                            <h1 class="ml-5 font-bold text-[17px]">${f.name}</h1>
                            <span class="ml-5 text-[14px] text-[#A6A6A6]"><span>${f.mass} гр.</span> | <span>${f.kalories} ккал</span></span>
                            <h3 class="ml-5 font-bold text-[17px]">${f.price}сом</h3>
                            <div class="btns flex gap-4 justify-between w-full pb-3 px-3">
                                <button id="btnforFood-${f.id}" onclick="GetData().then((data)=>details(${f.id},data))" class="bg-[#584213] text-[#FFFFFF] w-full font-bold p-3 rounded-2xl px-[30px]">Подробнее</button>
                                ${f.favorite ? `<button id="FaveriteforFood-${f.id}" onclick="GetData().then((data)=>addFavorite(${f.id},data))" class="border-[2px] bg-[#584213] rounded-3xl p-4 "><img src="./images/heard.svg" alt="" width="20" height="20"></button>` : `<button id="FaveriteforFood-${f.id}" onclick=" GetData().then((data)=>addFavorite(${f.id},data))" class="border-[2px] border-[#584213] rounded-3xl p-4 "><img src="./images/like.svg" alt="" width="20" height="20"></button>`}
                            </div>
                        </div>`
                foodsDiv.innerHTML += food
            }
        }
        choose.appendChild(foodsDiv)
        menu.appendChild(choose)
    }
}
function search() {
    let labelForSearch = document.getElementById("formForSearch")
    labelForSearch.addEventListener("keyup", (e) => {
        let input = document.getElementById("inputForSearch")
        let val = input.value.length
        if (val < 2) {
            GetData().then((data1)=>Update("",data1))
        } else {
            GetData().then((data1)=>Update(input.value,data1))
        }
    })
}
GetData().then((data) => CreateAndAddCategoriesAndFoods(data))
search()

function openFavModal() {
    let btn = document.getElementById("btnForFav")
    let modal = document.getElementById("favorite-model")
    btn.addEventListener("click", (e) => {
        modal.style.display ="flex"
        modal.style.bottom = "0px"
        document.body.classList.toggle("overflow-hidden")
    })
}
openFavModal()

function closeFavModal() {
    let btnForclose = document.getElementById("closeFavModal")
    let modal = document.getElementById("favorite-model")
    btnForclose.addEventListener("click", (e) => {
        document.body.classList.toggle("overflow-hidden")
        modal.style.display = modal.style.display=="none"?"block":"none"
        console.log(1);
        
    })
}
closeFavModal()
function ViewsFav(data) {
    var foods = data["foods"].filter(el=>el.favorite)

    let favs = document.getElementById("favs")

    favs.innerHTML = ""
    let foodsDiv = document.createElement("div")
    foodsDiv.classList.add("flex", "flex-col", "gap-[20px]")

    let countAndSum = document.createElement("div")
    countAndSum.classList.add("flex","justify-between")

    countAndSum.innerHTML =`<h1>${foods.length} блюд</h1> <h1>${foods.reduce((acc,el)=>acc+=el.price,0)} com`
    foodsDiv.appendChild(countAndSum)
    for (f of foods) {
        let food = `
                <div class="foodfav h-[100px] max-w-[800px] flex items-center justify-between bg-[#FFFFFF] rounded-3xl gap-2" id = "foodFav${f.id}">
                            <div class="flex items-center">
                            <div class="imageForfoodfav w-[100px] h-[100px] overflow-hidden relative rounded-bl-xl rounded-tl-xl">
                                <img src="${f.img}" alt="" class="absolute bottom-[-40px]">
                            </div>
                            <div class="flex flex-col gap-4">
                                    <h1 class="ml-5 font-bold text-[15px]">${f.name}</h1>
                                    <h3 class="ml-5 font-bold text-[15px]">${f.price}сом</h3>
                                </div>
                                </div>
                            <div class="btns">
                            <button class="display:none"></buttom>
                            <button id="FaveriteforFood-${f.id}" onclick="GetData().then((data)=>addFavorite(${f.id},data))"  class="border-[2px] bg-[#584213] rounded-3xl p-4 "><img src="./images/heard.svg" alt="" width="20" height="20"></button>
                            </div>
                        </div>`
            foodsDiv.innerHTML += food

    }
    favs.appendChild(foodsDiv)
}
GetData().then((data1)=>ViewsFav(data1))

async function addFavorite(FoodId,data) {
    let foods = data["foods"]
    
    let request = await fetch(`https://79640b006f96af9e.mokky.dev/foods/${FoodId}`,
        {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ favorite: !foods.filter(el => el.id == FoodId)[0].favorite })
        }
    )
    GetData().then((data1)=>Update("",data1))
    GetData().then((data1)=>ViewsFav(data1))
    console.log(request);


}

function closeDetModal() {
    let btnForclose = document.getElementById("closeDetModal")
    let modal = document.getElementById("detailModal")
    btnForclose.addEventListener("click", (e) => {
        modal.classList.toggle("hidden")
        document.body.classList.toggle("overflow-hidden")
        GetData().then((data1)=>Update("",data1))
    })
}


function details(id,data){
    let menu  = document.getElementById("menu")
    let food = data["foods"].filter(el=>el.id == id)[0]
    let strfood=`
    <div class="fixed inset-0  bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50" id="detailModal">
    <div class=" w-[700px] h-[600px] bg-white rounded-3xl shadow-xl p-6 flex flex-col gap-4">
    <div class="w-full h-[300px] overflow-hidden rounded-3xl">
    <img src="${f.img}" class="w-full h-full object-cover">
  </div>
  <div class="flex justify-between items-center">
    <h1 class="text-3xl font-bold text-[#333]">${food.name}</h1>
    <h2 class="text-2xl font-bold text-[#584213]">${food.price} сом</h2>
  </div>
  <div class="text-[#A6A6A6] text-[16px]">${food.mass}г | ${food.kalories} ккал</div>
  <div>
    <h3 class="text-xl font-semibold mb-1">Описание</h3>
    <p class="text-[15px] leading-6">${food.description}</p>
  </div>
  <div>
    <h3 class="text-xl font-semibold mb-1">Польза / Вред</h3>
    <p class="text-[15px] leading-6">${food.deskForHealth}</p>
  </div>
</div>
<div class=" absolute close rounded-3xl bg-red-500 flex justify-center items-center w-[35px] text-center py-1 text-[#FFFFFF] text-[20px] top-3 right-3" id="closeDetModal">
    x
</div>
</div>
`
menu.innerHTML+=strfood
document.body.classList.toggle("overflow-hidden")
closeDetModal()
}

function ShowSearch(){
    let btn = document.getElementById("btnForSearch")
    let modal = document.getElementById("Search")

    btn.addEventListener("click",(e)=>{
        modal.style.display = modal.style.display=="none"?"block":"none"
    })
}
ShowSearch()

function DragFavModalForMobile() {
    let width = window.screen.width

    let modal = document.getElementById("favorite-model")
    if(width <= 769&&width>663){
        let startY = 0
         modal.addEventListener("touchstart",(e)=>{
            startY = e.touches[0].clientY
            document.body.classList.add("overflow-hidden")})
        modal.addEventListener("touchend",(e)=>{
            document.body.classList.remove("overflow-hidden")})

            modal.addEventListener("touchmove",(e)=>{
            if(e.target.id ==modal.firstElementChild.id ){
                 if(startY>e.touches[0].clientY){
                modal.firstElementChild.style.bottom= "-560px"
                  modal.firstElementChild.style.top = `${+modal.firstElementChild.style.bottom.split("p")[0] + 80}px`
               }else{
                  modal.firstElementChild.style.top = "0px"
                  modal.firstElementChild.style.bottom= "0px"
                  
               }
            }
               

            },true)
    }
}
DragFavModalForMobile()