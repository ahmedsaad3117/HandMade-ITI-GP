import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

// import { ProductService } from '../service/ProductService';
import {
  getProducts,
  updateProducts,
  AddProduct,
  deleteProducts
  // getProductsByCategoryId,
} from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";

import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import "./table.css";

const AdminListProducts = ({history}) => {
  const userLogin = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLogin;
  let emptyProduct = {
    _id:null,
    image:null,
    brand:"",
    price:0,
    rating:0,
    numReviews:0,
    isFeatured:null,
    name:"",
    description:"",
    category:null,
    reviews:null,
    countInStock: 0,
    richDescription: "",
    images: "",
    dateCreated: "",
//---------------
    // name: "",
    // image: null,
    // description: "",
    // category: null,
    // price: 0,
    // quantity: 0,
    // rating: 0,
    // inventoryStatus: "INSTOCK",
  };

  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const allProducts = useSelector((state) => state);
  const dispatch = useDispatch();
  // const imgState = { selectedFile: null }
  // var imgState
  const [imgState, setImgState] = useState(null);
  // const productService = new ProductService();

  // useEffect(() => {
  //   // productService.getProducts().then(data => setProducts(data));
  //   dispatch(getProducts());
  // }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (userInfo.length !== 0) {
      if(userInfo.data.user.isAdmin === false){
        
        history.push("/");
      }else{
        dispatch(getProducts());
      }
    } 
    else {
      history.push("/login");
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (allProducts.productReducer.length !== 0) {
      setProducts(allProducts.productReducer.data.data);
    }
  }, [allProducts.productReducer.length]);

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = () => {
    setSubmitted(true);

    if (product.name.trim()) {
      let _products = [...products];
      let _product = { ...product };
      if (product.id) {
        const index = findIndexById(product.id);

        _products[index] = _product;
        console.log(_product);
        console.log(_product.id);
        console.log(product.id);
        console.log(_product);
        console.log(product);
        dispatch(updateProducts(product.id, _product));
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        });
      } else {
        _product.id = createId();
        _product._id=_product.id
        // _product.image = "product-placeholder.svg";
        _product.image = imgState;
        // let name=_product.name
        // let description=_product.description
        // let richDescription=_product.richDescription
        // let brand=_product.brand
        // let price=_product.price
        // let category=_product.category
        // let countInStock=_product.countInStock
        // let rating=_product.rating
        // let numReviews=_product.numReviews
        // let isFeatured=_product.isFeatured
        // let newProduct={};
        // newProduct.name=name
        // newProduct.description=description
        // newProduct.richDescription=richDescription
        // newProduct.brand=brand
        // newProduct.price=price
        // newProduct.category=category
        // newProduct.countInStock=countInStock
        // newProduct.rating=rating
        // newProduct.numReviews=numReviews
        // newProduct.isFeatured=isFeatured
        // console.log(newProduct)
        console.log(imgState);
        _products.push(_product);
        console.log(_product);
        console.log(_product.name,"name");
        _product.isFeatured=false;
        console.log(_product.name, _product.description,_product.richDescription,_product.brand,_product.price,_product.category,_product.countInStock,_product.rating,_product.numReviews,_product.isFeatured);
        dispatch(AddProduct(_product.name, _product.description,_product.richDescription,_product.brand,_product.price,_product.category,_product.countInStock,_product.rating,_product.numReviews,_product.isFeatured));
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 3000,
        });
      }

      setProducts(_products);
      setProductDialog(false);
      setProduct(emptyProduct);
    }
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    let _products = products.filter((val) => val.id !== product.id);
    //TODO
    console.log(product.id);
    dispatch(deleteProducts(product.id));
    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = () => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  const importCSV = (e) => {
    const file = e.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target.result;
      const data = csv.split("\n");

      // Prepare DataTable
      const cols = data[0].replace(/['"]+/g, "").split(",");
      data.shift();

      const importedData = data.map((d) => {
        d = d.split(",");
        const processedData = cols.reduce((obj, c, i) => {
          c =
            c === "Status"
              ? "inventoryStatus"
              : c === "Reviews"
              ? "rating"
              : c.toLowerCase();
          obj[c] = d[i].replace(/['"]+/g, "");
          (c === "price" || c === "rating") && (obj[c] = parseFloat(obj[c]));
          return obj;
        }, {});

        processedData["id"] = createId();
        return processedData;
      });

      const _products = [...products, ...importedData];

      setProducts(_products);
    };

    reader.readAsText(file, "UTF-8");
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = () => {
    let _products = products.filter((val) => !selectedProducts.includes(val));
    selectedProducts.map((val) => {
      //TODO
      dispatch(deleteProducts(val.id));
      console.log(val.id)
    });
    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
  };

  const onCategoryChange = (e) => {
    let _product = { ...product };
    _product["category"] = e.value;
    setProduct(_product);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
        />
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <FileUpload
          mode="basic"
          name="demo[]"
          auto
          url="https://primefaces.org/primereact/showcase/upload.php"
          accept=".csv"
          chooseLabel="Import"
          className="p-mr-2 p-d-inline-block"
          onUpload={importCSV}
        />
        <Button
          label="Export"
          icon="pi pi-upload"
          className="p-button-help"
          onClick={exportCSV}
        />
      </React.Fragment>
    );
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={`${rowData.image}`}
        // src={`showcase/demo/images/product/${rowData.image}`}
        onError={(e) =>
          (e.target.src =
            "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
        }
        alt={rowData.image}
        className="product-image"
      />
    );
  };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  };

  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.rating} readOnly cancel={false} />;
  };

  // const statusBodyTemplate = (rowData) => {
  //   return (
  //     <span
  //       className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}
  //     >
  //       {rowData.inventoryStatus}
  //     </span>
  //   );
  // };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="p-mx-0 p-my-1">Manage Products</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveProduct}
      />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );

const imgChange=(event) => {
  // const file = event.target.files[0]
  console.log(event.target.files[0]);
  setImgState(event.target.files[0])
}


  return (
    <div className="datatable-crud-demo">
      <Toast ref={toast} />

      <div className="card">
        <Toolbar
          className="p-mb-4"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>

        <DataTable
          ref={dt}
          value={products}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
          header={header}
          responsiveLayout="scroll"
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
            exportable={false}
          ></Column>
          <Column
            field="_id"
            // field="code"
            header="_id"
            // header="Code"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="name"
            header="Name"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            field="image"
            header="Image"
            body={imageBodyTemplate}
          ></Column>
          <Column
            field="price"
            header="Price"
            body={priceBodyTemplate}
            sortable
            style={{ minWidth: "8rem" }}
          ></Column>
          <Column
            field="countInStock"
            header="countInStock"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            field="category"
            header="Category"
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="rating"
            header="Reviews"
            body={ratingBodyTemplate}
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          {/* <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column> */}
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "8rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={productDialog}
        style={{ width: "450px" }}
        header="Product Details"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        {product.image && (
          <img
            src={`${product.image}`}
            // src={`showcase/demo/images/product/${product.image}`}
            onError={(e) =>
              (e.target.src =
                "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
            }
            alt={product.image}
            className="product-image p-d-block p-m-auto p-pb-3"
          />
        )}
        <div className="p-field">
          {/* //TODO */}
        <input type="file" name="myImage" accept="image/*" onChange={(e)=>imgChange(e)} />
        </div>
        <div className="p-field">
          <label htmlFor="name">Name</label>
          <InputText
            id="name"
            value={product.name}
            onChange={(e) => onInputChange(e, "name")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !product.name })}
          />
          {submitted && !product.name && (
            <small className="p-error">Name is required.</small>
          )}
        </div>
        <div className="p-field">
          <label htmlFor="description">Description</label>
          <InputTextarea
            id="description"
            value={product.description}
            onChange={(e) => onInputChange(e, "description")}
            required
            rows={3}
            cols={20}
          />
          {submitted && !product.description && (
            <small className="p-error">Description is required.</small>
          )}
        </div>
        <div className="p-field">
          <label htmlFor="richDescription">richDescription</label>
          <InputTextarea
            id="richDescription"
            value={product.richDescription}
            onChange={(e) => onInputChange(e, "richDescription")}
            required
            rows={3}
            cols={20}
          />
          {submitted && !product.richDescription && (
            <small className="p-error">richDescription is required.</small>
          )}
        </div>
        <div className="p-field">
          <label className="p-mb-3">Category</label>
          <div className="p-formgrid p-grid">
            <div className="p-field-radiobutton p-col-6">
              <RadioButton
                inputId="category1"
                name="category"
                value="Accessories"
                onChange={onCategoryChange}
                checked={product.category === "Accessories"}
              />
              <label htmlFor="category1">Accessories</label>
            </div>
            <div className="p-field-radiobutton p-col-6">
              <RadioButton
                inputId="category2"
                name="category"
                value="Clothing"
                onChange={onCategoryChange}
                checked={product.category === "Clothing"}
              />
              <label htmlFor="category2">Clothing</label>
            </div>
            <div className="p-field-radiobutton p-col-6">
              <RadioButton
                inputId="category3"
                name="category"
                value="Electronics"
                onChange={onCategoryChange}
                checked={product.category === "Electronics"}
              />
              <label htmlFor="category3">Electronics</label>
            </div>
            <div className="p-field-radiobutton p-col-6">
              <RadioButton
                inputId="category4"
                name="category"
                value="Fitness"
                onChange={onCategoryChange}
                checked={product.category === "Fitness"}
              />
              <label htmlFor="category4">Fitness</label>
            </div>
          </div>
        </div>

        <div className="p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="price">Price</label>
            <InputNumber
              id="price"
              value={product.price}
              onValueChange={(e) => onInputNumberChange(e, "price")}
              mode="currency"
              currency="USD"
              locale="en-US"
            />
          </div>
          <div className="p-field p-col">
            <label htmlFor="countInStock">countInStock</label>
            <InputNumber
              id="countInStock"
              value={product.countInStock}
              onValueChange={(e) => onInputNumberChange(e, "countInStock")}
              integeronly
            />
            {submitted && !product.countInStock && (
            <small className="p-error">countInStock is required.</small>
          )}
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>
              Are you sure you want to delete <b>{product.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductsDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>Are you sure you want to delete the selected products?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
};
export default AdminListProducts;
