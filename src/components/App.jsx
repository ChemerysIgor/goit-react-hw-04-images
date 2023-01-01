import Searchbar from './Searchbar/Searchbar'
import { ImageGallery } from './ImageGallery/ImageGallery';
import { useState, useEffect} from 'react';

import { GlobalStyles } from './GlobalStyles';
import { LoadMore } from './Button/Button';
import { Grid } from 'react-loader-spinner';

const BASE_URL = "https://pixabay.com/api/";
const KEY = "30718387-37dd0a29c3a586dd3ee616e94"


export default function App() {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
 
  useEffect(() => {
    
    if (searchValue === "") { return }

    setStatus("pending");
    fetch(`${BASE_URL}?q=${searchValue}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response => { return response.json() }  )
      .then(response => {
         if (response.hits.length === 0) {
             setError("There are no images matching your request! Try another keyring");
             setStatus("rejected")
            }
          else {
            if (response.hits.length === response.hits.total || response.hits.length < 12) {
              setStatus("idle")
            } else { setStatus("resolved") }
          }
           const loadImg =  response.hits.map(hit => {
            return { id: hit.id, tags: hit.tags, largeImage: hit.largeImageURL, smallImage: hit.webformatURL };          
           })
        console.log(loadImg)
         
        const addImages = (loadImg) => {
      
          setImages(prevState => {
             console.log(prevState)
            if (!prevState) { return loadImg }
            return [...prevState, ...loadImg]
          })
        }
    
          addImages(loadImg)
        }
    ).catch(error => {
      setError(error.message)
      setStatus( "rejected")
    })
  }
    , [searchValue, page])
  
 

  const handleLoading = () => {
     setPage(prevState => { return prevState + 1}
    ) };

const handleFormValue = (value) => {
  setStatus("");
  setPage(1);
  setSearchValue(value);
setImages(null)
    };
   
   return (
 <>
        <GlobalStyles />
       <Searchbar onForm={handleFormValue} status={status} />
        
       {status === "pending" && <Grid
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />}
        {status === "rejected" && <div> {error}</div>}
      
         
        {images && <ImageGallery images={images} />}
         {status === "resolved" && <LoadMore MoreLoading={handleLoading} />}
        </>
  )
      }



 

