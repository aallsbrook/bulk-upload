
# ipm package: Bulk Upload

## Overview

This IPM provides a portal interface for uploading bulk users, devices, and collections into an IoT system via CSV file.

This is an ipm package, which contains one or more reusable assets within the ipm Community. The 'package.json' in this repo is a ipm spec's package.json, [here](https://docs.clearblade.com/v/3/6-ipm/spec), which is a superset of npm's package.json spec, [here](https://docs.npmjs.com/files/package.json).

[Browse ipm Packages](https://ipm.clearblade.com)

## Setup

This package depends on two steps to setup
1.  Modify the library called Batch_Constants to include the platform url you are using
2.  Save and Test the service called Batch_Setup to create the uploader@clearblade.com user


## Usage

Simply run the setup steps and open the portal Batch Uploader.  On the portal follow the steps.  
Note: The portal offers the ability to log in as the developer to provide additional features for selecting and validating collection structures.  This feature can be turned off and all activities can run as the uploader user.

### Code Services
Batch_Util - this is a single service used by the portal to perform the function of accepting the json records for import into the system.  It has methods for handling users, collections, and devices.

### Code Libraries

### Portals
Batch Uploader Portal - This portal will let you select CSVs to import and then send that CSV data to be loaded as a collection, users, or devices.

### Collections

### ...

## Thank you

Powered by ClearBlade Enterprise IoT Platform: [https://platform.clearblade.com](https://platform.clearblade.com)
