import React from 'react';

const actions = {
  error: 'ERROR',
  changeItems: 'CHANGE_ITEMS',
  increaseCount: 'INCREASE_COUNT',
};

type ReducerAction = {
  type: string;
  payload?: any;
};

type ReducerState = {
  sync: number
  loading: boolean
  items: []
  error: boolean
}

const reducer = (state: ReducerState, action: ReducerAction): ReducerState => {
  switch (action.type) {
    case actions.changeItems:
      return { ...state, items: action.payload, loading: false };
    case actions.error:
      return { ...state, error: true };
    case actions.increaseCount:
      return { ...state, sync: state.sync + 1 };
    default:
      console.error('Not action type found in reducer: useLocalStorage');
      throw state;
  }
};

const getInitialState = (defaultValue: any = []) => ({
  sync: false,
  loading: false,
  items: defaultValue,
  error: false,
});


function useLocalStorage(itemName: string, defaultValue: any = [], withSync: boolean = true): HookStorage {

  if (typeof window === 'undefined') {
    // @ts-ignore
    return defaultValue;
  }


  const initialState = getInitialState(defaultValue);
  // @ts-ignore
  const [state, dispatch]: [state: ReducerState, dispatch: any] = React.useReducer(reducer, initialState);
  const { sync, loading, items, error } = state;

  if (withSync) {
    window.addEventListener('storage', (change) => {
      console.log('storage change', change);
      if (change.key === itemName) {
        console.log('Sync');
        dispatch({ type: actions.increaseCount });
      }
    });
  }
  React.useEffect(() => {
    setTimeout(() => {
      try {

        const localStorageItem = localStorage.getItem(itemName);
        let parsedItems;


        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(defaultValue));
          parsedItems = defaultValue;
        } else {
          parsedItems = JSON.parse(localStorageItem);
        }
        dispatch({ type: actions.changeItems, payload: parsedItems });
      } catch (e) {
        dispatch({ type: actions.error });
      }
    }, 0);
  }, [sync]);


  const saveItem = (newItems: any) => {
    const stringifyItems = JSON.stringify(newItems);
    localStorage.setItem(itemName, stringifyItems);
    dispatch({ type: actions.changeItems, payload: newItems });
  };

  return {
    items,
    saveItem,
    loading,
    error,
    sync,
  };
}

type HookStorage = {
  items: any;
  saveItem: (newItems: any) => void;
  loading: boolean;
  error: boolean;
  sync: number;
};

export default useLocalStorage;
