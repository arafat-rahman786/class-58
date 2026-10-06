import Swal from 'sweetalert2'
import type { IProduct } from "./product.type";
import api from "../../../lib/api";
let from_deshboard = document.getElementById("from_deshboard") as HTMLFormElement | null;
let foodlist: HTMLElement | null = document.getElementById("foodlist");
let item_length: HTMLElement | null = document.getElementById("item_length");
let homeCartList = document.getElementById("homeCartList") as HTMLElement | null


from_deshboard?.addEventListener("submit", async (e) => {
  e.preventDefault()
  let fromData = new FormData(from_deshboard)
  let enteries: any = Object.fromEntries(fromData)
  let validated = validate(enteries)
  await api.post('/products', validated)
  from_deshboard.reset()
  helpingRender()
})


function validate(list: IProduct) {
  if (list.name == ""
    || list.image == ""
    ||list.catagory == ""
    || list.price <= 0
    || Number(list.ratting) <= 0
  ) {
    console.log("error");
    return
  } else {
    console.log("ok");
    return list
  }
}


async function helpingRender() {
  let homePageHtml = "";
  let deshboardPageHtml = "";
  let conditon = ""
  let res = await api.get('/products')
  let data = res.data
  let arrLength = data.map((i: IProduct) => {
    if (i.ratting == 5) {
      conditon = `<div class="mt-2 flex gap-1">
              <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
              <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
              <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
              <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
              <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
            </div>`
    } else if (i.ratting == 4) {
      conditon = `<div class="mt-2 flex gap-1">
              <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
              <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
              <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
              <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
              <i class="fa-solid fa-star text-[10px] text-white/15"></i>
            </div>`
    } else if (i.ratting == 3) {
      conditon = `<div class="mt-2 flex gap-1">
              <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
              <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
              <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
              <i class="fa-solid fa-star text-[10px] text-white/15"></i>
              <i class="fa-solid fa-star text-[10px] text-white/15"></i>
            </div>`
    } else if (i.ratting == 2) {
      conditon = `<div class="mt-2 flex gap-1">
              <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
              <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
              <i class="fa-solid fa-star text-[10px] text-white/15"></i>
              <i class="fa-solid fa-star text-[10px] text-white/15"></i>
              <i class="fa-solid fa-star text-[10px] text-white/15"></i>
            </div>`
    } else if (i.ratting == 1) {
      conditon = `<div class="mt-2 flex gap-1">
              <i class="fa-solid fa-star text-[10px] text-[#f0a400]"></i>
              <i class="fa-solid fa-star text-[10px] text-white/15"></i>
              <i class="fa-solid fa-star text-[10px] text-white/15"></i>
              <i class="fa-solid fa-star text-[10px] text-white/15"></i>
              <i class="fa-solid fa-star text-[10px] text-white/15"></i>
            </div>`
    }
    homePageHtml += `<article class="group overflow-hidden rounded-3xl
               border border-white/10
               bg-[#12100c]
               transition-all duration-500
               hover:-translate-y-2
               hover:border-[#f0a400]/40
               hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]">

          <div class="relative h-60 overflow-hidden">

            <img src="./public/images/foods/${i.image}" alt="this is alt text" class="h-full w-full object-cover
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
                ${i.ratting}
              </span>
            </div>

          </div>


          <div class="p-5">

            <h3 class="font-['Cormorant_Garamond']
                   text-2xl font-semibold
                   text-white
                   transition-colors
                   group-hover:text-[#f0a400]">
                 ${i.name}
            </h3>


            <!-- Rating Stars -->
            
            ${conditon}

            <div class="mt-5 flex items-center justify-between">

              <p class="text-xl font-semibold text-[#f0a400]">
                ৳ ${Number(i.price).toFixed(2)}
              </p>
            </div>


            <button data-id="${i.id}" class="cart mt-5 flex w-full items-center
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
    deshboardPageHtml += `<div class="group flex flex-col gap-4 rounded-2xl
                   border border-white/5
                   bg-white/[0.02] p-4
                   transition-all duration-300
                   hover:border-[#e8b95c]/20
                   hover:bg-[#e8b95c]/[0.03]
                   sm:flex-row sm:items-center">

                    <img src="./public/images/foods/${i.image}" alt="Chicken Burger"
                        class="h-20 w-20 shrink-0 rounded-xl object-cover" />

                    <div class="min-w-0 flex-1">

                        <h3 class="font-['Cormorant_Garamond'] text-xl font-semibold text-white">
                            ${i.name}
                        </h3>

                        <div class="mt-1 flex items-center gap-3">

                            <span class="text-xs text-[#e8b95c]">
                                <i class="fa-solid fa-star mr-1"></i>
                                ${Number(i.ratting).toFixed(2)}
                            </span>

                            <span class="text-xs text-white/25">
                                ${i.catagory}
                            </span>

                        </div>

                    </div>

                    <div class="flex items-center justify-between gap-5 sm:justify-end">

                        <span class="text-lg font-semibold text-[#e8b95c]">
                            ৳${Number(i.price).toFixed(2)}
                        </span>

                        <div class="flex gap-2">

                            <a data-edit-id="${i.id}" href="edit.html?productId=${i.id}" class="flex edit h-9 w-9 items-center justify-center
                         rounded-lg border border-white/10
                         text-white/50
                         transition
                         hover:border-[#e8b95c]/40
                         hover:text-[#e8b95c]">
                                <i class="fa-solid fa-pen text-xs"></i>
                            </a>

                            <button data-delete-id="${i.id}" class="flex h-9 w-9 delete items-center justify-center
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

                </div>`
  })

  if (homeCartList) {
    homeCartList.innerHTML = homePageHtml
  }
  if (foodlist) {
    foodlist.innerHTML = deshboardPageHtml
  }
  if (item_length) {
    item_length.innerText = arrLength.length
  }
}
helpingRender()


// ================= Delete Button ============

foodlist?.addEventListener("click", async (e: any) => {
  let deleteBtn = e.target.closest('.delete')
  let productId = deleteBtn.dataset.deleteId
  Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) Swal.fire({
    title: "Deleted!",
    text: "Your file has been deleted.",
    icon: "success"
  });
});
await api.delete(`/products/${productId}`)
  helpingRender()
})


// ================== Edit Button =============

let edit_food_form = document.getElementById('edit_food_form') as HTMLFormElement


if (edit_food_form) {
  let prams = new URLSearchParams(window.location.search)
  let search = prams.get('productId')
  async function getdata() {
    let res = await api.get(`/products/${search}`)
    for (let filled in res.data) {
      const field = document.querySelector(`[name="${filled}"]`) as HTMLInputElement | null
      if (field) field.value = res.data[filled]
    }
  }
  Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Your work has been saved",
  showConfirmButton: false,
  timer: 1500
});
  getdata()
}


edit_food_form?.addEventListener("submit", async (e) => {
  e.preventDefault()
  let fromData = new FormData(edit_food_form)
  let enteries: any = Object.fromEntries(fromData)
  let validated = validate(enteries)
  let params = new URLSearchParams(window.location.search)
  let productId = params.get('productId')
  if (!validated) return
  if (!productId) return
  let { id, ...update } = validated
  try {
    await api.put(`/products/${productId}`, update)
    console.log("succes");
  } catch {
    console.log("there is some problem");

  }
Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Your work has been saved",
  showConfirmButton: false,
  timer: 1500
});

})

