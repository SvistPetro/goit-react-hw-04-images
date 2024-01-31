import { useState, useEffect } from "react";
import { requestImages } from './api';
import { ToastContainer, toast }  from  'react-toastify' ;
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery'
import { Button } from "components/Button/Button";
import { Loader } from "components/Loader/Loader";
import { Modal } from "components/Modal/Modal";

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [isLoadMore, setIsLoadMore] = useState(false);

  useEffect(() => {
      fetchImages(query, page);
  }, [page, query])

  const fetchImages = async (query, page) => {
    try {
      if (!query) {
        return;
      }
      setIsLoadMore(true);
      
      const { hits, totalHits } = await requestImages(query, page);

      if (hits.length === 0) {
        toast.error('We did not find');
        return;
      }

      setImages(prevImage => [...prevImage, ...hits]);
      setTotalPages(page < Math.ceil(totalHits / 12));

    } catch (error) {
      console.error('Error fetching images:', error);
      
    } finally {
      setIsLoadMore(false);
    }
  };

  const handleFormSubmit = formData => {
    if (query === formData) {
      return;
    }

    setQuery(formData);
    setImages([]);
    setPage(1);
  }

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleOpenModal = (largeImageURL, tags) => {
    setModalData({ largeImageURL, tags });
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit}/>
      {isLoadMore && <Loader />} 
      <ImageGallery images={images} onClickModal={handleOpenModal}/>
      {isOpenModal && (
        <Modal
          isOpenModal={isOpenModal}
          onCloseModal={handleCloseModal}
          modalData={modalData}
        />
      )}
      { totalPages && !isLoadMore  && images.length > 0  && (
        <Button handleLoadMore={handleLoadMore} />
      )}
      <ToastContainer autoClose={3000}/> 
    </div>
  );
}






// export class App extends Component {
//   state = {
//     query: '',
//     status: 'idle',
//     page: 1,
//     images: [],   
//     totalPages: null,    
//     isOpenModal: false,
//     modalData: [],
//     error: null,
//     isLoadMore: false,
//   };

//   componentDidUpdate(_, prevState) {
//     const { page, query } = this.state;

//     if (page !== prevState.page || prevState.query !== query) {
//       this.fetchImages(query, page);
//     }
//   }

//   fetchImages = async (query, page) => {
//     try {
//       if (!this.state.query) {
//         return;
//       }

//       this.setState({ isLoadMore: true });
//       const { hits, totalHits } = await requestImages(query, page);

//       if (hits.length === 0) {
//         toast.error('We did not find');
//         return;
//       }
//       this.setState(prevState => ({
//         images: [...prevState.images, ...hits],
//         totalPages: page < Math.ceil(totalHits / 12),
//         status: 'success',
        
//       }));
//     } catch (error) {
//       console.error('Error fetching images:', error);
//       this.setState({
//         status: 'error',
//         error: error.message,
        
//       });
//     } finally {
//       this.setState({ isLoadMore: false });
//     }
//   };

//   handleFormSubmit = formData => {
//     if (this.state.query === formData) {
//       return;
//     }
//     this.setState({ query: formData, images: [], page: 1 });
//   }

//   handleLoadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   handleOpenModal = (largeImageURL, tags) => {
//     this.setState({
//       modalData: { largeImageURL, tags },
//       isOpenModal: true,
//     });
//   };

//   handleCloseModal = () => {
//     this.setState({
//       isOpenModal: false,
//     });
//   };

//   render () {
//     const { images, isLoadMore, isOpenModal, totalPages } = this.state;

//     return (
//       <div>
//         <Searchbar onSubmit={this.handleFormSubmit}/>
//         {isLoadMore && <Loader />} 
//         <ImageGallery images={images} onClickModal={this.handleOpenModal}/>
//         {isOpenModal && (
//           <Modal
//             isOpenModal={isOpenModal}
//             onCloseModal={this.handleCloseModal}
//             modalData={this.state.modalData}
//           />
//         )}
//         { totalPages && !isLoadMore  && images.length > 0  && (
//           <Button handleLoadMore={this.handleLoadMore} />
//         )}
//         <ToastContainer autoClose={3000}/> 
//       </div>
//     );
//   };
// };
