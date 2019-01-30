import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUser,
} from 'amazon-cognito-identity-js';

import { USER_POOL_ID, CLIENT_ID } from '../constants';

function getUserPool(): CognitoUserPool {
  return new CognitoUserPool({
    UserPoolId : USER_POOL_ID,
    ClientId : CLIENT_ID,
  });
}

function getUser(userPool: CognitoUserPool, username: string): CognitoUser {
  return new CognitoUser({
    Username: username,
    Pool: userPool,
  });
}

export async function authenticateUser(username: string, password: string): Promise<string> {
  const authenticationDetails = new AuthenticationDetails({
    Username : username,
    Password : password,
  });

  const cognitoUser = getUser(getUserPool(), username);

  return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(
        authenticationDetails,
        {
          onSuccess: result => {
            const token = result.getIdToken().getJwtToken();
            resolve(token);
          },
          onFailure: err => {
            reject(err.message || JSON.stringify(err));
          },
        }
      );
  });
}

export async function checkForLoggedInUser(): Promise<string | null> {
  const cognitoUser = getUserPool().getCurrentUser();

  if (cognitoUser === null) {
    return null;
  }

  return new Promise((resolve, reject) => {
    cognitoUser.getSession((err: any, session: any):void => {
      if (err) {
        reject(err.message || JSON.stringify(err));
      } else {
        if (session.isValid() === false) {
          resolve(null);
        } else {
          resolve(session.getIdToken().getJwtToken());
        }
      }
    });    
  });
}

export async function confirmRegistration(username: string, code: string): Promise<boolean> {
  const user = getUser(getUserPool(), username);

  return new Promise((resolve, reject) => {
    user.confirmRegistration(code, true, (err, result) => {
      if (err) {
        reject(err.message || JSON.stringify(err));
      } else {
        resolve(true);
      }
    });
  });
}

export async function signUp(username: string, password: string): Promise<boolean> {
  const userPool = getUserPool();

  return new Promise((resolve, reject) => {
    userPool.signUp(username, password, [], [], (err: any, result: any): void => {
      if (err) {
        reject(err.message || JSON.stringify(err));
      } else {
        resolve(true);
      }
    });
  });
}

export async function forgotPassword(username: string): Promise<boolean> {
  const userPool = getUserPool();
  const user = getUser(userPool, username);

  return new Promise((resolve, reject) => {
    user.forgotPassword({
      onSuccess: data => {
        resolve(true)
      },
      onFailure: err => {
        reject(err.message || JSON.stringify(err));
      },
    });
  });
}

export async function confirmPassword(username: string, code: string, newPassword: string): Promise<boolean> {
  const userPool = getUserPool();
  const user = getUser(userPool, username);

  return new Promise((resolve, reject) => {
    user.confirmPassword(code, newPassword, {
      onSuccess: () => {
        resolve(true);
      },
      onFailure: err => {
        reject(err.message || JSON.stringify(err));
      },
    });
  });
}

export function signOut(): boolean {
  const cognitoUser = getUserPool().getCurrentUser();

  if (cognitoUser === null) {
    return true;
  }

  cognitoUser.signOut();

  return true;
}