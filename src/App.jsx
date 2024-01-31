import { Component } from "react";
import { requestImages } from './api';
import { ToastContainer, toast }  from  'react-toastify' ;
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery'
import { Button } from "components/Button/Button";
import { Loader } from "components/Loader/Loader";
import { Modal } from "components/Modal/Modal";

export class App extends Component {
  state = {
    query: '',
    status: 'idle',
    page: 1,
    images: [],   
    totalPages: null,    
    isOpenModal: false,
    modalData: [],
    error: null,
    isLoadMore: false,
  };

  componentDidUpdate(_, prevState) {
    const { page, query } = this.state;

    if (page !== prevState.page || prevState.query !== query) {
      this.fetchImages(query, page);
    }
  }

  fetchImages = async (query, page) => {
    try {
      if (!this.state.query) {
        return;
      }

      this.setState({ isLoadMore: true });
      const { hits, totalHits } = await requestImages(query, page);

      if (hits.length === 0) {
        toast.error('We did not find');
        return;
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        totalPages: page < Math.ceil(totalHits / 12),
        status: 'success',
        
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
      this.setState({
        status: 'error',
        error: error.message,
        
      });
    } finally {
      this.setState({ isLoadMore: false });
    }
  };

  handleFormSubmit = formData => {
    if (this.state.query === formData) {
      return;
    }
    this.setState({ query: formData, images: [], page: 1 });
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleOpenModal = (largeImageURL, tags) => {
    this.setState({
      modalData: { largeImageURL, tags },
      isOpenModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      isOpenModal: false,
    });
  };

  render () {
    const { images, isLoadMore, isOpenModal, totalPages } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit}/>
        {isLoadMore && <Loader />} 
        <ImageGallery images={images} onClickModal={this.handleOpenModal}/>
        {isOpenModal && (
          <Modal
            isOpenModal={isOpenModal}
            onCloseModal={this.handleCloseModal}
            modalData={this.state.modalData}
          />
        )}
        { totalPages && !isLoadMore  && images.length > 0  && (
          <Button handleLoadMore={this.handleLoadMore} />
        )}
        <ToastContainer autoClose={3000}/> 
      </div>
    );
  };
};
