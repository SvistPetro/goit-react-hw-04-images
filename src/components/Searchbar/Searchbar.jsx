import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
    const [inputValue, setInputValue] = useState('');

    const handleChangeInput = (e) => {
        setInputValue(e.target.value);
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

        if(inputValue.trim() === '') {
            toast.error('Pleace, enter text in the search field');
            return;
        }

        const formData = inputValue.trim().toString().toLowerCase();
        onSubmit(formData);

        setInputValue('');
    }

    return (
        <header className={css.searchbar}>
            <form className={css.searchForm} onSubmit={handleSubmitForm} name='FormInput'>
                    <button type="submit" className={css.searchFormButton}>
                        <span className={css.searchFormButtonLabel}>Search</span>
                    </button>
                    <label htmlFor="FormInput">
                        <input
                        id="FormInput"
                        className={css.searchFormInput}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={inputValue}
                        onChange={handleChangeInput}
                        />
                    </label>
            </form>
        </header>
    );
}

export { Searchbar };

// class Searchbar extends Component {
//     state = {
//         inputValue: ''
//     }

//     handleChangeInput = (e) => {
//         this.setState({inputValue: e.target.value});
//     }

//     handleSubmitForm = (e) => {
//         e.preventDefault();

//         if(this.state.inputValue.trim() === '') {
//             toast.error('Pleace, enter text in the search field');
//             return;
//         }

//         const formData = this.state.inputValue.trim().toString().toLowerCase();
//         this.props.onSubmit(formData);

//         this.setState({inputValue: ''});
//     }

//     render () {
//         return (
//             <header className={css.searchbar}>
//                 <form className={css.searchForm} onSubmit={this.handleSubmitForm} name='FormInput'>
//                         <button type="submit" className={css.searchFormButton}>
//                             <span className={css.searchFormButtonLabel}>Search</span>
//                         </button>
//                         <label htmlFor="FormInput">
//                             <input
//                             id="FormInput"
//                             className={css.searchFormInput}
//                             type="text"
//                             autoComplete="off"
//                             autoFocus
//                             placeholder="Search images and photos"
//                             value={this.state.inputValue}
//                             onChange={this.handleChangeInput}
//                             />
//                         </label>
//                 </form>
//             </header>
//         )
//     }

// }