let initialState = {
  data: [],
  isData: true,
  detailData: '',
  likedData: [],
};
const DataList = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'MOVIE_LIST':
      return {
        ...state,
        data: payload.result ? [...state.data, ...payload.result] : [],
        isData: payload.isData,
      }
    case 'DETAIL_DATA':
      return {
        ...state,
        detailData: payload,
      };
      case 'LIKED_DATA':
        let newData = [...state.likedData];
        newData.push(payload);
        return {
          ...state,
          likedData: newData,
        };
  
    default:
      return state;
  }
};

export default DataList;
