import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import './ListProducts.css'

export default function ListProducts() {

    const [products, setProducts] = useState([]);
    const [checkBoxID, setCheckBoxID] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
    }, []);

    function getProducts() {
        axios.get('http://juniortestszymonkrawiec.x10.mx/php/get.php').then(function (response) {
        // axios.get('http://localhost:8080/moj_php/get.php').then(function (response) {
            console.log(response.data);
            setProducts(response.data);

        });
    }

    const handleCheckBox = e => {
        const check = e.target.checked;
        const checkedBox = e.target.value;

        if (check) {
            setCheckBoxID(c => [...c, checkedBox]);
        } else {
            setCheckBoxID(checkBoxID.filter(x => x !== checkedBox));
        }
    };

    const handleSubmit = (e, SKU) => {
        e.preventDefault();
        checkBoxID.forEach(SKU => {

            axios.delete("http://juniortestszymonkrawiec.x10.mx/php/delete.php", { params: { SKU: SKU } }).then(response => {
            // axios.delete("http://localhost:8080/moj_php/delete.php", { params: { SKU: SKU } }).then(response => {
                console.log(response);
                getProducts();
            });
            setCheckBoxID([])
        }
        )
    }

    function navigateAddProd() {
        navigate('/addproduct');
    }

    return (
        <div>
            <p class="product">Product List</p>
            <form onSubmit={function (e) { handleSubmit(e, checkBoxID); }}>
                <div class="button-box">
                    <button class="buttonsd" onClick={navigateAddProd} type="button">ADD</button>
                    <button class="buttonsd" id="delete-product-btn" type="submit">MASS DELETE</button>
                </div>
                <hr class="line" />
                <div class="fourColumns">
                    {products.sort((a, b) => a.id > b.id).map((product, key) => {
                        function displayList() {
                            return <div>
                                <input type="checkbox" class="delete-checkbox" value={product.SKU} onChange={e => handleCheckBox(e)} checked={checkBoxID.includes(product.SKU)} />{' '}
                                <p class="margin">{product.SKU}</p>
                                <p class="margin">{product.name}</p>
                                <p class="margin">{Number(product.price).toFixed(2)} $</p>
                            </div>
                        }
                        if (product.dvd != 0)
                            return <div class="grid-item">
                                <table class="border" key={key}>
                                    {displayList()}
                                    <p class="margin">Size: {product.dvd} MB</p>
                                </table>
                            </div>
                        else if (product.book != 0)
                            return <div class="grid-item">
                                <table class="border" key={key}>
                                    {displayList()}
                                    <p class="margin">Weight: {product.book} KG</p>
                                </table>
                            </div>
                        else return <div class="grid-item">
                            <table class="border" key={key}>
                                {displayList()}
                                <p class="margin">Dimension:&nbsp;{product.furn}</p>
                            </table>
                        </div>
                    }
                    )
                    }
                </div>
            </form>
        </div>
    )
}