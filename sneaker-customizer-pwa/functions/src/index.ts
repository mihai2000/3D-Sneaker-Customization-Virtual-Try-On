// index.ts
import * as functions from 'firebase-functions/v1';
import * as admin from 'firebase-admin';
import Stripe from 'stripe';

admin.initializeApp();

const stripe = new Stripe(functions.config().stripe.secret, {
  apiVersion: '2025-04-30.basil',
});

export const createPaymentIntent = functions.https.onCall(
  async (
    data: { amount: number; currency?: string },
    context: functions.https.CallableContext
  ) => {
    const { amount, currency = 'usd' } = data;

    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated.'
      );
    }

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        metadata: {
          uid: context.auth.uid,
        },
      });

      return {
        clientSecret: paymentIntent.client_secret,
      };
    } catch (err: any) {
      console.error('Stripe error:', err.message);
      throw new functions.https.HttpsError('internal', err.message);
    }
  }
);
