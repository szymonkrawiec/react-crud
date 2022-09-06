import React, { Component } from 'react'
import "./AddProduct.css"

export default class Length extends Component {

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
                        <label>Length (CM)</label>
                        <td>
                            <input size="14" id="length" class="shadow" value={this.props.text} onChange={this.handleTextChange} maxlength="3" placeholder="Only numbers" />
                            {(this.props.data.submitted) && !this.props.text && (<div class="message error"><strong>Length</strong> is required</div>)}
                            {isNaN(Number(this.props.text)) && (<div class="message error"><strong>Length</strong> not numeric</div>)}
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}


