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
import {View, StyleSheet} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import MainLayout from 'layouts/MainLayout';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {selectEmployeeLeaveRequest} from 'store/leave/leave-list/selectors';
import {
  fetchEmployeeLeaveRequest,
  changeEmployeeLeaveRequestStatus,
} from 'store/leave/leave-list/actions';
import Text from 'components/DefaultText';
import Chip from 'components/DefaultChip';
import Avatar from 'components/DefaultAvatar';
import Button from 'components/DefaultButton';
import Divider from 'components/DefaultDivider';
import BottomDialog from 'components/BottomDialog';
import FlatButton from 'screens/leave/components/FlatButton';
import LeaveCommentListItem from 'screens/leave/components/LeaveCommentListItem';
import {LeaveListNavigatorParamList} from 'screens/leave/navigators/LeaveListNavigator';
import {LEAVE_DETAILS, LEAVE_DAYS, LEAVE_COMMENTS} from 'screens';
import {navigate} from 'lib/helpers/navigation';
import {
  ACTION_CANCEL,
  ACTION_REJECT,
  ACTION_APPROVE,
  ACTION_TYPE_CHANGE_STATUS,
  LeaveRequestAllowedActions,
} from 'store/leave/leave-list/types';

class LeaveDetails extends React.Component<
  LeaveDetailsProps,
  LeaveDetailsState
> {
  constructor(props: LeaveDetailsProps) {
    super(props);
    const {leaveRequest} = props.route.params;
    if (
      props.employeeLeaveRequest?.leaveRequestId !== leaveRequest.leaveRequestId
    ) {
      this.props.fetchEmployeeLeaveRequest(leaveRequest.leaveRequestId);
    }
    this.state = {
      action: undefined,
    };
  }

  onRefresh = () => {
    const {leaveRequest} = this.props.route.params;
    this.props.fetchEmployeeLeaveRequest(leaveRequest.leaveRequestId);
  };

  onPressApproveLeave = () => {
    this.setState({action: ACTION_APPROVE});
  };

  onPressRejectLeave = () => {
    this.setState({action: ACTION_REJECT});
  };

  onPressCancelLeave = () => {
    this.setState({action: ACTION_CANCEL});
  };

  onResetAction = () => {
    this.setState({action: undefined});
  };

  onPressAction = (status?: LeaveRequestAllowedActions) => () => {
    const {employeeLeaveRequest} = this.props;
    if (employeeLeaveRequest && status) {
      this.props.changeEmployeeLeaveRequestStatus(
        employeeLeaveRequest.leaveRequestId,
        {actionType: ACTION_TYPE_CHANGE_STATUS, status},
      );
    }
    this.onResetAction();
  };

  onPressLeaveDays = () => {
    const {employeeLeaveRequest} = this.props;
    if (employeeLeaveRequest) {
      navigate(LEAVE_DAYS, {employeeLeaveRequest});
    }
  };

  onPressComments = () => {
    const {employeeLeaveRequest} = this.props;
    if (employeeLeaveRequest) {
      navigate(LEAVE_COMMENTS, {employeeLeaveRequest});
    }
  };

  render() {
    const {theme, employeeLeaveRequest} = this.props;
    const {action} = this.state;
    const leaveTypeColor = employeeLeaveRequest?.leaveType.color;
    const leaveDates =
      employeeLeaveRequest?.fromDate === employeeLeaveRequest?.toDate
        ? employeeLeaveRequest?.fromDate
        : employeeLeaveRequest?.fromDate +
          ' to ' +
          employeeLeaveRequest?.toDate;
    return (
      <MainLayout
        onRefresh={this.onRefresh}
        footer={
          <>
            {employeeLeaveRequest?.allowedActions !== undefined &&
            employeeLeaveRequest.allowedActions.length !== 0 ? (
              <View
                style={[
                  styles.row,
                  styles.footerView,
                  {
                    paddingHorizontal: theme.spacing * 4,
                    paddingVertical: theme.spacing * 2,
                    backgroundColor: theme.palette.backgroundSecondary,
                  },
                ]}>
                <View>
                  {employeeLeaveRequest.allowedActions.indexOf(
                    ACTION_CANCEL,
                  ) !== -1 ? (
                    <Button
                      title={'Cancel'}
                      bordered
                      primary
                      onPress={this.onPressCancelLeave}
                    />
                  ) : null}
                </View>
                <View style={styles.row}>
                  {employeeLeaveRequest.allowedActions.indexOf(
                    ACTION_REJECT,
                  ) !== -1 ? (
                    <Button
                      title={'Reject'}
                      bordered
                      primary
                      onPress={this.onPressRejectLeave}
                    />
                  ) : null}
                  {employeeLeaveRequest.allowedActions.indexOf(
                    ACTION_APPROVE,
                  ) !== -1 ? (
                    <View style={{paddingLeft: theme.spacing * 2}}>
                      <Button
                        title={'Approve'}
                        primary
                        onPress={this.onPressApproveLeave}
                      />
                    </View>
                  ) : null}
                </View>
              </View>
            ) : null}
          </>
        }>
        <View
          style={{
            padding: theme.spacing * 3,
            paddingBottom: theme.spacing * 5,
            backgroundColor: theme.palette.backgroundSecondary,
          }}>
          <View
            style={[
              styles.row,
              {
                paddingVertical: theme.spacing * 2,
              },
            ]}>
            <View
              style={{
                paddingVertical: theme.spacing * 2,
                paddingRight: theme.spacing * 4,
              }}>
              <Avatar name={employeeLeaveRequest?.employeeName} />
            </View>
            <View>
              <View style={{paddingHorizontal: theme.spacing * 2}}>
                <Text
                  style={[
                    styles.empNameText,
                    {
                      color: theme.typography.darkColor,
                      fontSize: theme.typography.fontSize * 1.2,
                    },
                  ]}>
                  {employeeLeaveRequest?.employeeName}
                </Text>
              </View>
              <View
                style={{
                  paddingHorizontal: theme.spacing * 2,
                  marginVertical: theme.spacing,
                }}>
                <Text
                  style={{
                    color: theme.palette.secondary,
                    paddingBottom: theme.spacing,
                  }}>
                  {leaveDates}
                </Text>
                <View style={styles.chipView}>
                  <Chip
                    style={[
                      {
                        paddingVertical: theme.spacing,
                        paddingHorizontal: theme.spacing * 3,
                        marginBottom: theme.spacing,
                      },
                      leaveTypeColor
                        ? {backgroundColor: leaveTypeColor}
                        : undefined,
                    ]}>
                    <Text
                      numberOfLines={1}
                      style={[
                        leaveTypeColor
                          ? {color: theme.typography.lightColor}
                          : {color: theme.typography.darkColor},
                      ]}>
                      {employeeLeaveRequest?.leaveType.type
                        ? employeeLeaveRequest?.leaveType.type
                        : '--'}
                    </Text>
                  </Chip>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.row, styles.leaveBalanceView]}>
            <View>
              {employeeLeaveRequest?.leaveBreakdown.split(',').map((text) => (
                <Text>{text.trim()}</Text>
              ))}
            </View>
            <Text style={[{fontSize: theme.typography.smallFontSize}]}>
              {'Days Available: '}
              {employeeLeaveRequest?.leaveBalance
                ? employeeLeaveRequest?.leaveBalance
                : '--'}
              {' Day(s)'}
            </Text>
          </View>
        </View>
        <View style={{paddingBottom: theme.spacing * 5}}>
          <FlatButton
            text={'Leave Days'}
            icon={'calendar'}
            onPress={this.onPressLeaveDays}
          />
          <Divider />
          <FlatButton
            text={'Comments'}
            icon={'comment-text'}
            onPress={this.onPressComments}
          />
          <Divider />
          <View>
            {employeeLeaveRequest?.comments.map((comment, index) => (
              <View
                key={index}
                style={{
                  paddingHorizontal: theme.spacing * 4,
                }}>
                {index !== 0 ? <Divider /> : null}
                <View
                  style={{
                    paddingVertical: theme.spacing * 3,
                  }}>
                  <LeaveCommentListItem leaveComment={comment} />
                </View>
              </View>
            ))}
          </View>
        </View>
        <BottomDialog
          isVisible={action !== undefined}
          onCancel={this.onResetAction}>
          <View style={{padding: theme.spacing * 4}}>
            <Text
              style={{
                fontSize: theme.typography.headerFontSize,
                paddingBottom: theme.spacing * 3,
              }}>
              {'Confirmation required'}
            </Text>
            {action ? (
              <Text>{`Do you want to ${action.toLowerCase()} the leave request?`}</Text>
            ) : null}
            <View
              style={[
                styles.row,
                styles.confirmationButtonView,
                {paddingTop: theme.spacing * 5},
              ]}>
              <View
                style={[
                  styles.confirmationButton,
                  {paddingHorizontal: theme.spacing},
                ]}>
                <Button
                  fullWidth
                  title={'No'}
                  bordered
                  primary
                  onPress={this.onResetAction}
                />
              </View>
              <View
                style={[
                  styles.confirmationButton,
                  {paddingHorizontal: theme.spacing},
                ]}>
                <Button
                  fullWidth
                  title={'Yes'}
                  primary
                  onPress={this.onPressAction(action)}
                />
              </View>
            </View>
          </View>
        </BottomDialog>
      </MainLayout>
    );
  }
}

interface LeaveDetailsProps
  extends WithTheme,
    ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<LeaveListNavigatorParamList, typeof LEAVE_DETAILS>;
}

interface LeaveDetailsState {
  action?: LeaveRequestAllowedActions;
}

const styles = StyleSheet.create({
  chipView: {
    alignItems: 'flex-start',
  },
  empNameText: {
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
  },
  footerView: {
    justifyContent: 'space-between',
  },
  leaveBalanceView: {
    justifyContent: 'space-evenly',
  },
  confirmationButtonView: {
    justifyContent: 'space-evenly',
  },
  confirmationButton: {
    flex: 0.5,
  },
});

const mapStateToProps = (state: RootState) => ({
  employeeLeaveRequest: selectEmployeeLeaveRequest(state),
});

const mapDispatchToProps = {
  fetchEmployeeLeaveRequest: fetchEmployeeLeaveRequest,
  changeEmployeeLeaveRequestStatus: changeEmployeeLeaveRequestStatus,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const MyLeaveWithTheme = withTheme<LeaveDetailsProps>()(LeaveDetails);

export default connector(MyLeaveWithTheme);
