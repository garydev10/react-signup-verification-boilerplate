import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { productService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [products, setProducts] = useState(null);

    useEffect(() => {
        productService.getAll().then(x => setProducts(x));
    }, []);

    function deleteProduct(id) {
        setProducts(products.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        productService.delete(id).then(() => {
            setProducts(products => products.filter(x => x.id !== id));
        });
    }

    return (

        <div>
            <div class="row">
                {products && products.map(product =>
                    <div className="col-md-4 p-2">
                        <div className="card">
                            <img className="card-img-top" src={"https://i.ibb.co/ypkgK0X/blue-beanie.png"} alt={product.shortDesc} />
                            <div className="card-body">
                                <h6 className="card-title d-flex justify-content-between text-uppercase">
                                    <span>{product.name}</span>
                                    <span>${product.price}</span>
                                </h6>
                                <h6 className="card-text d-flex justify-content-between">
                                    <p>
                                        {product.stock > 0 ? (
                                            <small className="text-muted">{product.stock + " Available"}</small>
                                        ) : (
                                            <small className="text-muted">Out Of Stock</small>
                                        )}
                                    </p>
                                    <a href="#" className="btn btn-primary">Add to Cart</a>
                                </h6>
                                <p className="card-text">{product.description}</p>

                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>


        // <div>
        //     <h1>Products</h1>
        //     <p>All products from secure (admin only) api end point:</p>
        //     <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Product</Link>
        //     <table className="table table-striped">
        //         <thead>
        //             <tr>
        //                 <th style={{ width: '10%' }}>ID</th>
        //                 <th style={{ width: '20%' }}>Name</th>
        //                 <th style={{ width: '10%' }}>Stock</th>
        //                 <th style={{ width: '10%' }}>Price</th>

        //                 <th style={{ width: '20%' }}>shortDesc</th>
        //                 <th style={{ width: '20%' }}>description</th>
        //                 <th style={{ width: '10%' }}></th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {products && products.map(product =>
        //                 <tr key={product.id}>
        //                     <td>{product.id}</td>
        //                     <td>{product.name}</td>
        //                     <td>{product.stock}</td>
        //                     <td>{product.price}</td>

        //                     <td>{product.shortDesc}</td>
        //                     <td>{product.description}</td>
        //                     <td style={{ whiteSpace: 'nowrap' }}>
        //                         <Link to={`${path}/edit/${product.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
        //                         <button onClick={() => deleteProduct(product.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={product.isDeleting}>
        //                             {product.isDeleting
        //                                 ? <span className="spinner-border spinner-border-sm"></span>
        //                                 : <span>Delete</span>
        //                             }
        //                         </button>
        //                     </td>
        //                 </tr>
        //             )}
        //             {!products &&
        //                 <tr>
        //                     <td colSpan="4" className="text-center">
        //                         <span className="spinner-border spinner-border-lg align-center"></span>
        //                     </td>
        //                 </tr>
        //             }
        //         </tbody>
        //     </table>
        // </div>

    );
}

export { List };