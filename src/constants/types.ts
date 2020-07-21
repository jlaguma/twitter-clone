import { AxiosResponse } from 'axios';

/**
 * Notification related types
 */
export const notificationActionTypes = Object.freeze({
    NOTIFICATION: 'NOTIFICATION',
});

export interface NotificationState {
    message: string;
}

export interface NotificationAction {
    type: typeof notificationActionTypes.NOTIFICATION;
    payload: NotificationState;
}

export type NotificationActionTypes = NotificationAction;

/**
 * Authentication related types
 */
export const authActionTypes = Object.freeze({
    CHANGE_AUTH: 'CHANGE_AUTH',
});

export interface AuthState {
    userId: number;
    loggedIn: boolean;
}

export interface ChangeAuthAction {
    type: typeof authActionTypes.CHANGE_AUTH;
    payload: AuthState;
}

export type AuthActionTypes = ChangeAuthAction;

/**
 * Tweets related types
 */
export const twitterActionTypes = Object.freeze({
    GET_TWEETS_REQUEST: 'GET_TWEETS_REQUEST',
    GET_TWEETS_SUCCESS: 'GET_TWEETS_SUCCESS',
    GET_TWEETS_ERROR: 'GET_TWEETS_ERROR',
    SAVE_TWEET_REQUEST: 'SAVE_TWEET_REQUEST',
    SAVE_TWEET_SUCCESS: 'SAVE_TWEET_SUCCESS',
    SAVE_TWEET_ERROR: 'SAVE_TWEET_ERROR',
    DELETE_TWEET_REQUEST: 'DELETE_TWEET_REQUEST',
    DELETE_TWEET_SUCCESS: 'DELETE_TWEET_SUCCESS',
    DELETE_TWEET_ERROR: 'DELETE_TWEET_ERROR',
    CLAP_TWEET_REQUEST: 'CLAP_TWEET_REQUEST',
    CLAP_TWEET_SUCCESS: 'CLAP_TWEET_SUCCESS',
    CLAP_TWEET_ERROR: 'CLAP_TWEET_ERROR',
});

export interface Tweet {
    id: number;
    tweet: string;
    userId: number;
    date: string;
    claps: number;
}

export interface TweetState {
    loading: boolean;
    error: string;
    tweets: Tweet[];
}

export interface GetTweetsAction {
    type: typeof twitterActionTypes.GET_TWEETS_REQUEST;
    payload: any;
}

export interface SaveTweetAction {
    type: typeof twitterActionTypes.SAVE_TWEET_REQUEST;
    payload: Promise<AxiosResponse<TweetState>>;
}

export interface DeleteTweetAction {
    type: typeof twitterActionTypes.DELETE_TWEET_REQUEST;
    payload: number;
}

export interface ClapTweetAction {
    type: typeof twitterActionTypes.CLAP_TWEET_REQUEST;
    payload: Promise<AxiosResponse<TweetState>>;
}

export type TwitterActionTypes =
    | GetTweetsAction
    | SaveTweetAction
    | DeleteTweetAction
    | ClapTweetAction;

/**
 * Users related types
 */
export const usersActionTypes = Object.freeze({
    GET_USER_REQUEST: 'GET_USER_REQUEST',
    GET_USER_SUCCESS: 'GET_USER_SUCCESS',
    GET_USER_ERROR: 'GET_USER_ERROR',
    GET_USER_DETAILS_REQUEST: 'GET_USER_DETAILS_REQUEST',
    GET_USER_DETAILS_SUCCESS: 'GET_USER_DETAILS_SUCCESS',
    GET_USER_DETAILS_ERROR: 'GET_USER_DETAILS_ERROR',
});

export interface User {
    id: number;
    username: string;
    role: string;
    usersDetailsId: number;
    profilePic: string;
}

export interface UserState {
    loading: boolean;
    error: string;
    users: User[];
}

export interface GetUserAction {
    type: typeof usersActionTypes.GET_USER_REQUEST;
    payload: any; // Promise<AxiosResponse<UserState>>;
}

export type UseersActionTypes = GetUserAction;

/**
 * User Details related types
 */
export interface UserDetails {
    id?: number;
    firstName?: string;
    lastName?: string;
    birthday?: string;
}

export interface UsersDetailsState {
    loading: boolean;
    error: string;
    details: UserDetails[];
}

export interface GetUserDetailsAction {
    type: typeof usersActionTypes.GET_USER_DETAILS_REQUEST;
    payload: any;
}

export type UseersDetailsActionTypes = GetUserDetailsAction;

/**
 * User Details related types
 */
export interface ChartData {
    name: string;
    value: number;
}

/**
 * State type
 */
export interface State {
    tweets: TweetState;
    users: UserState;
    usersDetails: UsersDetailsState;
    auth: AuthState;
    notification: NotificationState;
}
