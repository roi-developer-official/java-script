
class Product {
    title = 'Default';
    imageUrl;
    description;
    price;

    constructor(title, imageUrl, desciption, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = desciption;
        this.price = price;
    }

}

class Component {
    constructor(renderHookId){
        this.hook = renderHookId;
    }
    createRootElement(tag, cssClasses, attributes) {
        const rootEl = document.createElement(tag);
        if (cssClasses)
            rootEl.className = cssClasses;
            //should be an array: length > 0
        if (attributes && attributes.length > 0) {
            for(let attr of attributes){
                rootEl.setAttribute(attr.name,attr.value);
            }
        }
        document.getElementById(this.hook).append(rootEl);
        return rootEl;
    }
}


class ProductsList extends Component {

    constructor(renderHookId){
        super(renderHookId);
    }

    products = [
        new Product('A pillow', 'https://www.maxpixels.net/static/photo/1x/Sleep-Bedtime-Pillow-Bedroom-Dream-Comfortable-1738023.jpg',
            'A soft pillow!!', 19.99),
        new Product('A carpet', 'https://www.maxpixels.net/static/photo/1x/Vacuum-Cleaner-Washing-Vacuuming-Cleanup-Cleaning-268179.jpg'
            , 'A carpet which you might like', 89.99)
    ];

    render() { 
        const prodList = this.createRootElement('ul', 'product-list', [new ElementAttribute('id', 'prod-list')]);
        for (let prod of this.products) {
            const prodItem = new ProductItem(prod, 'prod-list');
            const prodEl = prodItem.render();
        }
       
    }
}

class ProductItem extends Component {
    constructor(prod,renderHookId) {
        //call the super, with a parent element
        super(renderHookId);
        this.product = prod;
    }
    addToCart() {
        App.addProductToCart(this.product);
    }
    render() {
        const prodEl = this.createRootElement('li','product-item',[]);
        prodEl.innerHTML = `<div>
            <img src="${this.product.imageUrl}" alt="${this.product.title}"/>
            <div class="product-item__content">
                <h2>${this.product.title}</h2>
                <h3>\$${this.product.price}</h3>
                <p>${this.product.description}</p>
                <button>Add to Cart</button>
            </div>
        </div>`;
        const addCartButton = prodEl.querySelector('button');
        addCartButton.addEventListener('click', this.addToCart.bind(this));
    }

}

class ElementAttribute{
    constructor(attrName, attrVal){
        this.name = attrName;
        this.value = attrVal;
    }
}


//inherit from component:
//all the logic from component: use this.parentClassProperty.
class ShoppingCart extends Component{
    items = [];

    //the parent ctor called for the lack of ctor in here.
    //if there was a ctor it wont call the parent ctor.
    constructor(renderHookId){
        super(renderHookId);
    }

    set cartItems(val) {
        this.items = val;
        this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`;
    }

    get totalAmount() {
        const sum = this.items.reduce((prev, curr) => prev + curr.price, 0);
        return sum;
    }

    addProduct(prod) {
        const updatedItems = [...this.items];
        updatedItems.push(prod);
        this.cartItems = updatedItems;
    }

    orderProducts(){
        console.log('Ordering..');
        console.log(this.items);
    }

    render() {
        const cartEl = this.createRootElement('section','cart',[]);
        cartEl.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(0)}</h2>
        <button>Order Now!</button>`;
        const orderBtn = cartEl.querySelector('button');
        orderBtn.addEventListener('click', this.orderProducts.bind(this));
        this.totalOutput = cartEl.querySelector('h2');
    }
}
//App class
class Shop {
    render() {
        this.cart = new ShoppingCart('app');
        this.cart.render();
        const productList = new ProductsList('app');
        productList.render();
    }
}


class App {
    static init() {
        const shop = new Shop();
        shop.render();
        this.cart = shop.cart;
    }

    static addProductToCart(prod) {
        this.cart.addProduct(prod);
    }
}
App.init();
