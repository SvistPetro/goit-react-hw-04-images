import { Component } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';

class Searchbar extends Component {
    state = {
        inputValue: ''
    }

    handleChangeInput = (e) => {
        this.setState({inputValue: e.target.value});
    }

    handleSubmitForm = (e) => {
        e.preventDefault();

        if(this.state.inputValue.trim() === '') {
            toast.error('Pleace, enter text in the search field');
            return;
        }

        const formData = this.state.inputValue.trim().toString().toLowerCase();
        this.props.onSubmit(formData);

        this.setState({inputValue: ''});
    }

    render () {
        return (
            <header className={css.searchbar}>
                <form className={css.searchForm} onSubmit={this.handleSubmitForm}>
                    <button type="submit" className={css.searchFormButton}>
                        <span className={css.searchFormButtonLabel}>Search</span>
                    </button>

                    <input
                    className={css.searchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={this.state.inputValue}
                    onChange={this.handleChangeInput}
                    />
                </form>
            </header>
        )
    }

}

export { Searchbar };