"use strict";


const myClickAreaEl = document.querySelector('.featuredItems');
const basketNumOfGoogsEl = document.querySelector('.cartIconWrap span');
const basketListEl = document.querySelector('.basketList');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketIconEl = document.querySelector('.cartIconWrap');
const basketDivEl = document.querySelector(".basketDiv");

let basketList ={};

basketIconEl.addEventListener('click', ()=> {
    // console.log('basket');
    basketDivEl.classList.toggle("hidden");
});

// console.log(myClickAreaEl);
myClickAreaEl.addEventListener('click',(event)=>{
    // console.log(event.target);
    // if(!event.target.classList.contains('addToCartBtn')) {
    if(!event.target.closest('.addToCartBtn')) {
        return
    } else {
    // console.log(123);
    const item = event.target.closest('.featuredItem') 
    // console.log(item);
    const itemId = +item.dataset.id;
    const itemName = item.dataset.name;
    const itemPrice = +item.dataset.price;
    // console.log( `id = ${itemId},  name = ${itemName}, price = ${itemPrice}`  )
    addToBasket(itemId, itemName, itemPrice );
    // console.log(basketList);
    }
});


basketDivEl.addEventListener('click',(event)=>{
    if(!event.target.classList.contains("basketMarkToDelete")) {
        return;
    }else {
        // console.dir(event.target.dataset.id);
        removeFromBasket(event.target.dataset.id)
    }
})

    /**
     * The function adds the cliked product to basketList object
     * @date 2022-12-16
     * @param {number} id
     * @param {string} name
     * @param {number} price
     * @returns {obj} backetList obj
     */
    function addToBasket(id,name,price){
        if (!basketList[id]) {
            basketList[id] = {
                id : id,
            name : name,
            price : price,
            qty : 1,
            }
        } else {
            basketList[id].qty++;
            }
        // console.log(basketList);
        basketNumOfGoogsEl.textContent = numOfGoodsCalculation();
        basketTotalValueEl.textContent = busketPriceCalculation();
        basketRender();
        }
        
    /**
     * the function calculates total number of goods in bucketList
     * @date 2022-12-16
     * @returns {number}   qty of goods in basket
     */
    function numOfGoodsCalculation() {
        let numOfGoods = 0;
        for ( const el in basketList) {
            numOfGoods += basketList[el].qty;
        }
        return numOfGoods
        }
        
    /**
     * the function calculates total price of goods in bucketList
     * @date 2022-12-16
     * @returns {number}   price of goods in basket
     */
    function busketPriceCalculation() {
        let priceOfGoods = 0;
        for ( const el in basketList) {
            priceOfGoods += +basketList[el].price * +basketList[el].qty;
        }
        return priceOfGoods.toFixed(2)
        }
    
    /**
     * the function returns HTML markup for single type of good in basket
     * @date 2022-12-16
     * @param {number} prodId   - Id of product
     * @returns {string}   HTML string to be inserted to basketListEl
     */
    function basketHTMLMarkup(prodId){
        const productRow = `
        <div class="basketRow" data-productId="${prodId}">
            <div>${basketList[prodId].name} </div>
            <div>
                <span class ="productCount">${basketList[prodId].qty}</span> шт.
            </div>
            <div>$${basketList[prodId].price}</div>
            <div>
                $<span class ="productTotalRow">
                    ${basketList[prodId].price * basketList[prodId].qty}
                    </span>
            </div>
            <div class="basketMarkToDelete" data-id=${prodId} >x</div>
        </div>` ;
        return productRow;
        }

    /**
     * The function renders basketDiv with basketHTMLMarkup HTML rows.
     * Preliminary it clears old div content 
     * @date 2022-12-16
     * @returns {-}  -- 
     */
    function basketRender(){
        basketListEl.innerHTML="";
        for ( const el in basketList) {
            basketListEl.insertAdjacentHTML('beforeend',basketHTMLMarkup(el));}
        }


    /**
     * the function reduce qty of items or removes item from basketList by Id
     * @date 2022-12-16
     * @param {number} id
     * @returns {-}      corrected backetList
     */
    function removeFromBasket(id){
        if (basketList[id].qty>1) {
            basketList[id].qty -=1;
            
        } else {
            delete basketList[id];
            }
        // console.log(basketList);
        basketNumOfGoogsEl.textContent = numOfGoodsCalculation();
        basketTotalValueEl.textContent = busketPriceCalculation();
        basketRender();
        }
