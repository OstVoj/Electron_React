/* eslint-disable no-empty-pattern */
import { connect } from 'react-redux';

import Menu from '../components/Menu';
import { openLog } from '../actions/tab';

const MenuContainer = connect(
  ({}) => ({}),
  dispatch => ({
    openLog: () => {
      dispatch(openLog());
    }
  })
)(Menu);

export default MenuContainer;
