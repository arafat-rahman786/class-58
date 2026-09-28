import Swal from 'sweetalert2'
import type { IProduct } from "./product.type";
import type { ICart } from "./product.type";
import api from "../../../lib/api";
let from_deshboard: HTMLElement | null = document.getElementById("from_deshboard");
let foodlist: HTMLElement | null = document.getElementById("foodlist");
let item_length: HTMLElement | null = document.getElementById("item_length");
let homeCartList = document.getElementById("homeCartList") as HTMLElement | null
let Cart_Badge = document.getElementById("Cart_Badge") as HTMLElement | null
let Cart_Badge_Chackout = document.getElementById("Cart_Badge_Chackout") as HTMLElement | null
let order_review = document.getElementById("order_review") as HTMLElement | null
let subtotal = document.getElementById("subtotal") as HTMLElement | null
let total = document.getElementById("total") as HTMLElement | null
let products: IProduct[] = [];
let count = 0;
from_deshboard?.addEventListener("submit", async (e) => {
  e.preventDefault()
  let fromData = new FormData(from_deshboard as HTMLFormElement)
  let entries: any = Object.fromEntries(fromData)
  let validateFromData = validate(entries)
  if (!validateFromData) {
    return
  }
  try {
    let res = await api.post("/products", validateFromData)
    if (res.status = 201) {
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      }).fire({
        icon: "success",
        title: "Added successfully"
      });
      count++
      if (item_length) {
        item_length.innerHTML = String(count)
      }
      (from_deshboard as HTMLFormElement).reset()
    }
  } catch (error) {
    Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    }).fire({
      icon: "error",
      title: "There is a problem"
    });
  }

})

function validate(fromData: IProduct) {
  let condition = fromData.name == "" ||
    fromData.ratting == "" ||
    Number(fromData.price) <= 0 ||
    fromData.image == "" ||
    fromData.catagory == "";

  if (condition) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Fill Your From",
      showConfirmButton: false,
      timer: 1500
    });
    return;
  } else {
    Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    }).fire({
      icon: "success",
      title: "Added successfully"
    });
    return fromData
  }
}

async function htmlRender() {
  if (homeCartList) {
    homeCartList.innerHTML = (await helper()).homeHtmlPage
  }
  if (foodlist) {
    foodlist.innerHTML = (await helper()).dashboardHtmlPage
  }
}
htmlRender()
async function helper() {
  let url = await api.get('/products')
  let res = url.data
  products = res
  let homeHtmlPage = "";
  let dashboardHtmlPage = "";
  count = res.length
  res.map((item: IProduct) => {
    let newHtml = ""
    if (item.ratting == 5) {
      newHtml = ` <div class="mt-2 flex gap-1">
            <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
            <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
            <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
            <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
            <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
          </div>`
    } else if (item.ratting == 4) {
      newHtml = ` <div class="mt-2 flex gap-1">
            <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
            <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
            <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
            <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
            <i class="fa-solid fa-star text-[10px] text-white/15"></i>
          </div>`
    } else if (item.ratting == 3) {
      newHtml = ` <div class="mt-2 flex gap-1">
            <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
            <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
            <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
            <i class="fa-solid fa-star text-[10px] text-white/15"></i>
            <i class="fa-solid fa-star text-[10px] text-white/15"></i>
          </div>`
    } else if (item.ratting == 2) {
      newHtml = ` <div class="mt-2 flex gap-1">
            <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
            <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
            <i class="fa-solid fa-star text-[10px] text-white/15"></i>
            <i class="fa-solid fa-star text-[10px] text-white/15"></i>
            <i class="fa-solid fa-star text-[10px] text-white/15"></i>
          </div>`
    } else {
      newHtml = ` <div class="mt-2 flex gap-1">
            <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
            <i class="fa-solid fa-star text-[10px] text-white/15"></i>
            <i class="fa-solid fa-star text-[10px] text-white/15"></i>
            <i class="fa-solid fa-star text-[10px] text-white/15"></i>
            <i class="fa-solid fa-star text-[10px] text-white/15"></i>
          </div>`
    }
    homeHtmlPage += `<article class="group overflow-hidden rounded-3xl
               border border-white/10
               bg-[#12100c]
               transition-all duration-500
               hover:-translate-y-2
               hover:border-[#f0a400]/40
               hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
          <div class="relative h-60 overflow-hidden">
            <img src="./src/assets/images/foods/${item.image}" alt="this is alt text" class="h-full w-full object-cover
                   transition duration-700
                   group-hover:scale-110" />
            <div class="absolute inset-0
                   bg-gradient-to-t
                   from-black/70
                   via-transparent
                   to-transparent"></div>
            <!-- Rating -->
            <div class="absolute left-4 top-4
                   flex items-center gap-2
                   rounded-full
                   bg-black/60
                   px-3 py-1.5
                   backdrop-blur-md">
              <i class="fa-solid fa-star text-xs text-[#f0a400]"></i>

              <span class="text-xs font-semibold text-white">
                ${item.ratting}
              </span>
            </div>
          </div>
          <div class="p-5">
            <h3 class="font-['Cormorant_Garamond']
                   text-2xl font-semibold
                   text-white
                   transition-colors
                   group-hover:text-[#f0a400]">
                 ${item.name}
            </h3>
            <!-- Rating Stars -->
            ${newHtml}
            <div class="mt-5 flex items-center justify-between">
              <p class="text-xl font-semibold text-[#f0a400]">
                ${item.price}
              </p>
              <!-- Quantity -->
              <div class="flex items-center rounded-full
                     border border-white/10">
                <button class="flex h-8 w-8 items-center
                       justify-center text-white/50">
                  −
                </button>
                <span class="w-7 text-center text-xs text-white">
                  1
                </span>
                <button class="flex h-8 w-8 items-center
                       justify-center text-white/50">
                  +
                </button>
              </div>
            </div>
            <button data-id="${item.id}" class="cart mt-5 flex w-full items-center
                   justify-center gap-2 rounded-xl
                   bg-[#f0a400] py-3
                   text-sm font-semibold text-black
                   transition-all duration-300
                   hover:bg-[#ffb82e]
                   active:scale-95">
              <i class="fa-solid fa-cart-plus text-xs"></i>
              Add to Cart
            </button>
          </div>
        </article>`

    dashboardHtmlPage += `<div class="group flex flex-col gap-4 rounded-2xl
                   border border-white/5
                   bg-white/[0.02] p-4
                   transition-all duration-300
                   hover:border-[#e8b95c]/20
                   hover:bg-[#e8b95c]/[0.03]
                   sm:flex-row sm:items-center">

                    <img src="./src/assets/images/foods/${item.image}" alt="Chicken Burger"
                        class="h-20 w-20 shrink-0 rounded-xl object-cover" />

                    <div class="min-w-0 flex-1">

                        <h3 class="font-['Cormorant_Garamond'] text-xl font-semibold text-white">
                            ${item.name}
                        </h3>

                        <div class="mt-1 flex items-center gap-3">

                            <span class="text-xs text-[#e8b95c]">
                                <i class="fa-solid fa-star mr-1"></i>
                                ${Number(item.ratting).toFixed(2)}
                            </span>

                            <span class="text-xs text-white/25">
                                ${item.catagory}
                            </span>

                        </div>

                    </div>

                    <div class="flex items-center justify-between gap-5 sm:justify-end">

                        <span class="text-lg font-semibold text-[#e8b95c]">
                            ৳${Number(item.price).toFixed(2)}
                        </span>

                        <div class="flex gap-2">

                            <button class="flex h-9 w-9 items-center justify-center
                         rounded-lg border border-white/10
                         text-white/50
                         transition
                         hover:border-[#e8b95c]/40
                         hover:text-[#e8b95c]">
                                <i class="fa-solid fa-pen text-xs"></i>
                            </button>

                            <button class="flex h-9 w-9 items-center justify-center
                         rounded-lg border border-red-500/10
                         text-red-400/60
                         transition
                         hover:border-red-500/40
                         hover:bg-red-500/10
                         hover:text-red-400">
                                <i class="fa-solid fa-trash text-xs"></i>
                            </button>

                        </div>

                    </div>

                </div>
`
  })
  if (item_length) {
    item_length.innerHTML = String(count)
  }
  return {
    homeHtmlPage: homeHtmlPage,
    dashboardHtmlPage: dashboardHtmlPage
  }
}
let cartCount = 0;
homeCartList?.addEventListener("click",async (e: any) => {
  let cartBtn = e.target.closest(".cart")
  if (!cartBtn) {
    return
  } else {
    cartCount++
  }
  if (Cart_Badge) {
    Cart_Badge.innerHTML = String(cartCount)
  }
  if (Cart_Badge_Chackout) {
    Cart_Badge_Chackout.innerHTML = String(cartCount)
  }
  let productId = cartBtn.dataset.id
  let newdata = products.find((item) => {
    return productId === String(item.id)
  })
  if (!newdata) {
    return
  }
let cartData: ICart = {
  product: newdata,
  quantity: 1
}
 await api.post('/cart',cartData)
 cartCount ++

if(!order_review){
  return
}})
if (Cart_Badge) Cart_Badge.innerHTML = String(cartCount)

async function checkoutRender() {

let url = await api.get("/cart")
let res: ICart[] = url.data
if (Cart_Badge_Chackout) Cart_Badge_Chackout.innerText = String(res.length)

let order_section = res.map((item: ICart) => {
    return `
<article
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
          src="./src/assets/images/foods/${item.product.image}"
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
              ${item.product.name}
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
          <button
            type="button"
            class="flex h-8 w-8 shrink-0
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
            $${item.product.price}
          </p>


          <!-- Quantity -->
          <div
            class="flex items-center
                   rounded-full
                   border border-white/10"
          >

            <button
              type="button"
              class="flex h-7 w-7
                     items-center justify-center
                     text-white/40
                     transition
                     hover:text-[#e8b95c]"
            >
              −
            </button>


            <span
              class="w-7 text-center
                     text-xs font-semibold"
            >
              ${item.quantity}
            </span>


            <button
              type="button"
              class="flex h-7 w-7
                     items-center justify-center
                     text-white/40
                     transition
                     hover:text-[#e8b95c]"
            >
              +
            </button>

          </div>

        </div>

      </div>

    </article>
`
  })

  if (!order_review) {
    return
  }

  order_review.innerHTML = order_section.join("")
}

checkoutRender()

async function subsum() {
  let url = await api.get("/cart")
  let res: ICart[] = url.data
  let filterData = res.reduce((total, item: ICart) => {
    return total + item.product.price * item.quantity
  }, 0)
  if(subtotal){subtotal.innerText = `$ ${String(filterData)}`}

  let extra = 9;
  if (total && subtotal) {
    total.innerText = `$ ${String(filterData + extra)}`
  }
}
subsum()


  
 