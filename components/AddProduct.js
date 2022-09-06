import React, { Component } from 'react'
import axios from 'axios';
import Dvd from './Dvd';
import Book from './Book';
import Height from './Height';
import Width from './Width';
import Length from './Length';
import { withRouter } from './withRouter';
import './AddProduct.css'

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      furn: '', dvd: '', height: '', width: '', lengthd: '', book: '', switcher: '', DVDVisible: false, FurnitureVisible: false, BookVisible: false, invalidNumber: false,
      submitted: false,
      dataGet: [],
      invalidFields: [],
      checkedBoxes: [],
      unique: false,
    }

    this.handleTextDvd = this.handleTextDvd.bind(this);
    this.handleTextHeight = this.handleTextHeight.bind(this);
    this.handleTextWidth = this.handleTextWidth.bind(this);
    this.handleTextLength = this.handleTextLength.bind(this);
    this.handleTextBook = this.handleTextBook.bind(this);
    this.handleOnChangeSwitcher = this.handleOnChangeSwitcher.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.moveToHomepage = this.moveToHomepage.bind(this);
    this.displayArray = this.displayArray.bind(this);
  }

  componentDidMount() {
    axios.get('http://juniortestszymonkrawiec.x10.mx/php/get.php')
    // axios.get('http://localhost:8080/moj_php/get.php')
      .then(res => {
        const dataGet = res.data
        this.setState({ dataGet });
      })
  }

  moveToHomepage() {
    this.props.navigate('/')
  }

  handleTextDvd(newText) {
    this.setState({ dvd: newText, height: '', book: '', width: '', lengthd: '' });
  }
  handleTextHeight(newText) {
    this.setState({ height: newText, dvd: '', book: '' });
  }
  handleTextWidth(newText) {
    this.setState({ width: newText, dvd: '', book: '' });
  }
  handleTextLength(newText) {
    this.setState({ lengthd: newText, dvd: '', book: '' });
  }
  handleTextBook(newText) {
    this.setState({ book: newText, dvd: '', height: '', width: '', lengthd: '' });
  }

  handleOnChangeSwitcher(event) {
    this.setState({ switcher: event.target.value });
  };

  onHandleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    const getData = this.state.dataGet;
    if (event.target.name === "SKU") {
      this.displayArray(getData, event.target.value);
    }
    if (event.target.name === "price") {
      this.validateNumber(event.target.value, event.target.name);
    }

    this.state.furn = this.state.height + "x" + this.state.width + "x" + this.state.lengthd;

  }

  displayArray(array, value) {
    if ((array.findIndex((p) => p.SKU == value) != -1) == false) {
      this.setState({
        unique: true
      })
    }
    else {
      this.setState({
        unique: false
      }
      )
    }
  }

  validateNumber = (value, name) => {
    const regex = /^[0-9]\d*$/;
    if (value && !regex.test(value)) {
      this.setState({
        invalidNumber: true,
        invalidFields: [...this.state.invalidFields, name]
      });
    } else {
      this.setState({
        invalidNumber: false,
        invalidFields: this.state.invalidFields.filter(item => item !== name)
      });
    }
  };

  handleSubmit(event) {
    event.preventDefault();

    const { SKU, name, price, dvd, book, furn, unique } = this.state;

    const isDvDNumber = Number.isInteger(parseInt(dvd, 10))
    const isBookNumber = Number.isInteger(parseInt(book, 10))
    const priceOnlyNumber = Number.isInteger(parseInt(price, 10))
    const heightIsNumber = Number.isInteger(parseInt(this.state.height, 10));
    const widthIsNumber = Number.isInteger(parseInt(this.state.width, 10));
    const lenghtIsNumbe = Number.isInteger(parseInt(this.state.lengthd, 10));

    {
      this.setState({
        submitted: true
      });

      if (price == '' || name == '' || SKU == '') {
        this.setState({
          submitted: false,
        }
        )
      }

      // input validation - on "Save"
      // from first component if all of SKU / Name / Price was properly typed
      if (priceOnlyNumber == true && typeof (name) != 'undefined' && typeof (SKU) != 'undefined' && unique == true) {
        {
          // accept submit if its only number
          if (isDvDNumber == true || isBookNumber == true || (heightIsNumber == true && widthIsNumber == true && lenghtIsNumbe == true)) {
            axios.post('http://juniortestszymonkrawiec.x10.mx/php/add.php', { SKU, name, price, dvd, book, furn }).
            // axios.post('http://localhost:8080/moj_php/add.php', { SKU, name, price, dvd, book, furn }).
              then(response => {
                if (response.status === 200) {
                  window.location.href = '/';
                }
              })
          }
        }
      }
    }
  }

  handleUpdate() {
    this.setState(state =>
    ({
      ...state,
      furn: (state.height + "x" + state.width + "x" + state.lengthd)
    }))
  }

  render() {

    this.state.switcher === "DVD" ? this.state.DVDVisible = true : this.state.DVDVisible = false;
    this.state.switcher === "Furniture" ? this.state.FurnitureVisible = true : this.state.FurnitureVisible = false;
    this.state.switcher === "Book" ? this.state.BookVisible = true : this.state.BookVisible = false;
    const { submitted } = this.state;

    return (
      <div id="product_form">
        <p class="product">Product List</p>
        <form onSubmit={this.handleSubmit}>
          <div class="button-box">
            <button class="buttonsd" type="submit">Save</button>
            <button class="buttonsd" onClick={this.moveToHomepage}>Cancel</button>
          </div>
          <hr class="line" />
          <div class="marginleftA">
            <table>
              <tr>
                <label>
                  SKU:
                </label>
                <td>
                  <input class="shadow" name="SKU" id="sku" value={this.state.SKU || ""} onChange={this.onHandleChange} />
                  {submitted && !this.state.SKU && (<div class="message error"><strong>SKU</strong> is required</div>)}
                  {submitted && !this.state.unique && (<div class="message error"><strong>SKU</strong> must be unique </div>)}
                </td>
              </tr>
              <tr>
                <label>
                  Name:&nbsp;
                </label>
                <td>
                  <input name="name" class="shadow" id="name" value={this.state.name || ""} onChange={this.onHandleChange} />
                  {submitted && !this.state.name && (<div class="message error"><strong>Name</strong> is required</div>)}
                </td>
              </tr>
              <tr>
                <label>
                  Price:&nbsp;
                </label>
                <td>
                  <input name="price" class="shadow" id="price" value={this.state.price || ""} onChange={this.onHandleChange} />
                  {submitted && !this.state.price && (<div class="message error"><strong>Price</strong> is required</div>)}
                  {submitted && this.state.invalidFields.includes("price") && (<div class="message error"><strong>Price</strong> not numeric</div>)}
                </td>
              </tr>
            </table>
            <div onChange={this.handleUpdate}>
              <table>
                <tr>
                  <label class="labbel">TypeSwitcher</label>
                  <td>
                    <select class="select" value={this.state.switcher} id="productType" onChange={this.handleOnChangeSwitcher}>
                      <option value="TypeSwitcher">TypeSwitcher</option>
                      <option value="DVD">DVD</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Book">Book</option>
                    </select>
                    {submitted && this.state.switcher == '' && (<div class="message2 error"><strong>Switcher</strong> is required</div>)}
                  </td>
                </tr>
              </table>
              {this.state.DVDVisible && <Dvd text={this.state.dvd} handleTextChange={this.handleTextDvd} data={this.state} />}
              {this.state.FurnitureVisible && <Height text={this.state.height} handleTextChange={this.handleTextHeight} data={this.state} />}
              {this.state.FurnitureVisible && <Width text={this.state.width} handleTextChange={this.handleTextWidth} data={this.state} />}
              {this.state.FurnitureVisible && <Length text={this.state.lengthd} handleTextChange={this.handleTextLength} data={this.state} />}
              {this.state.BookVisible && <Book text={this.state.book} handleTextChange={this.handleTextBook} data={this.state} />}
            </div>
            <div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(AddProduct);