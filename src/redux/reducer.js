export default (state = [], action) => {
    switch (action.type) {
      case 'SHOW':
        return [...action.payload]
      default:
        return state;
    }
  };