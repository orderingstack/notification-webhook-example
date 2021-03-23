# Example of notification webhook for Ordering Stack platform

You can use this example to implement sending e-mail, sms, whatsapp etc. messages to end users in the process of ordering.

It exposes POST /order-completed and POST /order-ready endpoints.

## Securing your webhook

This example implements validation of x-signature header sent from Ordering Stack server. To support this form of securing webhook you must set property `webhookSecurityToken` in tenant properties.

## Configuration

URL of this notification service should be set in 'orderChangeWebhook-CompleteOrderEventCommand' and 'orderChangeWebhook-OrderDeliverReadyEventCommand' tenant properties.

Do not forget to set the environment variable NODE_ENV to production, to run the app in production mode.

More information about Ordering Stack webhooks on https://docs.orderingstack.com .
