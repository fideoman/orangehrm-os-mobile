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

import {
  INSTANCE_URL,
  USERNAME,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  EXPIRES_AT,
  SCOPE,
  TOKEN_TYPE,
} from 'services/storage';

export interface StorageState {
  [INSTANCE_URL]: NullableString;
  [USERNAME]: NullableString;
  [ACCESS_TOKEN]: NullableString;
  [REFRESH_TOKEN]: NullableString;
  [EXPIRES_AT]: NullableString;
  [SCOPE]: NullableString;
  [TOKEN_TYPE]: NullableString;
  loaded?: boolean;
  error?: any;
}

export type NullableString = string | null;

export const SET_ITEM = 'STORAGE_SET_ITEM';
export const SET_MULTI = 'STORAGE_SET_MULTI';
export const CHANGE_LOADED = 'STORAGE_CHANGE_LOADED';

export interface SetItemAction {
  type: typeof SET_ITEM;
  key: string;
  value: NullableString;
}

export interface SetMultiAction {
  type: typeof SET_MULTI;
  keyValuePairs: Partial<StorageState>;
}

export interface ChangeLoadedAction {
  type: typeof CHANGE_LOADED;
  state: boolean;
  error?: any;
}

export interface AuthParams {
  [INSTANCE_URL]: NullableString;
  [ACCESS_TOKEN]: NullableString;
  [REFRESH_TOKEN]: NullableString;
  [EXPIRES_AT]: NullableString;
}

export type StorageActionTypes =
  | SetItemAction
  | SetMultiAction
  | ChangeLoadedAction;
