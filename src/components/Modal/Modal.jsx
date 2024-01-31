import { Component } from "react";
import css from './Modal.module.css';

class Modal extends Component {
    
    componentDidMount() {
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', this.onClickESC);
      }
    
      componentWillUnmount() {
        document.body.style.overflow = 'auto';
        window.removeEventListener('keydown', this.onClickESC);
      }     
    
      onClickESC = event => {
        if (event.code === 'Escape') {
          this.props.onCloseModal();
        } 
      };
    
      handleCloseModal = event => {
        if (event.target === event.currentTarget) {
          this.props.onCloseModal();
        }
      };
    
      render() {
        const { largeImageURL, tags } = this.props.modalData;
    
        return (
          <div className={css.overlay} onClick={this.handleCloseModal}>
            <div className={css.modal}>
              <img src={largeImageURL} alt={tags} />
            </div>
          </div>
        );
      }
}

export { Modal };