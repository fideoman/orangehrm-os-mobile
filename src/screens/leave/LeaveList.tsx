/*
 * This file is part of OrangeHRM
 *
 * Copyright (C) 2020 onwards OrangeHRM (https://www.orangehrm.com/)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

import React from 'react';
import {FlatList, View, RefreshControl} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import SafeAreaLayout from 'layouts/SafeAreaLayout';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {selectEmployeeLeaveList} from 'store/leave/leave-list/selectors';
import {fetchLeaveList} from 'store/leave/leave-list/actions';
import Divider from 'components/DefaultDivider';
import LeaveListItem from 'screens/leave/components/LeaveListItem';
import {LEAVE_DETAILS} from 'screens';
import {navigate, getNavigation} from 'lib/helpers/navigation';
import {LeaveListLeaveRequest} from 'store/leave/leave-list/types';

class LeaveList extends React.Component<LeaveListProps> {
  constructor(props: LeaveListProps) {
    super(props);
    this.updateLeaveList();
  }

  onRefresh = () => {
    this.props.fetchLeaveList();
  };

  componentWillMount() {
    getNavigation()?.addListener('state', this.updateLeaveList);
  }

  componentWillUnmount() {
    getNavigation()?.removeListener('state', this.updateLeaveList);
  }

  updateLeaveList = () => {
    if (this.props.leaveList === undefined) {
      this.props.fetchLeaveList();
    }
  };

  onPressLeave = (leaveRequest: LeaveListLeaveRequest) => () => {
    navigate(LEAVE_DETAILS, {leaveRequest});
  };

  render() {
    const {theme, leaveList} = this.props;
    return (
      <SafeAreaLayout>
        <FlatList
          data={leaveList}
          renderItem={({item}) => (
            <>
              <LeaveListItem
                leaveRequest={item}
                onPress={this.onPressLeave(item)}
              />
            </>
          )}
          keyExtractor={(item) => item.leaveRequestId}
          ItemSeparatorComponent={() => {
            return (
              <View style={{paddingHorizontal: theme.spacing}}>
                <Divider />
              </View>
            );
          }}
          ListFooterComponent={
            <View
              style={{
                paddingHorizontal: theme.spacing,
                paddingBottom: theme.spacing * 4,
              }}>
              <Divider />
            </View>
          }
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={this.onRefresh} />
          }
        />
      </SafeAreaLayout>
    );
  }
}

interface LeaveListProps extends WithTheme, ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
}

const mapStateToProps = (state: RootState) => ({
  leaveList: selectEmployeeLeaveList(state),
});

const mapDispatchToProps = {
  fetchLeaveList: fetchLeaveList,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const MyLeaveWithTheme = withTheme<LeaveListProps>()(LeaveList);

export default connector(MyLeaveWithTheme);
