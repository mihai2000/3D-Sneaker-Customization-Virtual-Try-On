import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import Stripe from "stripe";
import express from "express";
import bodyParser from "body-parser";

admin.initializeApp();
const db = admin.firestore();

const stripe = new Stripe(functions.config().stripe.secret, {
	apiVersion: "2025-04-30.basil",
});

// -------------------------
// ✅ HANDLE PAYMENT INTENT
// -------------------------
export const createPaymentIntent = functions.https.onCall(
	async (
		data: { amount: number; currency?: string; items?: any },
		context: functions.https.CallableContext
	) => {
		const { amount, currency = "ron", items } = data;

		if (!context.auth) {
			throw new functions.https.HttpsError(
				"unauthenticated",
				"User must be authenticated."
			);
		}
		if (amount < 200) {
			throw new functions.https.HttpsError(
				"invalid-argument",
				"Amount must be at least RON 2.00."
			);
		}
		try {
			const paymentIntent = await stripe.paymentIntents.create({
				amount,
				currency,
				metadata: {
					uid: context.auth.uid,
					items: JSON.stringify(items ?? []),
				},
			});

			return {
				clientSecret: paymentIntent.client_secret,
			};
		} catch (err: any) {
			console.error("Stripe error:", err.message);
			throw new functions.https.HttpsError("internal", err.message);
		}
	}
);

// -------------------------
// ✅ WEBHOOK HANDLER
// -------------------------
const app = express();
app.use(bodyParser.raw({ type: "application/json" }));

app.post("/webhook", async (req: express.Request, res: express.Response) => {
	const sig = req.headers["stripe-signature"]!;
	const endpointSecret = functions.config().stripe.webhook;

	if (!sig || !endpointSecret) {
		return res.status(400).send("Missing signature or secret.");
	}

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
	} catch (err: any) {
		console.error("Webhook signature verification failed:", err.message);
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}

	const paymentIntent = event.data.object as Stripe.PaymentIntent;
	const uid = paymentIntent.metadata?.uid;

	try {
		switch (event.type) {
			case "payment_intent.succeeded":
				console.log("✅ Payment succeeded:", paymentIntent.id);
				if (uid) {
					const items = paymentIntent.metadata?.items
						? JSON.parse(paymentIntent.metadata.items)
						: [];
					await db.collection("orders").add({
						userId: uid,
						items,
						amount: paymentIntent.amount,
						status: "succeeded",
						createdAt: admin.firestore.FieldValue.serverTimestamp(),
					});
				}
				break;

			case "payment_intent.payment_failed":
				console.warn(
					"❌ Payment failed:",
					paymentIntent.last_payment_error?.message
				);
				if (uid) {
					await db.collection("orders").add({
						userId: uid,
						amount: paymentIntent.amount,
						status: "failed",
						error: paymentIntent.last_payment_error?.message,
						createdAt: admin.firestore.FieldValue.serverTimestamp(),
					});
				}
				break;

			default:
				console.log(`Unhandled event type ${event.type}`);
		}
		return res.status(200).json({ received: true });
	} catch (err) {
		console.error("🔥 Error handling webhook:", err);
		return res.status(500).send("Webhook internal error.");
	}
});

export const handleStripeWebhook = functions.https.onRequest(app);
