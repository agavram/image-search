import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import ImageResults from "../image-results/ImageResults"
class Search extends Component {
	constructor(props) {
		super(props)
		this.state = {
			searchText: '',
			amount: 15,
			apiUrl: 'https://pixabay.com/api',
			apiKey: '3903925-d19c234c1af3f6f3498fac985',
			images: []
		}
	}

	onAmountChange = (e, index, value) => {
		this.setState({
			amount: value
		})
	}

	onTextChange = (e) => {
		const val = e.target.value;
		this.setState({ [e.target.name]: val }, () => {
			if (val === '') {
				this.setState({
					images: []
				})
			} else {
				axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}
            &image_type=photo&per_page=${this.state.amount}`).then(res => this.setState({ images: res.data.hits }))
					.catch(err => console.log(err));
			}
		});
	}

	render() {
		console.log(this.state.images);
		return (
			<div>
				<TextField
					name="searchText"
					value={this.state.searchText}
					onChange={this.onTextChange}
					floatingLabelText="Search for images"
					fullWidth={true}
				/>
				<SelectField
					name="amount"
					floatingLabelText="Amount"
					value={this.state.amount}
					onChange={this.onAmountChange}
				>
					<MenuItem value={5} primaryText="5" />
					<MenuItem value={10} primaryText="10" />
					<MenuItem value={15} primaryText="15" />
					<MenuItem value={30} primaryText="30" />
					<MenuItem value={50} primaryText="50" />
				</SelectField>
				<br />
				{this.state.images.length > 0 ? (<ImageResults images={this.state.images} />) : null}
			</div>
		)
	}
}

export default Search;