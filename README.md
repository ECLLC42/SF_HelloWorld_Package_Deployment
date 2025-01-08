
# Salesforce Scratch Org and Main Org Package Componenet Deployment

## Project Setup

1. Create Project & Project Structure:
```bash
mkdir MikeTest
cd MikeTest
sf project generate --name MikeTest --template empty
```

2. Create Initial Configuration Files:

```json:config/project-scratch-def.json
{
  "orgName": "Demo Company",
  "edition": "Developer",
  "features": [],
  "settings": {
    "lightningExperienceSettings": {
      "enableS1DesktopEnabled": true
    }
  }
}
```

```json:sfdx-project.json
{
  "packageDirectories": [{
    "path": "force-app",
    "default": true,
    "package": "MyLWCComponents",
    "versionName": "ver 0.1",
    "versionNumber": "0.1.0.NEXT"
  }],
  "name": "MyLWCComponents",
  "namespace": "",
  "sfdcLoginUrl": "https://login.salesforce.com",
  "sourceApiVersion": "59.0"
}
```

```json:force-app/main/default/lwc/.eslintrc.json
{
    "extends": "@salesforce/eslint-config-lwc/recommended"
}
```
## Folder and File Creation

Create the HelloWorld component directory

1.```mkdir -p force-app/main/default/lwc/helloWorld
```

3. Create the component files

```touch force-app/main/default/lwc/helloWorld/helloWorld.js
touch force-app/main/default/lwc/helloWorld/helloWorld.html
touch force-app/main/default/lwc/helloWorld/helloWorld.js-meta.xml
```

3. Create the package.xml and eslintrc

touch force-app/main/default/lwc/package.xml
touch force-app/main/default/lwc/.eslintrc.json

## Component Creation

1. Create HelloWorld Component:

```javascript:force-app/main/default/lwc/helloWorld/helloWorld.js
import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {
    greeting = 'World';
}
```

```html:force-app/main/default/lwc/helloWorld/helloWorld.html
<template>
    <lightning-card title="Hello World" icon-name="custom:custom14">
        <div class="slds-m-around_medium">
            Hello, {greeting}!
        </div>
    </lightning-card>
</template>
```

```xml:force-app/main/default/lwc/helloWorld/helloWorld.js-meta.xml
<?xml version="1.0" encoding="UTF-8"?>
<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>59.0</apiVersion>
    <isExposed>true</isExposed>
    <targets>
        <target>lightning__AppPage</target>
        <target>lightning__HomePage</target>
    </targets>
</LightningComponentBundle>
```

```xml:force-app/main/default/lwc/package.xml
<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <types>
        <members>*</members>
        <name>LightningComponentBundle</name>
    </types>
    <version>59.0</version>
</Package>
```

## Deployment Steps

1. Authorize Dev Hub:
```bash
sf org login web --set-default-dev-hub
```

2. Create Scratch Org:
```bash
sf org create scratch --definition-file config/project-scratch-def.json --set-default -a HelloWorldOrg
```

3. Deploy Components:
```bash
sf project deploy start --source-dir force-app/main/default/lwc -o HelloWorldOrg
```

4. Create Package:
```bash
sf package create --name "MyLWCComponents" --description "My LWC Components" --package-type Unlocked --path force-app
```

5. Create Package Version:
```bash
sf package version create --package "MyLWCComponents" --installation-key-bypass --wait 10
```

6. Access Scratch Org:
```bash
# Generate password
sf org generate password -o HelloWorldOrg

# Open org in browser
sf org open -o HelloWorldOrg
```

7. Verify Installation:
```bash
sf package installed list -o HelloWorldOrg
```

## Project Structure
```
MikeTest/
├── config/
│   └── project-scratch-def.json
├── force-app/
│   └── main/
│       └── default/
│           └── lwc/
│               ├── .eslintrc.json
│               ├── package.xml
│               └── helloWorld/
│                   ├── helloWorld.html
│                   ├── helloWorld.js
│                   └── helloWorld.js-meta.xml
└── sfdx-project.json
```

## Notes
- Ensure Dev Hub is enabled in your org
- Package IDs will be unique for each installation
- Scratch org credentials are generated after creation
- Components will be available in the Lightning App Builder
- Default scratch org duration is 30 days

## Troubleshooting
- If deployment fails, check component metadata versions
- Ensure all files use consistent API versions
- Verify Dev Hub authorization status with `sf org list`
- Check scratch org status with `sf org display -o HelloWorldOrg`



## Main Org Deployment

1. Authorize Main Org:
```bash
# Login to your main org with alias
sf org login web -a MainOrg -r https://your-domain.my.salesforce.com
```


2. Option 1 - Direct Deployment:
```bash
# Deploy components directly to main org
sf project deploy start --source-dir force-app/main/default/lwc -o MainOrg
```


3. Option 2 - Package Installation:
```bash
# Install the package in your main org
sf package install --package [PackageVersionId] -o MainOrg

# Example:
sf package install --package 04taj0000005EYbAAM -o MainOrg
```


4. Verify Installation in Main Org:
```bash
# List installed packages
sf package installed list -o MainOrg

# Open main org in browser
sf org open -o MainOrg
```


## Deployment Options Comparison

Scratch Org:
- For development and testing
- Temporary environment
- Full deployment control
- Expires after 30 days

Main Org:
- Production environment
- Permanent deployment
- Choose between direct deployment or package installation
- Requires careful testing before deployment

Add these notes to the Notes section:
```
## Additional Notes
- Main org deployments should be tested in scratch orgs first
- Package installation is recommended for main org deployments
- Direct deployments to main org should be used cautiously
- Always backup main org metadata before deployment
```

