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

export interface ApplyLeaveState {
  fromDate?: string;
  toDate?: string;
  pickedLeaveDates: boolean;
  comment?: string;
  duration: SingleDayDuration;
  partialOption: MultipleDayPartialOption;
}

export const PICK_FROM_DATE = 'APPLY_LEAVE_PICK_FROM_DATE';
export const PICK_TO_DATE = 'APPLY_LEAVE_PICK_TO_DATE';
export const PICK_LEAVE_DATES = 'APPLY_LEAVE_PICK_LEAVE_DATES';
export const SAVE_SINGLE_DAY_LEAVE_REQUEST =
  'APPLY_LEAVE_SAVE_SINGLE_DAY_LEAVE_REQUEST';
export const SAVE_MULTIPLE_DAY_LEAVE_REQUEST =
  'APPLY_LEAVE_SAVE_MULTIPLE_DAY_LEAVE_REQUEST';
export const PICK_SINGLE_DAY_DURATION = 'APPLY_LEAVE_PICK_SINGLE_DAY_DURATION';
export const PICK_MULTIPLE_DAY_PARTIAL_OPTION =
  'APPLY_LEAVE_PICK_MULTIPLE_DAY_PARTIAL_OPTION';
export const PICK_LEAVE_COMMENT = 'APPLY_LEAVE_PICK_LEAVE_COMMENT';
export const RESET_APPLY_LEAVE = 'APPLY_LEAVE_RESET_APPLY_LEAVE';
export const RESET_SINGLE_DAY_DURATION =
  'APPLY_LEAVE_RESET_SINGLE_DAY_DURATION';
export const RESET_MULTIPLE_DAY_PARTIAL_OPTION =
  'APPLY_LEAVE_RESET_MULTIPLE_DAY_PARTIAL_OPTION';

export interface PickFromDateAction {
  type: typeof PICK_FROM_DATE;
  date?: string;
}

export interface PickToDateAction {
  type: typeof PICK_TO_DATE;
  date?: string;
}

export interface PickDatesAction {
  type: typeof PICK_LEAVE_DATES;
  state: boolean;
}

export interface SaveSingleDayLeaveRequestAction {
  type: typeof SAVE_SINGLE_DAY_LEAVE_REQUEST;
  payload: SingleDayLeaveRequest;
}

export interface SaveMultipleDayLeaveRequestAction {
  type: typeof SAVE_MULTIPLE_DAY_LEAVE_REQUEST;
  payload: MultipleDayLeaveRequest;
}

export interface PickSingleDayDurationAction {
  type: typeof PICK_SINGLE_DAY_DURATION;
  duration: SingleDayDuration;
}

export interface PickMultipleDayPartialOptionAction {
  type: typeof PICK_MULTIPLE_DAY_PARTIAL_OPTION;
  partialOption: MultipleDayPartialOption;
}

export interface PickLeaveCommentAction {
  type: typeof PICK_LEAVE_COMMENT;
  comment?: string;
}

export interface ResetApplyLeaveAction {
  type: typeof RESET_APPLY_LEAVE;
}

export interface ResetSingleDayDurationAction {
  type: typeof RESET_SINGLE_DAY_DURATION;
}

export interface ResetMultipleDayPartialOptionAction {
  type: typeof RESET_MULTIPLE_DAY_PARTIAL_OPTION;
}

export type ApplyLeaveActionTypes =
  | PickFromDateAction
  | PickToDateAction
  | PickDatesAction
  | SaveSingleDayLeaveRequestAction
  | SaveMultipleDayLeaveRequestAction
  | PickSingleDayDurationAction
  | PickMultipleDayPartialOptionAction
  | PickLeaveCommentAction
  | ResetApplyLeaveAction
  | ResetSingleDayDurationAction
  | ResetMultipleDayPartialOptionAction;

export interface LeaveRequest {
  type: string;
  fromDate: string;
  toDate: string;
  comment?: string;
}

export type SingleDayDuration =
  | SingleDayLeaveRequestHalfDay
  | SingleDayLeaveRequestFullDay
  | SingleDayLeaveRequestSpecifyTime;

export type SingleDayLeaveRequest = SingleDayDuration & LeaveRequest;

export const HALF_DAY = 'half_day';
export const FULL_DAY = 'full_day';
export const SPECIFY_TIME = 'specify_time';
export const PARTIAL_OPTION_ALL = 'all';
export const PARTIAL_OPTION_START = 'start';
export const PARTIAL_OPTION_END = 'end';
export const PARTIAL_OPTION_START_END = 'start_end';
export const PARTIAL_OPTION_NONE = 'none';
export const HALF_DAY_MORNING = 'AM';
export const HALF_DAY_AFTERNOON = 'PM';
export const DEFAULT_FROM_TIME = '09:00';
export const DEFAULT_TO_TIME = '17:00';

export interface SingleDayLeaveRequestHalfDay {
  singleType: typeof HALF_DAY;
  singleAMPM: HalfDayType;
}

export interface SingleDayLeaveRequestFullDay {
  singleType: typeof FULL_DAY;
}

export interface SingleDayLeaveRequestSpecifyTime {
  singleType: typeof SPECIFY_TIME;
  singleFromTime: string;
  singleToTime: string;
}

export type HalfDayType = typeof HALF_DAY_MORNING | typeof HALF_DAY_AFTERNOON;

export type PartialOptions =
  | typeof PARTIAL_OPTION_NONE
  | typeof PARTIAL_OPTION_ALL
  | typeof PARTIAL_OPTION_START
  | typeof PARTIAL_OPTION_END
  | typeof PARTIAL_OPTION_START_END;

export type MultipleDayLeaveRequest = MultipleDayPartialOption & LeaveRequest;

export type MultipleDayPartialOption =
  | PartialDayAll
  | PartialDayStart
  | PartialDayEnd
  | PartialDayStartEnd
  | PartialDayNone;

export type PartialDayAll = {
  partialOption: typeof PARTIAL_OPTION_ALL;
} & PartialOptionsStartDay;

export type PartialDayStart = {
  partialOption: typeof PARTIAL_OPTION_START;
} & PartialOptionsStartDay;

export type PartialDayEnd = {
  partialOption: typeof PARTIAL_OPTION_END;
} & PartialOptionsEndDay;

export type PartialDayStartEnd = {
  partialOption: typeof PARTIAL_OPTION_START_END;
} & PartialOptionsStartDay &
  PartialOptionsEndDay;

export type PartialDayNone = {
  partialOption: typeof PARTIAL_OPTION_NONE;
};

export type PartialOptionsStartDay =
  | PartialOptionsStartDayHalfDay
  | PartialOptionsStartDaySpecifyTime;

export type PartialOptionsEndDay =
  | PartialOptionsEndDayHalfDay
  | PartialOptionsEndDayFullDay
  | PartialOptionsEndDaySpecifyTime;

export interface PartialOptionsStartDayHalfDay {
  startDayType: typeof HALF_DAY;
  startDayAMPM: HalfDayType;
}

export interface PartialOptionsStartDaySpecifyTime {
  startDayType: typeof SPECIFY_TIME;
  startDayFromTime: string;
  startDayToTime: string;
}

export interface PartialOptionsEndDayHalfDay {
  endDayType: typeof HALF_DAY;
  endDayAMPM: HalfDayType;
}

export interface PartialOptionsEndDayFullDay {
  endDayType: typeof FULL_DAY;
}

export interface PartialOptionsEndDaySpecifyTime {
  endDayType: typeof SPECIFY_TIME;
  endDayFromTime: string;
  endDayToTime: string;
}

export type LeaveRequestActions =
  | 'SCHEDULED'
  | 'PENDING'
  | 'REJECTED'
  | 'CANCELLED';
