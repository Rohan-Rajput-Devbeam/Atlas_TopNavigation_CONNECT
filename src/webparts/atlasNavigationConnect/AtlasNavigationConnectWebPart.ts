import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'AtlasNavigationConnectWebPartStrings';
import AtlasNavigationConnect from './components/AtlasNavigationConnect';
import { IAtlasNavigationConnectProps } from './components/IAtlasNavigationConnectProps';

import { PropertyFieldPeoplePicker, PrincipalType } from '@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker';

export interface IAtlasNavigationConnectWebPartProps {
  people: any;
  description: string;

}

export default class AtlasNavigationConnectWebPart extends BaseClientSideWebPart<IAtlasNavigationConnectWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAtlasNavigationConnectProps> = React.createElement(
      AtlasNavigationConnect,
      {
        description: this.properties.description,
        context: this.context,
        people:this.properties.people

      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyFieldPeoplePicker('people', {
                  label: 'People Picker',
                  initialData: this.properties.people,
                  allowDuplicate: false,
                  principalType: [PrincipalType.Users, PrincipalType.SharePoint, PrincipalType.Security],
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  context: this.context as any,
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'peopleFieldId'

                })
              ]
            }
          ]
        }
      ]
    };
  }
}
