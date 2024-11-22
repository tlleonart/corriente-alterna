'use strict';
import bizSdk from 'facebook-nodejs-business-sdk';

export const executeFacebookRequest = () => {
    const ServerEvent = bizSdk.ServerEvent;
    const EventRequest = bizSdk.EventRequest;
    const UserData = bizSdk.UserData;
    const CustomData = bizSdk.CustomData;
    const Content = bizSdk.Content;

    const access_token = 'EAAdQdW5waNsBO5kzcNjr1Hvi8jK6ZAndoRUK2Tp7nUjnpT66zZA11ZAWSTHL2BW9nL7xp0Qbd40Ye9dJ6pD7JOMZBZA0veOr2ZAyAsmHHysNj8dkvsPBDiAbFSiaKRBIZBLoPHaFdJfdfjwUs2zNdCVmII7kdmvpTxqUIc6MrrIV28eqLzu6HrJxaoBq92KPUbFJgZDZD';
    const pixel_id = '920075530057046';
    const api = bizSdk.FacebookAdsApi.init(access_token);

    // @ts-ignore
    let current_timestamp = Math.floor(new Date() / 1000);

    const userData_0 = (new UserData())
        .setEmails(["7b17fb0bd173f625b58636fb796407c22b3d16fc78302d79f0fd30c2fc2fc068"])
        .setCities([]);
    const customData_0 = (new CustomData())
        .setValue(0.1)
        .setCurrency("USD");
    const serverEvent_0 = (new ServerEvent())
        .setEventName("Register")
        .setEventTime(1732242469)
        .setUserData(userData_0)
        .setCustomData(customData_0)
        .setActionSource("website");

    const eventsData = [serverEvent_0];
    const eventRequest = (new EventRequest(access_token, pixel_id))
        .setEvents(eventsData);
    eventRequest.execute();
}