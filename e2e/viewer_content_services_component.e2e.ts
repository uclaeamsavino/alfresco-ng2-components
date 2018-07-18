/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
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

import TestConfig = require('./test.config');

import LoginPage = require('./pages/adf/loginPage');
import ContentServicesPage = require('./pages/adf/contentServicesPage');
import ViewerPage = require('./pages/adf/viewerPage');

import resources = require('./util/resources');

import FileModel = require('./models/ACS/fileModel');
import AcsUserModel = require('./models/ACS/acsUserModel');

import AlfrescoApi = require('alfresco-js-api-node');
import { UploadActions } from './actions/ACS/upload.actions';

describe('Content Services Viewer', () => {

    let acsUser = new AcsUserModel();
    let viewerPage = new ViewerPage();
    let contentServicesPage = new ContentServicesPage();
    let loginPage = new LoginPage();
    let zoom;

    let pdfFile = new FileModel({ 'name': resources.Files.ADF_DOCUMENTS.PDF.file_name });
    let docxFile = new FileModel({
        'location': resources.Files.ADF_DOCUMENTS.DOCX_SUPPORTED.file_location,
        'name': resources.Files.ADF_DOCUMENTS.DOCX_SUPPORTED.file_name,
        'firstPageText': resources.Files.ADF_DOCUMENTS.DOCX_SUPPORTED.first_page_text
    });
    let jpgFile = new FileModel({
        'location': resources.Files.ADF_DOCUMENTS.JPG.file_location,
        'name': resources.Files.ADF_DOCUMENTS.JPG.file_name
    });
    let mp4File = new FileModel({
        'location': resources.Files.ADF_DOCUMENTS.MP4.file_location,
        'name': resources.Files.ADF_DOCUMENTS.MP4.file_name
    });
    let pagesFile = new FileModel({
        'location': resources.Files.ADF_DOCUMENTS.PAGES.file_location,
        'name': resources.Files.ADF_DOCUMENTS.PAGES.file_name
    });
    let pptFile = new FileModel({
        'location': resources.Files.ADF_DOCUMENTS.PPT.file_location,
        'name': resources.Files.ADF_DOCUMENTS.PPT.file_name,
        'firstPageText': resources.Files.ADF_DOCUMENTS.PPT.first_page_text
    });

    beforeAll(async (done) => {
        let uploadActions = new UploadActions();

        this.alfrescoJsApi = new AlfrescoApi({
            provider: 'ECM',
            hostEcm: TestConfig.adf.url
        });

        await this.alfrescoJsApi.login(TestConfig.adf.adminEmail, TestConfig.adf.adminPassword);

        await this.alfrescoJsApi.core.peopleApi.addPerson(acsUser);

        await this.alfrescoJsApi.login(acsUser.id, acsUser.password);

        let pdfFileUploaded = await uploadActions.uploadFile(this.alfrescoJsApi, pdfFile.location, pdfFile.name, '-my-');
        Object.assign(pdfFile, pdfFileUploaded.entry);

        let docxFileUploaded = await uploadActions.uploadFile(this.alfrescoJsApi, docxFile.location, docxFile.name, '-my-');
        Object.assign(docxFile, docxFileUploaded.entry);

        let jpgFileUploaded = await uploadActions.uploadFile(this.alfrescoJsApi, jpgFile.location, jpgFile.name, '-my-');
        Object.assign(jpgFile, jpgFileUploaded.entry);

        let mp4FileUploaded = await uploadActions.uploadFile(this.alfrescoJsApi, mp4File.location, mp4File.name, '-my-');
        Object.assign(mp4File, mp4FileUploaded.entry);

        let pptFileUploaded = await uploadActions.uploadFile(this.alfrescoJsApi, pptFile.location, pptFile.name, '-my-');
        Object.assign(pptFile, pptFileUploaded.entry);

        let pagesFileUploaded = await uploadActions.uploadFile(this.alfrescoJsApi, pagesFile.location, pagesFile.name, '-my-');
        Object.assign(pagesFile, pagesFileUploaded.entry);

        loginPage.loginToContentServicesUsingUserModel(acsUser);

        contentServicesPage.goToDocumentList();

        done();
    });

    /*afterAll((done) => {
        NodesAPI.deleteContent(acsUser, pdfFile.getId(), () => {
            done();
        });

        NodesAPI.deleteContent(acsUser, jpgFile.getId(), () => {
            done();
        });

        NodesAPI.deleteContent(acsUser, mp4File.getId(), () => {
            done();
        });

        NodesAPI.deleteContent(acsUser, pagesFile.getId(), () => {
            done();
        });

        NodesAPI.deleteContent(acsUser, pptFile.getId(), () => {
            done();
        });
    });*/

    it('[C260038] Should display first page, toolbar and pagination when opening a .pdf file', () => {
        contentServicesPage.checkAcsContainer();

        viewerPage.viewFile(pdfFile.name);

        viewerPage.checkFileContent('1', pdfFile.firstPageText);
        viewerPage.checkCloseButtonIsDisplayed();
        viewerPage.checkFileNameIsDisplayed(pdfFile.name);
        viewerPage.checkFileThumbnailIsDisplayed();
        viewerPage.checkDownloadButtonIsDisplayed();
        viewerPage.checkFullScreenButtonIsDisplayed();
        viewerPage.checkInfoButtonIsDisplayed();
        viewerPage.checkPreviousPageButtonIsDisplayed();
        viewerPage.checkNextPageButtonIsDisplayed();
        viewerPage.checkPageSelectorInputIsDisplayed('1');
        viewerPage.checkPercentageIsDisplayed();
        viewerPage.checkZoomInButtonIsDisplayed();
        viewerPage.checkZoomOutButtonIsDisplayed();
        viewerPage.checkScalePageButtonIsDisplayed();
    });

    it('[C260040] Should be able to change pages and zoom when .pdf file is open', () => {
        viewerPage.clickNextPageButton();
        viewerPage.checkFileContent('2', pdfFile.secondPageText);
        viewerPage.checkPageSelectorInputIsDisplayed('2');

        viewerPage.clickPreviousPageButton();
        viewerPage.checkFileContent('1', pdfFile.firstPageText);
        viewerPage.checkPageSelectorInputIsDisplayed('1');

        viewerPage.clearPageNumber();
        viewerPage.checkPageSelectorInputIsDisplayed('');

        zoom = viewerPage.getZoom();
        viewerPage.clickZoomInButton();
        viewerPage.checkZoomedIn(zoom);

        zoom = viewerPage.getZoom();
        viewerPage.clickZoomOutButton();
        viewerPage.checkZoomedOut(zoom);

        viewerPage.clickCloseButton();
    });

    it('[C260042] Should be able to download, open full-screen and Info container from the Viewer', () => {
        viewerPage.viewFile(jpgFile.name);
        viewerPage.checkImgContainerIsDisplayed();

        viewerPage.checkFullScreenButtonIsDisplayed();
        viewerPage.clickFullScreenButton();

        viewerPage.exitFullScreen();

        viewerPage.checkDownloadButtonIsDisplayed();
        viewerPage.clickDownloadButton();

        viewerPage.clickCloseButton();
    });

    it('[C260052] Should display image, toolbar and pagination when opening a .jpg file', () => {
        viewerPage.viewFile(jpgFile.name);
        viewerPage.checkImgContainerIsDisplayed();

        viewerPage.checkCloseButtonIsDisplayed();
        viewerPage.checkFileNameIsDisplayed(jpgFile.name);
        viewerPage.checkFileThumbnailIsDisplayed();
        viewerPage.checkDownloadButtonIsDisplayed();
        viewerPage.checkFullScreenButtonIsDisplayed();
        viewerPage.checkInfoButtonIsDisplayed();
        viewerPage.checkZoomInButtonIsDisplayed();
        viewerPage.checkZoomOutButtonIsDisplayed();
        viewerPage.checkPercentageIsDisplayed();
        viewerPage.checkRotateLeftButtonIsDisplayed();
        viewerPage.checkRotateRightButtonIsDisplayed();
        viewerPage.checkScaleImgButtonIsDisplayed();
    });

    it('[C260483] Should be able to zoom and rotate image when .jpg file is open', () => {
        zoom = viewerPage.getZoom();
        viewerPage.clickZoomInButton();
        viewerPage.checkZoomedIn(zoom);

        zoom = viewerPage.getZoom();
        viewerPage.clickZoomOutButton();
        viewerPage.checkZoomedOut(zoom);

        viewerPage.clickRotateLeftButton();
        viewerPage.checkRotation('transform: scale(1, 1) rotate(-90deg) translate(0px, 0px);');

        viewerPage.clickScaleImgButton();
        viewerPage.checkRotation('transform: scale(1, 1) rotate(0deg) translate(0px, 0px);');

        viewerPage.clickRotateRightButton();
        viewerPage.checkRotation('transform: scale(1, 1) rotate(90deg) translate(0px, 0px);');

        viewerPage.clickCloseButton();
    });

    it('[C279922] Open viewer for a .ppt file', () => {
        viewerPage.viewFile(pptFile.name);
        viewerPage.checkFileContent('1', pptFile.firstPageText);
        viewerPage.checkCloseButtonIsDisplayed();
        viewerPage.checkFileThumbnailIsDisplayed();
        viewerPage.checkFileNameIsDisplayed(pptFile.name);
        viewerPage.checkDownloadButtonIsDisplayed();
        viewerPage.checkInfoButtonIsDisplayed();
        viewerPage.checkPreviousPageButtonIsDisplayed();
        viewerPage.checkNextPageButtonIsDisplayed();
        viewerPage.checkPageSelectorInputIsDisplayed('1');
        viewerPage.checkZoomInButtonIsDisplayed();
        viewerPage.checkZoomOutButtonIsDisplayed();
        viewerPage.checkScalePageButtonIsDisplayed();
        viewerPage.clickCloseButton();
    });

    it('[C260053] Should display first page, toolbar and pagination when opening a .docx file', () => {
        contentServicesPage.checkAcsContainer();

        viewerPage.viewFile(docxFile.name);

        viewerPage.checkFileContent('1', docxFile.firstPageText);
        viewerPage.checkCloseButtonIsDisplayed();
        viewerPage.checkFileThumbnailIsDisplayed();
        viewerPage.checkFileNameIsDisplayed(docxFile.name);
        viewerPage.checkDownloadButtonIsDisplayed();
        viewerPage.checkInfoButtonIsDisplayed();
        viewerPage.checkPreviousPageButtonIsDisplayed();
        viewerPage.checkNextPageButtonIsDisplayed();
        viewerPage.checkPageSelectorInputIsDisplayed('1');
        viewerPage.checkZoomInButtonIsDisplayed();
        viewerPage.checkZoomOutButtonIsDisplayed();
        viewerPage.checkScalePageButtonIsDisplayed();
        viewerPage.clickCloseButton();
    });

    it('[C260054] Should display "Preview couldn\'t be loaded" and viewer toolbar when opening an unsupported file', () => {
        viewerPage.viewFile(pagesFile.name);

        viewerPage.checkCloseButtonIsDisplayed();
        viewerPage.checkFileNameIsDisplayed(pagesFile.name);
        viewerPage.checkFileThumbnailIsDisplayed();
        viewerPage.checkDownloadButtonIsDisplayed();
        viewerPage.checkInfoButtonIsDisplayed();

        viewerPage.checkZoomInButtonIsNotDisplayed();

        viewerPage.clickCloseButton();
    });

    it('[C260056] Should display video and viewer toolbar when opening a media file', () => {
        viewerPage.viewFile(mp4File.name);

        viewerPage.checkMediaPlayerContainerIsDisplayed();
        viewerPage.checkCloseButtonIsDisplayed();
        viewerPage.checkFileThumbnailIsDisplayed();
        viewerPage.checkFileNameIsDisplayed(mp4File.name);
        viewerPage.checkDownloadButtonIsDisplayed();
        viewerPage.checkInfoButtonIsDisplayed();
        viewerPage.checkFullScreenButtonIsNotDisplayed();

        viewerPage.checkZoomInButtonIsNotDisplayed();

        viewerPage.clickCloseButton();
    });
});