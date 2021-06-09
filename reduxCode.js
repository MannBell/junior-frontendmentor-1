import { createStore } from "redux";

const MODAL = "MODAL";
const BACKDROP = "BACKDROP";
const BOOKMARK = "BOOKMARK";
const PLEDGESELECT = "PLEDGESELECT";
const PLEDGEINPUT = "PLEDGEINPUT";
const PLEDGESUBMIT = "PLEDGESUBMIT";

const handleModal = (opener) => ({
  type: MODAL
  , opener
});

const handleBD = () => ({
  type: BACKDROP
});

const handleBookmark = () => ({
  type: BOOKMARK
});

const handlePledgeSelection = (value, e) => ({
  type: PLEDGESELECT
  , id: e.target.id
  , value
})

const handlePledgeInput = (e) => ({
  type: PLEDGEINPUT
  , value: e.target.value
})

const handlePledgeSubmit = (opener, e) => ({
  type: PLEDGESUBMIT
  , opener
  , e
})

const initialState = {
  currModal: ""
  , bookmarked: false
  , selectedPledge: ""
  , pledgeValue: ""
  , minPledgeValue: ""
  , backing: {
      backed: 89914
      , backers: 5007
  }
};

const reducer = (state={...initialState}, action) => {
  switch(action.type) {
    case MODAL
    : {
      return {...state, currModal: state.currModal === action.opener ? "" : action.opener}
    }
    case BACKDROP
    : {
      return {...state, currModal: ""}
    }
    case BOOKMARK
    : {
      return {...state, bookmarked: !state.bookmarked}
    }
    case PLEDGESELECT
    : {
      return ({
        ...state
        , selectedPledge: action.id
        , minPledgeValue: action.value
        , pledgeValue: action.value
      });
    }
    case PLEDGEINPUT
    : {
      return ({
        ...state
        , pledgeValue: action.value
      })
    }
    case PLEDGESUBMIT
    : {
      action.e.preventDefault();
      return state.pledgeValue >= state.minPledgeValue
        ? {
            ...initialState
            , bookmarked: state.bookmarked
            , backing: {
                backed: state.backing.backed + +state.pledgeValue
                , backers: state.backing.backers + 1
              }
            , currModal: action.opener
          }
        : state
    }
    default
    : return state
  }
}

export const store = createStore(reducer);
export const mapStateToProps = (state) => ({
  currModal: state.currModal
  , bookmarked: state.bookmarked
  , selectedPledge: state.selectedPledge
  , pledgeValue: state.pledgeValue
  , backing: state.backing
});
export const mapDispatchToProps = (dispatch) => ({
  handleModal: (opener) => dispatch(handleModal(opener))
  , handleBD: () => dispatch(handleBD())
  , handleBookmark: () => dispatch(handleBookmark())
  , handlePledgeSelection: (value, e) => dispatch(handlePledgeSelection(value, e))
  , handlePledgeInput: (e) => dispatch(handlePledgeInput(e))
  , handlePledgeSubmit: (opener, e) => dispatch(handlePledgeSubmit(opener, e))
});