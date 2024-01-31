import css from './Button.module.css';

const Button = ({ handleLoadMore }) => {
    return (
      <div className={css.buttonContainer}>
        <button className={css.button} type="button" onClick={handleLoadMore}>
          Load more
        </button>
      </div>
      
    );
  };
  
  export { Button };