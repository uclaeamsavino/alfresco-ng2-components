/*!
 * @license
 * Copyright 2019 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { by, element } from 'protractor';
import { BrowserVisibility, BrowserActions } from '@alfresco/adf-testing';

export class PeopleGroupCloudComponentPage {

    peopleCloudSingleSelectionChecked = element(by.css('mat-radio-button[data-automation-id="app-people-single-mode"][class*="mat-radio-checked"]'));
    peopleCloudMultipleSelectionChecked = element(by.css('mat-radio-button[data-automation-id="app-people-multiple-mode"][class*="mat-radio-checked"]'));
    peopleCloudSingleSelection = element(by.css('mat-radio-button[data-automation-id="app-people-single-mode"]'));
    peopleCloudMultipleSelection = element(by.css('mat-radio-button[data-automation-id="app-people-multiple-mode"]'));
    peopleCloudFilterRole = element(by.css('mat-radio-button[data-automation-id="app-people-filter-role"]'));
    groupCloudSingleSelection = element(by.css('mat-radio-button[data-automation-id="app-group-single-mode"]'));
    groupCloudMultipleSelection = element(by.css('mat-radio-button[data-automation-id="app-group-multiple-mode"]'));
    groupCloudFilterRole = element(by.css('mat-radio-button[data-automation-id="app-group-filter-role"]'));
    peopleRoleInput = element(by.css('input[data-automation-id="app-people-roles-input"]'));
    peopleAppInput = element(by.css('input[data-automation-id="app-people-app-input"]'));
    peoplePreselect = element(by.css('input[data-automation-id="app-people-preselect-input"]'));
    groupRoleInput = element(by.css('input[data-automation-id="app-group-roles-input"]'));
    groupAppInput = element(by.css('input[data-automation-id="app-group-app-input"]'));
    peopleCloudComponentTitle = element(by.cssContainingText('mat-card-title', 'People Cloud Component'));
    groupCloudComponentTitle = element(by.cssContainingText('mat-card-title', 'Groups Cloud Component'));
    preselectValidation = element.all(by.css('mat-checkbox.app-preselect-value')).first();
    preselectValidationStatus = element.all(by.css('mat-checkbox.app-preselect-value label input')).first();
    peopleFilterByAppName = element(by.css('.app-people-control-options mat-radio-button[value="appName"]'));
    groupFilterByAppName = element(by.css('.app-groups-control-options mat-radio-button[value="appName"]'));

    async checkPeopleCloudComponentTitleIsDisplayed(): Promise<void> {
        await BrowserVisibility.waitUntilElementIsVisible(this.peopleCloudComponentTitle);
    }

    async checkGroupsCloudComponentTitleIsDisplayed(): Promise<void> {
        await BrowserVisibility.waitUntilElementIsVisible(this.groupCloudComponentTitle);
    }

    async clickPeopleCloudSingleSelection(): Promise<void> {
        await BrowserActions.click(this.peopleCloudSingleSelection);
    }

    async clickPeopleCloudMultipleSelection(): Promise<void> {
        await BrowserActions.click(this.peopleCloudMultipleSelection);
    }

    async checkPeopleCloudSingleSelectionIsSelected(): Promise<void> {
        await BrowserVisibility.waitUntilElementIsVisible(this.peopleCloudSingleSelectionChecked);
    }

    async checkPeopleCloudMultipleSelectionIsSelected(): Promise<void> {
        await BrowserVisibility.waitUntilElementIsVisible(this.peopleCloudMultipleSelectionChecked);
    }

    async checkPeopleCloudFilterRole(): Promise<void> {
        await BrowserVisibility.waitUntilElementIsVisible(this.peopleCloudFilterRole);
    }

    async clickPeopleCloudFilterRole(): Promise<void> {
        await BrowserActions.click(this.peopleCloudFilterRole);
    }

    async clickGroupCloudFilterRole(): Promise<void> {
        await BrowserActions.click(this.groupCloudFilterRole);
    }

    async enterPeopleRoles(roles: string): Promise<void> {
        await BrowserActions.clearSendKeys(this.peopleRoleInput, roles);
    }

    async enterPeoplePreselect(preselect: string): Promise<void> {
        await BrowserActions.clearSendKeys(this.peoplePreselect, preselect);
    }

    async clearField(locator): Promise<void> {
        await BrowserActions.clearSendKeys(locator, '');
    }

    async clickGroupCloudSingleSelection(): Promise<void> {
        await BrowserActions.click(this.groupCloudSingleSelection);
    }

    async clickGroupCloudMultipleSelection(): Promise<void> {
        await BrowserActions.click(this.groupCloudMultipleSelection);
    }

    async enterGroupRoles(roles): Promise<void> {
        await BrowserActions.clearSendKeys(this.groupRoleInput, roles);
    }

    async clickPreselectValidation(): Promise<void> {
        await BrowserActions.click(this.preselectValidation);
    }

    async getPreselectValidationStatus(): Promise<string> {
        await BrowserVisibility.waitUntilElementIsVisible(this.preselectValidationStatus);
        return this.preselectValidationStatus.getAttribute('aria-checked');
    }

    async clickPeopleFilerByApp(): Promise<void> {
        await BrowserActions.click(this.peopleFilterByAppName);
    }

    async clickGroupFilerByApp(): Promise<void> {
        await BrowserActions.click(this.groupFilterByAppName);
    }

    async enterPeopleAppName(appName: string): Promise<void> {
        await BrowserActions.clearSendKeys(this.peopleAppInput, appName);
    }

    async enterGroupAppName(appName: string): Promise<void> {
        await BrowserActions.clearSendKeys(this.groupAppInput, appName);
    }

}
