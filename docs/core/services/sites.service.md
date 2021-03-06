---
Title: Sites service
Added: v2.0.0
Status: Active
Last reviewed: 2018-11-13
---

# [Sites service](../../../lib/core/services/sites.service.ts "Defined in sites.service.ts")

Accesses and manipulates sites from a Content Services repository.

## Class members

### Methods

-   **approveSiteMembershipRequest**(siteId: `string`, inviteeId: `string`, opts?: `any`): [`Observable`](http://reactivex.io/documentation/observable.html)`<`[`SiteMembershipRequestWithPersonPaging`](../../../node_modules/@alfresco/js-api/src/api/content-rest-api/model/siteMembershipRequestWithPersonPaging.ts)`|__type>`<br/>
    Accept site membership requests.
    -   _siteId:_ `string`  - The identifier of a site.
    -   _inviteeId:_ `string`  - The invitee user name.
    -   _opts:_ `any`  - (Optional) Options supported by JS-API
    -   **Returns** [`Observable`](http://reactivex.io/documentation/observable.html)`<`[`SiteMembershipRequestWithPersonPaging`](../../../node_modules/@alfresco/js-api/src/api/content-rest-api/model/siteMembershipRequestWithPersonPaging.ts)`|__type>` - Null response notifying when the operation is complete
-   **createSiteMembership**(siteId: `string`, siteMembershipBodyCreate: [`SiteMembershipBodyCreate`](../../../node_modules/@alfresco/js-api/src/api/content-rest-api/model/siteMembershipBodyCreate.ts), opts?: `any`): [`Observable`](http://reactivex.io/documentation/observable.html)`<`[`SiteMemberEntry`](../../../node_modules/@alfresco/js-api/src/api/content-rest-api/model/siteMemberEntry.ts)`|__type>`<br/>
    Creates a site membership for person **personId** on site **siteId**.
    -   _siteId:_ `string`  - The identifier of a site
    -   _siteMembershipBodyCreate:_ [`SiteMembershipBodyCreate`](../../../node_modules/@alfresco/js-api/src/api/content-rest-api/model/siteMembershipBodyCreate.ts)  - The person to add and their role
    -   _opts:_ `any`  - (Optional) Optional parameters
    -   **Returns** [`Observable`](http://reactivex.io/documentation/observable.html)`<`[`SiteMemberEntry`](../../../node_modules/@alfresco/js-api/src/api/content-rest-api/model/siteMemberEntry.ts)`|__type>` - Site member entry
-   **deleteSite**(siteId: `string`, permanentFlag: `boolean` = `true`): [`Observable`](http://reactivex.io/documentation/observable.html)`<any>`<br/>
    Deletes a site.
    -   _siteId:_ `string`  - Site to delete
    -   _permanentFlag:_ `boolean`  - True: deletion is permanent; False: site is moved to the trash
    -   **Returns** [`Observable`](http://reactivex.io/documentation/observable.html)`<any>` - Null response notifying when the operation is complete
-   **deleteSiteMembership**(siteId: `string`, personId: `string`): [`Observable`](http://reactivex.io/documentation/observable.html)`<any>`<br/>
    Delete a site membership
    -   _siteId:_ `string`  - The identifier of a site.
    -   _personId:_ `string`  - The identifier of a person.
    -   **Returns** [`Observable`](http://reactivex.io/documentation/observable.html)`<any>` - Null response notifying when the operation is complete
-   **getEcmCurrentLoggedUserName**(): `string`<br/>
    Gets the username of the user currently logged into ACS.
    -   **Returns** `string` - Username string
-   **getSite**(siteId: `string`, opts?: `any`): [`Observable`](http://reactivex.io/documentation/observable.html)`<`[`SiteEntry`](https://github.com/Alfresco/alfresco-js-api/blob/master/src/alfresco-core-rest-api/docs/SiteEntry.md)`|__type>`<br/>
    Gets the details for a site.
    -   _siteId:_ `string`  - ID of the target site
    -   _opts:_ `any`  - (Optional) Options supported by JS-API
    -   **Returns** [`Observable`](http://reactivex.io/documentation/observable.html)`<`[`SiteEntry`](https://github.com/Alfresco/alfresco-js-api/blob/master/src/alfresco-core-rest-api/docs/SiteEntry.md)`|__type>` - Information about the site
-   **getSiteContent**(siteId: `string`): [`Observable`](http://reactivex.io/documentation/observable.html)`<`[`SiteEntry`](https://github.com/Alfresco/alfresco-js-api/blob/master/src/alfresco-core-rest-api/docs/SiteEntry.md)`|__type>`<br/>
    Gets a site's content.
    -   _siteId:_ `string`  - ID of the target site
    -   **Returns** [`Observable`](http://reactivex.io/documentation/observable.html)`<`[`SiteEntry`](https://github.com/Alfresco/alfresco-js-api/blob/master/src/alfresco-core-rest-api/docs/SiteEntry.md)`|__type>` - Site content
-   **getSiteMembers**(siteId: `string`): [`Observable`](http://reactivex.io/documentation/observable.html)`<`[`SiteEntry`](https://github.com/Alfresco/alfresco-js-api/blob/master/src/alfresco-core-rest-api/docs/SiteEntry.md)`|__type>`<br/>
    Gets a list of all a site's members.
    -   _siteId:_ `string`  - ID of the target site
    -   **Returns** [`Observable`](http://reactivex.io/documentation/observable.html)`<`[`SiteEntry`](https://github.com/Alfresco/alfresco-js-api/blob/master/src/alfresco-core-rest-api/docs/SiteEntry.md)`|__type>` - Site members
-   **getSiteMembershipRequests**(opts?: `any`): [`Observable`](http://reactivex.io/documentation/observable.html)`<`[`SiteMembershipRequestWithPersonPaging`](../../../node_modules/@alfresco/js-api/src/api/content-rest-api/model/siteMembershipRequestWithPersonPaging.ts)`|__type>`<br/>
    Gets a list of site membership requests.
    -   _opts:_ `any`  - (Optional) Options supported by JS-API
    -   **Returns** [`Observable`](http://reactivex.io/documentation/observable.html)`<`[`SiteMembershipRequestWithPersonPaging`](../../../node_modules/@alfresco/js-api/src/api/content-rest-api/model/siteMembershipRequestWithPersonPaging.ts)`|__type>` - Site membership requests
-   **getSiteNameFromNodePath**(node: [`MinimalNode`](https://github.com/Alfresco/alfresco-js-api/blob/master/src/alfresco-core-rest-api/docs/NodeMinimalEntry.md)): `string`<br/>
    Looks for a site inside the path of a [Node](https://github.com/Alfresco/alfresco-js-api/blob/development/src/api/content-rest-api/docs/Node.md) and returns its guid if it finds one. (return an empty string if no site is found)
    -   _node:_ [`MinimalNode`](https://github.com/Alfresco/alfresco-js-api/blob/master/src/alfresco-core-rest-api/docs/NodeMinimalEntry.md)  - [Node](https://github.com/Alfresco/alfresco-js-api/blob/development/src/api/content-rest-api/docs/Node.md) to look for parent site
    -   **Returns** `string` - Site guid
-   **getSites**(opts: `any` = `{}`): [`Observable`](http://reactivex.io/documentation/observable.html)`<`[`SitePaging`](https://github.com/Alfresco/alfresco-js-api/blob/master/src/alfresco-core-rest-api/docs/SitePaging.md)`>`<br/>
    Gets a list of all sites in the repository.
    -   _opts:_ `any`  - Options supported by JS-API
    -   **Returns** [`Observable`](http://reactivex.io/documentation/observable.html)`<`[`SitePaging`](https://github.com/Alfresco/alfresco-js-api/blob/master/src/alfresco-core-rest-api/docs/SitePaging.md)`>` - List of sites
-   **rejectSiteMembershipRequest**(siteId: `string`, inviteeId: `string`, opts?: `any`): [`Observable`](http://reactivex.io/documentation/observable.html)`<`[`SiteMembershipRequestWithPersonPaging`](../../../node_modules/@alfresco/js-api/src/api/content-rest-api/model/siteMembershipRequestWithPersonPaging.ts)`|__type>`<br/>
    Reject site membership requests.
    -   _siteId:_ `string`  - The identifier of a site.
    -   _inviteeId:_ `string`  - The invitee user name.
    -   _opts:_ `any`  - (Optional) Options supported by JS-API
    -   **Returns** [`Observable`](http://reactivex.io/documentation/observable.html)`<`[`SiteMembershipRequestWithPersonPaging`](../../../node_modules/@alfresco/js-api/src/api/content-rest-api/model/siteMembershipRequestWithPersonPaging.ts)`|__type>` - Null response notifying when the operation is complete
-   **updateSiteMembership**(siteId: `string`, personId: `string`, siteMembershipBodyUpdate: [`SiteMembershipBodyUpdate`](../../../node_modules/@alfresco/js-api/src/api/content-rest-api/model/siteMembershipBodyUpdate.ts), opts?: `any`): [`Observable`](http://reactivex.io/documentation/observable.html)`<`[`SiteMemberEntry`](../../../node_modules/@alfresco/js-api/src/api/content-rest-api/model/siteMemberEntry.ts)`|__type>`<br/>
    Update a site membership
    -   _siteId:_ `string`  - The identifier of a site.
    -   _personId:_ `string`  - The identifier of a person.
    -   _siteMembershipBodyUpdate:_ [`SiteMembershipBodyUpdate`](../../../node_modules/@alfresco/js-api/src/api/content-rest-api/model/siteMembershipBodyUpdate.ts)  - The persons new role
    -   _opts:_ `any`  - (Optional) Optional parameters
    -   **Returns** [`Observable`](http://reactivex.io/documentation/observable.html)`<`[`SiteMemberEntry`](../../../node_modules/@alfresco/js-api/src/api/content-rest-api/model/siteMemberEntry.ts)`|__type>` - Site member entry>

## Details

You can use `getSites` to get a list of all sites in the repository.
If you are only interested in a single site and you have its ID, you
can use `getSite` to access it. Alternatively, you can use `getSiteContent`
or `getSiteMembers` to extract just the `contents` and `members` properties
of the site.

You can also delete a site using `deleteSite`. If the `permanentFlag` parameter
is set to false then the site will be moved to the trash rather than being
deleted immediately.

Both `getSite` and `getSites` have an `opts` parameter to supply extra
options. See the Alfresco JS API docs about
[getSites](https://github.com/Alfresco/alfresco-js-api/blob/master/src/alfresco-core-rest-api/docs/SitesApi.md#getSites)
and
[getSite](https://github.com/Alfresco/alfresco-js-api/blob/master/src/alfresco-core-rest-api/docs/SitesApi.md#getSite)
for more information about the available options.
