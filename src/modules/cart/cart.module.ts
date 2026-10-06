import api from "../../../lib/api";
import type { IProduct } from "../product/product.type";
import type { ICartStore, ICart } from "./cart.type";

let cart_togglers = document.querySelectorAll<HTMLElement>(".cart-toggler")
let cart_section = document.getElementById("cart_section") as HTMLElement | null
let homeCartList = document.getElementById("homeCartList") as HTMLElement | null
let CartList = document.getElementById('CartList');
let sub_total = document.getElementById('sub_total');
let subtotal = document.getElementById('subtotal');
let total = document.getElementById('total');
let cart_total_count = document.getElementById('cart_total_count');
let cartTotal = document.getElementById('cartTotal');
let Cart_Badge = document.getElementById('Cart_Badge');
let order_review = document.getElementById('order_review');
let count = 0;


cart_togglers.forEach(element => {
  element.addEventListener("click", () => {
    cart_section?.classList.toggle("hidden")
  })
})

homeCartList?.addEventListener("click", async (e: any) => {
  let addToCartBtn = e.target.closest(".cart")
  if(!addToCartBtn)return
  let produntId: any = addToCartBtn.dataset.id
  if (!produntId) return;
  let res: any = await api.get(`/products/${produntId}`)
  let myProduct = res.data
  if (res.status == 200) {
    calculateCart(myProduct)
    renderCartItem()
  }
})

CartList?.addEventListener("click",(e:any)=>{
  let deleteBtn = e.target.closest('.delete')
  if(!deleteBtn)return
  let productId = deleteBtn.dataset.deleteId
  if(!productId)return
  let getDataFromLocalStroage = localStorage.getItem('cart')
  if(!getDataFromLocalStroage) return
  let convertData: ICart[] = JSON.parse(getDataFromLocalStroage).data
  if(!convertData)return
  let updateData = convertData.filter((item: ICart) => {
    return String(item.id) !== String(productId)
  });
updateData.reduce((total: number, current: ICart) => {
    return total + Number(current.totalPrice);
  }, 0);
  let modify:ICartStore = {
    data:updateData,
    totalPrice:0
  }
  if(!modify)return;
  localStorage.setItem('cart',JSON.stringify(modify))
  renderCartItem()
})

CartList?.addEventListener("click",(e:any)=>{
 let increseBtn = e.target.closest('.increse')
 if(!increseBtn)return
 let productId = increseBtn.dataset.increseId
 if(!productId)return
 let getDataFromLocalStroage = localStorage.getItem('cart')
 if(!getDataFromLocalStroage) return
 let convertData:ICart[] = JSON.parse(getDataFromLocalStroage).data
 if(!convertData)return
 let updateData = convertData.map((item:ICart)=>{
   if(String(item.id) == String(productId)){
      item.quantity = item.quantity + count + 1
      item.totalPrice = item.price * item.quantity
   }
   return item
 }) 
 let totalCalculation = updateData.reduce((total: number, current: ICart) => {
   return total + Number(current.totalPrice);
 }, 0);
 let modify:ICartStore = {
   data:updateData,
   totalPrice:totalCalculation
 }
 if(!modify)return;
 localStorage.setItem('cart',JSON.stringify(modify))
 renderCartItem()
})

CartList?.addEventListener("click",(e:any)=>{
 let decreseBtn = e.target.closest('.decrese')
 if(!decreseBtn)return
 let productId = decreseBtn.dataset.decreseId
 if(!productId)return
 let getDataFromLocalStroage = localStorage.getItem('cart')
 if(!getDataFromLocalStroage) return
 let convertData:ICart[] = JSON.parse(getDataFromLocalStroage).data
 if(!convertData)return
 let updateData = convertData.map((item:ICart)=>{
   if(String(item.id) == String(productId)){
      item.quantity = item.quantity + count - 1
      item.totalPrice = item.price * item.quantity
   }
   return item
 }) 
 let totalCalculation = updateData.reduce((total: number, current: ICart) => {
   return total + Number(current.totalPrice);
 }, 0);
 let modify:ICartStore = {
   data:updateData,
   totalPrice:totalCalculation
 }
 if(!modify)return;
 localStorage.setItem('cart',JSON.stringify(modify))
 renderCartItem()
})

// ===============  Helping Function ===========

function calculateCart(product: IProduct) {
  let checklocalStorage = localStorage.getItem('cart')
  
  if (!checklocalStorage) {
    let newCartData: ICartStore = {
      data: [
        {
          id: product.id ?? "",
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: count + 1,
          totalPrice: product.price * (count + 1)
        }
      ],
      totalPrice: product.price * (count + 1),
    }
    localStorage.setItem("cart", JSON.stringify(newCartData))
  } else {
    try {
      let parsedStore = JSON.parse(checklocalStorage);
      if(!parsedStore)return
      let oldCartData: ICart[] =parsedStore.data 
      
      let exist = oldCartData.find((item: ICart) => {
        return item.id == product.id
      })
      if (exist) {
        return
      }
      
      let updateCartDataWithOldProductItem = [
        ...oldCartData,
        {
          id: product.id ?? "",
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: count + 1,
          totalPrice: product.price * (count + 1)
        }
      ]
      
      let totalcalculetion = updateCartDataWithOldProductItem.reduce((total, current) => {
        return total + Number(current.totalPrice);
      }, 0)
      
      let updateCartData: ICartStore = {
        data: updateCartDataWithOldProductItem,
        totalPrice: totalcalculetion
      }
      localStorage.setItem('cart', JSON.stringify(updateCartData))
    } catch (err) {
      console.error("LocalStorage parse error:", err);
    }
  }
}


function renderCartItem() {
  let cartHtml = "";
  let localStroagefromData = localStorage.getItem('cart')
  if (!localStroagefromData) return
  
  try {
    let parsedCart: ICartStore = JSON.parse(localStroagefromData)
    if(!parsedCart){
      console.log("hello");
      
    }
    let getDataItem:ICart[] = parsedCart.data
    
    getDataItem.forEach((item: ICart) => {
      cartHtml += `<article
      class="group flex items-center gap-4
             rounded-2xl
             border border-white/10
             bg-white/[0.02]
             p-4
             transition-all duration-300
             hover:border-[#e8b95c]/30"
    >
      <!-- Image -->
      <div
        class="h-20 w-20 shrink-0
               overflow-hidden
               rounded-xl"
      >

        <img
          src="./src/assets/images/foods/${item.image}"
          alt="Chicken Burger"
          class="h-full w-full
                 object-cover
                 transition duration-500
                 group-hover:scale-110"
        />

      </div>


      <!-- Product Info -->
      <div class="min-w-0 flex-1">

        <div class="flex items-start justify-between gap-3">

          <div>

            <h3
              class="font-['Cormorant_Garamond']
                     text-xl font-semibold
                     text-white
                     transition-colors
                     group-hover:text-[#e8b95c]"
            >
              ${item.name}
            </h3>


            <!-- Rating -->
            <div class="mt-1 flex gap-1">

              <i class="fa-solid fa-star text-[9px] text-[#e8b95c]"></i>
              <i class="fa-solid fa-star text-[9px] text-[#e8b95c]"></i>
              <i class="fa-solid fa-star text-[9px] text-[#e8b95c]"></i>
              <i class="fa-solid fa-star text-[9px] text-[#e8b95c]"></i>
              <i class="fa-solid fa-star text-[9px] text-white/15"></i>

            </div>

          </div>


          <!-- Remove -->
          <button data-castom-id="${item.id}"
            type="button"
            class="remove flex h-8 w-8 shrink-0
                   items-center justify-center
                   rounded-full
                   text-white/25
                   transition
                   hover:bg-red-500/10
                   hover:text-red-400"
          >

            <i class="fa-solid fa-xmark text-xs"></i>

          </button>

        </div>


        <!-- Bottom -->
        <div
          class="mt-3 flex items-center
                 justify-between"
        >

          <!-- Price -->
          <p
            class="text-sm font-semibold
                   text-[#e8b95c]"
          >
            $${item.price}
          </p>


          <!-- Quantity -->
          <div
            class="flex items-center
                   rounded-full
                   border border-white/10"
          >
            <span
              class="w-7 text-center
                     text-xs font-semibold"
            >
            ${item.quantity}
            </span>
          </div>

        </div>

      </div>

    </article>`;
    });

    if (CartList) CartList.innerHTML = cartHtml;
    if (order_review) order_review.innerHTML = cartHtml;
    if (sub_total) sub_total.innerText = `৳ ${String(parsedCart.totalPrice ?? 0)}`
    if (subtotal) subtotal.innerText = `৳ ${String(parsedCart.totalPrice.toFixed(2) ?? 0)}`
    if (cart_total_count) cart_total_count.innerText = `${String(getDataItem.length)} items`
    if (cartTotal) cartTotal.innerText = `৳ ${String(parsedCart.totalPrice ?? 0)}`
    if (total) total.innerText = `৳ ${String(parsedCart.totalPrice.toFixed(2) ?? 0)}`
    if(Cart_Badge) Cart_Badge.innerHTML = String(getDataItem.length)
  } catch (err) {
    console.error("Render cart error:", err);
  }
}
renderCartItem()


// ===================Chackout Page========================
let fullName = document.getElementById('fullName') as HTMLInputElement | null
let email = document.getElementById('email') as HTMLInputElement | null
let phone = document.getElementById('phoneNumber') as HTMLInputElement | null
let address = document.getElementById('address') as HTMLInputElement | null
let district = document.getElementById('district') as HTMLSelectElement | null
let delivery = document.getElementById('delivery') as HTMLElement | null
let couponCode = document.getElementById('couponCode') as HTMLInputElement | null
let applyCouponBtn = document.getElementById('applyCouponBtn') as HTMLButtonElement | null
let placeOrderBtn = document.getElementById('placeOrderBtn') as HTMLButtonElement | null


placeOrderBtn?.addEventListener('click', () => {
  validateForm()

  if (!district || district.value == "Select District") {
    if (delivery) delivery.innerText = "Please select a district"
  } else if (district.value == "Dhaka") {
    if (delivery) delivery.innerText = "15"
  } else if (district.value == "Chattogram") {
    if (delivery) delivery.innerText = "35"
  } else {
    if (delivery) delivery.innerText = "50"
  }

  let subTotalVal = Number(subtotal?.innerText.replace("৳ ", "") || 0);
  let deliveryVal = Number(delivery?.innerText || 0);
  if (total) total.innerText = `৳ ${String(subTotalVal + deliveryVal)}`
})


applyCouponBtn?.addEventListener('click', () => {
  if (couponCode?.value == "DISCOUNT10") {
    let subTotalVal = Number(subtotal?.innerText.replace("৳ ", "") || 0);
    let deliveryVal = Number(delivery?.innerText || 0);
    if (total) total.innerText = `৳ ${String(subTotalVal + deliveryVal - 10)}`
  }
})

function validateForm() {
  if (!fullName || !email || !phone || !address) {
    console.error("Form elements not found in the DOM");
    return;
  }

  if (!fullName.value || !email.value || !phone.value || !address.value) {
    console.warn("User validation failed: one or more fields are empty");
    return;
  }
  console.log("User validation successful");
}
