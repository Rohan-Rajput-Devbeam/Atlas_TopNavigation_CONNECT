import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp/presets/all";
// import pnp from "sp-pnp-js";
import * as pnp from "sp-pnp-js";

import { SPHttpClient, SPHttpClientResponse, SPHttpClientConfiguration } from '@microsoft/sp-http';
// import * as strings from "FlipCardProgramWebPartStrings";

4
import "isomorphic-fetch"; // or import the fetch polyfill you installed
import { Client } from "@microsoft/microsoft-graph-client";
import { MSGraphClient } from '@microsoft/sp-http';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { groupBy } from "@microsoft/sp-lodash-subset";

export class SPService {
    private userIDinPreferenceList: any;
    constructor(private context: WebPartContext) {
        sp.setup({
            spfxContext: this.context
        });
    }

    public async getCurrentUser() {
        let tempvar = await sp.web.currentUser.get();
        // console.log(tempvar)
        return await sp.web.currentUser.get();
    }

    public async getUserGroups() {
        // var finalArray: any[];
        // let myGroups = await (await this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/Web/CurrentUser/Groups`,
        //     SPHttpClient.configurations.v1)).json();
        // console.log(myGroups);

        let Mygroups = this.context.msGraphClientFactory.getClient().then(async (client: MSGraphClient): Promise<void> => {
            let group = await client.api('/me/memberOf/$/microsoft.graph.group')
                .filter('groupTypes/any(a:a eq \'unified\')')
                .get();
            // console.log(group)
            return group

        });

        // console.log(Mygroups)
        return Mygroups

        

    }

    public async getRootOwners() {
          var finalArray: any[];
        let myGroups = await (await this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/Web/CurrentUser/Groups`,
            SPHttpClient.configurations.v1)).json();
        // console.log(myGroups);

        return myGroups


    }


    public async getUserLanguage(listName: string, userEmail: string) {
        try {
            let listItems: any[] = await sp.web.lists.getByTitle(listName)
                .items
                // .select("Language, id")
                .filter("Title eq '" + userEmail + "'")
                //.top(Number(slideCount))
                .expand().get();
            // console.log(listItems)
            let userLanguage = listItems.map(e => (e.Language))
            this.userIDinPreferenceList = listItems.map(e => (e.Id))
           

            return userLanguage;
        } catch (err) {
            Promise.reject(err);
        }
    }


    public async getUserBrandView(listName: string, userEmail: string) {

        try {
            let listItems: any[] = await sp.web.lists.getByTitle(listName)
                .items
                // .select("Language, id")
                .filter("Title eq '" + userEmail + "'")
                //.top(Number(slideCount))
                .expand().get();
            // console.log(listItems)

            let userBrandView = listItems.map(e => (e.BrandViewType))
            this.userIDinPreferenceList = listItems.map(e => (e.Id))
            // this.userIDinPreferenceList = userID[0];
            // // console.log("I am list Items");
            // // console.log(listItems);
            // // console.log(userLanguage);
            // console.log(this.userIDinPreferenceList)
            // console.log(userID)
            // console.log(userBrandView)

            return userBrandView;
        } catch (err) {
            Promise.reject(err);
        }

    }


    public async getUniqueLanguages(listName: string) {
        let listItems: any[] = [...new Set(await (await sp.web.lists.getByTitle(listName)
            .items
            .select("Language")
            .expand().get()).map(e => (e.Language)))];
        // console.log(listItems)
        return listItems;
    }

    public async getUniqueBrandView(listName: string) {
        let listItems: any[] = [...new Set(await (await sp.web.lists.getByTitle(listName)
            .items
            .select("BrandViewType")
            .expand().get()).map(e => (e.BrandViewType)))];
        // console.log(listItems)
        return listItems;
    }

    public async getToolboxItems() {
        // let listItems: any[] = [...new Set(await (await sp.web.lists.getByTitle("Toolbox")
        //     .items
        //     .select("Title","ToolLink")
        //     .expand().get()).map(e => (e.Title)))];
        // console.log(listItems)

        let listItems = await sp.web.lists.getByTitle("Toolbox").items.get();
        // console.log(listItems)


        return listItems;
    }





    public async addListItem(listName: string, userEmail: string, selectedLang: string, selectedBrandView: string) {

        try {
            await sp.web.lists.getByTitle(listName).items.add({
                Title: userEmail,
                Language: selectedLang,
                BrandViewType: selectedBrandView
            });
            return ("Item Added Successfully");
        }
        catch (error) {
            return ("Item Couldn't Be Added");

        }
    }

    public async updateListItem(listName: string, selectedLang: string, selectedBrandView: string) {

        try {
            await sp.web.lists.getByTitle(listName).items.getById(this.userIDinPreferenceList).update({
                Language: selectedLang,
                BrandViewType: selectedBrandView
            })
            return ("Item Updated Successfully");
        }
        catch (error) {
            return ("Item Couldn't Be Updated");

        }
    }

    private filesave(myFile: any, fileType: string) {
        // console.log(myFile.name);
        let destUrl = "";
        var flag;

        if (fileType == "programLogo") {
            destUrl = "/sites/CONNECTII/SiteAssets/Program%20Assets/testLogo/";
        }
        else {
            destUrl = "/sites/CONNECTII/SiteAssets/Program%20Assets/testPhoto/";
        }


        sp.web.getFolderByServerRelativeUrl(destUrl).files.add(myFile.name, myFile, true).then(f => {
            console.log("File Uploaded :" + myFile.name);
            f.file.getItem().then(item => {

                item.update({
                    Title: "Metadata Updated"
                }).then((myupdate) => {
                    // console.log(myupdate);  
                    // console.log("Metadata Updated");
                    //   destUrl=destUrl+myFile.name;
                    //   console.log(destUrl); 

                });
            });
        });
        //console.log(flag);

        // console.log(this.context.pageContext.web.absoluteUrl + destUrl + myFile.name);
        // console.log();
        return this.context.pageContext.web.absoluteUrl + destUrl.substring(20) + myFile.name;
    }

    public async deleteProgram(id: number) {

        console.log("Im called " + id)
        let list = sp.web.lists.getByTitle("Programs");

        await list.items.getById(id).delete();
        console.log("deleted " + id)
    }



}