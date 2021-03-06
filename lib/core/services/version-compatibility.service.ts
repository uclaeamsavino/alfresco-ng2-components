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

import { Injectable } from '@angular/core';
import { AlfrescoApiService } from './alfresco-api.service';
import { filter } from 'rxjs/operators';
import { DiscoveryApiService } from './discovery-api.service';
import { VersionModel, EcmProductVersionModel } from '../models/product-version.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class VersionCompatibilityService {
    private acsVersion: VersionModel;

    constructor(
        private alfrescoApiService: AlfrescoApiService,
        private authService: AuthenticationService,
        private discoveryApiService: DiscoveryApiService
    ) {
        this.alfrescoApiService.alfrescoApiInitialized
            .pipe(filter(status => status))
            .subscribe(this.initCompatibilityVersion.bind(this));
    }

    private initCompatibilityVersion() {
        if (this.authService.isEcmLoggedIn()) {
            this.discoveryApiService.getEcmProductInfo().toPromise().then(
                (acsInfo: EcmProductVersionModel) => {
                    this.acsVersion = acsInfo.version;
                });
        }
    }

    public getAcsVersion(): VersionModel {
        return this.acsVersion;
    }
}
