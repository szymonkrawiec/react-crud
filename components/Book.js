import React, { Component } from 'react'
import "./AddProduct.css"

export default class Book extends Component {
    constructor(props) {
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleTextChange(event) {
        this.props.handleTextChange(event.target.value);
    }

    render() {
        return (
            <div>
                <table>
                    <tr>
                        <label>Weight (KG) </label>
                        <td>
                            <input size="15" id="weight" class="shadow" value={this.props.text} onChange={this.handleTextChange} placeholder="Only numbers" />
                            {(this.props.data.submitted) && !this.props.text && (<div class="message error"><strong>Book</strong> is required</div>)}
                            {isNaN(Number(this.props.text)) && (<div class="message error"><strong>Book</strong> not numeric</div>)}
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}