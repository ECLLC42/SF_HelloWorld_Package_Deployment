# Salesforce Test App

GitHub “HelloWorld” Package

1. First, you created and authorized your dev hub:
```bash
sf org login web --set-default-dev-hub
```

2. Created a scratch org:
```bash
sf org create scratch --definition-file config/project-scratch-def.json --set-default
```

3. Created and deployed the LWC components:
```bash
# Created directories
mkdir -p force-app/main/default/lwc/helloWorld
mkdir -p force-app/main/default/lwc/simpleCounter

# Deployed components
sf project deploy start
```

4. Created the package:
```bash
sf package create --name "MyLWCComponents" --description "My LWC Components" --package-type Unlocked --path force-app
# This gave you Package Id: 0Hoaj0000000JkDCAU
```

5. Created the package version:
```bash
sf package version create --package "MyLWCComponents" --installation-key-bypass --wait 10
# This gave you Version Id: 04taj0000005EYbAAM
```

6. Finally, installed the package in your scratch org:
```bash
sf package install --package 04taj0000005EYbAAM -o test-icn6kg7lsxmc@example.com
```

7. Verified installation:
```bash
sf package installed list
```

The key to success was:
1. Having proper project structure
2. Creating the package before the version
3. Installing the package in the target org
4. Having `"default": true` in your sfdx-project.json
