/*
    AWS Cognito doesn't support functionality for resetting an MFA device, so EDPub had to setup a
    custom MFA flow which involves setting the userpool MFA config to optional and setting the user
    MFA config to active which essentially sets MFA to required. To do this, EDPub needs a way to
    "intiailize" users who already have MFA set up to avoid them having to re-setup. This script
    sets the user pool to optional and "initializes" users who already have MFA set up.

    After writing this script, it was discovered that cognito does this functionality already
    when switching from MFA required to MFA optional...
*/

const { 
    AdminGetUserCommand,
    AdminSetUserMFAPreferenceCommand,
    CognitoIdentityProviderClient,
    ListUsersCommand,
    SetUserPoolMfaConfigCommand
} = require ("@aws-sdk/client-cognito-identity-provider");
const fs = require('node:fs');


const client = new CognitoIdentityProviderClient();
const userPoolID = process.env.USERPOOLID

// get list of users in user pool and extracts the usernames to an array
async function getUsernames() {
    const command = new ListUsersCommand({
        UserPoolId: userPoolID,
        AttributesToGet: [],
        // Limit: 3
    });
    const { Users } = await client.send(command);
    return Users.map((user) => user.Username);
}

// iterate over array calling adminGetUser command for each user
// if response contains UserMFASettingList in response, add to usersWithMFASetup set
async function getUsersWithMFASetup(usernameArr) {
    // Tried using one of the js array functions here (filter, forEach, etc) but ran into issues
    // with async processing
    let usersWithMFA = new Array()
    for (const idx in usernameArr) {
        const command = new AdminGetUserCommand({UserPoolId: userPoolID, Username: usernameArr[idx]});
        const { UserMFASettingList } = await client.send(command);
        if (typeof UserMFASettingList !== "undefined") usersWithMFA.push(usernameArr[idx]);
    }
    return usersWithMFA;
}

// log set to output file
async function logSetToUpdateToOutputFile(userArr) {
    fs.writeFile('usersWithMFASetup.txt', userArr.toString(), err => {
        if (err)  console.error(err);
    });
}

// set userpool mfa to optional
async function setUserpoolMFA() {
    const command = new SetUserPoolMfaConfigCommand({ 
        UserPoolId: userPoolID,
        SoftwareTokenMfaConfiguration: { Enabled: true },
        MfaConfiguration: 'OPTIONAL'
    });
    const response = await client.send(command);
}


// iterate over usersWithMFASetup set to setUserMFAPreference so that MFA is active for those users
async function activateMFAForExistingMFAUsers(usernames) {
    usernames.forEach((username) => {
        const command = AdminSetUserMFAPreferenceCommand({
            UserPoolId: userPoolID,
            Username: username,
            SoftwareTokenMfaSettings: {
                Enabled: true,
                PreferredMfa: true
            }
        })
    });
}

async function main() {
    const usernames = await getUsernames();
    const usersWithMFASetup = await getUsersWithMFASetup(usernames);
    logSetToUpdateToOutputFile(usersWithMFASetup);
    await setUserpoolMFA();
    activateMFAForExistingMFAUsers(usersWithMFASetup);
}

main()