import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Loader from './loader'
import Search from './searchBar'
import { getDataList, clearList, setDetails, setLikedItemList } from '../action/DataList'


const Home = React.memo(({ getDataList, clearList, data, isData, setDetails, likedData, setLikedItemList }) => {
  const [searchText, setSearchText] = useState("")
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [liked, setLiked] = useState([])

  const history = useHistory()

  const loadMore = useCallback(() => {
    setLoading(true)
    let pg = page + 1
    getDataList({ PageNo: pg, searchParam: searchText, limit: 12 }, onSuccess)
    setPage(pg)
  }, [loading, data])

  const onSuccess = useCallback((bool) => {
    setLoading(bool)
  }, [])

  useEffect(() => {
    setLoading(true)
    clearList()
    let payload = {
      searchParam: searchText,
      PageNo: 1,
      limit: 12,
    }
    getDataList(payload, onSuccess)
  }, [searchText])

  const getSearchKeyword = (searchInput) => {
    setSearchText(searchInput)
  }

  const showDetails = (item) => {
    setDetails(item)
    history.push(`/details`)
  }

  React.useEffect(() => {
    setLiked(JSON.parse(localStorage.getItem('likedList')))

    return () => {
      localStorage.setItem('likedList', JSON.stringify({ liked: [...liked] }))
    }
  }, [])

  React.useEffect(() => {
    console.log("qwertyuiqwertyuwerty----------->>>>", liked)

  })

  const removeLikedItemFromList = (e, id) => {
    e.stopPropagation()
    let removeIndex = liked.indexOf(id)
    let newList =   liked.splice(removeIndex, 1)
    setLiked(liked)
    localStorage.setItem('likedList', JSON.stringify(liked))
    setLikedItemList(liked)
  };

  const likedListItem = (e, id) => {
    e.stopPropagation()
    if (liked  && liked.length > 0) {
      setLiked((prev) => { 
       return [...prev, id]})
      localStorage.setItem('likedList', JSON.stringify([...liked, id]))
    } else {
      setLiked([id])
      localStorage.setItem('likedList', JSON.stringify([id]))
    }

    setLikedItemList(liked)
  };


  return (
    <div className="container" >
      <nav
        style={{ background: '#2676bf' }}
        className="navbar navbar-expand-md navbar-dark fixed-top  p-5"
      >
        <Search getSearchKeyword={getSearchKeyword} />
      </nav>

      <div style={{ marginTop: '10rem', marginLeft: '2%' }} className=" container row">
        {data && data.map((item, i) => (

          <div className="col-4 mb-4 mt-1" key={i}>
            <div
              className="card h-100"
              style={{
                width: '18rem',
                borderRadius: '20px',
              }}
              onClick={() => showDetails(item)}
            >
              <img
                src={item.image_url}
                style={{ height: '18rem' }}
                className="card-img-top"
                alt="..."
              />

              <div className="card-header ">
              {liked && liked.length > 0 && liked.includes(item.mal_id) ? (
                      <button className="btn btn-success" 
                      onClick={(e) => removeLikedItemFromList(e, item.mal_id)}
                      // disabled={true}
                      >
                        {item.mal_id}
                        Liked
                      </button>
                    ) : (
                      <button
                        type='button'
                        onClick={(e) => likedListItem(e, item.mal_id)}
                      >
                        {item.mal_id}
                        Like
                      </button>
                    )}

              </div>


              <div
                // style={{
                //   display: 'flex',
                //   flexDirection: 'row',
                // }}
                className="card-body"
              >
                <h5
                  style={{
                    textOverflow: '',
                    padding: 'auto',
                  }}
                  className="card-title"
                >
                  {item.title}
                </h5>
              </div>
            </div>
          </div>

        ))}
      </div>

      {loading ? <Loader /> : (
        <div className="row text-center mt-2">
          <div className="col">
            {isData ? (
              <button
                className="btn btn-outline-success mb-2"
                onClick={(e) => loadMore(e)}
              >
                Load more
              </button>
            ) : (
                <p>No Data Found</p>
              )}
          </div>
        </div>
      )}
    </div>
  );
});

const mapStateToProps = ({ DataList }) => {
  return {
    data: DataList.data,
    isData: DataList.isData,
    likedData: DataList.likedData,
  };
};
export default connect(mapStateToProps, {
  getDataList,
  clearList,
  setDetails,
  setLikedItemList,
})(Home);
