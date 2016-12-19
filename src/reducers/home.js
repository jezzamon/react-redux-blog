//{...state} is like Object.assign - creates a new object 
export default (state = {}, action) => {
  switch (action.type) {
    case 'HOME_PAGE_LOADED':
      return {};
  }

  return state;
};