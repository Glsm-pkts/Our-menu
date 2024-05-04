import { buttonsData, menu } from "./jsDosya/db.js";
import { calculatePrice, elements } from "./jsDosya/halpers.js";


//!fonksiyonlar
const renderMenuItems = (menuItems) => {   //(yeni çıkan fonksiyonlarda olay izleyicisinden önce tanımlaman lazım ama functionlarda 
                                          //olay izliyicisinden sonra da olsa sıkıntı olmuyor)
 let menuHtml = menuItems.map((item) =>( 
    /*
       *dizideki her bir obje için elemanı temsil eden 
       *html elemanı oluşturur. bu htmlyi bir dizi aktarır

    */
        `
        <a href="/productDetail.html?id=${item.id}&${item.title}"
        class="text-decoration-none text-black d-flex flex-column flex-md-row gap-2"
        id="card"
      >
        <img src="${item.img}" class="rounded shadow" />
        <div>
          <div class="d-flex justify-content-between">
            <h5>${item.title}</h5>
            <p class="text-success">${calculatePrice(item.price)}</p>
          </div>
          <p>
           ${item.desc}
          </p>
        </div>  
      </a>

        `
    ));
    menuHtml = menuHtml.join("");
    elements.menuArea.innerHTML = menuHtml;
    }  

//*tıklanılan butona göre o buttonun kategorisine ait ürünleri listele
const searchCatogry = (e) =>{
 const category = e.target.dataset.category;

 //**tüm dizi elemanlarından yalnızca kategori değeri buttonun kategori değeri ile eşleşenleri getir ve bir dizi şeklinde değişkene aktar */
 const filteredMenu = menu.filter((item) => item.category === category);
 
 //*hepsi seçilirse bütün menuyuekrana aktar
if(category == "undefined"){
    return;
}
else if(category === "all" ){
//*eğer çağırdığım button all ise catogrye eşit bi şekilde ver
   renderMenuItems(menu);}
else {  //* değilse rendermenuıtemse filtreleyerek ver 
//*filtrelenen elemanları ekrana aktarması için menu dizisinden 
//*oluşturduğumuz filtermenu dizisini ekrana aktarır
    renderMenuItems(filteredMenu);
 }
 renderButtons(category);
 };
//* seçtiğimiz categorinin butonunu akrifleştirmek için categoryi paremetre olarak gönderdik

//*ekrana buttonları bastırma
const renderButtons = (active) =>{
    //*eski buttonları ekrandan sil
    elements.buttonsArea.innerHTML = "";

    //*yeni buttonlar oluşturma
    buttonsData.forEach((btn) =>{
        console.log(btn);
        const buttonEle = document.createElement("button")

    //*buttonlara classlarını ekleme  
        buttonEle.className = "btn btn-outline-dark filter-btn"

     //* içerisindeki yazıyı değiştirme   
        buttonEle.textContent = btn.text;

     //* hangi katagori olduğu bilgisini buttonlara ekleme
        buttonEle.dataset.category = btn.value;
        console.log(buttonEle);

    //* eğerki active catogrisi ile button eşleşirse ona farklı claas ekle
    if(btn.value === active){
        buttonEle.classList.add("bg-dark", "text-light");
    }

    //*html gönderme
        elements.buttonsArea.appendChild(buttonEle);
    });
};

//! olay izleyicileri
document.addEventListener("DOMContentLoaded",renderMenuItems(menu), renderButtons("all"));

elements.buttonsArea.addEventListener("click", searchCatogry);






