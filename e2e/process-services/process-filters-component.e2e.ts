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

import {
    ApiService,
    ApplicationsUtil,
    BrowserActions,
    LoginSSOPage,
    StartProcessPage,
    UsersActions
} from '@alfresco/adf-testing';
import { NavigationBarPage } from '../pages/adf/navigation-bar.page';
import { ProcessServicesPage } from '../pages/adf/process-services/process-services.page';
import { ProcessFiltersPage } from '../pages/adf/process-services/process-filters.page';
import { ProcessServiceTabBarPage } from '../pages/adf/process-services/process-service-tab-bar.page';
import { ProcessDetailsPage } from '../pages/adf/process-services/process-details.page';
import { ProcessListPage } from '../pages/adf/process-services/process-list.page';
import { UserProcessInstanceFilterRepresentation } from '@alfresco/js-api';
import { browser } from 'protractor';
import { ProcessListDemoPage } from '../pages/adf/demo-shell/process-services/process-list-demo.page';
import CONSTANTS = require('../util/constants');

describe('Process Filters Test', () => {

    const app = browser.params.resources.Files.APP_WITH_DATE_FIELD_FORM;

    const loginPage = new LoginSSOPage();
    const processListPage = new ProcessListPage();
    const navigationBarPage = new NavigationBarPage();
    const processServicesPage = new ProcessServicesPage();
    const processListDemoPage = new ProcessListDemoPage();
    const startProcessPage = new StartProcessPage();
    const processFiltersPage = new ProcessFiltersPage();
    const processServiceTabBarPage = new ProcessServiceTabBarPage();
    const processDetailsPage = new ProcessDetailsPage();

    const apiService = new ApiService();
    const usersActions = new UsersActions(apiService);
    const applicationsService = new ApplicationsUtil(apiService);

    let appModel, user;

    const processTitle = {
        running: 'Test_running',
        completed: 'Test_completed',
        canceled: 'Test_canceled',
        one: 'Test fake process one',
        two: 'Test fake process two'
    };
    const processFilter = {
        running: 'Running',
        all: 'All',
        completed: 'Completed'
    };

    beforeAll(async () => {

        await apiService.getInstance().login(browser.params.testConfig.admin.email, browser.params.testConfig.admin.password);
        user = await usersActions.createUser();
        await apiService.getInstance().login(user.email, user.password);
        appModel = await applicationsService.importPublishDeployApp(app.file_path);
        await loginPage.login(user.email, user.password);
    });

    beforeEach(async () => {
        await navigationBarPage.navigateToProcessServicesPage();
        await processServicesPage.checkApsContainer();
    });

    it('[C260387] Should the running process be displayed when clicking on Running filter', async () => {
        await processServicesPage.goToApp(app.title);
        await processServiceTabBarPage.clickProcessButton();
        await expect(await processListPage.isProcessListDisplayed()).toEqual(true);

        await processFiltersPage.clickCreateProcessButton();
        await processFiltersPage.clickNewProcessDropdown();

        await startProcessPage.selectFromProcessDropdown(app.process_title);
        await startProcessPage.enterProcessName(processTitle.completed);
        await startProcessPage.clickFormStartProcessButton();

        await processDetailsPage.clickCancelProcessButton();
        await navigationBarPage.navigateToProcessServicesPage();

        await processServicesPage.goToApp(app.title);
        await processServiceTabBarPage.clickProcessButton();

        await processFiltersPage.clickCreateProcessButton();
        await processFiltersPage.clickNewProcessDropdown();

        await startProcessPage.selectFromProcessDropdown(app.process_title);
        await startProcessPage.enterProcessName(processTitle.running);
        await startProcessPage.clickFormStartProcessButton();

        await processFiltersPage.checkFilterIsHighlighted(processFilter.running);
        await processFiltersPage.selectFromProcessList(processTitle.running);

        await processDetailsPage.checkProcessDetailsCard();
    });

    it('[C280063] Should both the new created process and a completed one to be displayed when clicking on All filter', async () => {
        await processServicesPage.goToApp(app.title);
        await processServiceTabBarPage.clickProcessButton();
        await expect(await processListPage.isProcessListDisplayed()).toEqual(true);

        await processFiltersPage.clickAllFilterButton();
        await processFiltersPage.checkFilterIsHighlighted(processFilter.all);
        await processFiltersPage.selectFromProcessList(processTitle.running);
        await processFiltersPage.selectFromProcessList(processTitle.completed);
        await processDetailsPage.checkProcessDetailsCard();
    });

    it('[C280064] Should the completed process be displayed when clicking on Completed filter', async () => {
        await processServicesPage.goToApp(app.title);
        await processServiceTabBarPage.clickProcessButton();
        await expect(await processListPage.isProcessListDisplayed()).toEqual(true);

        await processFiltersPage.clickCompletedFilterButton();
        await processFiltersPage.checkFilterIsHighlighted(processFilter.completed);
        await processFiltersPage.selectFromProcessList(processTitle.completed);
        await processDetailsPage.checkProcessDetailsCard();
    });

    it('[C280407] Should be able to access the filters with URL', async () => {
        const defaultFiltersNumber = 3;
        let deployedApp, processFilterUrl;

        const appDefinitions = await apiService.getInstance().activiti.appsApi.getAppDefinitions();
        deployedApp = appDefinitions.data.find((currentApp) => {
            return currentApp.modelId === appModel.id;
        });

        processFilterUrl = browser.params.testConfig.adf.url + '/activiti/apps/' + deployedApp.id + '/processes/';
        const taskAppFilters = await apiService.getInstance().activiti.userFiltersApi.getUserProcessInstanceFilters({ appId: deployedApp.id });

        await processServicesPage.goToApp(app.title);
        await processServiceTabBarPage.clickProcessButton();
        await expect(await processListPage.isProcessListDisplayed()).toEqual(true);

        await expect(taskAppFilters.size).toBe(defaultFiltersNumber);
        for (const filter of taskAppFilters.data) {
            await BrowserActions.getUrl(processFilterUrl + filter.id);
            await expect(await processListPage.isProcessListDisplayed()).toEqual(true);
            await processFiltersPage.checkFilterIsHighlighted(filter.name);
        }
    });

    it('[C260463] Should Cancel process be displayed in Completed process filters', async () => {
        await processServicesPage.goToApp(app.title);
        await processServiceTabBarPage.clickProcessButton();
        await expect(await processListPage.isProcessListDisplayed()).toEqual(true);

        await processFiltersPage.clickCreateProcessButton();
        await processFiltersPage.clickNewProcessDropdown();
        await startProcessPage.enterProcessName(processTitle.canceled);
        await startProcessPage.clickFormStartProcessButton();
        await processListDemoPage.checkProcessIsDisplayed(processTitle.canceled);

        await processDetailsPage.clickCancelProcessButton();
        await processListDemoPage.checkProcessIsNotDisplayed(processTitle.canceled);

        await processFiltersPage.clickCompletedFilterButton();
        await processFiltersPage.checkFilterIsHighlighted(processFilter.completed);
        await processListDemoPage.checkProcessIsDisplayed(processTitle.canceled);
        await processFiltersPage.selectFromProcessList(processTitle.canceled);
        await processDetailsPage.checkProcessDetailsCard();
    });

    it('[C213262] Default process filters', async () => {
        await processServicesPage.goToApp(app.title);
        await processServiceTabBarPage.clickProcessButton();
        await expect(await processListPage.isProcessListDisplayed()).toEqual(true);

        await processFiltersPage.clickCreateProcessButton();
        await processFiltersPage.clickNewProcessDropdown();
        await startProcessPage.enterProcessName(processTitle.one);
        await startProcessPage.clickFormStartProcessButton();
        await expect(await processListPage.isProcessListDisplayed()).toEqual(true);

        await processListDemoPage.checkProcessIsDisplayed(processTitle.one);
        await processFiltersPage.checkFilterIsHighlighted(processFilter.running);
        await processDetailsPage.checkProcessDetailsCard();
        await checkProcessInfoDrawer({  name: processTitle.one });

        await processFiltersPage.clickCreateProcessButton();
        await processFiltersPage.clickNewProcessDropdown();
        await startProcessPage.enterProcessName(processTitle.two);
        await startProcessPage.clickFormStartProcessButton();
        await expect(await processListPage.isProcessListDisplayed()).toEqual(true);

        await processListDemoPage.checkProcessIsDisplayed(processTitle.one);
        await processListDemoPage.checkProcessIsDisplayed(processTitle.two);

        await processDetailsPage.clickCancelProcessButton();
        await processListDemoPage.checkProcessIsNotDisplayed(processTitle.canceled);

        await processFiltersPage.clickCompletedFilterButton();
        await processFiltersPage.checkFilterIsHighlighted(processFilter.completed);
        await processListDemoPage.checkProcessIsDisplayed(processTitle.two);
        await processFiltersPage.selectFromProcessList(processTitle.two);

        await processFiltersPage.clickAllFilterButton();
        await processFiltersPage.checkFilterIsHighlighted(processFilter.all);
        await processListDemoPage.checkProcessIsDisplayed(processTitle.two);
        await processFiltersPage.selectFromProcessList(processTitle.two);
    });

    it('[C260384] Edit default filter', async () => {
        const runningFilter =  (await getFilter()).find(filter => filter.name === 'Running');
        await apiService.getInstance().activiti.userFiltersApi
            .updateUserProcessInstanceFilter(runningFilter.id, { ...runningFilter, name: 'Edited Running' });

        await processServicesPage.goToApp(app.title);
        await processServiceTabBarPage.clickProcessButton();
        await processFiltersPage.checkFilterIsNotDisplayed('Running');
        await processFiltersPage.checkFilterIsDisplayed('Edited Running');
    });

    it('[C260385] Delete default filter', async () => {
        const allFilter =  (await getFilter()).find(filter => filter.name === 'All');
        await apiService.getInstance().activiti.userFiltersApi.deleteUserProcessInstanceFilter(allFilter.id);

        await processServicesPage.goToApp(app.title);
        await processServiceTabBarPage.clickProcessButton();
        await processFiltersPage.checkFilterIsNotDisplayed('All');
    });

    async function getFilter(): Promise<UserProcessInstanceFilterRepresentation[]> {
        const apps = await apiService.getInstance().activiti.appsApi.getAppDefinitions();
        const { id: appId = 0 } = apps.data.find((application) => application.name === appModel.name);
        const filters = await apiService.getInstance().activiti.userFiltersApi.getUserProcessInstanceFilters({ appId });
        return filters.data;
    }

    async function checkProcessInfoDrawer({ name }) {
        await expect(await processDetailsPage.checkProcessTitleIsDisplayed()).toEqual(name);
        await expect(await processDetailsPage.getProcessStatus()).toEqual(CONSTANTS.PROCESS_STATUS.RUNNING);
        await expect(await processDetailsPage.getEndDate()).toEqual(CONSTANTS.PROCESS_END_DATE);
        await expect(await processDetailsPage.getProcessCategory()).toEqual(CONSTANTS.PROCESS_CATEGORY);
        await expect(await processDetailsPage.getBusinessKey()).toEqual(CONSTANTS.PROCESS_BUSINESS_KEY);
        await expect(await processDetailsPage.getCreatedBy()).toEqual(`${user.firstName} ${user.lastName}`);
        await expect(await processDetailsPage.getProcessDescription()).toEqual(CONSTANTS.PROCESS_DESCRIPTION);
    }
});
