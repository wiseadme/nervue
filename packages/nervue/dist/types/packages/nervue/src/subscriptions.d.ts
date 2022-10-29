export declare const subscriptionsBefore: {};
export declare const subscriptionsAfter: {};
export declare const onErrorSubscriptions: {};
export declare type SubscribeOptions = {
    name: string;
    detached?: boolean;
    before?(...args: any[]): any;
    after?(...result: any[]): any;
    onError?(error: any): any;
};
export declare type ExistingSubscribers = {
    beforeList: ((...args: any) => any)[];
    afterList: ((res: any) => any)[];
    onErrorList: ((error: unknown) => unknown)[];
};
export declare type Unsubscribe = () => Promise<boolean>;
/**
 * @param {object} options - options for subscribing
 * @returns {Unsubscribe} - unsubscribe function
 */
export declare function $subscribe(options: SubscribeOptions): Unsubscribe;
/***
 * @param {array} subscribers - array of subscribers
 * @param {array} args - arguments for subscriber callback function
 */
export declare function triggerSubs(subscribers: any, ...args: any[]): void;
/***
 * @param {string} storeId
 * @param {string} name
 * @return {ExistingSubscribers}
 */
export declare function getSubscribers(storeId: string, name: string): ExistingSubscribers;
