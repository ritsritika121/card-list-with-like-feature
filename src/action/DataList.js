import axios from 'axios';
import { toasterMessage } from '../@utils/utils'

export const getDataList = (payload, cb) => {
  let {searchParam, PageNo, limit} = payload
  return (dispatch) => {
    axios
      .get(
        `https://api.jikan.moe/v3/search/anime?q=${searchParam}&limit=${limit}&page=${PageNo}`
      )
      .then((result) => {
        cb && cb(true)
        if (result.status === 200) {
          dispatch({
            type: 'MOVIE_LIST',
            payload: { result: result.data.results, isData: result.data.results.length > 0 ? true : false},
          });
          cb && cb(false)
        }
      })
      .catch((err) => {
        dispatch({
          type: 'MOVIE_LIST',
          payload: { result: [], isData: false },
        })
        toasterMessage('error', err.response.data.error)
        cb && cb(false)
       
      })
      .catch(() => {
        toasterMessage('error', 'Something Bad Happened :(')
        cb && cb(false)
      })
  };
};

export const clearList = () => async (dispatch) => {
  dispatch({ type: 'MOVIE_LIST', payload: { result: '', isData: false } })
}

export const setDetails = (payload) => async (dispatch) => {
  dispatch({ type: 'DETAIL_DATA', payload })
}

export const setLikedItemList = (payload) => {
  return (dispatch) => {
    dispatch({
      type: 'LIKED_DATA',
      payload,
    });
  };
};



