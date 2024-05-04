import { calculatePrice, elements } from "./halpers.js";
import { menu } from "./db.js";

console.log(window.location);
/**urldeki parametreleri yönetebilmek için URLSearchParams claassından örnek oluşturduk.
 * örneği oluştururken kendi url mizdeki parametreleri gönderdik
 */
const searchParams = new URLSearchParams(window.location.search);


//* Get metodu ile URL'de ki parametresine eriştik
const paramId = searchParams.get("id");
console.log(paramId);

//* Menu içerisinden id'sini bildiğimiz elemana ulaşma
console.log(typeof paramId);
const product = menu.find((item) => item.id === Number(paramId));
console.log(product);

elements.outlet.innerHTML = `
    <div class="d-flex justify-content-between align-items-center">
        <a href="/"><i class="bi bi-house fs-1"></i> </a>
        <div>anasayfa / ${
          product.category
        } / ${product.title.toLowerCase()}</div>
    </div>
    <h1 class="text-center my-3 shadow p-2 rounded">${product.title}</h1>
    <div class="d-flex align-items-center justify-content-center">
        <img
        src="${product.img}"
        style="max-width: 500px"
        class="img-fluid shadow rounded"
        />
    </div>
    <div>
        <h3 class="my-5">
        Ürünün Kategorisi: <span class="text-success">${product.category}</span>
        </h3>
        <h3 class="my-5">
        Ürünün Fiyatı: <span class="text-success">${calculatePrice(
          product.price
        )}₺</span>
        </h3>
    </div>
    <p class="lead fs-3">
        ${product.desc}
    </p>
`;