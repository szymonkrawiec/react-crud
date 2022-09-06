import React, { Component } from 'react'
import './AddProduct.css'

export default class Dvd extends Component {
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
                        <label>Size (MB) </label>
                        <td>
                            <input size="18" class="shadow" id="size" value={this.props.text} onChange={this.handleTextChange} maxlength="3" placeholder="Only numbers" />
                            {(this.props.data.submitted) && !this.props.text && (<div class="message error"><strong>Size</strong> is required</div>)}
                            {isNaN(Number(this.props.text)) && (<div class="message error"><strong>Size</strong> not numeric</div>)}
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}