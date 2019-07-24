// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';
import Fieldset from '../../sections/Fieldset';

type Props = {
  loginStore: Object,
  selectedInspections: Array<number>,
  onChangeSelectedInspection: (inspections: Array<number>) => void
};

type States = {};

class InspectionItems extends Component<Props, States> {
  props: Props;

  state = {};

  getInspectionChecked = (inspection: Object) => {
    const selectedInspections = get(this.props, 'selectedInspections');
    const filters =
      selectedInspections &&
      selectedInspections.filter(
        selectedInspection => selectedInspection === Number(inspection.id)
      );

    return filters && filters.length;
  };

  handleCheckInspectionItem = (e: any, key: string) => {
    const { checked } = e.target;
    const { onChangeSelectedInspection } = this.props;

    if (key) {
      let { selectedInspections } = this.props;
      if (checked) {
        selectedInspections.push(Number(key));
      } else {
        selectedInspections = selectedInspections.filter(
          (inspection: any) => inspection !== key
        );
      }
      onChangeSelectedInspection(selectedInspections);
      this.forceUpdate();
    } else if (checked) {
      const { loginStore } = this.props;
      const { loader } = loginStore;
      const { vehinspectionlist } = loader;
      const inspections = vehinspectionlist.map(
        (inspection: any) => inspection.id
      );
      onChangeSelectedInspection(inspections);
    } else {
      onChangeSelectedInspection([]);
    }
  };

  getInspectionItems = () => {
    const { loginStore } = this.props;
    const vehinspectionlist = get(loginStore.loader, 'vehinspectionlist');

    return (
      <table>
        <thead>
          <tr>
            <th />
            <th>Item ID</th>
            <th>Inspection Item</th>
          </tr>
        </thead>
        <tbody>
          {vehinspectionlist &&
            vehinspectionlist.map((input, key) => (
              <tr key={key}>
                <td>
                  <input
                    type="checkbox"
                    name="checkContact"
                    checked={this.getInspectionChecked(input)}
                    onChange={(e: any) => {
                      this.handleCheckInspectionItem(e, input.id);
                    }}
                  />
                </td>
                <td>{input.id}</td>
                <td>{input.details}</td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  };

  render() {
    return (
      <Fieldset legend="Inspection Items" h={35}>
        {this.getInspectionItems()}
      </Fieldset>
    );
  }
}

function mapStateToProps(state: PropTypes.object) {
  return {
    loginStore: state.login
  };
}

export default connect(mapStateToProps)(InspectionItems);
